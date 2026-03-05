import { getAllTopics, getDocsInTopic } from "@/lib/content";
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  const topics = getAllTopics().map((topic) => ({
    ...topic,
    docs: getDocsInTopic(topic.dirName),
  }));

  return <DashboardClient topics={topics} />;
}
