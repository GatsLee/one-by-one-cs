"use client";

import { useMemo } from "react";
import {
  ReactFlow,
  type Node,
  type Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  parseMermaidFlowchart,
  autoLayout,
  type ParsedNode,
  type ParsedEdge,
} from "@/lib/mermaid-parser";

interface InteractiveFlowchartProps {
  chart: string;
}

function nodeStyle(
  parsed: ParsedNode,
): React.CSSProperties {
  const base: React.CSSProperties = {
    background: "#fdfbf7",
    border: "2px solid #b0a08b",
    color: "#2b2b2b",
    borderRadius: "8px",
    padding: "8px 14px",
    fontSize: "12px",
    fontWeight: 600,
    textAlign: "center" as const,
    lineHeight: "1.5",
    whiteSpace: "pre-wrap" as const,
    minWidth: 60,
    maxWidth: 200,
  };

  // Apply shape-specific styling
  switch (parsed.shape) {
    case "diamond":
      base.borderRadius = "4px";
      base.transform = "rotate(45deg)";
      base.background = "#f4efe6";
      break;
    case "circle":
      base.borderRadius = "50%";
      base.minWidth = 60;
      base.minHeight = 60;
      base.display = "flex";
      base.alignItems = "center";
      base.justifyContent = "center";
      break;
    case "rounded":
      base.borderRadius = "20px";
      break;
    case "stadium":
      base.borderRadius = "24px";
      base.background = "#f4efe6";
      break;
  }

  // Apply custom Mermaid styles
  if (parsed.style) {
    if (parsed.style.fill) base.background = parsed.style.fill;
    if (parsed.style.stroke) base.borderColor = parsed.style.stroke;
    if (parsed.style.color) base.color = parsed.style.color;
    if (parsed.style["stroke-dasharray"]) {
      base.borderStyle = "dashed";
    }
  }

  return base;
}

function edgeStyle(parsed: ParsedEdge): Partial<Edge> {
  const base: Partial<Edge> = {
    style: { stroke: "#b0a08b", strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#b0a08b" },
  };

  switch (parsed.type) {
    case "dotted":
      base.style = { stroke: "#b0a08b", strokeWidth: 1.5, strokeDasharray: "5 3" };
      break;
    case "thick":
      base.style = { stroke: "#5e5e5e", strokeWidth: 2.5 };
      base.markerEnd = { type: MarkerType.ArrowClosed, color: "#5e5e5e" };
      break;
    case "line":
      base.markerEnd = undefined;
      break;
    case "bidirectional":
      base.markerStart = { type: MarkerType.ArrowClosed, color: "#b0a08b" };
      break;
  }

  return base;
}

export default function InteractiveFlowchart({
  chart,
}: InteractiveFlowchartProps) {
  const { initialNodes, initialEdges } = useMemo(() => {
    const parsed = parseMermaidFlowchart(chart);
    const positions = autoLayout(parsed);
    const posMap = new Map(positions.map((p) => [p.id, p]));

    const rfNodes: Node[] = parsed.nodes.map((n) => {
      const pos = posMap.get(n.id) || { x: 0, y: 0 };
      return {
        id: n.id,
        position: { x: pos.x, y: pos.y },
        data: {
          label: n.shape === "diamond" ? (
            <div style={{ transform: "rotate(-45deg)" }}>{n.label}</div>
          ) : (
            n.label
          ),
        },
        style: nodeStyle(n),
        draggable: true,
      };
    });

    const rfEdges: Edge[] = parsed.edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      label: e.label,
      type: "smoothstep",
      ...edgeStyle(e),
    }));

    return { initialNodes: rfNodes, initialEdges: rfEdges };
  }, [chart]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const height = Math.max(300, Math.min(600, nodes.length * 50 + 100));

  return (
    <div
      className="my-4 rounded-lg border border-ink/10 bg-white/60 overflow-hidden paper-texture"
      style={{ height }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        style={{ background: "#fbf8f3" }}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={true}
        panOnDrag={true}
        minZoom={0.3}
        maxZoom={3}
      >
        <Background color="#e5e0d8" gap={24} />
        <Controls
          showInteractive={false}
          position="top-right"
          style={{ background: "#fdfbf7", border: "1px solid #d4c5b0" }}
        />
      </ReactFlow>
    </div>
  );
}
