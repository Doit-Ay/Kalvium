"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/theme/ThemeToggle";
import RagPipelineInfographic from "@/components/home/RagPipelineInfographic";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Database,
  Search,
  Cpu,
  FileText,
  Sliders,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Pipeline architecture stages
const architectureStages = [
  {
    step: "01",
    name: "Document Ingestion",
    sub: "Extraction & Cleansing",
    spec: "Input: Multi-format unstructured files (PDF, DOCX, Markdown, HTML)",
    output: "Clean UTF-8 text streams with structural metadata headers",
    metric: "~20ms per document page",
    desc: "Extracts body text, tables, and section hierarchies while discarding boilerplate, styling, and extraneous whitespace.",
  },
  {
    step: "02",
    name: "Recursive Chunking",
    sub: "Window Partitioning",
    spec: "Config: 200–600 tokens target window, 10–20% boundary overlap",
    output: "Array of contextual text chunks with byte offset bounds",
    metric: "Preserves sentence boundaries",
    desc: "Splits documents hierarchically along paragraphs, sentences, and words to avoid truncating semantic units mid-thought.",
  },
  {
    step: "03",
    name: "Dense Vector Space",
    sub: "High-Dimensional Projection",
    spec: "Model: all-MiniLM-L6-v2 (d=384) or OpenAI text-embedding-3 (d=1536)",
    output: "Normalized floating-point coordinate vectors in ℝ^d",
    metric: "Cosine angular distance",
    desc: "Deep neural encoders map natural language phrases into mathematical vector spaces where semantic similarity equals geometric proximity.",
  },
  {
    step: "04",
    name: "Vector Store Indexing",
    sub: "Hierarchical Graph (HNSW)",
    spec: "Storage: In-memory array / Chroma / FAISS / Qdrant",
    output: "Persistent index optimized for sub-millisecond approximate nearest neighbor lookups",
    metric: "O(log N) search complexity",
    desc: "Indexes millions of embeddings using navigable small-world graphs to bypass exhaustive brute-force distance scans.",
  },
  {
    step: "05",
    name: "Top-K Similarity Retrieval",
    sub: "Semantic Coordinate Matching",
    spec: "Search: Cosine similarity thresholding on user query vector",
    output: "Rank-ordered array of the K most mathematically relevant context passages",
    metric: "Cosine score range: [-1, +1]",
    desc: "Encodes runtime user questions into the shared vector space and computes geometric dot products against document chunks.",
  },
  {
    step: "06",
    name: "In-Context Prompt Synthesis",
    sub: "Grounded Generation",
    spec: "Template: System instructions + retrieved passages + user query",
    output: "Deterministic, hallucination-resistant LLM response with verifiable citations",
    metric: "Zero weight updates required",
    desc: "Injects retrieved factual passages directly into the inference context window, constraining the LLM to synthesize only verified evidence.",
  },
];

// Interactive Preview Carousel for Modules
const courseModules = [
  {
    index: 0,
    num: "01",
    title: "Why RAG? The Theoretical Foundation",
    duration: "7 min",
    category: "Architecture & Theory",
    overview: "Understand why parametric memory in large language models produces confident hallucinations, and how external non-parametric retrieval provides verifiable grounding.",
    keyConcepts: ["Parametric vs Non-Parametric Memory", "Hallucination Mechanics", "Knowledge Cutoffs", "Grounding Protocols"],
    interactiveTool: "Interactive Side-by-Side Response Simulator (Vanilla LLM vs RAG)",
    href: "/modules/why-rag",
  },
  {
    index: 1,
    num: "02",
    title: "Document Ingestion & Chunking Strategies",
    duration: "8 min",
    category: "Data Processing",
    overview: "Explore how document partitioning choices directly dictate retrieval precision. Compare fixed-size, sentence boundary, and recursive splitting algorithms live.",
    keyConcepts: ["Token Sequence Windows", "Chunk Boundary Overlap", "Context Dilution", "Recursive Delimiters"],
    interactiveTool: "Live Chunking Sandbox with adjustable chunk size, overlap sliders, and visual partition cards",
    href: "/modules/document-processing",
  },
  {
    index: 2,
    num: "03",
    title: "Vector Space & Semantic Geometry",
    duration: "8 min",
    category: "Representation Learning",
    overview: "Examine how transformer models transform arbitrary strings into high-dimensional coordinate vectors. Observe semantic clusters form in projected space.",
    keyConcepts: ["Embedding Dimension (d)", "Semantic Distance", "PCA Dimensionality Reduction", "Vector Clustering"],
    interactiveTool: "Rotatable 3D Vector Space Explorer with custom word injection and similarity matrix",
    href: "/modules/embeddings",
  },
  {
    index: 3,
    num: "04",
    title: "Vector Databases & Similarity Retrieval",
    duration: "8 min",
    category: "Information Retrieval",
    overview: "Master the mathematical distance metrics powering vector search. Compare Cosine Similarity, Euclidean Distance, and Dot Product on live query strings.",
    keyConcepts: ["Cosine Distance Math", "Euclidean Metric", "Top-K Retrieval Depth", "HNSW Index Architecture"],
    interactiveTool: "Real-time Similarity Search Simulator with metric toggles and dynamic rank scoring",
    href: "/modules/vector-search",
  },
  {
    index: 4,
    num: "05",
    title: "End-to-End Pipeline Development Studio",
    duration: "10 min",
    category: "Full-Stack Implementation",
    overview: "Connect every component into a unified runtime pipeline. Ingest reference documents, index vectors, query the store, and inspect augmented prompt templates.",
    keyConcepts: ["Prompt Assembly", "Context Injection", "Citation Extraction", "Production LangChain Patterns"],
    interactiveTool: "Full RAG Studio with document selector, in-memory indexer, query executor, and step inspector",
    href: "/modules/full-pipeline",
  },
  {
    index: 5,
    num: "06",
    title: "Technical Assessment & Knowledge Check",
    duration: "4 min",
    category: "Evaluation",
    overview: "Verify your conceptual and engineering mastery with 12 rigorous multiple-choice questions covering every layer of the RAG pipeline.",
    keyConcepts: ["Recall vs Precision", "Boundary Effects", "Vector DB Scaling", "Failure Mode Diagnosis"],
    interactiveTool: "12-Question Technical Examination with itemized explanations and score analysis",
    href: "/modules/quiz",
  },
];

export default function LandingPage() {
  const [activeStage, setActiveStage] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [sliderDirection, setSliderDirection] = useState(0);

  const nextModule = () => {
    setSliderDirection(1);
    setSliderIndex((prev) => (prev < courseModules.length - 1 ? prev + 1 : 0));
  };

  const prevModule = () => {
    setSliderDirection(-1);
    setSliderIndex((prev) => (prev > 0 ? prev - 1 : courseModules.length - 1));
  };

  const currentModule = courseModules[sliderIndex];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0D0E11] text-[#191919] dark:text-[#F3F4F6] selection:bg-[#EF3837] selection:text-white snap-y snap-proximity transition-colors duration-200">
      {/* Floating Glass Title Bar with Round Corners */}
      <header className="fixed top-4 inset-x-0 z-50 max-w-5xl mx-auto px-4 sm:px-6 pointer-events-none">
        <div className="bg-white/80 dark:bg-[#15181C]/85 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800 rounded-2xl shadow-lg shadow-black/[0.03] px-4 sm:px-5 h-14 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#EF3837] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
                R
              </span>
              <span className="font-extrabold text-base tracking-tight text-[#191919] dark:text-white">
                RAG Studio
              </span>
            </div>
            <span className="text-gray-300 dark:text-gray-700 hidden sm:inline">|</span>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:inline">
              Interactive Architecture
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              href="/course"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#EF3837] hover:bg-[#D92D20] text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
            >
              <span>Launch Studio</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section — Covers exactly 1 full viewport above the fold with 2-column layout */}
      <section className="min-h-screen flex flex-col justify-center border-b border-gray-200 dark:border-gray-800 bg-gradient-to-b from-gray-50/80 via-white to-white dark:from-[#121418] dark:via-[#0D0E11] dark:to-[#0D0E11] snap-start pt-20">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 w-full py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headline, Description & Actions */}
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF3837]/10 border border-[#EF3837]/20 text-[#EF3837] text-xs font-mono font-bold mb-4">
                <span>INTERACTIVE ENGINEERING LABORATORY</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#191919] dark:text-white leading-[1.1] mb-5">
                Retrieval-Augmented Generation{" "}
                <span className="text-[#EF3837]">Pipeline Development</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Large language models lack state and live memory. This interactive laboratory walks through every engineering layer of modern RAG systems: document tokenization, dense vector embeddings, approximate nearest neighbor retrieval, and prompt context augmentation.
              </p>

              {/* Action buttons with Kalvium Colors */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/course"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#EF3837] hover:bg-[#D92D20] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all hover:gap-2.5 shadow-sm"
                >
                  <span>Enter Guided Interactive Studio</span>
                  <ArrowRight size={15} />
                </Link>
                <a
                  href="#curriculum"
                  className="inline-flex items-center gap-1.5 px-5 py-3.5 bg-white dark:bg-[#1A1D22] border border-gray-300 dark:border-gray-700 rounded-xl text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-2xs"
                >
                  <span>Inspect Pipeline Schematic</span>
                </a>
              </div>
            </div>

            {/* Right Column: RAG Pipeline Flow Diagram */}
            <div className="lg:col-span-6 xl:col-span-7 w-full flex items-center justify-center">
              <RagPipelineInfographic />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive Horizontal Course Slider Showcase (Visible on scroll) */}
      <section id="curriculum" className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center py-12 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0D0E11] snap-start">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#EF3837] font-semibold mb-1">
                CURRICULUM NAVIGATOR
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#191919] dark:text-white">
                Explore the 6 Learning Modules
              </h2>
            </div>

            {/* Horizontal Slider Controls with Arrow Marks */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-500 dark:text-gray-400 mr-2 font-medium">
                {sliderIndex + 1} / {courseModules.length}
              </span>
              <button
                onClick={prevModule}
                className="w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15181C] flex items-center justify-center text-gray-700 dark:text-gray-300 hover:border-[#EF3837] hover:text-[#EF3837] hover:bg-[#EF3837]/5 transition-all group cursor-pointer"
                aria-label="Previous module"
                title="Previous module"
              >
                <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={nextModule}
                className="w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15181C] flex items-center justify-center text-gray-700 dark:text-gray-300 hover:border-[#EF3837] hover:text-[#EF3837] hover:bg-[#EF3837]/5 transition-all group cursor-pointer"
                aria-label="Next module"
                title="Next module"
              >
                <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Animated Horizontal Slide Card */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-[#F8F9FA] dark:bg-[#15181C] p-6 sm:p-8">
            <AnimatePresence mode="wait" custom={sliderDirection}>
              <motion.div
                key={sliderIndex}
                custom={sliderDirection}
                initial={{ x: sliderDirection > 0 ? 80 : -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: sliderDirection < 0 ? 80 : -80, opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left metadata */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EF3837] text-white font-bold text-[11px]">
                      MODULE {currentModule.num}
                    </span>
                    <span>·</span>
                    <span className="text-gray-600 dark:text-gray-300 font-medium">{currentModule.category}</span>
                    <span>·</span>
                    <span className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                      <Clock size={11} /> {currentModule.duration}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#191919] dark:text-white mb-3 tracking-tight">
                    {currentModule.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {currentModule.overview}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="text-[11px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      Key Topics Covered
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentModule.keyConcepts.map((concept, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono px-2.5 py-1 rounded-md bg-white dark:bg-[#1E2228] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={currentModule.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EF3837] hover:bg-[#D92D20] text-white rounded-lg text-xs font-semibold transition-all hover:gap-2.5 shadow-xs"
                  >
                    <span>Launch Module {currentModule.num} in Studio</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                {/* Right Interactive Tool Highlight */}
                <div className="lg:col-span-5 bg-white dark:bg-[#181B20] p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#EF3837] font-semibold mb-2">
                    Interactive Instrument Included
                  </div>
                  <h4 className="text-sm font-bold text-[#191919] dark:text-white mb-2">
                    {currentModule.interactiveTool.split("(")[0]}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                    Students manipulate variables live, observing mathematical outputs in real time rather than reading static prose.
                  </p>

                  <div className="p-3 bg-[#F8F9FA] dark:bg-[#121418] rounded-lg border border-gray-200 dark:border-gray-800 text-[11px] font-mono text-gray-600 dark:text-gray-400 flex items-center justify-between">
                    <span>STATUS: ACTIVE LABORATORY</span>
                    <span className="text-[#EF3837] font-bold">READY</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider bottom dots with Kalvium Red */}
            <div className="flex items-center justify-center gap-1.5 mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
              {courseModules.map((m, i) => (
                <button
                  key={m.num}
                  onClick={() => {
                    setSliderDirection(i > sliderIndex ? 1 : -1);
                    setSliderIndex(i);
                  }}
                  className={`transition-all rounded-full ${
                    i === sliderIndex
                      ? "w-8 h-1.5 bg-[#EF3837]"
                      : "w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                  }`}
                  aria-label={`Jump to slide ${m.num}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Architecture Schematic (Single View) */}
      <section id="schematic" className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center py-12 border-b border-gray-200 dark:border-gray-800 bg-[#F8F9FA] dark:bg-[#121418] snap-start">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-2xl mb-8">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#EF3837] font-semibold mb-1">
              SYSTEM ARCHITECTURE
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191919] dark:text-white mb-2">
              The 6-Stage RAG Pipeline Dataflow
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Click on any stage in the architecture diagram below to inspect its data contract, computational complexity, and runtime role.
            </p>
          </div>

          {/* Interactive Flow Diagram Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6">
            {architectureStages.map((stage, i) => {
              const isSelected = activeStage === i;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStage(i)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#EF3837] bg-white dark:bg-[#1A1D22] ring-2 ring-[#EF3837]/30 shadow-xs"
                      : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15181C] hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1A1D22]"
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold block mb-1 ${isSelected ? "text-[#EF3837]" : "text-gray-400 dark:text-gray-500"}`}>
                    STAGE {stage.step}
                  </span>
                  <p className="text-xs font-bold text-[#191919] dark:text-white leading-snug">
                    {stage.name}
                  </p>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 block truncate">
                    {stage.sub}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detail Inspector */}
          {architectureStages[activeStage] && (
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15181C] shadow-xs"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <span className="text-[11px] font-mono text-[#EF3837] font-semibold uppercase tracking-widest">
                    STAGE SPECIFICATION {architectureStages[activeStage].step}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#191919] dark:text-white">
                    {architectureStages[activeStage].name} — {architectureStages[activeStage].sub}
                  </h3>
                </div>
                <div className="text-xs font-mono text-[#EF3837] bg-[#EF3837]/10 px-3 py-1.5 rounded-md border border-[#EF3837]/20 font-semibold">
                  {architectureStages[activeStage].metric}
                </div>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {architectureStages[activeStage].desc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-lg bg-[#F8F9FA] dark:bg-[#1A1D22] border border-gray-200 dark:border-gray-800">
                  <span className="text-[10px] uppercase text-gray-400 dark:text-gray-500 block mb-1">Input Interface Contract</span>
                  <span className="text-gray-800 dark:text-gray-200">{architectureStages[activeStage].spec}</span>
                </div>
                <div className="p-3.5 rounded-lg bg-[#F8F9FA] dark:bg-[#1A1D22] border border-gray-200 dark:border-gray-800">
                  <span className="text-[10px] uppercase text-gray-400 dark:text-gray-500 block mb-1">Output Transform Artifact</span>
                  <span className="text-gray-800 dark:text-gray-200">{architectureStages[activeStage].output}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Section 4: Comparative Architecture Table (Single View) */}
      <section className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center py-12 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0D0E11] snap-start">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-2xl mb-8">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#EF3837] font-semibold mb-1">
              THEORETICAL ANALYSIS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191919] dark:text-white mb-2">
              Why Not Just Fine-Tune?
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Engineers frequently confuse model training with knowledge storage. Fine-tuning adjusts language style and task behavior; RAG supplies dynamic factual truth.
            </p>
          </div>

          <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#15181C] shadow-xs">
            <table className="w-full text-xs">
              <thead className="bg-[#F8F9FA] dark:bg-[#1A1D22] border-b border-gray-200 dark:border-gray-800 font-mono text-gray-600 dark:text-gray-400">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold uppercase tracking-wider">Dimension</th>
                  <th className="text-left px-4 py-3 font-semibold uppercase tracking-wider">Vanilla Base LLM</th>
                  <th className="text-left px-4 py-3 font-semibold uppercase tracking-wider">Supervised Fine-Tuning (SFT)</th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider bg-[#EF3837]/10 text-[#EF3837] border-l border-[#EF3837]/20">
                    RAG Pipeline (Interactive Studio)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  ["Knowledge Freshness", "Frozen at pre-training cutoff date", "Frozen at fine-tuning run checkpoint", "Instant real-time sync with database updates"],
                  ["Hallucination Probability", "High on domain-specific edge queries", "Moderate; remains prone to confabulation", "Minimal; generation strictly conditioned on text"],
                  ["Source Attribution & Citations", "Impossible; weights are an opaque black box", "Impossible; cannot trace specific weights", "Deterministic inline passage references"],
                  ["Update Latency & Cost", "Requires multi-million dollar retraining", "Requires compute GPU fine-tuning epochs", "Sub-second vector index insert with zero compute training"],
                  ["Private / Tenant Data Isolation", "High risk of cross-tenant weight leakage", "Difficult to segment per-user permissions", "Native row-level and metadata filtering"],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                    <td className="px-4 py-3 font-bold text-[#191919] dark:text-white font-mono">{row[0]}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{row[1]}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{row[2]}</td>
                    <td className="px-4 py-3 font-bold text-[#EF3837] bg-[#EF3837]/5 border-l border-[#EF3837]/20">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 5: Production Architecture Code Snippet (Single View) */}
      <section className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center py-12 bg-[#191919] text-white snap-start">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#EF3837] font-semibold mb-1">
                CODE BLUEPRINT
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white mb-4">
                Minimal Production Pipeline
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                The entire RAG pattern distills down to roughly 20 lines of declarative pipeline orchestration.
              </p>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                In Module 5 of this interactive course, you will configure this pipeline hands-on and inspect the full payload passed to the model.
              </p>

              <Link
                href="/modules/full-pipeline"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EF3837] hover:bg-[#D92D20] text-white rounded-lg text-xs font-semibold transition-all shadow-xs"
              >
                <span>Jump straight to Pipeline Studio</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#121212] shadow-xl">
                <div className="px-4 py-2.5 bg-black/40 border-b border-gray-800 flex items-center justify-between text-xs font-mono text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF3837]" />
                    <span>rag_pipeline_core.py</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-semibold">PYTHON 3.11</span>
                </div>
                <pre className="p-4 text-[11px] font-mono text-gray-200 leading-relaxed overflow-x-auto">
{`from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_openai import ChatOpenAI

# 1. Ingest & Chunk
docs = TextLoader("knowledge_base.txt").load()
chunks = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=50).split_documents(docs)

# 2. Embed & Index
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectorstore = Chroma.from_documents(chunks, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# 3. Augment & Generate
llm = ChatOpenAI(model="gpt-4o", temperature=0.0)
chain = {"context": retriever, "question": lambda q: q} | prompt | llm

response = chain.invoke("What is our remote work stipend policy?")
print(response.content)`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
