"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen, Home, Zap, FileText, Brain, Search, Workflow, HelpCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/theme/ThemeToggle";
import AIAssistant from "@/components/assistant/AIAssistant";
import Module1WhyRAG from "@/components/modules/Module1WhyRAG";
import Module2Chunking from "@/components/modules/Module2Chunking";
import Module3Embeddings from "@/components/modules/Module3Embeddings";
import Module4VectorSearch from "@/components/modules/Module4VectorSearch";
import Module5FullPipeline from "@/components/modules/Module5FullPipeline";
import Module6Quiz from "@/components/modules/Module6Quiz";

const slideConfig = [
  { id: "why-rag", num: "01", title: "Why RAG?", icon: Zap, component: Module1WhyRAG, duration: "7m" },
  { id: "document-processing", num: "02", title: "Chunking", icon: FileText, component: Module2Chunking, duration: "8m" },
  { id: "embeddings", num: "03", title: "Vector Space", icon: Brain, component: Module3Embeddings, duration: "8m" },
  { id: "vector-search", num: "04", title: "Vector Search", icon: Search, component: Module4VectorSearch, duration: "8m" },
  { id: "full-pipeline", num: "05", title: "Pipeline Studio", icon: Workflow, component: Module5FullPipeline, duration: "10m" },
  { id: "quiz", num: "06", title: "Assessment", icon: HelpCircle, component: Module6Quiz, duration: "4m" },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 140 : -140,
    opacity: 0,
    filter: "blur(2px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 30 },
      opacity: { duration: 0.24 },
      filter: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 140 : -140,
    opacity: 0,
    filter: "blur(2px)",
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 30 },
      opacity: { duration: 0.18 },
      filter: { duration: 0.15 },
    },
  }),
};

interface CourseSliderProps {
  initialSlide?: number;
}

export default function CourseSlider({ initialSlide = 0 }: CourseSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [direction, setDirection] = useState(0);

  const goToSlide = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= slideConfig.length || newIndex === currentSlide) return;
    setDirection(newIndex > currentSlide ? 1 : -1);
    setCurrentSlide(newIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    if (currentSlide < slideConfig.length - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  // Keyboard navigation: Left / Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const activeModule = slideConfig[currentSlide];
  const ActiveComponent = activeModule.component;
  const prevModule = currentSlide > 0 ? slideConfig[currentSlide - 1] : null;
  const nextModule = currentSlide < slideConfig.length - 1 ? slideConfig[currentSlide + 1] : null;
  const progressPercent = Math.round(((currentSlide + 1) / slideConfig.length) * 100);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0D0E11] text-[#191919] dark:text-[#F3F4F6] flex flex-col selection:bg-[#EF3837] selection:text-white transition-colors duration-200">
      {/* Floating Glass Course Navigation Bar with Round Corners */}
      <header className="fixed top-4 inset-x-0 z-40 max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 pointer-events-none">
        <div className="bg-white/85 dark:bg-[#15181C]/85 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800 rounded-2xl shadow-lg shadow-black/[0.03] px-4 sm:px-6 h-14 flex items-center justify-between pointer-events-auto">
          {/* Left: Brand / Home Link */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-mono font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
              title="Return to home page"
            >
              <div className="w-6 h-6 rounded-md bg-[#EF3837] text-white flex items-center justify-center font-bold text-xs tracking-tight group-hover:scale-105 transition-transform shadow-2xs">
                R
              </div>
              <span className="font-extrabold text-sm tracking-tight text-[#191919] dark:text-white">RAG Studio</span>
            </Link>
            <span className="text-gray-300 dark:text-gray-750 hidden sm:inline">/</span>
            <span className="text-xs font-mono text-[#EF3837] font-bold">
              SLIDE {activeModule.num} OF 06
            </span>
          </div>

          {/* Right: Theme Toggle & Overview Home Link */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-all shadow-2xs"
            >
              <Home size={13} className="text-gray-500 dark:text-gray-400" />
              <span className="hidden sm:inline">Overview</span>
            </Link>
          </div>
        </div>

        {/* Micro Progress Bar */}
        <div className="h-0.5 bg-gray-200/50 dark:bg-gray-800/50 w-[95%] mx-auto overflow-hidden rounded-full mt-1">
          <div
            className="h-full bg-[#EF3837] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Slide Stage with Horizontal Animation */}
      <main className="flex-1 relative overflow-hidden pt-24 pb-12 px-2 sm:px-16 lg:px-24 xl:px-28">
        {/* Floating Collapsible Reddish Side Navigation Buttons (Hover reveals name) */}
        {prevModule && (
          <button
            onClick={prevSlide}
            className="fixed left-3 lg:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full sm:rounded-2xl bg-[#EF3837] hover:bg-[#D92D20] text-white border border-[#EF3837] shadow-lg shadow-[#EF3837]/25 hover:shadow-xl hover:shadow-[#EF3837]/40 transition-all duration-300 hover:scale-105 flex items-center gap-2 group backdrop-blur-sm cursor-pointer overflow-hidden"
            title={`Previous: ${prevModule.title}`}
          >
            <ChevronLeft size={20} className="shrink-0 group-hover:-translate-x-0.5 transition-transform" />
            <div className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-out text-left leading-tight pr-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-white/80 block">Prev</span>
              <span className="font-bold text-xs text-white block">{prevModule.title}</span>
            </div>
          </button>
        )}

        {nextModule ? (
          <button
            onClick={nextSlide}
            className="fixed right-3 lg:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full sm:rounded-2xl bg-[#EF3837] hover:bg-[#D92D20] text-white border border-[#EF3837] shadow-lg shadow-[#EF3837]/25 hover:shadow-xl hover:shadow-[#EF3837]/40 transition-all duration-300 hover:scale-105 flex items-center gap-2 group backdrop-blur-sm cursor-pointer overflow-hidden"
            title={`Next: ${nextModule.title}`}
          >
            <div className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-out text-right leading-tight pl-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-white/80 block">Next</span>
              <span className="font-bold text-xs text-white block">{nextModule.title}</span>
            </div>
            <ChevronRight size={20} className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ) : (
          <Link
            href="/"
            className="fixed right-3 lg:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full sm:rounded-2xl bg-[#EF3837] hover:bg-[#D92D20] text-white border border-[#EF3837] shadow-lg shadow-[#EF3837]/25 hover:shadow-xl hover:shadow-[#EF3837]/40 transition-all duration-300 hover:scale-105 flex items-center gap-2 group backdrop-blur-sm overflow-hidden"
            title="Complete course and return to home"
          >
            <div className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-out text-right leading-tight pl-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-white/80 block">Complete</span>
              <span className="font-bold text-xs text-white block">Finish Course</span>
            </div>
            <CheckCircle2 size={20} className="shrink-0" />
          </Link>
        )}

        {/* Animated Horizontal Slide Container */}
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* AI Assistant Floating Helper */}
      <AIAssistant currentSlide={currentSlide} />
    </div>
  );
}
