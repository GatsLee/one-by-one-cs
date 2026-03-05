"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const LearningRoadmap = dynamic(
  () => import("@/components/home/LearningRoadmap"),
  { ssr: false },
);

export default function HomeClient() {
  return (
    <motion.div
      className="max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ink tracking-tight">한번에 하나씩 CS</h1>
        <p className="text-ink-light mt-1 text-sm">
          한번에 하나씩, 컴퓨터 과학 핵심 개념을 쉽게 배워봅시다.
        </p>
      </div>

      <LearningRoadmap />
    </motion.div>
  );
}
