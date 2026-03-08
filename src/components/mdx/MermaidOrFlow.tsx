"use client";

import dynamic from "next/dynamic";

const InteractiveFlowchart = dynamic(
  () => import("@/components/viz/InteractiveFlowchart"),
  { ssr: false },
);
const MermaidLegacy = dynamic(() => import("./Mermaid"), { ssr: false });

export default function MermaidOrFlow({ chart }: { chart: string }) {
  if (!chart) return null;

  const firstLine = chart.trim().split("\n")[0].trim().toLowerCase();
  const isFlowchart = /^graph\s+(td|tb|lr|rl|bt)/i.test(firstLine);

  if (isFlowchart) {
    return <InteractiveFlowchart chart={chart} />;
  }

  return <MermaidLegacy chart={chart} />;
}
