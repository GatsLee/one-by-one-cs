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
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-4">
          한번에 하나씩, <span className="text-book-blue">CS</span>
        </h1>
        <p className="text-ink-light text-lg max-w-xl">
          복잡해 보이는 컴퓨터 과학도 올바른 순서대로 밟아가면 쉽습니다.
          당신의 여정을 선택하고 학습을 시작해보세요.
        </p>
      </header>

      <LearningRoadmap />
    </motion.div>
  );
}
