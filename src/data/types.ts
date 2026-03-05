export interface QuizQuestion {
  question: string;
  answer: string;
}

export interface FlashcardData {
  question: string;
  answer: string;
}

export interface DocQuizData {
  quizzes: QuizQuestion[];
  flashcards: FlashcardData[];
}

// key format: "topicDir/slug" e.g. "01-data-structures/01-array-and-list"
export type QuizDataMap = Record<string, DocQuizData>;
