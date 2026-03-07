"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  HelpCircle,
  BarChart3,
  Search,
  Settings,
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState, useEffect, createContext, useContext } from "react";

const NAV_ITEMS = [
  { href: "/", label: "홈", icon: Home },
  { href: "/study", label: "학습", icon: BookOpen },
  { href: "/quiz", label: "퀴즈", icon: HelpCircle },
  { href: "/search", label: "AI 검색", icon: Search },
  { href: "/dashboard", label: "대시보드", icon: BarChart3 },
  { href: "/settings", label: "설정", icon: Settings },
];

const STORAGE_KEY = "sidebar-collapsed";

export const SidebarContext = createContext({ collapsed: false });
export function useSidebar() {
  return useContext(SidebarContext);
}

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "true") setCollapsed(true);
  }, []);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(STORAGE_KEY, String(next));
  };

  return (
    <SidebarContext.Provider value={{ collapsed }}>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden rounded-lg bg-paper-dark p-2 text-ink border border-ink/10 shadow-sm"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/30 backdrop-blur-[1px] md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full bg-paper-dark/80 backdrop-blur-sm border-r border-ink/10 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-200 ${
          collapsed ? "w-16" : "w-60"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header */}
        <div className={`border-b border-ink/10 flex items-center ${collapsed ? "p-3 justify-center" : "p-6 gap-3"}`}>
          <div className="w-9 h-9 rounded-full bg-ink flex items-center justify-center text-paper shadow-md shrink-0">
            <BookOpen size={16} />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-sm font-bold tracking-tight text-ink leading-tight">한번에 하나씩 CS</h1>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className={`flex-1 space-y-1 ${collapsed ? "p-2" : "p-4"}`}>
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className={`flex items-center rounded-lg text-sm transition-all ${
                  collapsed
                    ? "justify-center p-2.5"
                    : "gap-3 px-3 py-2.5"
                } ${
                  isActive
                    ? "bg-white/80 border border-ink/10 shadow-sm font-semibold text-ink"
                    : "text-ink-light hover:text-ink hover:bg-white/50"
                }`}
              >
                <item.icon size={18} />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop collapse toggle */}
        <button
          onClick={toggleCollapse}
          className="hidden md:flex items-center justify-center p-3 border-t border-ink/10 text-ink-light hover:text-ink transition-colors"
          title={collapsed ? "사이드바 펼치기" : "사이드바 접기"}
        >
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>
      </aside>
    </SidebarContext.Provider>
  );
}
