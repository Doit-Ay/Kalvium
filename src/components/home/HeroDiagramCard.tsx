"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Maximize2, 
  X, 
  Download, 
  Layers, 
  Activity, 
  Database, 
  Sparkles, 
  Search, 
  FileText, 
  ArrowRight,
  CheckCircle2,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroDiagramCard() {
  const [activeTab, setActiveTab] = useState<"blueprint" | "simulation">("blueprint");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStage(1);
    setTimeout(() => setActiveStage(2), 700);
    setTimeout(() => setActiveStage(3), 1400);
    setTimeout(() => setActiveStage(4), 2100);
    setTimeout(() => {
      setIsSimulating(false);
      setActiveStage(0);
    }, 3200);
  };

  return (
    <div className="w-full">
      {/* Main Glass Card Container */}
      <div className="rounded-2xl border border-gray-200/90 dark:border-gray-800 bg-white/90 dark:bg-[#15181C]/90 backdrop-blur-xl shadow-xl shadow-black/[0.04] overflow-hidden">
        {/* Top Control Bar */}
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/70 dark:bg-[#181B20]/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-wider text-gray-700 dark:text-gray-300 uppercase">
              RAG PIPELINE SCHEMATIC
            </span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 bg-gray-200/60 dark:bg-gray-800/80 p-0.5 rounded-lg border border-gray-200 dark:border-gray-700/60 text-[11px] font-mono">
            <button
              onClick={() => setActiveTab("blueprint")}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === "blueprint"
                  ? "bg-white dark:bg-[#15181C] text-gray-900 dark:text-white font-semibold shadow-2xs"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <Layers size={11} />
              <span>Blueprint</span>
            </button>
            <button
              onClick={() => setActiveTab("simulation")}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === "simulation"
                  ? "bg-white dark:bg-[#15181C] text-gray-900 dark:text-white font-semibold shadow-2xs"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <Activity size={11} />
              <span>Live Flow</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Blueprint Diagram Image Preview */}
        {activeTab === "blueprint" && (
          <div className="p-4 sm:p-5">
            <div 
              onClick={() => setIsModalOpen(true)}
              className="group relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700/80 bg-gray-50 dark:bg-[#0E1013] cursor-pointer transition-all hover:border-[#EF3837]/60"
            >
              <div className="relative aspect-[16/11] w-full">
                <Image
                  src="/images/rag-pipeline-diagram.png"
                  alt="Retrieval-Augmented Generation Architecture Diagram"
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  priority
                />
              </div>

              {/* Hover Overlay Hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono backdrop-blur-[2px]">
                <Maximize2 size={15} />
                <span className="font-semibold tracking-wider">CLICK TO EXPAND HIGH-RES BLUEPRINT</span>
              </div>

              {/* Corner badge */}
              <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded bg-white/90 dark:bg-[#15181C]/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-[10px] font-mono text-gray-600 dark:text-gray-300 flex items-center gap-1 shadow-2xs">
                <Maximize2 size={10} className="text-[#EF3837]" />
                <span>1600 × 1200 HD</span>
              </div>
            </div>

            {/* Bottom Technical Specifications Pill Row */}
            <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3.5 border-t border-gray-100 dark:border-gray-800 text-[11px] font-mono">
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-[#181B20] border border-gray-100 dark:border-gray-800">
                <div className="text-[10px] text-gray-400 dark:text-gray-500 uppercase">Embeddings</div>
                <div className="font-semibold text-gray-800 dark:text-gray-200 truncate">1536-D Dense</div>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-[#181B20] border border-gray-100 dark:border-gray-800">
                <div className="text-[10px] text-gray-400 dark:text-gray-500 uppercase">Index Graph</div>
                <div className="font-semibold text-gray-800 dark:text-gray-200 truncate">HNSW Traversal</div>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-[#181B20] border border-gray-100 dark:border-gray-800">
                <div className="text-[10px] text-gray-400 dark:text-gray-500 uppercase">Distance</div>
                <div className="font-semibold text-gray-800 dark:text-gray-200 truncate">Cosine cos(θ)</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Live Pipeline Simulation */}
        {activeTab === "simulation" && (
          <div className="p-4 sm:p-5">
            <div className="space-y-2.5 mb-4">
              {/* Stage 1: Ingestion */}
              <div className={`p-3 rounded-xl border text-xs transition-all ${
                activeStage === 1
                  ? "border-[#EF3837] bg-[#EF3837]/5 dark:bg-[#EF3837]/10 ring-1 ring-[#EF3837]"
                  : "border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#181B20]/50"
              }`}>
                <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                  <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-semibold">
                    <FileText size={13} className="text-[#EF3837]" />
                    <span>1. Document Chunking</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    400 tokens / 50 overlap
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Recursive character parsing partitions raw policies into semantically intact passages.
                </p>
              </div>

              {/* Stage 2: Embeddings */}
              <div className={`p-3 rounded-xl border text-xs transition-all ${
                activeStage === 2
                  ? "border-amber-500 bg-amber-500/5 dark:bg-amber-500/10 ring-1 ring-amber-500"
                  : "border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#181B20]/50"
              }`}>
                <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                  <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-semibold">
                    <Cpu size={13} className="text-amber-500" />
                    <span>2. Vector Embedding</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold">
                    [0.18, -0.42, 0.91, ...]
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Text transformed into high-dimensional geometric coordinates preserving conceptual relationships.
                </p>
              </div>

              {/* Stage 3: Retrieval */}
              <div className={`p-3 rounded-xl border text-xs transition-all ${
                activeStage === 3
                  ? "border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10 ring-1 ring-emerald-500"
                  : "border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#181B20]/50"
              }`}>
                <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                  <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-semibold">
                    <Database size={13} className="text-emerald-500" />
                    <span>3. HNSW Vector Search</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold">
                    cos(θ) = 0.942
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Sub-millisecond nearest neighbor search identifies the Top-3 most relevant verified passages.
                </p>
              </div>

              {/* Stage 4: Synthesis */}
              <div className={`p-3 rounded-xl border text-xs transition-all ${
                activeStage === 4
                  ? "border-blue-500 bg-blue-500/5 dark:bg-blue-500/10 ring-1 ring-blue-500"
                  : "border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#181B20]/50"
              }`}>
                <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                  <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-semibold">
                    <Sparkles size={13} className="text-blue-500" />
                    <span>4. Grounded Synthesis</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-bold">
                    Zero Hallucination
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  LLM conditions output strictly on verified context passages with direct citations.
                </p>
              </div>
            </div>

            {/* Simulation Trigger Button */}
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="w-full py-2.5 px-4 rounded-xl bg-[#EF3837] hover:bg-[#D92D20] text-white text-xs font-semibold font-mono flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Activity size={14} className={isSimulating ? "animate-spin" : ""} />
              <span>{isSimulating ? "SIGNAL PROPAGATING THROUGH RUNTIME..." : "RUN INTERACTIVE PIPELINE PULSE"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Full-Screen Lightbox Modal for Blueprint Diagram */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl bg-white dark:bg-[#15181C] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-[#181B20]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF3837]" />
                  <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white font-mono">
                    RAG Architectural Blueprint (1600 × 1200 HD)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/images/rag-pipeline-diagram.png"
                    download="rag-pipeline-architecture.png"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15181C] text-xs font-mono text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Download size={13} />
                    <span>Download PNG</span>
                  </a>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15181C] flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Image Body with Scroll */}
              <div className="p-4 overflow-auto flex-1 bg-gray-100 dark:bg-[#0D0E11] flex items-center justify-center">
                <div className="relative w-full max-w-4xl aspect-[16/12] shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-white">
                  <Image
                    src="/images/rag-pipeline-diagram.png"
                    alt="Retrieval-Augmented Generation Architecture Diagram High Resolution"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
