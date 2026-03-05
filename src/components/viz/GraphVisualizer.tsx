"use client";

import { useState, useMemo } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import AnimationControls from "./controls/AnimationControls";
import { useAnimationStepper } from "./controls/useAnimationStepper";

interface GraphVisualizerProps {
  nodes?: { id: string; label: string; x?: number; y?: number }[];
  edges?: { source: string; target: string; weight?: number }[];
  directed?: boolean;
}

function bfs(
  adjList: Map<string, string[]>,
  startNode: string
): string[] {
  const visited = new Set<string>();
  const order: string[] = [];
  const queue = [startNode];
  visited.add(startNode);

  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);
    for (const neighbor of adjList.get(node) || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}

function dfs(
  adjList: Map<string, string[]>,
  startNode: string
): string[] {
  const visited = new Set<string>();
  const order: string[] = [];

  function visit(node: string) {
    if (visited.has(node)) return;
    visited.add(node);
    order.push(node);
    for (const neighbor of adjList.get(node) || []) {
      visit(neighbor);
    }
  }

  visit(startNode);
  return order;
}

const DEFAULT_NODES = [
  { id: "A", label: "A", x: 100, y: 50 },
  { id: "B", label: "B", x: 250, y: 50 },
  { id: "C", label: "C", x: 400, y: 50 },
  { id: "D", label: "D", x: 100, y: 200 },
  { id: "E", label: "E", x: 250, y: 200 },
  { id: "F", label: "F", x: 400, y: 200 },
];

const DEFAULT_EDGES = [
  { source: "A", target: "B" },
  { source: "A", target: "D" },
  { source: "B", target: "C" },
  { source: "B", target: "E" },
  { source: "C", target: "F" },
  { source: "D", target: "E" },
  { source: "E", target: "F" },
];

export default function GraphVisualizer({
  nodes: propNodes = DEFAULT_NODES,
  edges: propEdges = DEFAULT_EDGES,
  directed = false,
}: GraphVisualizerProps) {
  const [algorithm, setAlgorithm] = useState<"bfs" | "dfs">("bfs");
  const [startNode, setStartNode] = useState(propNodes[0]?.id || "A");
  const [traversalOrder, setTraversalOrder] = useState<string[]>([]);

  const adjList = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const n of propNodes) map.set(n.id, []);
    for (const e of propEdges) {
      map.get(e.source)?.push(e.target);
      if (!directed) map.get(e.target)?.push(e.source);
    }
    return map;
  }, [propNodes, propEdges, directed]);

  const stepper = useAnimationStepper(traversalOrder.length);

  const highlightedNodes = useMemo(() => {
    const set = new Set<string>();
    for (let i = 0; i <= stepper.step; i++) {
      if (traversalOrder[i]) set.add(traversalOrder[i]);
    }
    return set;
  }, [stepper.step, traversalOrder]);

  const currentNode = stepper.step >= 0 ? traversalOrder[stepper.step] : null;

  const flowNodes: Node[] = propNodes.map((n) => ({
    id: n.id,
    position: { x: n.x || 0, y: n.y || 0 },
    data: { label: n.label },
    style: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: n.id === currentNode
        ? "#1e2b42"
        : highlightedNodes.has(n.id)
        ? "#3a5fa6"
        : "#fdfbf7",
      border: highlightedNodes.has(n.id)
        ? "2px solid #3a5fa6"
        : "2px solid #b0a08b",
      color: highlightedNodes.has(n.id) ? "#fdfbf7" : "#2b2b2b",
      fontSize: "14px",
      fontWeight: "bold",
    },
  }));

  const flowEdges: Edge[] = propEdges.map((e, i) => ({
    id: `e-${i}`,
    source: e.source,
    target: e.target,
    label: e.weight !== undefined ? String(e.weight) : undefined,
    type: directed ? "default" : "straight",
    style: { stroke: "#b0a08b" },
    labelStyle: { fill: "#5e5e5e", fontSize: 12 },
  }));

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(flowNodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(flowEdges);

  useMemo(() => {
    setRfNodes(flowNodes);
    setRfEdges(flowEdges);
  }, [flowNodes, flowEdges, setRfNodes, setRfEdges]);

  const runAlgorithm = () => {
    const order = algorithm === "bfs"
      ? bfs(adjList, startNode)
      : dfs(adjList, startNode);
    setTraversalOrder(order);
    stepper.reset();
  };

  return (
    <div className="my-6 rounded-lg bg-white/60 border border-ink/10 overflow-hidden paper-texture">
      <div className="p-3 border-b border-ink/10 flex flex-wrap items-center gap-2">
        <span className="text-sm font-serif font-semibold text-ink">그래프</span>

        <div className="flex gap-1 ml-auto">
          {(["bfs", "dfs"] as const).map((alg) => (
            <button
              key={alg}
              onClick={() => setAlgorithm(alg)}
              className={`px-2 py-1 text-xs rounded uppercase font-mono transition-colors ${
                algorithm === alg
                  ? "bg-ink text-paper"
                  : "bg-paper-dark text-ink-light hover:text-ink border border-ink/10"
              }`}
            >
              {alg}
            </button>
          ))}
        </div>

        <select
          value={startNode}
          onChange={(e) => setStartNode(e.target.value)}
          className="px-2 py-1 text-sm rounded bg-white/80 border border-ink/15 text-ink font-mono"
        >
          {propNodes.map((n) => (
            <option key={n.id} value={n.id}>
              시작: {n.label}
            </option>
          ))}
        </select>

        <button
          onClick={runAlgorithm}
          className="px-3 py-1 text-sm bg-ink hover:bg-book-charcoal text-paper rounded shadow-sm"
        >
          실행
        </button>
      </div>

      {traversalOrder.length > 0 && (
        <div className="px-3 py-2 border-b border-ink/10 flex items-center gap-3">
          <AnimationControls
            isPlaying={stepper.isPlaying}
            onPlay={stepper.play}
            onPause={stepper.pause}
            onStep={stepper.stepForward}
            onReset={stepper.reset}
            speed={stepper.speed}
            onSpeedChange={stepper.setSpeed}
            disabled={stepper.isComplete}
          />
          <div className="text-xs text-ink-light font-mono">
            순서: {traversalOrder.slice(0, stepper.step + 1).join(" → ")}
          </div>
        </div>
      )}

      <div style={{ height: 350 }}>
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          proOptions={{ hideAttribution: true }}
          style={{ background: "#fbf8f3" }}
        >
          <Background color="#e5e0d8" gap={20} />
          <Controls
            showInteractive={false}
            style={{ background: "#f4efe6", border: "1px solid #d4c5b0" }}
          />
        </ReactFlow>
      </div>
    </div>
  );
}
