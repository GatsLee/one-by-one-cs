"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";

// Singleton: initialize once, render sequentially
let initPromise: Promise<typeof import("mermaid").default> | null = null;
let renderQueue: Promise<void> = Promise.resolve();

function getMermaidApi() {
  if (!initPromise) {
    initPromise = import("mermaid").then((m) => {
      m.default.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "loose",
        themeVariables: {
          primaryColor: "#f4efe6",
          primaryTextColor: "#2b2b2b",
          primaryBorderColor: "#b0a08b",
          lineColor: "#5e5e5e",
          secondaryColor: "#fbf8f3",
          tertiaryColor: "#fdfbf7",
          fontFamily: "Inter, sans-serif",
        },
      });
      return m.default;
    });
  }
  return initPromise;
}

function renderChart(chart: string): Promise<string> {
  // Queue renders so they don't overlap (mermaid manipulates a shared DOM element)
  const job = renderQueue.then(async () => {
    const api = await getMermaidApi();
    const id = `m${Math.random().toString(36).slice(2, 9)}`;
    const { svg } = await api.render(id, chart);
    return svg;
  });
  // Update the queue tail (ignore errors so next render still runs)
  renderQueue = job.then(() => {}, () => {});
  return job;
}

export default function Mermaid({ chart }: { chart: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let cancelled = false;
    renderChart(chart)
      .then((rendered) => {
        if (!cancelled) setSvg(rendered);
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Mermaid error:", err);
          setError(String(err?.message ?? err));
        }
      });
    return () => { cancelled = true; };
  }, [chart]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    setTranslate((p) => ({
      x: p.x + e.clientX - last.current.x,
      y: p.y + e.clientY - last.current.y,
    }));
    last.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerUp = useCallback(() => { dragging.current = false; }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => Math.min(3, Math.max(0.3, s + (e.deltaY > 0 ? -0.1 : 0.1))));
  }, []);

  const reset = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  if (error) {
    return (
      <div className="my-4 rounded-lg border border-book-red/20 bg-book-red/5 p-4">
        <p className="text-sm text-book-red font-medium">다이어그램 렌더링 실패</p>
        <details className="mt-2">
          <summary className="text-xs text-ink-light cursor-pointer">에러 상세</summary>
          <pre className="text-xs text-ink-light mt-1 whitespace-pre-wrap">{error}</pre>
          <pre className="text-xs text-ink-light mt-1 whitespace-pre-wrap bg-ink/5 p-2 rounded">{chart}</pre>
        </details>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-4 flex justify-center items-center p-6 text-ink-light text-sm border border-ink/5 rounded-lg bg-white/40">
        <div className="w-4 h-4 border-2 border-ink-light/30 border-t-ink-light rounded-full animate-spin mr-2" />
        다이어그램 로딩...
      </div>
    );
  }

  return (
    <div className="my-4 rounded-lg border border-ink/10 bg-white/60 overflow-hidden paper-texture">
      <div className="flex items-center justify-end gap-1 px-2 py-1.5 border-b border-ink/5 bg-ink/[0.02]">
        <span className="text-[10px] text-ink-light mr-auto pl-1">드래그: 이동 · 스크롤: 확대/축소</span>
        <button onClick={() => setScale((s) => Math.min(3, s + 0.2))} className="p-1 rounded hover:bg-ink/5 text-ink-light hover:text-ink transition-colors" title="확대"><ZoomIn size={14} /></button>
        <button onClick={() => setScale((s) => Math.max(0.3, s - 0.2))} className="p-1 rounded hover:bg-ink/5 text-ink-light hover:text-ink transition-colors" title="축소"><ZoomOut size={14} /></button>
        <button onClick={reset} className="p-1 rounded hover:bg-ink/5 text-ink-light hover:text-ink transition-colors" title="초기화"><Maximize size={14} /></button>
      </div>
      <div
        ref={wrapperRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing touch-none"
        style={{ minHeight: 120 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onWheel={onWheel}
      >
        <div
          className="flex justify-center p-4"
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: "center center",
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    </div>
  );
}
