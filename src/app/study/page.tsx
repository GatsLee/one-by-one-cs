import Link from "next/link";
import { getAllTopics } from "@/lib/content";
import { BookOpen, ChevronRight } from "lucide-react";
import PageTransition, { StaggerList, StaggerItem } from "@/components/motion/PageTransition";

const TOPIC_COLORS = [
  "bg-book-red", "bg-book-blue", "bg-book-green", "bg-book-charcoal",
  "bg-book-umber", "bg-book-navy", "bg-book-red", "bg-book-blue", "bg-book-green",
];

export default function StudyPage() {
  const topics = getAllTopics();

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-ink mb-6 tracking-tight">학습</h1>

        <StaggerList>
          <div className="grid gap-3">
            {topics.map((topic, i) => (
              <StaggerItem key={topic.dirName}>
                <Link
                  href={`/study/${topic.dirName}`}
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/60 border border-ink/5 hover:bg-white/80 hover:border-ink/15 hover:shadow-sm transition-all group paper-texture"
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-sm ${TOPIC_COLORS[i % TOPIC_COLORS.length]} text-white text-xs font-mono font-bold shadow-sm`}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-ink group-hover:text-book-blue transition-colors">
                      {topic.label}
                    </h2>
                    <p className="text-sm text-ink-light">{topic.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-ink-light">
                    <BookOpen size={14} />
                    {topic.docCount}문서
                    <ChevronRight size={16} className="text-ink-light/50 group-hover:text-book-blue transition-colors" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerList>
      </div>
    </PageTransition>
  );
}
