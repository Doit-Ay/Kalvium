"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { cosineSimilarity, euclideanDistance, dotProduct, buildVocabulary, simpleEmbed } from "@/lib/similarity";
import VectorSearchDiagram from "@/components/modules/diagrams/VectorSearchDiagram";
import VideoReferenceCard from "@/components/common/VideoReferenceCard";

const docChunks = [
  "Our company allows hybrid work with up to 3 days of remote work per week after the probation period.",
  "The expense reimbursement policy states meals are capped at $75 per day during business travel.",
  "To reset your corporate password, visit the internal IT portal at help.company.com or contact the helpdesk.",
  "Annual leave accrues at 1.67 days per month, totaling 20 days per year for full-time employees.",
  "Primary caregivers receive 16 weeks of paid parental leave. Secondary caregivers receive 4 weeks.",
  "Performance reviews are conducted quarterly with self-assessment, peer feedback, and manager evaluation.",
  "The company provides a laptop, monitor, and keyboard for home office setup with a $500 furniture stipend.",
  "Remote employees must be available on Slack during core hours from 10 AM to 4 PM on working days.",
];

const metrics = [
  { id: "cosine", label: "Cosine Similarity", desc: "Angle alignment [-1 to 1] · Universal standard for text" },
  { id: "euclidean", label: "Euclidean Distance", desc: "Straight-line geometric distance [0 to ∞]" },
  { id: "dot", label: "Dot Product", desc: "Angle weighted by magnitude · Best for normalized vectors" },
];

function computeScore(a: number[], b: number[], metric: string): number {
  switch (metric) {
    case "cosine": return cosineSimilarity(a, b);
    case "euclidean": return 1 / (1 + euclideanDistance(a, b));
    case "dot": return dotProduct(a, b);
    default: return 0;
  }
}

export default function Module4VectorSearch() {
  const [query, setQuery] = useState("Can I work from home?");
  const [metric, setMetric] = useState("cosine");
  const [topK, setTopK] = useState(3);

  const vocabulary = useMemo(() => buildVocabulary([...docChunks, query]), [query]);

  const results = useMemo(() => {
    const queryVec = simpleEmbed(query, vocabulary);
    return docChunks
      .map((chunk, i) => {
        const chunkVec = simpleEmbed(chunk, vocabulary);
        const score = computeScore(queryVec, chunkVec, metric);
        return { chunk, index: i, score };
      })
      .sort((a, b) => b.score - a.score);
  }, [query, metric, vocabulary]);

  const maxScore = Math.max(...results.map((r) => r.score), 0.001);

  return (
    <div className="max-w-5xl mx-auto py-8 w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#EF3837]/10 text-[#EF3837] border border-[#EF3837]/20 font-bold">
            MODULE 04
          </span>
          <span>ESTIMATED: 6 MINUTES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          Vector Similarity & Retrieval
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          Retrieval turns questions into mathematical nearest-neighbor lookups over indexed document chunks.
        </p>
      </div>

      {/* Animated Cosine Distance & Top-K Retrieval Diagram */}
      <div className="mb-6">
        <VectorSearchDiagram />
      </div>

      {/* Simulator Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15181C] overflow-hidden shadow-sm mb-6">
        {/* Search Query Input */}
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-[#181B20]/70">
          <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block font-bold">
            Ask a Natural Language Question
          </label>
          <div className="relative mb-3">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl text-xs bg-white dark:bg-[#121418] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#EF3837]"
              placeholder="Search indexed knowledge..."
            />
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-gray-400 mr-1">Try Presets:</span>
            {["Can I work from home?", "How many vacation days?", "How to reset my password?", "What is parental leave?"].map((q) => (
              <button
                key={q}
                onClick={() => setQuery(q)}
                className={`text-[11px] px-2.5 py-1 rounded-lg transition-all font-mono cursor-pointer ${
                  query === q
                    ? "bg-[#EF3837] text-white font-bold"
                    : "bg-white dark:bg-[#15181C] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1F242C]"
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Configuration Row */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-[#15181C]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">METRIC:</span>
            <div className="flex gap-1">
              {metrics.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMetric(m.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    metric === m.id
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-2xs"
                      : "bg-gray-100 dark:bg-[#1E2228] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#252A32]"
                  }`}
                >
                  {m.label.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">RETRIEVAL DEPTH (K): <strong className="text-[#EF3837]">{topK}</strong></span>
            <input
              type="range"
              min={1}
              max={5}
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              className="w-24 accent-[#EF3837]"
            />
          </div>
        </div>

        {/* Results List */}
        <div className="p-4 space-y-2">
          {results.map((r, i) => {
            const isTopK = i < topK;
            const barWidth = maxScore > 0 ? (r.score / maxScore) * 100 : 0;
            return (
              <div
                key={r.index}
                className={`p-3 rounded-xl border text-xs transition-all ${
                  isTopK
                    ? "bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/60"
                    : "bg-gray-50 border-gray-100 dark:bg-[#121418] dark:border-gray-800/80 opacity-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <p className={`leading-relaxed ${isTopK ? "text-gray-900 dark:text-emerald-100 font-medium" : "text-gray-500 dark:text-gray-400"}`}>
                    {isTopK && (
                      <span className="font-mono text-emerald-800 dark:text-emerald-400 font-bold mr-2">
                        [MATCH #{i + 1}]
                      </span>
                    )}
                    {r.chunk}
                  </p>
                  <span className={`text-[11px] font-mono shrink-0 px-2 py-0.5 rounded border ${
                    isTopK
                      ? "bg-emerald-100 border-emerald-300 text-emerald-900 dark:bg-emerald-900/50 dark:border-emerald-700 dark:text-emerald-200 font-bold"
                      : "bg-gray-100 border-gray-200 text-gray-500 dark:bg-[#1A1E24] dark:border-gray-800 dark:text-gray-400"
                  }`}>
                    {r.score.toFixed(4)}
                  </span>
                </div>
                <div className="h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${isTopK ? "bg-emerald-600 dark:bg-emerald-500" : "bg-gray-300 dark:bg-gray-700"}`}
                    style={{ width: `${Math.max(barWidth, 2)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clean 1-Line Key Takeaway */}
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#15181C] border border-gray-200 dark:border-gray-800 flex items-center gap-3 text-xs text-gray-700 dark:text-gray-300 mb-6">
        <span className="px-2 py-0.5 rounded bg-[#EF3837]/10 text-[#EF3837] font-mono font-bold text-[10px] uppercase shrink-0">
          KEY TAKEAWAY
        </span>
        <span>
          Cosine similarity measures angular alignment regardless of text length, making it the universal standard for dense embeddings.
        </span>
      </div>

      {/* Video Reference */}
      <VideoReferenceCard
        title="Vector Search Explained: Cosine Similarity, Dot Product & Vector Databases"
        speaker="James Briggs"
        role="Staff AI Evangelist at Pinecone"
        duration="24 min deep dive"
        youtubeId="sPczdAswv7o"
        summary="James Briggs details the core mathematical distance metrics behind high-dimensional vector search, contrasting Cosine Similarity with Euclidean Distance and explaining how HNSW graphs achieve sub-millisecond retrieval."
        chapters={[
          { time: "01:10", label: "Vector Search Foundations" },
          { time: "06:45", label: "Cosine Similarity vs Euclidean Distance" },
          { time: "14:20", label: "Dot Product & Normalized Vectors" },
          { time: "19:50", label: "Indexing with HNSW & IVF" },
        ]}
      />
    </div>
  );
}
