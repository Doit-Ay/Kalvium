"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Zap,
  FileText,
  Brain,
  Search,
  Workflow,
  HelpCircle,
  Home,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const modules = [
  { href: "/", label: "Home", icon: Home, num: "" },
  { href: "/modules/why-rag", label: "Why RAG?", icon: Zap, num: "01" },
  { href: "/modules/document-processing", label: "Document Processing", icon: FileText, num: "02" },
  { href: "/modules/embeddings", label: "Vector Space", icon: Brain, num: "03" },
  { href: "/modules/vector-search", label: "Vector Search", icon: Search, num: "04" },
  { href: "/modules/full-pipeline", label: "Full Pipeline", icon: Workflow, num: "05" },
  { href: "/modules/quiz", label: "Quiz", icon: HelpCircle, num: "06" },
];

export default function TopNav() {
  const pathname = usePathname();
  const currentIndex = modules.findIndex((m) => m.href === pathname);
  const prev = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const next = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  const progress = currentIndex <= 0 ? 0 : Math.round((currentIndex / (modules.length - 1)) * 100);

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Brand row */}
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-md bg-gray-900 flex items-center justify-center transition-transform group-hover:scale-105">
                <BookOpen size={13} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900 tracking-tight hidden sm:inline">
                RAG Pipeline
              </span>
            </Link>

            {/* Module pills — horizontal scroll */}
            <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide px-2 -mx-2">
              {modules.slice(1).map((mod) => {
                const isActive = pathname === mod.href;
                const Icon = mod.icon;
                return (
                  <Link
                    key={mod.href}
                    href={mod.href}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200
                      ${isActive
                        ? "text-gray-900"
                        : "text-gray-400 hover:text-gray-600"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gray-100 rounded-full"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon size={12} />
                      <span className="hidden lg:inline">{mod.label}</span>
                      <span className="lg:hidden">{mod.num}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Progress */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 shrink-0 ml-3">
              <span>{progress}%</span>
              <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gray-900 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom nav arrows — fixed at bottom */}
      {pathname !== "/" && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-xl border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
            {prev ? (
              <Link
                href={prev.href}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
              >
                <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                <div className="text-left">
                  <span className="text-xs text-gray-400 block leading-none">Previous</span>
                  <span className="font-medium text-xs">{prev.label}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {modules.slice(1).map((mod, i) => (
                <Link key={mod.href} href={mod.href}>
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      mod.href === pathname
                        ? "w-5 h-1.5 bg-gray-900"
                        : i + 1 < currentIndex
                        ? "w-1.5 h-1.5 bg-gray-400"
                        : "w-1.5 h-1.5 bg-gray-200"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {next ? (
              <Link
                href={next.href}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
              >
                <div className="text-right">
                  <span className="text-xs text-gray-400 block leading-none">Next</span>
                  <span className="font-medium text-xs">{next.label}</span>
                </div>
                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      )}
    </>
  );
}
