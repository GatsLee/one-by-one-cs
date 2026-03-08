/**
 * Minimal Mermaid `graph TD/LR` parser.
 * Converts flowchart syntax into React Flow nodes & edges.
 */

export interface ParsedNode {
  id: string;
  label: string;
  shape: "rectangle" | "rounded" | "diamond" | "circle" | "stadium";
  parentSubgraph?: string;
  style?: Record<string, string>;
}

export interface ParsedEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type: "arrow" | "dotted" | "thick" | "line" | "bidirectional";
}

export interface ParsedSubgraph {
  id: string;
  label: string;
}

export interface ParseResult {
  direction: "TD" | "LR";
  nodes: ParsedNode[];
  edges: ParsedEdge[];
  subgraphs: ParsedSubgraph[];
  nodeStyles: Map<string, Record<string, string>>;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#10;/g, "\n")
    .replace(/<br\s*\/?>/g, "\n");
}

// Extract node id + label + shape from declaration like  A["label"]  or  A{label}
const NODE_PATTERNS: {
  regex: RegExp;
  shape: ParsedNode["shape"];
}[] = [
  { regex: /^(\w+)\[\["(.+?)"\]\]/, shape: "stadium" },
  { regex: /^(\w+)\[\[(.+?)\]\]/, shape: "stadium" },
  { regex: /^(\w+)\["(.+?)"\]/, shape: "rectangle" },
  { regex: /^(\w+)\[(.+?)\]/, shape: "rectangle" },
  { regex: /^(\w+)\(\("(.+?)"\)\)/, shape: "circle" },
  { regex: /^(\w+)\(\((.+?)\)\)/, shape: "circle" },
  { regex: /^(\w+)\("(.+?)"\)/, shape: "rounded" },
  { regex: /^(\w+)\((.+?)\)/, shape: "rounded" },
  { regex: /^(\w+)\{"(.+?)"\}/, shape: "diamond" },
  { regex: /^(\w+)\{(.+?)\}/, shape: "diamond" },
];

function parseNodeDecl(token: string): ParsedNode | null {
  const t = token.trim();
  for (const { regex, shape } of NODE_PATTERNS) {
    const m = t.match(regex);
    if (m) {
      return { id: m[1], label: decodeEntities(m[2]), shape };
    }
  }
  // Bare id (e.g. just "A")
  if (/^\w+$/.test(t)) {
    return { id: t, label: t, shape: "rectangle" };
  }
  return null;
}

// Edge patterns: -->, ---,  -.-> , ==>, <-->
const EDGE_RE =
  /^(\S+?)\s+(-->|---|-\.->|==>|<-->|~~~)\s*(?:\|(.+?)\|\s*)?(\S+.*)$/;
const EDGE_LABEL_RE =
  /^(\S+?)\s+(-->|---|-\.->|==>|<-->|~~~)\s*\|(.+?)\|\s*(\S+.*)$/;

function edgeType(
  arrow: string,
): ParsedEdge["type"] {
  switch (arrow) {
    case "-->": return "arrow";
    case "---": return "line";
    case "-.->": return "dotted";
    case "==>": return "thick";
    case "<-->": return "bidirectional";
    case "~~~": return "line";
    default: return "arrow";
  }
}

function parseStyleDirective(
  line: string,
): { nodeId: string; styles: Record<string, string> } | null {
  const m = line.match(/^style\s+(\w+)\s+(.+)$/);
  if (!m) return null;
  const styles: Record<string, string> = {};
  for (const part of m[2].split(",")) {
    const [k, v] = part.split(":").map((s) => s.trim());
    if (k && v) styles[k] = v;
  }
  return { nodeId: m[1], styles };
}

export function parseMermaidFlowchart(chart: string): ParseResult {
  const decoded = decodeEntities(chart);
  const lines = decoded.split("\n").map((l) => l.trim());

  // Determine direction
  const firstLine = lines[0] || "";
  const dirMatch = firstLine.match(/^graph\s+(TD|TB|LR|RL|BT)/i);
  const direction: "TD" | "LR" =
    dirMatch && (dirMatch[1] === "LR" || dirMatch[1] === "RL") ? "LR" : "TD";

  const nodeMap = new Map<string, ParsedNode>();
  const edges: ParsedEdge[] = [];
  const subgraphs: ParsedSubgraph[] = [];
  const nodeStyles = new Map<string, Record<string, string>>();
  const subgraphStack: string[] = [];

  let edgeCounter = 0;

  function ensureNode(id: string) {
    if (!nodeMap.has(id)) {
      nodeMap.set(id, {
        id,
        label: id,
        shape: "rectangle",
        parentSubgraph: subgraphStack[subgraphStack.length - 1],
      });
    }
  }

  function registerNode(n: ParsedNode) {
    const existing = nodeMap.get(n.id);
    if (existing) {
      // Update label/shape if we got a richer declaration
      if (n.label !== n.id) existing.label = n.label;
      if (n.shape !== "rectangle") existing.shape = n.shape;
    } else {
      n.parentSubgraph = subgraphStack[subgraphStack.length - 1];
      nodeMap.set(n.id, n);
    }
  }

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line || line.startsWith("%%")) continue;

    // Subgraph
    const sgMatch = line.match(
      /^subgraph\s+(\w+)\s*\["?(.+?)"?\]$|^subgraph\s+(\w+)\s*\[(.+?)\]$|^subgraph\s+(\w+)$/,
    );
    if (line.startsWith("subgraph ")) {
      const rawSg = line.replace(/^subgraph\s+/, "");
      let sgId: string;
      let sgLabel: string;
      const bracketMatch = rawSg.match(/^(\w+)\s*\["?(.+?)"?\]$/);
      if (bracketMatch) {
        sgId = bracketMatch[1];
        sgLabel = decodeEntities(bracketMatch[2]);
      } else {
        // subgraph name  or  subgraph "name"
        sgId = rawSg.replace(/["'\[\]]/g, "").trim().replace(/\s+/g, "_");
        sgLabel = rawSg.replace(/["'\[\]]/g, "").trim();
      }
      subgraphs.push({ id: sgId, label: sgLabel });
      subgraphStack.push(sgId);
      continue;
    }
    if (line === "end") {
      subgraphStack.pop();
      continue;
    }

    // Style directive
    if (line.startsWith("style ")) {
      const sd = parseStyleDirective(line);
      if (sd) nodeStyles.set(sd.nodeId, sd.styles);
      continue;
    }

    // classDef / class — skip
    if (line.startsWith("classDef ") || line.startsWith("class ")) continue;

    // Try to parse as edge (with optional label)
    const edgeMatch =
      line.match(EDGE_LABEL_RE) || line.match(EDGE_RE);
    if (edgeMatch) {
      const [, srcRaw, arrow, labelOrTarget, targetRaw] = edgeMatch;
      let label: string | undefined;
      let actualTarget: string;
      if (targetRaw) {
        // EDGE_LABEL_RE matched: group3 = label, group4 = target
        if (edgeMatch === line.match(EDGE_LABEL_RE)) {
          label = labelOrTarget;
          actualTarget = targetRaw;
        } else {
          label = labelOrTarget;
          actualTarget = targetRaw;
        }
      } else {
        actualTarget = labelOrTarget || "";
      }

      // Parse source and target nodes (they may have shape declarations)
      const srcNode = parseNodeDecl(srcRaw);
      const tgtNode = parseNodeDecl(actualTarget);

      const srcId = srcNode?.id || srcRaw.trim();
      const tgtId = tgtNode?.id || actualTarget.trim();

      if (srcNode) registerNode(srcNode);
      else ensureNode(srcId);
      if (tgtNode) registerNode(tgtNode);
      else ensureNode(tgtId);

      edges.push({
        id: `e${edgeCounter++}`,
        source: srcId,
        target: tgtId,
        label: label ? decodeEntities(label) : undefined,
        type: edgeType(arrow),
      });
      continue;
    }

    // Standalone node declaration
    const node = parseNodeDecl(line);
    if (node) {
      registerNode(node);
    }
  }

  // Apply styles
  for (const [id, styles] of nodeStyles) {
    const node = nodeMap.get(id);
    if (node) node.style = styles;
  }

  return {
    direction,
    nodes: Array.from(nodeMap.values()),
    edges,
    subgraphs,
    nodeStyles,
  };
}

/**
 * Auto-layout: assign x,y positions based on BFS layers.
 */
export function autoLayout(
  result: ParseResult,
): { id: string; x: number; y: number }[] {
  const { direction, nodes, edges } = result;

  // Build adjacency
  const adj = new Map<string, string[]>();
  const inDegree = new Map<string, number>();
  for (const n of nodes) {
    adj.set(n.id, []);
    inDegree.set(n.id, 0);
  }
  for (const e of edges) {
    adj.get(e.source)?.push(e.target);
    inDegree.set(e.target, (inDegree.get(e.target) || 0) + 1);
  }

  // BFS topological layers
  const layers: string[][] = [];
  const placed = new Set<string>();
  let queue = nodes
    .filter((n) => (inDegree.get(n.id) || 0) === 0)
    .map((n) => n.id);

  // If all nodes have incoming edges (cycle), start from first
  if (queue.length === 0 && nodes.length > 0) {
    queue = [nodes[0].id];
  }

  while (queue.length > 0) {
    layers.push([...queue]);
    for (const id of queue) placed.add(id);
    const next: string[] = [];
    for (const id of queue) {
      for (const child of adj.get(id) || []) {
        if (!placed.has(child) && !next.includes(child)) {
          next.push(child);
        }
      }
    }
    queue = next;
  }

  // Place any remaining unplaced nodes
  for (const n of nodes) {
    if (!placed.has(n.id)) {
      layers.push([n.id]);
      placed.add(n.id);
    }
  }

  const NODE_W = 200;
  const NODE_H = 80;
  const GAP_X = 60;
  const GAP_Y = 40;

  const positions: { id: string; x: number; y: number }[] = [];

  for (let layer = 0; layer < layers.length; layer++) {
    const items = layers[layer];
    for (let idx = 0; idx < items.length; idx++) {
      // Center items within each layer
      const offset = -(items.length - 1) / 2;
      if (direction === "LR") {
        positions.push({
          id: items[idx],
          x: layer * (NODE_W + GAP_X),
          y: (offset + idx) * (NODE_H + GAP_Y),
        });
      } else {
        positions.push({
          id: items[idx],
          x: (offset + idx) * (NODE_W + GAP_X),
          y: layer * (NODE_H + GAP_Y),
        });
      }
    }
  }

  return positions;
}
