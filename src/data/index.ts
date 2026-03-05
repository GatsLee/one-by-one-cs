import type { QuizDataMap, DocQuizData, QuizQuestion, FlashcardData } from "./types";
import { dataStructuresQuizzes } from "./01-data-structures";
import { osQuizzes } from "./02-os";
import { networkQuizzes } from "./03-network";
import { databaseQuizzes } from "./04-database";
import { systemDesignQuizzes } from "./05-system-design";
import { aiQuizzes } from "./06-ai";
import { remainingQuizzes } from "./07-09-remaining";

export type { QuizDataMap, DocQuizData, QuizQuestion, FlashcardData };

export const allQuizData: QuizDataMap = {
  ...dataStructuresQuizzes,
  ...osQuizzes,
  ...networkQuizzes,
  ...databaseQuizzes,
  ...systemDesignQuizzes,
  ...aiQuizzes,
  ...remainingQuizzes,
};

/** Get quiz data for a specific document */
export function getDocQuizData(topicDir: string, slug: string): DocQuizData | null {
  const key = `${topicDir}/${slug}`;
  return allQuizData[key] || null;
}

/** Get all quiz questions for a topic (all docs combined) */
export function getTopicQuizzes(topicDir: string): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  for (const [key, data] of Object.entries(allQuizData)) {
    if (key.startsWith(topicDir + "/")) {
      questions.push(...data.quizzes);
    }
  }
  return questions;
}

/** Get all flashcards for a topic (all docs combined) */
export function getTopicFlashcards(topicDir: string): FlashcardData[] {
  const cards: FlashcardData[] = [];
  for (const [key, data] of Object.entries(allQuizData)) {
    if (key.startsWith(topicDir + "/")) {
      cards.push(...data.flashcards);
    }
  }
  return cards;
}

/** Shuffle array (Fisher-Yates) */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
