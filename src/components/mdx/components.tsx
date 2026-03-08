"use client";

import type { MDXComponents } from "mdx/types";
import CodeBlock from "./CodeBlock";
import dynamic from "next/dynamic";

const Mermaid = dynamic(() => import("./MermaidOrFlow"), { ssr: false });
const TreeVisualizer = dynamic(() => import("../viz/TreeVisualizer"), { ssr: false });
const GraphVisualizer = dynamic(() => import("../viz/GraphVisualizer"), { ssr: false });
const LinkedListVisualizer = dynamic(() => import("../viz/LinkedListVisualizer"), { ssr: false });
const StackQueueVisualizer = dynamic(() => import("../viz/StackQueueVisualizer"), { ssr: false });
const SortingVisualizer = dynamic(() => import("../viz/SortingVisualizer"), { ssr: false });
const NetworkDiagram = dynamic(() => import("../viz/NetworkDiagram"), { ssr: false });
const ArchitectureDiagram = dynamic(() => import("../viz/ArchitectureDiagram"), { ssr: false });

export const mdxComponents: MDXComponents = {
  pre: CodeBlock as unknown as React.ComponentType<React.HTMLAttributes<HTMLPreElement>>,
  table: (props) => (
    <div className="overflow-x-auto my-4 rounded-lg border border-ink/10 shadow-sm">
      <table
        className="w-full text-sm border-collapse"
        {...props}
      />
    </div>
  ),
  thead: (props) => (
    <thead className="bg-wood/20 border-b-2 border-wood/30" {...props} />
  ),
  tr: (props) => (
    <tr className="even:bg-ink/[0.03] hover:bg-ink/[0.06] transition-colors" {...props} />
  ),
  th: (props) => (
    <th
      className="px-3 py-2.5 text-left font-semibold text-ink text-xs uppercase tracking-wide border-r border-ink/8 last:border-r-0"
      {...props}
    />
  ),
  td: (props) => (
    <td className="px-3 py-2 text-ink/80 border-r border-ink/5 last:border-r-0 border-t border-ink/8" {...props} />
  ),
  Mermaid,
  TreeVisualizer,
  GraphVisualizer,
  LinkedListVisualizer,
  StackQueueVisualizer,
  SortingVisualizer,
  NetworkDiagram,
  ArchitectureDiagram,
};
