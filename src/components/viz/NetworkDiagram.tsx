"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NetworkDiagramProps {
  type?: "osi" | "tcp-ip" | "http-flow";
}

const OSI_LAYERS = [
  { num: 7, name: "Application", kr: "응용 계층", protocols: "HTTP, FTP, SMTP, DNS", color: "bg-book-navy" },
  { num: 6, name: "Presentation", kr: "표현 계층", protocols: "SSL/TLS, JPEG, ASCII", color: "bg-book-blue" },
  { num: 5, name: "Session", kr: "세션 계층", protocols: "NetBIOS, RPC", color: "bg-book-blue/80" },
  { num: 4, name: "Transport", kr: "전송 계층", protocols: "TCP, UDP", color: "bg-book-green" },
  { num: 3, name: "Network", kr: "네트워크 계층", protocols: "IP, ICMP, ARP", color: "bg-book-green/80" },
  { num: 2, name: "Data Link", kr: "데이터링크 계층", protocols: "Ethernet, Wi-Fi, PPP", color: "bg-book-umber" },
  { num: 1, name: "Physical", kr: "물리 계층", protocols: "Cables, Hubs, Signals", color: "bg-book-charcoal" },
];

const TCP_IP_LAYERS = [
  { name: "Application", kr: "응용 계층", protocols: "HTTP, FTP, SMTP, DNS", osi: "5-7", color: "bg-book-navy" },
  { name: "Transport", kr: "전송 계층", protocols: "TCP, UDP", osi: "4", color: "bg-book-green" },
  { name: "Internet", kr: "인터넷 계층", protocols: "IP, ICMP, ARP", osi: "3", color: "bg-book-blue" },
  { name: "Network Access", kr: "네트워크 접근 계층", protocols: "Ethernet, Wi-Fi", osi: "1-2", color: "bg-book-umber" },
];

export default function NetworkDiagram({ type = "osi" }: NetworkDiagramProps) {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(null);
  const [packetPos, setPacketPos] = useState(-1);

  const layers = type === "tcp-ip" ? TCP_IP_LAYERS : OSI_LAYERS;

  const animatePacket = () => {
    setPacketPos(0);
    let pos = 0;
    const interval = setInterval(() => {
      pos++;
      if (pos >= layers.length * 2) {
        clearInterval(interval);
        setPacketPos(-1);
      } else {
        setPacketPos(pos);
      }
    }, 500);
  };

  return (
    <div className="my-6 rounded-lg bg-white/60 border border-ink/10 overflow-hidden paper-texture">
      <div className="p-3 border-b border-ink/10 flex items-center gap-2">
        <span className="text-sm font-serif font-semibold text-ink">
          {type === "tcp-ip" ? "TCP/IP 모델" : "OSI 7계층"}
        </span>
        <button
          onClick={animatePacket}
          disabled={packetPos >= 0}
          className="ml-auto px-3 py-1 text-xs bg-ink hover:bg-book-charcoal text-paper rounded disabled:opacity-50 shadow-sm"
        >
          패킷 전송 애니메이션
        </button>
      </div>

      <div className="p-4 space-y-1">
        <div className="text-xs text-ink-light/50 text-center mb-2 font-mono">← 클릭하여 상세 보기</div>
        {layers.map((layer, idx) => {
          const isExpanded = expandedLayer === idx;
          const isPacketHere =
            packetPos >= 0 &&
            (packetPos === idx || packetPos === layers.length * 2 - 1 - idx);
          const goingDown = packetPos >= 0 && packetPos < layers.length;

          return (
            <div key={idx}>
              <motion.div
                onClick={() => setExpandedLayer(isExpanded ? null : idx)}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                  layer.color
                } ${isPacketHere ? "ring-2 ring-amber-400 ring-offset-1 ring-offset-paper" : ""}`}
                layout
              >
                {"num" in layer && (
                  <span className="text-white/60 text-xs font-mono w-4">{(layer as typeof OSI_LAYERS[0]).num}</span>
                )}
                <span className="font-semibold text-white text-sm">{layer.name}</span>
                <span className="text-white/70 text-xs">({layer.kr})</span>
                <span className="ml-auto text-white/50 text-xs font-mono">{layer.protocols}</span>

                {isPacketHere && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-2 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-xs text-ink font-bold shadow-sm"
                  >
                    {goingDown ? "↓" : "↑"}
                  </motion.div>
                )}
              </motion.div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 mx-2 bg-paper-dark rounded-b-lg text-sm text-ink/80">
                      <p className="font-serif font-semibold text-ink mb-1">{layer.kr}</p>
                      <p className="font-mono text-xs">프로토콜: {layer.protocols}</p>
                      {"osi" in layer && <p className="font-mono text-xs">OSI 계층: {(layer as typeof TCP_IP_LAYERS[0]).osi}</p>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
