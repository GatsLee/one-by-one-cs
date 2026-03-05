"use client";

import { useMemo } from "react";
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

interface ArchitectureDiagramProps {
  type?: "load-balancer" | "cache" | "microservices" | "mq";
}

const nodeStyle = (color: string) => ({
  background: color,
  border: `2px solid ${color}88`,
  color: "#fdfbf7",
  borderRadius: "8px",
  padding: "8px 16px",
  fontSize: "12px",
  fontWeight: "bold" as const,
});

const DIAGRAMS: Record<string, { nodes: Node[]; edges: Edge[] }> = {
  "load-balancer": {
    nodes: [
      { id: "client", position: { x: 250, y: 0 }, data: { label: "Client" }, style: nodeStyle("#5e5e5e") },
      { id: "lb", position: { x: 250, y: 100 }, data: { label: "Load Balancer" }, style: nodeStyle("#3a5fa6") },
      { id: "s1", position: { x: 100, y: 220 }, data: { label: "Server 1" }, style: nodeStyle("#3a8f5a") },
      { id: "s2", position: { x: 250, y: 220 }, data: { label: "Server 2" }, style: nodeStyle("#3a8f5a") },
      { id: "s3", position: { x: 400, y: 220 }, data: { label: "Server 3" }, style: nodeStyle("#3a8f5a") },
      { id: "db", position: { x: 250, y: 340 }, data: { label: "Database" }, style: nodeStyle("#634e3b") },
    ],
    edges: [
      { id: "e1", source: "client", target: "lb", animated: true, style: { stroke: "#3a5fa6" } },
      { id: "e2", source: "lb", target: "s1", style: { stroke: "#b0a08b" } },
      { id: "e3", source: "lb", target: "s2", style: { stroke: "#b0a08b" } },
      { id: "e4", source: "lb", target: "s3", style: { stroke: "#b0a08b" } },
      { id: "e5", source: "s1", target: "db", style: { stroke: "#b0a08b" } },
      { id: "e6", source: "s2", target: "db", style: { stroke: "#b0a08b" } },
      { id: "e7", source: "s3", target: "db", style: { stroke: "#b0a08b" } },
    ],
  },
  cache: {
    nodes: [
      { id: "client", position: { x: 250, y: 0 }, data: { label: "Client" }, style: nodeStyle("#5e5e5e") },
      { id: "server", position: { x: 250, y: 100 }, data: { label: "App Server" }, style: nodeStyle("#3a8f5a") },
      { id: "cache", position: { x: 450, y: 100 }, data: { label: "Redis Cache" }, style: nodeStyle("#a63a3a") },
      { id: "db", position: { x: 250, y: 220 }, data: { label: "Database" }, style: nodeStyle("#634e3b") },
      { id: "cdn", position: { x: 50, y: 50 }, data: { label: "CDN" }, style: nodeStyle("#1e2b42") },
    ],
    edges: [
      { id: "e1", source: "client", target: "server", animated: true, style: { stroke: "#3a5fa6" } },
      { id: "e2", source: "client", target: "cdn", style: { stroke: "#1e2b42" }, label: "정적 자원" },
      { id: "e3", source: "server", target: "cache", animated: true, style: { stroke: "#a63a3a" }, label: "캐시 조회" },
      { id: "e4", source: "server", target: "db", style: { stroke: "#b0a08b" }, label: "캐시 미스" },
    ],
  },
  microservices: {
    nodes: [
      { id: "gateway", position: { x: 250, y: 0 }, data: { label: "API Gateway" }, style: nodeStyle("#3a5fa6") },
      { id: "auth", position: { x: 50, y: 120 }, data: { label: "Auth Service" }, style: nodeStyle("#3a8f5a") },
      { id: "user", position: { x: 200, y: 120 }, data: { label: "User Service" }, style: nodeStyle("#3a8f5a") },
      { id: "order", position: { x: 350, y: 120 }, data: { label: "Order Service" }, style: nodeStyle("#3a8f5a") },
      { id: "pay", position: { x: 500, y: 120 }, data: { label: "Payment" }, style: nodeStyle("#3a8f5a") },
      { id: "db1", position: { x: 50, y: 250 }, data: { label: "Auth DB" }, style: nodeStyle("#634e3b") },
      { id: "db2", position: { x: 200, y: 250 }, data: { label: "User DB" }, style: nodeStyle("#634e3b") },
      { id: "db3", position: { x: 350, y: 250 }, data: { label: "Order DB" }, style: nodeStyle("#634e3b") },
      { id: "mq", position: { x: 420, y: 190 }, data: { label: "Message Queue" }, style: nodeStyle("#a63a3a") },
    ],
    edges: [
      { id: "e1", source: "gateway", target: "auth", style: { stroke: "#b0a08b" } },
      { id: "e2", source: "gateway", target: "user", style: { stroke: "#b0a08b" } },
      { id: "e3", source: "gateway", target: "order", style: { stroke: "#b0a08b" } },
      { id: "e4", source: "auth", target: "db1", style: { stroke: "#b0a08b" } },
      { id: "e5", source: "user", target: "db2", style: { stroke: "#b0a08b" } },
      { id: "e6", source: "order", target: "db3", style: { stroke: "#b0a08b" } },
      { id: "e7", source: "order", target: "mq", animated: true, style: { stroke: "#a63a3a" } },
      { id: "e8", source: "mq", target: "pay", animated: true, style: { stroke: "#a63a3a" } },
    ],
  },
  mq: {
    nodes: [
      { id: "p1", position: { x: 0, y: 50 }, data: { label: "Producer 1" }, style: nodeStyle("#3a5fa6") },
      { id: "p2", position: { x: 0, y: 150 }, data: { label: "Producer 2" }, style: nodeStyle("#3a5fa6") },
      { id: "mq", position: { x: 200, y: 100 }, data: { label: "Message Queue" }, style: nodeStyle("#a63a3a") },
      { id: "c1", position: { x: 400, y: 30 }, data: { label: "Consumer 1" }, style: nodeStyle("#3a8f5a") },
      { id: "c2", position: { x: 400, y: 110 }, data: { label: "Consumer 2" }, style: nodeStyle("#3a8f5a") },
      { id: "c3", position: { x: 400, y: 190 }, data: { label: "Consumer 3" }, style: nodeStyle("#3a8f5a") },
    ],
    edges: [
      { id: "e1", source: "p1", target: "mq", animated: true, style: { stroke: "#3a5fa6" } },
      { id: "e2", source: "p2", target: "mq", animated: true, style: { stroke: "#3a5fa6" } },
      { id: "e3", source: "mq", target: "c1", animated: true, style: { stroke: "#3a8f5a" } },
      { id: "e4", source: "mq", target: "c2", animated: true, style: { stroke: "#3a8f5a" } },
      { id: "e5", source: "mq", target: "c3", animated: true, style: { stroke: "#3a8f5a" } },
    ],
  },
};

const LABELS: Record<string, string> = {
  "load-balancer": "로드 밸런서 아키텍처",
  cache: "캐싱 전략",
  microservices: "마이크로서비스 아키텍처",
  mq: "메시지 큐",
};

export default function ArchitectureDiagram({
  type = "load-balancer",
}: ArchitectureDiagramProps) {
  const diagram = DIAGRAMS[type] || DIAGRAMS["load-balancer"];

  const [nodes, , onNodesChange] = useNodesState(diagram.nodes);
  const [edges, , onEdgesChange] = useEdgesState(diagram.edges);

  return (
    <div className="my-6 rounded-lg bg-white/60 border border-ink/10 overflow-hidden paper-texture">
      <div className="p-3 border-b border-ink/10">
        <span className="text-sm font-serif font-semibold text-ink">{LABELS[type] || type}</span>
      </div>

      <div style={{ height: 400 }}>
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
