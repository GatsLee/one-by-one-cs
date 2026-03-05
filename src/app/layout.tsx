import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import MainContent from "@/components/layout/MainContent";
import StudentProvider from "@/components/layout/StudentProvider";

export const metadata: Metadata = {
  title: "한번에 하나씩 CS",
  description: "한번에 하나씩, 컴퓨터 과학 핵심 개념을 쉽게 배우는 학습 플랫폼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-paper text-ink font-display min-h-screen selection:bg-wood selection:text-ink">
        <StudentProvider>
          <Sidebar />
          <MainContent>{children}</MainContent>
        </StudentProvider>
      </body>
    </html>
  );
}
