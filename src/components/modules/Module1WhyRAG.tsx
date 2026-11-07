"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, MessageSquare, Zap, BookOpen } from "lucide-react";
import WhyRagDiagram from "@/components/modules/diagrams/WhyRagDiagram";
import VideoReferenceCard from "@/components/common/VideoReferenceCard";

const llmProblems = [
  {
    icon: AlertTriangle,
    title: "1. Hallucinations",
    desc: "LLMs generate confident but completely fabricated answers when they don't know the facts.",
    question: "What is TechCorp's refund policy?",
    llmAnswer: "TechCorp offers a 30-day full money-back guarantee on all products with free return shipping.",
    issue: "Sounds plausible, but is 100% fabricated. The model has never seen TechCorp's private policies.",
    ragAnswer: "Refunds are available within 14 days for unopened items only. A 15% restocking fee applies.",
    citation: "TechCorp Policy Handbook, Section 8.1",
  },
  {
    icon: Zap,
    title: "2. Knowledge Cutoff",
    desc: "LLMs only know information up to their pre-training date and are blind to recent events.",
    question: "What is the latest stable version of React?",
    llmAnswer: "The latest version of React is 18.2, released in June 2022.",
    issue: "Outdated. The model's training snapshot froze in the past.",
    ragAnswer: "React 19 is the latest stable version, released with React Server Components support.",
    citation: "Official React Documentation (react.dev)",
  },
  {
    icon: BookOpen,
    title: "3. Private Data",
    desc: "Public LLMs know nothing about your company's internal documents, databases, or Slack threads.",
    question: "How do I submit paid time off (PTO) at our company?",
    llmAnswer: "Generally, you can email HR or ask your manager about the leave request process.",
    issue: "Generic advice that doesn't follow your company's actual workflow.",
    ragAnswer: "Submit requests through BambooHR at least 5 business days in advance. Manager approval required.",
    citation: "Internal Employee Handbook, Section 4.2",
  },
];

export default function Module1WhyRAG() {
  const [activeTab, setActiveTab] = useState(0);
  const problem = llmProblems[activeTab];

  return (
    <div className="max-w-5xl mx-auto py-8 w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#EF3837]/10 text-[#EF3837] border border-[#EF3837]/20 font-bold">
            MODULE 01
          </span>
          <span>ESTIMATED: 5 MINUTES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          Why RAG? The Foundation
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          Large language models lack live memory. RAG fetches verified passages from your documents and injects them directly into the prompt.
        </p>
      </div>

      {/* Animated Architecture Schematic Diagram */}
      <div className="mb-6">
        <WhyRagDiagram />
      </div>

      {/* 3 Core Scenario Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {llmProblems.map((p, i) => {
          const Icon = p.icon;
          return (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === i
                  ? "bg-[#EF3837] text-white shadow-sm"
                  : "bg-white dark:bg-[#15181C] border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1E2228]"
              }`}
            >
              <Icon size={14} />
              <span>{p.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Comparison Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15181C] overflow-hidden shadow-sm mb-6">
        {/* Question Header */}
        <div className="px-5 py-3.5 bg-gray-50 dark:bg-[#181B20] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={14} className="text-[#EF3837]" />
            <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400 uppercase">
              User Question:
            </span>
            <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
              &quot;{problem.question}&quot;
            </span>
          </div>
        </div>

        {/* Side-by-Side Inferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800 p-5 gap-5 md:gap-0">
          {/* Left: Without RAG */}
          <div className="md:pr-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  WITHOUT RAG (PARAMETRIC)
                </span>
                <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded font-bold">
                  UNVERIFIED
                </span>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#181B20] border border-gray-200 dark:border-gray-800 mb-3 min-h-[90px]">
                <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                  {problem.llmAnswer}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200 dark:border-amber-800/50">
              <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>{problem.issue}</span>
            </div>
          </div>

          {/* Right: With RAG */}
          <div className="md:pl-5 pt-4 md:pt-0 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  WITH RAG (GROUNDED)
                </span>
                <span className="text-[10px] font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded font-bold">
                  100% FACTUAL
                </span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 mb-3 min-h-[90px]">
                <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 leading-relaxed">
                  {problem.ragAnswer}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-100/60 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700/50 text-xs">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-emerald-900 dark:text-emerald-300 mb-0.5">
                <CheckCircle size={13} className="text-emerald-700 dark:text-emerald-400" />
                <span>GROUNDED WITH INLINE CITATION</span>
              </div>
              <p className="text-emerald-950 dark:text-emerald-200 font-mono text-[11px] truncate">
                {problem.citation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clean 1-Line Key Takeaway */}
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#15181C] border border-gray-200 dark:border-gray-800 flex items-center gap-3 text-xs text-gray-700 dark:text-gray-300 mb-6">
        <span className="px-2 py-0.5 rounded bg-[#EF3837]/10 text-[#EF3837] font-mono font-bold text-[10px] uppercase shrink-0">
          KEY TAKEAWAY
        </span>
        <span>
          RAG turns an open-ended guessing task into a closed-book reading comprehension task over verified documents.
        </span>
      </div>

      {/* Video Reference */}
      <VideoReferenceCard
        title="State of GPT: How LLMs Think, Hallucinate & Retrieval-Augmented Generation"
        speaker="Andrej Karpathy"
        role="Founding Member OpenAI / Former Director of AI at Tesla"
        duration="42 min deep dive"
        youtubeId="bZQun8Y4L2A"
        summary="Andrej Karpathy details why LLMs hallucinate when relying on static pre-training weights (parametric memory) and why injecting relevant passages into the context window (working memory) provides mathematically verifiable grounding."
        chapters={[
          { time: "18:20", label: "Parametric vs Working Memory" },
          { time: "24:15", label: "Hallucination Mechanics" },
          { time: "31:40", label: "Retrieval & Grounding Tools" },
        ]}
      />
    </div>
  );
}
