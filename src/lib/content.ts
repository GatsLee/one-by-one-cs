import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractHeadings(source: string): TocHeading[] {
  const slugger = new GithubSlugger();
  const headings: TocHeading[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(source)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    headings.push({ id: slugger.slug(text), text, level });
  }
  return headings;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "topics");

export const TOPIC_LABELS: Record<string, string> = {
  "02-os": "운영체제",
  "03-network": "네트워크",
  "04-database": "데이터베이스",
  "05-system-design": "시스템 설계",
  "06-ai": "AI/ML",
  "07-infra": "인프라/DevOps",
  "08-ai-agent": "AI 에이전트",
  "09-architecture": "소프트웨어 아키텍처",
  "10-debugging": "디버깅",
  "11-git": "Git/버전관리",
  "12-testing": "테스팅",
};

export const STUDY_ORDER = [
  { topicDir: "02-os", label: "운영체제", desc: "프로세스, 스케줄링, 메모리, 동기화, 파일 시스템, I/O" },
  { topicDir: "03-network", label: "네트워크", desc: "HTTP, OSI, TCP/UDP, WebSocket, 보안, 라우팅, 링크 계층" },
  { topicDir: "04-database", label: "데이터베이스", desc: "SQL, 정규화, 트랜잭션, NoSQL, ER 모델링, 쿼리 최적화, 복구" },
  { topicDir: "05-system-design", label: "시스템 설계", desc: "확장성, 캐싱, 분산 시스템, 실전 설계" },
  { topicDir: "06-ai", label: "AI/ML", desc: "ML 기초, 신경망, 트랜스포머, LLM" },
  { topicDir: "07-infra", label: "인프라/DevOps", desc: "Linux, Docker, CI/CD, 클라우드, 모니터링, IaC" },
  { topicDir: "08-ai-agent", label: "AI 에이전트", desc: "ReAct, 오케스트레이션, MCP, 배포" },
  { topicDir: "09-architecture", label: "소프트웨어 아키텍처", desc: "SOLID, 생성/구조/행위 패턴, 아키텍처 패턴, 클린 아키텍처" },
  { topicDir: "10-debugging", label: "디버깅", desc: "에러 메시지, 디버깅 전략, 개발자 도구, 버그 패턴, AI 디버깅" },
  { topicDir: "11-git", label: "Git/버전관리", desc: "Git 기초, 브랜치, 협업, 되돌리기" },
  { topicDir: "12-testing", label: "테스팅", desc: "테스트 피라미드, Unit/Integration/E2E, TDD" },
];

export const TOPIC_GROUPS = [
  {
    label: "CS 기초",
    desc: "컴퓨터 과학의 핵심 이론",
    color: "book-blue",
    topics: ["02-os", "03-network", "04-database"],
  },
  {
    label: "시스템 & 설계",
    desc: "대규모 시스템과 아키텍처",
    color: "book-charcoal",
    topics: ["05-system-design", "09-architecture"],
  },
  {
    label: "AI",
    desc: "인공지능과 에이전트",
    color: "book-red",
    topics: ["06-ai", "08-ai-agent"],
  },
  {
    label: "개발 실무",
    desc: "현업에서 바로 쓰는 기술",
    color: "book-green",
    topics: ["07-infra", "10-debugging", "11-git", "12-testing"],
  },
];

export interface TopicCategory {
  dirName: string;
  label: string;
  desc: string;
  docCount: number;
}

export interface DocMeta {
  title: string;
  slug: string;
  topicDir: string;
  order: number;
}

export interface DocContent {
  title: string;
  slug: string;
  topicDir: string;
  source: string;
  frontmatter: Record<string, unknown>;
  quiz: QuizQuestion[];
  flashcards: FlashcardData[];
}

export interface QuizQuestion {
  question: string;
  answer: string;
}

export interface FlashcardData {
  question: string;
  answer: string;
}

export function getAllTopics(): TopicCategory[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return STUDY_ORDER.map((item) => {
    const topicPath = path.join(CONTENT_DIR, item.topicDir);
    let docCount = 0;
    if (fs.existsSync(topicPath)) {
      docCount = fs.readdirSync(topicPath).filter((f) => f.endsWith(".mdx")).length;
    }
    return {
      dirName: item.topicDir,
      label: item.label,
      desc: item.desc,
      docCount,
    };
  }).filter((t) => t.docCount > 0);
}

export function getDocsInTopic(topicDir: string): DocMeta[] {
  const topicPath = path.join(CONTENT_DIR, topicDir);
  if (!fs.existsSync(topicPath)) return [];

  return fs
    .readdirSync(topicPath)
    .filter((f) => f.endsWith(".mdx"))
    .sort()
    .map((filename) => {
      const filePath = path.join(topicPath, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      const slug = filename.replace(/\.mdx$/, "");
      const orderMatch = slug.match(/^(\d+)/);
      return {
        title: (data.title as string) || slug.replace(/-/g, " "),
        slug,
        topicDir,
        order: orderMatch ? parseInt(orderMatch[1]) : 0,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getDocContent(topicDir: string, slug: string): DocContent | null {
  const filePath = path.join(CONTENT_DIR, topicDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const quiz = parseQuizQuestions(content);
  const flashcards = parseFlashcards(content);

  return {
    title: (data.title as string) || slug.replace(/-/g, " "),
    slug,
    topicDir,
    source: content,
    frontmatter: data,
    quiz,
    flashcards,
  };
}

function parseQuizQuestions(source: string): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  // Find the 연습 문제 section
  const sectionMatch = source.match(/## 연습 문제\s*\n([\s\S]*?)(?=\n## |$)/);
  if (!sectionMatch) return questions;

  const sectionText = sectionMatch[1];
  const parts = sectionText.split(/###\s*Q\d+[\.)]\s*/);

  for (const part of parts.slice(1)) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    const detailMatch = trimmed.match(
      /<details>\s*<summary>.*?<\/summary>\s*([\s\S]*?)\s*<\/details>/
    );

    let questionText: string;
    let answerText: string;

    if (detailMatch) {
      questionText = trimmed.slice(0, detailMatch.index).trim();
      answerText = detailMatch[1].trim();
    } else {
      questionText = trimmed;
      answerText = "";
    }

    if (questionText) {
      questions.push({ question: questionText, answer: answerText });
    }
  }

  return questions;
}

function parseFlashcards(source: string): FlashcardData[] {
  const cards: FlashcardData[] = [];

  const sectionMatch = source.match(/## 플래시카드\s*\n([\s\S]*?)(?=\n## |$)/);
  if (!sectionMatch) return cards;

  for (const line of sectionMatch[1].split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|") || trimmed.includes("---")) continue;

    const cells = trimmed
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim());

    if (cells.length >= 2) {
      const [q, a] = cells;
      if (["질문", "question", "앞면"].includes(q.toLowerCase())) continue;
      if (q) cards.push({ question: q, answer: a });
    }
  }

  return cards;
}
