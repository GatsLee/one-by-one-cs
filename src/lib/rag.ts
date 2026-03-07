import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Embedding models in priority order
export const EMBEDDING_MODELS = ["mxbai-embed-large", "nomic-embed-text"];

export function detectEmbeddingModel(availableModels: string[]): string | null {
  for (const preferred of EMBEDDING_MODELS) {
    const found = availableModels.find((m) => m.startsWith(preferred));
    if (found) return found;
  }
  return null;
}

/** Normalize a search query by stripping Korean question suffixes/particles. */
export function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .replace(
      /(이란 무엇인가|이란 무엇|란 무엇인가|란 무엇|이 무엇인가|이 뭐야|가 뭐야|은 뭐야|는 뭐야|이 뭐야|에 대해|이란|란|뭐야|뭔가|뭔지)\s*\??$/,
      ""
    )
    .replace(/(은|는|이|가|을|를|의|에서|으로|로|과|와|도|만)$/, "")
    .trim();
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

// Strip MDX/JSX noise so only prose content is embedded
function cleanMdxText(text: string): string {
  return text
    // Remove import/export lines
    .replace(/^(import|export)\s+.+$/gm, "")
    // Remove JSX self-closing tags
    .replace(/<[A-Z][A-Za-z]*[^>]*\/>/g, "")
    // Remove paired JSX tags with content
    .replace(/<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>/g, "")
    // Remove JSX expression blocks (short ones — avoids eating paragraphs)
    .replace(/\{[^}]{0,200}\}/g, "")
    // Collapse excessive whitespace
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Split MDX text into overlapping chunks of ~500 chars, splitting on double newlines.
// Pass title to inject a prefix so each chunk is self-contained during retrieval.
export function chunkMdxContent(rawText: string, title?: string): string[] {
  // Remove frontmatter
  const withoutFrontmatter = rawText.replace(/^---[\s\S]*?---\n/, "");
  const cleaned = cleanMdxText(withoutFrontmatter);

  // Split on double newlines (paragraphs)
  const paragraphs = cleaned
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 30);

  const chunks: string[] = [];
  let current = "";
  let prevTail = "";

  for (const para of paragraphs) {
    if (current.length + para.length > 600 && current.length > 0) {
      chunks.push(current.trim());
      // Carry last ~100 chars of current chunk into next chunk for overlap
      prevTail = current.slice(-100);
      current = prevTail ? prevTail + "\n\n" + para : para;
    } else {
      current = current ? current + "\n\n" + para : para;
    }
  }
  if (current.trim()) chunks.push(current.trim());

  // Prepend title so retrieval model has context without surrounding chunks
  if (title) {
    return chunks.map((c) => `[${title}] ${c}`);
  }
  return chunks;
}

export interface ChunkResult {
  id: number;
  filePath: string;
  topic: string;
  title: string;
  chunkIdx: number;
  chunkText: string;
  summary: string | null;
  tags: string[] | null;
  score: number;
}

// ── In-memory embedding cache ────────────────────────────────────────────────
// Populated on first searchChunks call; invalidated after re-indexing.

interface CachedChunk {
  id: number;
  filePath: string;
  topic: string;
  title: string;
  chunkIdx: number;
  chunkText: string;
  summary: string | null;
  tags: string[] | null;   // only populated for chunkIdx === 0; null for others
  embeddingVec: number[];
}

let chunkCache: CachedChunk[] | null = null;

/** Call after indexing completes so the next search reloads fresh data. */
export function invalidateChunkCache(): void {
  chunkCache = null;
}

/** Load cache from DB if not already loaded. */
async function ensureCache(): Promise<void> {
  if (chunkCache) return;
  const rows = await prisma.contentChunk.findMany({
    select: {
      id: true,
      filePath: true,
      topic: true,
      title: true,
      chunkIdx: true,
      chunkText: true,
      summary: true,
      tags: true,
      embedding: true,
    },
  });
  chunkCache = rows.map((row) => ({
    id: row.id,
    filePath: row.filePath,
    topic: row.topic,
    title: row.title,
    chunkIdx: row.chunkIdx,
    chunkText: row.chunkText,
    summary: row.summary ?? null,
    tags: row.tags ? (JSON.parse(row.tags) as string[]) : null,
    embeddingVec: JSON.parse(row.embedding) as number[],
  }));
}

/** Layer 1 — Title match. Normalizes query and matches against document titles. */
export async function searchByTitle(query: string): Promise<ChunkResult | null> {
  if (!query.trim()) return null;
  await ensureCache();

  const lower = normalizeQuery(query);
  if (!lower) return null;

  const matched = chunkCache!.filter(
    (c) => c.title.toLowerCase().includes(lower) || lower.includes(c.title.toLowerCase())
  );
  if (matched.length === 0) return null;

  const anchor = matched.find((c) => c.chunkIdx === 0) ?? matched[0];
  return {
    id: anchor.id,
    filePath: anchor.filePath,
    topic: anchor.topic,
    title: anchor.title,
    chunkIdx: anchor.chunkIdx,
    chunkText: anchor.chunkText,
    summary: anchor.summary,
    tags: anchor.tags,
    score: 1.0,
  };
}

/** Layer 2 — Tag match. Normalizes query into tokens and matches against pre-computed tags.
 *  Only inspects chunkIdx === 0 entries (where tags are stored).
 *  excludeFilePaths: skip documents already shown in Layer 1. */
export function searchByTags(
  query: string,
  excludeFilePaths?: Set<string>
): ChunkResult[] {
  if (!chunkCache) return [];

  const tokens = normalizeQuery(query)
    .split(/[\s,]+/)
    .filter((t) => t.length > 1);
  if (tokens.length === 0) return [];

  const results: Array<ChunkResult & { matchCount: number }> = [];

  for (const chunk of chunkCache) {
    if (chunk.chunkIdx !== 0) continue;
    if (excludeFilePaths?.has(chunk.filePath)) continue;
    if (!chunk.tags || chunk.tags.length === 0) continue;

    const tagsLower = chunk.tags.map((t) => t.toLowerCase());
    const matchCount = tokens.filter((token) =>
      tagsLower.some((tag) => tag.includes(token) || token.includes(tag))
    ).length;

    if (matchCount > 0) {
      results.push({
        id: chunk.id,
        filePath: chunk.filePath,
        topic: chunk.topic,
        title: chunk.title,
        chunkIdx: chunk.chunkIdx,
        chunkText: chunk.chunkText,
        summary: chunk.summary,
        tags: chunk.tags,
        score: matchCount / Math.max(tokens.length, 1),
        matchCount,
      });
    }
  }

  return results
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 3)
    .map(({ matchCount: _mc, ...rest }) => rest);
}

/** Layer 3 — Semantic search via cosine similarity on pre-parsed embeddings. */
export async function searchChunks(
  queryEmbedding: number[],
  topK = 3
): Promise<ChunkResult[]> {
  await ensureCache();
  if (chunkCache!.length === 0) return [];

  const scored = chunkCache!.map((chunk) => ({
    id: chunk.id,
    filePath: chunk.filePath,
    topic: chunk.topic,
    title: chunk.title,
    chunkIdx: chunk.chunkIdx,
    chunkText: chunk.chunkText,
    summary: chunk.summary,
    tags: chunk.tags,
    score: cosineSimilarity(queryEmbedding, chunk.embeddingVec),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}
