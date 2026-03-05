"use client";

import type { MDXComponents } from "mdx/types";
import CodeBlock from "./CodeBlock";
import dynamic from "next/dynamic";

const Mermaid = dynamic(() => import("./Mermaid"), { ssr: false });
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
    <div className="overflow-x-auto my-4">
      <table
        className="w-full text-sm border-collapse border border-ink/15"
        {...props}
      />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-ink/15 bg-paper-dark px-3 py-2 text-left font-semibold text-ink"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-ink/15 px-3 py-2 text-ink/80" {...props} />
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
