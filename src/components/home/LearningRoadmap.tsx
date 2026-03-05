"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useRouter } from "next/navigation";

// Phase grouping colors
const PHASE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  foundation: { bg: "#3a5fa6", border: "#3a5fa688", text: "#fdfbf7" },
  system: { bg: "#3a8f5a", border: "#3a8f5a88", text: "#fdfbf7" },
  applied: { bg: "#a63a3a", border: "#a63a3a88", text: "#fdfbf7" },
  advanced: { bg: "#1e2b42", border: "#1e2b4288", text: "#fdfbf7" },
};

const phaseLabel = (phase: string, bg: string) => ({
  style: {
    background: bg + "18",
    border: `1.5px dashed ${bg}55`,
    borderRadius: "10px",
    padding: "8px 14px",
    fontSize: "11px",
    fontWeight: 700,
    color: bg,
    letterSpacing: "0.05em",
  },
});

const nodeStyle = (phase: string) => {
  const c = PHASE_COLORS[phase];
  return {
    background: c.bg,
    border: `2px solid ${c.border}`,
    color: c.text,
    borderRadius: "10px",
    padding: "10px 18px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "box-shadow 0.2s, transform 0.2s",
  };
};

const NODES: Node[] = [
  // Phase labels
  {
    id: "phase-1",
    position: { x: 20, y: 0 },
    data: { label: "PHASE 1 — CS 기초 체력" },
    selectable: false,
    draggable: false,
    ...phaseLabel("foundation", PHASE_COLORS.foundation.bg),
  },
  {
    id: "phase-2",
    position: { x: 20, y: 230 },
    data: { label: "PHASE 2 — 시스템 이해" },
    selectable: false,
    draggable: false,
    ...phaseLabel("system", PHASE_COLORS.system.bg),
  },
  {
    id: "phase-3",
    position: { x: 20, y: 460 },
    data: { label: "PHASE 3 — 실전 응용" },
    selectable: false,
    draggable: false,
    ...phaseLabel("applied", PHASE_COLORS.applied.bg),
  },
  {
    id: "phase-4",
    position: { x: 20, y: 680 },
    data: { label: "PHASE 4 — 전문 영역" },
    selectable: false,
    draggable: false,
    ...phaseLabel("advanced", PHASE_COLORS.advanced.bg),
  },

  // Phase 1: CS Foundations
  {
    id: "01-data-structures",
    position: { x: 220, y: 50 },
    data: { label: "자료구조" },
    style: nodeStyle("foundation"),
  },
  {
    id: "02-os",
    position: { x: 520, y: 50 },
    data: { label: "운영체제" },
    style: nodeStyle("foundation"),
  },
  {
    id: "03-network",
    position: { x: 370, y: 140 },
    data: { label: "네트워크" },
    style: nodeStyle("foundation"),
  },

  // Phase 2: System Understanding
  {
    id: "04-database",
    position: { x: 200, y: 290 },
    data: { label: "데이터베이스" },
    style: nodeStyle("system"),
  },
  {
    id: "09-architecture",
    position: { x: 530, y: 290 },
    data: { label: "소프트웨어 아키텍처" },
    style: nodeStyle("system"),
  },

  // Phase 3: Applied
  {
    id: "05-system-design",
    position: { x: 200, y: 510 },
    data: { label: "시스템 설계" },
    style: nodeStyle("applied"),
  },
  {
    id: "07-infra",
    position: { x: 530, y: 510 },
    data: { label: "인프라/DevOps" },
    style: nodeStyle("applied"),
  },

  // Phase 4: Specialization
  {
    id: "06-ai",
    position: { x: 200, y: 730 },
    data: { label: "AI/ML" },
    style: nodeStyle("advanced"),
  },
  {
    id: "08-ai-agent",
    position: { x: 530, y: 730 },
    data: { label: "AI 에이전트" },
    style: nodeStyle("advanced"),
  },
];

const edgeDefaults = {
  type: "smoothstep" as const,
  animated: false,
  style: { stroke: "#b0a08b", strokeWidth: 1.5 },
};

const EDGES: Edge[] = [
  // Phase 1 internal
  { id: "e-ds-os", source: "01-data-structures", target: "02-os", ...edgeDefaults, label: "프로세스 스케줄링에\n자료구조 활용" },
  { id: "e-ds-net", source: "01-data-structures", target: "03-network", ...edgeDefaults },
  { id: "e-os-net", source: "02-os", target: "03-network", ...edgeDefaults, label: "소켓, 프로토콜 스택" },

  // Phase 1 → Phase 2
  { id: "e-ds-db", source: "01-data-structures", target: "04-database", ...edgeDefaults, animated: true, label: "B-Tree 인덱스,\n해시 조인", style: { stroke: "#3a8f5a", strokeWidth: 2 } },
  { id: "e-os-arch", source: "02-os", target: "09-architecture", ...edgeDefaults, animated: true, style: { stroke: "#3a8f5a", strokeWidth: 2 } },
  { id: "e-net-arch", source: "03-network", target: "09-architecture", ...edgeDefaults },

  // Phase 2 → Phase 3
  { id: "e-db-sd", source: "04-database", target: "05-system-design", ...edgeDefaults, animated: true, label: "파티셔닝, 레플리카", style: { stroke: "#a63a3a", strokeWidth: 2 } },
  { id: "e-arch-sd", source: "09-architecture", target: "05-system-design", ...edgeDefaults, animated: true, style: { stroke: "#a63a3a", strokeWidth: 2 } },
  { id: "e-arch-infra", source: "09-architecture", target: "07-infra", ...edgeDefaults, label: "배포 아키텍처" },
  { id: "e-net-infra", source: "03-network", target: "07-infra", ...edgeDefaults },

  // Phase 3 → Phase 4
  { id: "e-sd-ai", source: "05-system-design", target: "06-ai", ...edgeDefaults, animated: true, label: "ML 파이프라인\n설계", style: { stroke: "#1e2b42", strokeWidth: 2 } },
  { id: "e-infra-agent", source: "07-infra", target: "08-ai-agent", ...edgeDefaults, animated: true, style: { stroke: "#1e2b42", strokeWidth: 2 } },
  { id: "e-ai-agent", source: "06-ai", target: "08-ai-agent", ...edgeDefaults, label: "LLM 기반\n에이전트", style: { stroke: "#1e2b42", strokeWidth: 2 } },
];

const TOPIC_ROUTES: Record<string, string> = {
  "01-data-structures": "/study/01-data-structures",
  "02-os": "/study/02-os",
  "03-network": "/study/03-network",
  "04-database": "/study/04-database",
  "05-system-design": "/study/05-system-design",
  "06-ai": "/study/06-ai",
  "07-infra": "/study/07-infra",
  "08-ai-agent": "/study/08-ai-agent",
  "09-architecture": "/study/09-architecture",
};

export default function LearningRoadmap() {
  const router = useRouter();
  const [nodes, , onNodesChange] = useNodesState(NODES);
  const [edges, , onEdgesChange] = useEdgesState(EDGES);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      const route = TOPIC_ROUTES[node.id];
      if (route) {
        router.push(route);
      }
    },
    [router],
  );

  return (
    <div className="w-full rounded-lg bg-white/60 border border-ink/10 overflow-hidden paper-texture">
      <div className="p-4 border-b border-ink/10">
        <h2 className="text-lg font-serif font-bold text-ink">학습 로드맵</h2>
        <p className="text-xs text-ink-light mt-1">
          CS 기초부터 AI 에이전트까지 — 각 단계가 다음 단계의 기반이 됩니다. 노드를 클릭하면 해당 주제로 이동합니다.
        </p>
      </div>
      <div style={{ height: 850 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          proOptions={{ hideAttribution: true }}
          style={{ background: "#fbf8f3" }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
        >
          <Background color="#e5e0d8" gap={24} />
        </ReactFlow>
      </div>
    </div>
  );
}
