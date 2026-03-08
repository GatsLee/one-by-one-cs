import Link from "next/link";
import { getAllTopics, TOPIC_GROUPS } from "@/lib/content";
import { BookOpen, ChevronRight } from "lucide-react";
import PageTransition, { StaggerList, StaggerItem } from "@/components/motion/PageTransition";

const GROUP_COLORS: Record<string, string> = {
  "book-blue": "bg-book-blue",
  "book-charcoal": "bg-book-charcoal",
  "book-red": "bg-book-red",
  "book-green": "bg-book-green",
};

const GROUP_BORDER_COLORS: Record<string, string> = {
  "book-blue": "border-l-book-blue",
  "book-charcoal": "border-l-book-charcoal",
  "book-red": "border-l-book-red",
  "book-green": "border-l-book-green",
};

export default function StudyPage() {
  const allTopics = getAllTopics();
  const topicMap = new Map(allTopics.map((t) => [t.dirName, t]));

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-ink mb-2 tracking-tight">학습</h1>
        <p className="text-sm text-ink-light mb-8">
          {TOPIC_GROUPS.length}개 영역 · {allTopics.reduce((sum, t) => sum + t.docCount, 0)}개 문서
        </p>

        <StaggerList>
          <div className="space-y-8">
            {TOPIC_GROUPS.map((group) => {
              const groupTopics = group.topics
                .map((dir) => topicMap.get(dir))
                .filter(Boolean);
              const groupDocCount = groupTopics.reduce(
                (sum, t) => sum + (t?.docCount ?? 0),
                0
              );

              return (
                <StaggerItem key={group.label}>
                  <section className={`border-l-4 ${GROUP_BORDER_COLORS[group.color]} pl-4`}>
                    <div className="flex items-baseline gap-3 mb-3">
                      <h2 className="text-lg font-bold text-ink">{group.label}</h2>
                      <span className="text-xs text-ink-light">
                        {group.desc} · {groupDocCount}문서
                      </span>
                    </div>

                    <div className="grid gap-2">
                      {groupTopics.map((topic) => {
                        if (!topic) return null;
                        return (
                          <Link
                            key={topic.dirName}
                            href={`/study/${topic.dirName}`}
                            className="flex items-center gap-4 p-3.5 rounded-lg bg-white/60 border border-ink/5 hover:bg-white/80 hover:border-ink/15 hover:shadow-sm transition-all group paper-texture"
                          >
                            <div
                              className={`flex items-center justify-center w-9 h-9 rounded-sm ${GROUP_COLORS[group.color]} text-white text-xs font-mono font-bold shadow-sm`}
                            >
                              {topic.docCount}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-ink group-hover:text-book-blue transition-colors text-[15px]">
                                {topic.label}
                              </h3>
                              <p className="text-xs text-ink-light truncate">{topic.desc}</p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-ink-light shrink-0">
                              <BookOpen size={13} />
                              {topic.docCount}
                              <ChevronRight
                                size={15}
                                className="text-ink-light/50 group-hover:text-book-blue transition-colors"
                              />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerList>
      </div>
    </PageTransition>
  );
}
