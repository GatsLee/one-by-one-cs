# RAG 검색 시스템 설계 노트

로컬 LLM 환경에서 의미 기반 검색을 구현하고 개선한 과정을 기록한 문서입니다.

---

## 배경 및 문제 정의

이 프로젝트는 57개의 CS 강의 문서(MDX)를 로컬 LLM으로 검색하는 기능을 제공합니다. 초기에는 멀티턴 채팅(`/chat`) 방식을 택했지만, 로컬 LLM의 품질 한계로 인해 **RAG 기반 의미 검색(`/search`)** 으로 방향을 전환했습니다.

**전환 이유:**
- 소형 로컬 모델(1B–7B)은 긴 대화 맥락에서 일관성이 떨어짐
- 채팅보다 검색이 사용자의 실제 니즈(강의 내용 탐색)에 더 적합
- RAG 검색은 모델 품질에 덜 의존적 — 임베딩 정확도가 핵심

---

## 시스템 구조

```
사용자 쿼리
    │
    ▼
[POST /api/search]  ← SSE 스트림
    │
    ├─ Layer 1: 제목 정규화 매칭 (<1ms, LLM 없음)
    │     └─ normalizeQuery() → 한국어 어미/조사 제거 → 제목 substring 비교
    │     └─ 일치 시 → { type: "title_match" }
    │
    ├─ Layer 2: 태그 키워드 매칭 (<5ms, LLM 없음)
    │     └─ 쿼리 토큰 분해 → in-memory 태그 교집합 스코어링 → 상위 3개
    │     └─ 일치 시 → { type: "tag_match" }
    │
    ├─ Layer 3: 임베딩 RAG (~2-5s)
    │     └─ mxbai prefix 적용 → 쿼리 임베딩 → 코사인 유사도
    │     └─ Layer 1/2 결과 filePath 제외 → score ≥ 0.25 필터 → 상위 1개
    │     └─ { type: "result" }
    │
    └─ RAG 답변 (chatModel 있을 때)
          └─ Layer 3 청크 우선, 없으면 Layer 1/2 폴백
          └─ { type: "rag_answer" }

데이터: SQLite (Prisma) — ContentChunk { filePath, title, topic, chunkText, embedding, summary, tags }
레이어간 중복 제거: seenFilePaths Set<string> — 앞 레이어에서 노출된 문서는 뒤 레이어에서 제외
```

**SSE 이벤트 스키마:**

```ts
{ type: "title_match", source: ChunkResult }      // Layer 1: 제목 일치 문서
{ type: "tag_match",   source: ChunkResult }      // Layer 2: 태그 일치 문서 (0~3개)
{ type: "result",      index: number, source: ChunkResult }  // Layer 3: RAG 최고 유사 문서
{ type: "rag_answer",  text: string }             // LLM 답변 (문서 기반)
{ type: "no_results" }
{ type: "error",       message: string }
{ type: "done" }
```

---

## RAG 파이프라인 개선 기록

### 문제 1: mxbai-embed-large instruction prefix 누락

**원인**
`mxbai-embed-large`는 Microsoft의 [Generalized Embedding](https://arxiv.org/abs/2401.00368) 방식으로 학습된 모델입니다. 쿼리 임베딩 시 태스크 설명 prefix를 제공하지 않으면 문서 임베딩과의 유사도 계산이 부정확해집니다.

**변경**

```ts
// Before
body: JSON.stringify({ model: embeddingModel, prompt: query })

// After — 쿼리에만 prefix 적용 (문서 임베딩은 변경 없음)
const queryPrompt = embeddingModel.startsWith("mxbai")
  ? `Represent this sentence for searching relevant passages: ${query}`
  : query;
body: JSON.stringify({ model: embeddingModel, prompt: queryPrompt })
```

**효과:** 재인덱싱 없이 즉시 관련도 향상. 특히 짧은 쿼리("해시 테이블이 뭐야?")에서 차이가 큼.

---

### 문제 2: 매 쿼리마다 전체 임베딩 JSON 파싱 반복

**원인**
`searchChunks()` 실행 시마다 `prisma.contentChunk.findMany()`로 전체 레코드를 로드하고, 각 레코드의 `embedding` 필드(JSON 문자열)를 `JSON.parse()`로 파싱합니다. 약 300개 청크 × 1024차원 = 매 쿼리마다 300회 파싱.

**변경** — 모듈 레벨 in-memory 캐시 도입

```ts
// src/lib/rag.ts
let chunkCache: CachedChunk[] | null = null;

export async function searchChunks(queryEmbedding, topK) {
  if (!chunkCache) {
    const rows = await prisma.contentChunk.findMany({ ... });
    chunkCache = rows.map(row => ({
      ...row,
      embeddingVec: JSON.parse(row.embedding),  // 최초 1회만 파싱
    }));
  }
  // 이후 쿼리는 메모리의 Float 배열로 코사인 유사도만 계산
}

export function invalidateChunkCache() { chunkCache = null; }
```

재인덱싱 완료 시 `invalidateChunkCache()`를 호출해 캐시를 자동 갱신합니다.

**효과:** 두 번째 쿼리부터 DB 왕복 및 파싱 오버헤드 제거.

---

### 문제 3: 같은 문서의 여러 청크가 중복 노출

**원인**
한 MDX 파일은 여러 청크로 분할됩니다. 동일 문서의 여러 청크가 모두 상위 K개에 들어오면 사용자에게 같은 강의가 반복 노출됩니다.

**변경** — filePath 기준 중복 제거

```ts
const raw = await searchChunks(queryEmbedding, 20);  // 여유 있게 조회

const seen = new Set<string>();
const results = raw
  .filter(r => r.score >= 0.25)          // 저관련도 제거
  .filter(r => {                          // 파일당 최고 점수 청크 1개만
    if (seen.has(r.filePath)) return false;
    seen.add(r.filePath);
    return true;
  })
  .slice(0, 5);
```

---

### 문제 4: MDX 잡음이 청크 임베딩을 오염

**원인**
MDX 파일에는 `import` 구문, JSX 컴포넌트 태그, `{expression}` 블록이 포함됩니다. 이들이 임베딩 대상 텍스트에 그대로 포함되면 의미 벡터가 노이즈를 담게 됩니다.

**변경** — `chunkMdxContent()` 전처리 강화

```ts
function cleanMdxText(text: string): string {
  return text
    .replace(/^(import|export)\s+.+$/gm, "")  // import/export 제거
    .replace(/<[A-Z][A-Za-z]*[^>]*\/>/g, "")  // JSX self-closing 태그 제거
    .replace(/<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>/g, "")  // paired JSX
    .replace(/\{[^}]{0,200}\}/g, "")           // 짧은 expression 블록
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
```

추가로 두 가지 청킹 개선을 함께 적용:

- **Title prefix 주입**: 각 청크 앞에 `[제목]` 삽입 → 청크를 독립적으로 읽어도 주제가 명확
- **Overlap 추가**: 이전 청크 마지막 100자를 다음 청크 앞에 이어붙여 경계에서 개념이 잘리는 문제 완화

---

### 문제 5: 제목 검색에 LLM 키워드 추출 의존 (느림 + 불필요)

**원인**
초기 Layer 1 구현은 LLM을 호출해 쿼리에서 개념 키워드를 추출("해시 테이블이 뭐야?" → "해시 테이블")한 뒤 제목 매칭을 수행했습니다. 이 LLM 호출에 5–12초가 소요되어 첫 결과 노출이 지연됩니다.

**해결책: 한국어 정규화 기반 직접 매칭**

```ts
// src/lib/rag.ts
export function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .replace(
      /(이란 무엇인가|이란 무엇|이 무엇인가|이 뭐야|가 뭐야|에 대해|이란|란|뭐야|뭔가|뭔지)\s*\??$/,
      ""
    )
    .replace(/(은|는|이|가|을|를|의|에서|으로|로|과|와|도|만)$/, "")
    .trim();
}

export async function searchByTitle(query: string): Promise<ChunkResult | null> {
  await ensureCache();
  const lower = normalizeQuery(query);        // "해시 테이블이 뭐야?" → "해시 테이블"
  const matched = chunkCache!.filter(
    (c) => c.title.toLowerCase().includes(lower) || lower.includes(c.title.toLowerCase())
  );
  // chunkIdx === 0 (도입부 청크) 우선 반환
}
```

**효과:** LLM 없이 즉시(<1ms) Layer 1 결과 반환. 개념 질문 유형 전반에 안정적 매칭.

---

### 문제 6: 저사양 환경에서 실시간 요약 대기 시간 과다

**원인**
결과 5개에 대해 LLM 요약을 직렬로 생성하면, 소형 모델(1B–3B)에서 결과당 10–30초 → 최대 2분 이상 대기가 발생합니다. 사실상 사용 불가 수준입니다.

**해결책: 인덱싱 시점에 요약 사전 생성**

인덱싱 과정에서 각 청크를 임베딩한 직후 LLM으로 요약을 생성해 DB에 저장합니다.

```ts
// src/app/api/embed/route.ts (인덱싱 루프 내)
let summary: string | null = null;
if (chatModel) {
  const sumRes = await fetch(`${OLLAMA_URL}/api/chat`, {
    body: JSON.stringify({
      model: chatModel,
      messages: [
        { role: "system", content: "CS 개념을 한국어 2-3문장으로 요약합니다." },
        { role: "user",   content: `다음 내용을 요약:\n\n${chunkText}` },
      ],
      stream: false,
    }),
    signal: AbortSignal.timeout(60000),
  });
  if (sumRes.ok) summary = (await sumRes.json()).message?.content ?? null;
}

await prisma.contentChunk.upsert({ ..., create: { ..., summary }, update: { ..., summary } });
```

검색 시에는 저장된 요약을 즉시 반환하고, 없으면 실시간 LLM으로 폴백합니다:

```ts
// src/app/api/search/route.ts
if (chunk.summary) {
  send({ type: "summary", index: i, text: chunk.summary });
  continue;
}
// 폴백: 실시간 LLM 요약
```

**트레이드오프:**

| | 실시간 생성 | 사전 생성 |
|---|---|---|
| 검색 응답 속도 | 느림 (10–150초) | 빠름 (즉시) |
| 쿼리 맞춤도 | 높음 (질문 반영) | 낮음 (일반 요약) |
| LLM 불필요 시점 | 검색마다 필요 | 검색 시 불필요 |
| 적합한 콘텐츠 | 열린 QA | 사실 기반 CS 강의 |

CS 강의처럼 사실 중심 콘텐츠는 쿼리와 무관하게 청크 자체를 요약해도 충분히 유용하므로 사전 생성 방식을 택했습니다.

---

### 추가: Layer 2 — 태그 기반 키워드 검색

제목에는 걸리지 않지만 개념적으로 관련 있는 문서를 검색하기 위해 태그 레이어를 추가했습니다.

**설계 원칙:**
- 태그는 **인덱싱 시점에 LLM으로 생성** → 검색 시에는 LLM 불필요
- 문서당 20-30개의 한국어·영어 키워드, 동의어, 약어, 상위/하위 개념 포함
- `chunkIdx === 0` 청크에만 저장 (문서당 1회 생성)

**인덱싱 시 태그 생성:**

```ts
// src/app/api/embed/route.ts
if (chunkIdx === 0 && chatModel) {
  const tagRes = await fetch(`${OLLAMA_URL}/api/chat`, {
    body: JSON.stringify({
      model: chatModel,
      messages: [
        { role: "system", content:
          "CS 강의 문서의 핵심 키워드를 20-30개 추출하여 JSON 배열로만 반환. " +
          "한국어·영어 키워드, 동의어, 약어, 상위/하위 개념 포함. " +
          "출력 형식: [\"키워드1\", \"keyword2\"] — 배열만, 설명 없이." },
        { role: "user", content: chunkText },
      ],
    }),
    signal: AbortSignal.timeout(30000),
  });
  const raw: string = (await tagRes.json()).message?.content ?? "";
  const match = raw.match(/\[[\s\S]*\]/);  // JSON 배열 추출
  if (match) tags = JSON.parse(match[0]) as string[];
}
```

**검색 시 태그 매칭 (in-memory, LLM 없음):**

```ts
// src/lib/rag.ts
export function searchByTags(query: string, excludeFilePaths?: Set<string>): ChunkResult[] {
  const tokens = normalizeQuery(query).split(/[\s,]+/).filter(t => t.length > 1);

  for (const chunk of chunkCache!) {
    if (chunk.chunkIdx !== 0) continue;           // 태그는 chunkIdx 0에만 존재
    if (excludeFilePaths?.has(chunk.filePath)) continue;  // Layer 1 결과 제외

    const tagsLower = chunk.tags!.map(t => t.toLowerCase());
    const matchCount = tokens.filter(token =>
      tagsLower.some(tag => tag.includes(token) || token.includes(tag))
    ).length;

    if (matchCount > 0) results.push({ ...chunk, score: matchCount / tokens.length });
  }

  return results.sort((a, b) => b.matchCount - a.matchCount).slice(0, 3);
}
```

**레이어간 중복 제거:**

```ts
// src/app/api/search/route.ts
const seenFilePaths = new Set<string>();

const titleHit = await searchByTitle(query);
if (titleHit) { send({ type: "title_match", source: titleHit }); seenFilePaths.add(titleHit.filePath); }

const tagHits = searchByTags(query, seenFilePaths);   // Layer 1 결과 자동 제외
for (const hit of tagHits) { send({ type: "tag_match", source: hit }); seenFilePaths.add(hit.filePath); }

const raw = await searchChunks(queryEmbedding, 20);
const best = raw.filter(r => r.score >= 0.25).filter(r => !seenFilePaths.has(r.filePath));
```

---

## 스키마

```prisma
model ContentChunk {
  id        Int      @id @default(autoincrement())
  filePath  String
  topic     String
  title     String
  chunkIdx  Int
  chunkText String
  embedding String   // JSON 직렬화된 float 배열
  summary   String?  // 인덱싱 시 LLM으로 사전 생성, 없으면 null
  tags      String?  // JSON 직렬화된 string 배열, chunkIdx === 0에만 저장
  createdAt DateTime @default(now())

  @@unique([filePath, chunkIdx])
}
```

---

## 사용 기술 스택

| 역할 | 기술 |
|------|------|
| 임베딩 모델 | `mxbai-embed-large` (1024d) / `nomic-embed-text` (768d) |
| LLM 런타임 | Ollama (로컬 실행) |
| 벡터 검색 | 코사인 유사도, 순수 TypeScript (in-memory) |
| 저장소 | SQLite via Prisma |
| 스트리밍 | SSE (Server-Sent Events), Next.js App Router Route Handler |
| 프레임워크 | Next.js 16, TypeScript, Tailwind CSS v4 |

---

## 개선 전후 비교

| 항목 | 개선 전 | 개선 후 |
|------|---------|---------|
| 쿼리 임베딩 정확도 | prefix 없음 → 유사도 저하 | mxbai instruction prefix 적용 |
| 검색 속도 (2회차~) | 매번 DB 로드 + JSON.parse | in-memory 캐시로 즉시 계산 |
| 중복 결과 | 같은 파일 청크 반복 노출 | filePath 중복 제거 |
| 저품질 결과 | score 임계값 없음 | score < 0.25 필터링 |
| 청크 품질 | MDX 잡음 포함, overlap 없음 | 전처리 + overlap + title prefix |
| 요약 응답 속도 | 검색 시 최대 2분 | 인덱싱 1회 후 즉시 반환 |
| 제목 검색 딜레이 | LLM 키워드 추출 (5–12s) | 정규화 직접 매칭 (<1ms) |
| 키워드 검색 커버리지 | 제목 매칭만 | 태그 20-30개로 동의어·약어까지 포함 |
| 레이어간 중복 | 없음 | seenFilePaths로 전 레이어 중복 제거 |

---

## 3-레이어 아키텍처 설계 결정

| 레이어 | 방식 | 속도 | 의존성 | 역할 |
|--------|------|------|--------|------|
| Layer 1 (제목 매칭) | 문자열 정규화 | <1ms | 없음 | 정확한 개념 쿼리 직결 |
| Layer 2 (태그 매칭) | in-memory 토큰 교집합 | <5ms | 없음 (인덱싱 시 LLM) | 제목엔 없는 관련 개념 포착 |
| Layer 3 (임베딩 RAG) | 코사인 유사도 | ~2-5s | 임베딩 모델 | 의미 기반 최종 폴백 |

**설계 원칙:**
- 검색 시점에 LLM을 호출하는 레이어는 RAG 답변 생성 단 하나로 제한
- Layer 1/2는 인덱싱 시 준비된 데이터(tags, title)만으로 작동 → 저사양 환경에서도 즉각 응답
- 각 레이어가 찾은 문서는 이후 레이어에서 자동 제외 → 사용자에게 다양한 관련 강의 노출
