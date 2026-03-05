"use client";

import { useSidebar } from "./Sidebar";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <main
      className={`min-h-screen p-6 pt-16 md:pt-8 md:px-12 transition-all duration-200 ${
        collapsed ? "md:ml-16" : "md:ml-60"
      }`}
    >
      {children}
    </main>
  );
}
