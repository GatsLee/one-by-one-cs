"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface Props {
  content: string;
}

export default function MarkdownMessage({ content }: Props) {
  return (
    <div className="prose prose-sm max-w-none text-ink
      prose-headings:text-ink prose-headings:font-semibold
      prose-p:leading-relaxed prose-p:my-1.5
      prose-code:text-ink prose-code:bg-ink/8 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono
      prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-ink/5 prose-pre:border prose-pre:border-ink/10 prose-pre:rounded-lg prose-pre:text-xs
      prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5
      prose-strong:text-ink prose-strong:font-semibold
      prose-blockquote:border-ink/20 prose-blockquote:text-ink/70
      prose-a:text-ink prose-a:underline prose-a:underline-offset-2
      prose-hr:border-ink/10"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
