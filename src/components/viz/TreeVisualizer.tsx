"use client";

import { useState, useMemo, useCallback } from "react";
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

interface TreeVisualizerProps {
  values?: number[];
  type?: "bst" | "heap" | "general";
}

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

function insertBST(root: TreeNode | undefined, value: number): TreeNode {
  if (!root) return { value };
  if (value < root.value) root.left = insertBST(root.left, value);
  else root.right = insertBST(root.right, value);
  return root;
}

function buildBST(values: number[]): TreeNode | undefined {
  let root: TreeNode | undefined;
  for (const v of values) root = insertBST(root, v);
  return root;
}

function insertHeap(arr: number[], value: number): number[] {
  arr = [...arr, value];
  let i = arr.length - 1;
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    if (arr[parent] > arr[i]) {
      [arr[parent], arr[i]] = [arr[i], arr[parent]];
      i = parent;
    } else break;
  }
  return arr;
}

function treeToFlow(
  node: TreeNode | undefined,
  x: number,
  y: number,
  dx: number,
  id: string,
  highlighted: Set<number>,
  nodes: Node[],
  edges: Edge[]
) {
  if (!node) return;

  const isHighlighted = highlighted.has(node.value);
  nodes.push({
    id,
    position: { x, y },
    data: { label: String(node.value) },
    style: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: isHighlighted ? "#3a5fa6" : "#fdfbf7",
      border: isHighlighted ? "2px solid #3a5fa6" : "2px solid #b0a08b",
      color: isHighlighted ? "#fdfbf7" : "#2b2b2b",
      fontSize: "14px",
      fontWeight: "bold",
    },
  });

  if (node.left) {
    const childId = `${id}-l`;
    edges.push({
      id: `e-${id}-${childId}`,
      source: id,
      target: childId,
      style: { stroke: "#b0a08b" },
    });
    treeToFlow(node.left, x - dx, y + 80, dx / 2, childId, highlighted, nodes, edges);
  }
  if (node.right) {
    const childId = `${id}-r`;
    edges.push({
      id: `e-${id}-${childId}`,
      source: id,
      target: childId,
      style: { stroke: "#b0a08b" },
    });
    treeToFlow(node.right, x + dx, y + 80, dx / 2, childId, highlighted, nodes, edges);
  }
}

function heapToFlow(
  arr: number[],
  highlighted: Set<number>
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const positions: { x: number; y: number }[] = [];
  const levels = Math.ceil(Math.log2(arr.length + 1));
  const baseWidth = Math.pow(2, levels) * 50;

  for (let i = 0; i < arr.length; i++) {
    const level = Math.floor(Math.log2(i + 1));
    const posInLevel = i - (Math.pow(2, level) - 1);
    const nodesInLevel = Math.pow(2, level);
    const spacing = baseWidth / nodesInLevel;
    const x = spacing * (posInLevel + 0.5);
    const y = level * 80 + 20;
    positions.push({ x, y });

    const isHighlighted = highlighted.has(arr[i]);
    nodes.push({
      id: `h-${i}`,
      position: { x, y },
      data: { label: String(arr[i]) },
      style: {
        width: 44,
        height: 44,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isHighlighted ? "#3a5fa6" : "#fdfbf7",
        border: isHighlighted ? "2px solid #3a5fa6" : "2px solid #b0a08b",
        color: isHighlighted ? "#fdfbf7" : "#2b2b2b",
        fontSize: "14px",
        fontWeight: "bold",
      },
    });

    if (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      edges.push({
        id: `e-h-${parent}-${i}`,
        source: `h-${parent}`,
        target: `h-${i}`,
        style: { stroke: "#b0a08b" },
      });
    }
  }

  return { nodes, edges };
}

function inorder(node: TreeNode | undefined, result: number[] = []): number[] {
  if (!node) return result;
  inorder(node.left, result);
  result.push(node.value);
  inorder(node.right, result);
  return result;
}

function preorder(node: TreeNode | undefined, result: number[] = []): number[] {
  if (!node) return result;
  result.push(node.value);
  preorder(node.left, result);
  preorder(node.right, result);
  return result;
}

function levelOrder(node: TreeNode | undefined): number[] {
  if (!node) return [];
  const result: number[] = [];
  const queue: TreeNode[] = [node];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    result.push(curr.value);
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
  }
  return result;
}

export default function TreeVisualizer({
  values = [50, 30, 70, 20, 40, 60, 80],
  type = "bst",
}: TreeVisualizerProps) {
  const [inputValue, setInputValue] = useState("");
  const [treeValues, setTreeValues] = useState(values);
  const [traversalOrder, setTraversalOrder] = useState<number[]>([]);
  const [traversalType, setTraversalType] = useState<string>("");

  const stepper = useAnimationStepper(traversalOrder.length);

  const highlighted = useMemo(() => {
    const set = new Set<number>();
    for (let i = 0; i <= stepper.step; i++) {
      if (traversalOrder[i] !== undefined) set.add(traversalOrder[i]);
    }
    return set;
  }, [stepper.step, traversalOrder]);

  const { flowNodes, flowEdges } = useMemo(() => {
    if (type === "heap") {
      const arr: number[] = [];
      for (const v of treeValues) insertHeap(arr, v);
      const { nodes, edges } = heapToFlow(
        treeValues.length > 0 ? treeValues.reduce((a, v) => insertHeap(a, v), [] as number[]) : [],
        highlighted
      );
      return { flowNodes: nodes, flowEdges: edges };
    }

    const root = buildBST(treeValues);
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    treeToFlow(root, 300, 20, 150, "root", highlighted, nodes, edges);
    return { flowNodes: nodes, flowEdges: edges };
  }, [treeValues, highlighted, type]);

  const [nodes, setNodes, onNodesChange] = useNodesState(flowNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowEdges);

  useMemo(() => {
    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [flowNodes, flowEdges, setNodes, setEdges]);

  const handleInsert = () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) return;
    setTreeValues((prev) => [...prev, num]);
    setInputValue("");
    stepper.reset();
    setTraversalOrder([]);
  };

  const startTraversal = (tType: string) => {
    const root = buildBST(treeValues);
    let order: number[] = [];
    if (tType === "inorder") order = inorder(root);
    else if (tType === "preorder") order = preorder(root);
    else if (tType === "level") order = levelOrder(root);
    setTraversalType(tType);
    setTraversalOrder(order);
    stepper.reset();
  };

  return (
    <div className="my-6 rounded-lg bg-white/60 border border-ink/10 overflow-hidden paper-texture">
      <div className="p-3 border-b border-ink/10 flex flex-wrap items-center gap-2">
        <span className="text-sm font-serif font-semibold text-ink">
          {type === "bst" ? "이진 탐색 트리" : type === "heap" ? "힙" : "트리"}
        </span>

        <div className="flex items-center gap-1 ml-auto">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleInsert()}
            placeholder="값 입력"
            className="w-20 px-2 py-1 text-sm rounded bg-white/80 border border-ink/15 text-ink font-mono"
          />
          <button
            onClick={handleInsert}
            className="px-2 py-1 text-sm bg-ink hover:bg-book-charcoal text-paper rounded shadow-sm"
          >
            삽입
          </button>
        </div>

        {type === "bst" && (
          <div className="flex gap-1">
            {[
              { label: "전위", key: "preorder" },
              { label: "중위", key: "inorder" },
              { label: "레벨", key: "level" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => startTraversal(t.key)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  traversalType === t.key
                    ? "bg-ink text-paper"
                    : "bg-paper-dark text-ink-light hover:text-ink border border-ink/10"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {traversalOrder.length > 0 && (
        <div className="px-3 py-2 border-b border-ink/10">
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
        </div>
      )}

      <div style={{ height: 350 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
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
