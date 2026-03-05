"use client";

import { useEffect, useRef, useState } from "react";

export default function Mermaid({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState("");

  useEffect(() => {
    let cancelled = false;
    import("mermaid").then((m) => {
      m.default.initialize({
        startOnLoad: false,
        theme: "base",
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
      const id = `mermaid-${Math.random().toString(36).slice(2)}`;
      m.default.render(id, chart).then(({ svg: rendered }) => {
        if (!cancelled) setSvg(rendered);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [chart]);

  return (
    <div
      ref={containerRef}
      className="my-4 flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
