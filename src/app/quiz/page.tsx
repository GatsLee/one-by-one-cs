import { getAllTopics, getDocsInTopic } from "@/lib/content";
import { allQuizData } from "@/data";
import QuizPageClient from "./QuizPageClient";

export default function QuizPage() {
  const topics = getAllTopics();
  const topicsWithDocs = topics.map((t) => ({
    ...t,
    docs: getDocsInTopic(t.dirName),
  }));

  // Serialize quiz data per topic for client
  const quizDataByTopic: Record<string, { quizzes: { question: string; answer: string }[]; flashcards: { question: string; answer: string }[] }> = {};
  for (const topic of topics) {
    const quizzes: { question: string; answer: string }[] = [];
    const flashcards: { question: string; answer: string }[] = [];
    for (const [key, data] of Object.entries(allQuizData)) {
      if (key.startsWith(topic.dirName + "/")) {
        quizzes.push(...data.quizzes);
        flashcards.push(...data.flashcards);
      }
    }
    quizDataByTopic[topic.dirName] = { quizzes, flashcards };
  }

  return <QuizPageClient topics={topicsWithDocs} quizDataByTopic={quizDataByTopic} />;
}
