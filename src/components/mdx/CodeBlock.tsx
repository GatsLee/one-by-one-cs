"use client";

import { useState, ReactNode } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeBlock({
  children,
  ...props
}: {
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const el = document.querySelector("[data-code-target]");
    if (el) {
      navigator.clipboard.writeText(el.textContent || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group my-4">
      <pre
        className="overflow-x-auto rounded-lg bg-[#1e1e2e] border border-ink/10 p-4 text-sm shadow-sm"
        data-code-target=""
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-white/10 text-white/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}
