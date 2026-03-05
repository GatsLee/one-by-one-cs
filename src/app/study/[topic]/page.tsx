import Link from "next/link";
import { getDocsInTopic, TOPIC_LABELS } from "@/lib/content";
import { FileText, ChevronRight, ArrowLeft } from "lucide-react";
import PageTransition, { StaggerList, StaggerItem } from "@/components/motion/PageTransition";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const docs = getDocsInTopic(topic);
  const label = TOPIC_LABELS[topic] || topic;

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto">
        <Link
          href="/study"
          className="inline-flex items-center gap-1 text-sm text-ink-light hover:text-book-blue mb-4 transition-colors"
        >
          <ArrowLeft size={14} />
          학습
        </Link>

        <h1 className="text-3xl font-bold text-ink mb-6 tracking-tight">{label}</h1>

        <StaggerList>
          <div className="grid gap-2">
            {docs.map((doc, i) => (
              <StaggerItem key={doc.slug}>
                <Link
                  href={`/study/${topic}/${doc.slug}`}
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/60 border border-ink/5 hover:bg-white/80 hover:border-ink/15 hover:shadow-sm transition-all group paper-texture"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-paper-dark text-ink-light text-xs font-mono border border-ink/10">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-medium text-ink group-hover:text-book-blue transition-colors">
                      {doc.title}
                    </h2>
                  </div>
                  <FileText size={16} className="text-ink-light/50" />
                  <ChevronRight size={16} className="text-ink-light/50 group-hover:text-book-blue transition-colors" />
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerList>
      </div>
    </PageTransition>
  );
}
