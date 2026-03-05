import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDocContent, TOPIC_LABELS } from "@/lib/content";
import { serializeMDX } from "@/lib/mdx";
import MDXContent from "@/components/mdx/MDXContent";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ topic: string; slug: string }>;
}) {
  const { topic, slug } = await params;
  const doc = getDocContent(topic, slug);
  if (!doc) notFound();

  const mdxSource = await serializeMDX(doc.source);
  const topicLabel = TOPIC_LABELS[topic] || topic;

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href={`/study/${topic}`}
        className="inline-flex items-center gap-1 text-sm text-ink-light hover:text-book-blue mb-4 transition-colors"
      >
        <ArrowLeft size={14} />
        {topicLabel}
      </Link>

      <h1 className="text-3xl font-serif font-bold text-ink mb-8 tracking-tight">{doc.title}</h1>

      <article className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-ink prose-headings:tracking-tight prose-p:text-ink/80 prose-a:text-book-blue prose-a:no-underline hover:prose-a:underline prose-strong:text-ink prose-code:text-book-navy prose-code:bg-paper-dark prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-ink/10 prose-code:before:content-none prose-code:after:content-none prose-li:text-ink/80 prose-blockquote:border-l-wood-dark prose-blockquote:text-ink-light prose-hr:border-ink/10">
        <MDXContent source={mdxSource} />
      </article>
    </div>
  );
}
