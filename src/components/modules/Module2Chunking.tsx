"use client";

import { useState, useMemo } from "react";
import { fixedSizeChunk, sentenceChunk, recursiveChunk, type Chunk } from "@/lib/chunking";
import ChunkingDiagram from "@/components/modules/diagrams/ChunkingDiagram";
import VideoReferenceCard from "@/components/common/VideoReferenceCard";

const sampleText = `Remote Work Policy

Our company supports a hybrid work model. Full-time employees are eligible for remote work up to 3 days per week after completing their 90-day probation period. Remote work requests must be approved by the direct manager.

Equipment and Setup: The company provides a laptop, monitor, and keyboard for home office setup. A one-time stipend of $500 is available for ergonomic furniture. IT support is available Monday through Friday from 9 AM to 6 PM.

Communication Requirements: Remote employees must be available on Slack during core hours (10 AM to 4 PM). Video cameras should be on during team meetings. Daily standup meetings are mandatory for all team members.

Leave Policy

Annual Leave: Full-time employees receive 20 days of paid annual leave per year. Leave accrues at 1.67 days per month. Unused leave up to 5 days can be carried forward to the next year.

Sick Leave: Employees receive 12 days of sick leave per year. A medical certificate is required for absences exceeding 3 consecutive days.

Parental Leave: Primary caregivers receive 16 weeks of paid parental leave. Secondary caregivers receive 4 weeks. Both parents are eligible regardless of gender.`;

const chunkColors = [
  "bg-gray-50/90 dark:bg-[#181B20] border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200",
  "bg-gray-100/70 dark:bg-[#1C2026] border-gray-300/80 dark:border-gray-700 text-gray-900 dark:text-gray-100",
];

const tapeColors = [
  "#EF3837", "#475569", "#D92D20", "#64748B", "#B91C1C", "#334155"
];

const strategies = [
  { id: "recursive", label: "Recursive Character", desc: "Recommended: Splits by paragraphs, sentences, then words" },
  { id: "sentence", label: "Sentence Boundary", desc: "Splits strictly on grammatical sentence punctuation" },
  { id: "fixed", label: "Fixed-Size", desc: "Rigid window splitting (can cut words mid-sentence)" },
];

export default function Module2Chunking() {
  const [text, setText] = useState(sampleText);
  const [strategy, setStrategy] = useState("recursive");
  const [chunkSize, setChunkSize] = useState(250);
  const [overlap, setOverlap] = useState(40);
  const [activeChunkIndex, setActiveChunkIndex] = useState<number | null>(null);

  const chunks: Chunk[] = useMemo(() => {
    if (!text.trim()) return [];
    switch (strategy) {
      case "fixed":
        return fixedSizeChunk(text, chunkSize, overlap);
      case "sentence":
        return sentenceChunk(text, chunkSize);
      case "recursive":
        return recursiveChunk(text, chunkSize, overlap);
      default:
        return [];
    }
  }, [text, strategy, chunkSize, overlap]);

  return (
    <div className="max-w-5xl mx-auto py-8 w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#EF3837]/10 text-[#EF3837] border border-[#EF3837]/20 font-bold">
            MODULE 02
          </span>
          <span>ESTIMATED: 6 MINUTES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          Document Ingestion & Chunking
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          Splits large documents into bite-sized semantic passages that fit embedding models and prompt context windows.
        </p>
      </div>

      {/* Animated Splitting Schematic Diagram */}
      <div className="mb-6">
        <ChunkingDiagram />
      </div>

      {/* Main Interactive Studio Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15181C] overflow-hidden shadow-sm mb-6">
        {/* Controls Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-[#181B20]/70 space-y-4">
          {/* Strategy Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono font-bold text-gray-700 dark:text-gray-300 uppercase">
                Splitting Method
              </label>
              <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                {strategies.find((s) => s.id === strategy)?.desc}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {strategies.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStrategy(s.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    strategy === s.id
                      ? "bg-[#EF3837] text-white shadow-xs"
                      : "bg-white dark:bg-[#15181C] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E2228]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <div className="flex justify-between items-center mb-1 text-xs font-mono">
                <span className="font-medium text-gray-600 dark:text-gray-300">Target Chunk Size:</span>
                <span className="font-bold text-[#EF3837]">{chunkSize} chars</span>
              </div>
              <input
                type="range"
                min={80}
                max={500}
                step={10}
                value={chunkSize}
                onChange={(e) => setChunkSize(Number(e.target.value))}
                className="w-full accent-[#EF3837]"
              />
            </div>
            {strategy !== "sentence" && (
              <div>
                <div className="flex justify-between items-center mb-1 text-xs font-mono">
                  <span className="font-medium text-gray-600 dark:text-gray-300">Sliding Overlap Window:</span>
                  <span className="font-bold text-[#EF3837]">{overlap} chars</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={Math.min(100, Math.floor(chunkSize * 0.35))}
                  step={5}
                  value={overlap}
                  onChange={(e) => setOverlap(Number(e.target.value))}
                  className="w-full accent-[#EF3837]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Visual Document Tape */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#15181C]">
          <div className="flex justify-between items-center text-xs font-mono mb-2">
            <span className="font-bold text-gray-700 dark:text-gray-300">
              Visual Document Tape ({chunks.length} partition blocks)
            </span>
            <span className="text-gray-400">Total: {text.length} characters</span>
          </div>

          <div className="w-full h-7 bg-gray-100 dark:bg-[#181B20] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 flex p-1 gap-1">
            {chunks.map((chunk, i) => {
              const flexBasis = Math.max(10, Math.round((chunk.text.length / Math.max(text.length, 1)) * 100));
              const isSelected = activeChunkIndex === i;
              return (
                <div
                  key={chunk.id}
                  onMouseEnter={() => setActiveChunkIndex(i)}
                  onMouseLeave={() => setActiveChunkIndex(null)}
                  style={{ 
                    flexGrow: flexBasis, 
                    backgroundColor: tapeColors[i % tapeColors.length],
                    opacity: activeChunkIndex === null || isSelected ? 1 : 0.4
                  }}
                  className="h-full rounded-md transition-all duration-150 cursor-pointer flex items-center justify-center text-[10px] font-mono text-white font-bold"
                  title={`Chunk #${i + 1} (${chunk.text.length} chars)`}
                >
                  <span>C{i + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side-by-Side: Source Text vs Chunks Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800">
          <div className="p-4">
            <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block font-bold">
              Source Document
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-72 text-xs leading-relaxed text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-[#181B20] border border-gray-200 dark:border-gray-700 rounded-xl p-3 resize-none focus:outline-none focus:ring-1 focus:ring-[#EF3837] font-mono"
            />
          </div>

          <div className="p-4">
            <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block font-bold">
              Partitioned Chunks ({chunks.length})
            </label>
            <div className="h-72 overflow-y-auto space-y-2 pr-1">
              {chunks.map((chunk, i) => (
                <div
                  key={chunk.id}
                  onMouseEnter={() => setActiveChunkIndex(i)}
                  onMouseLeave={() => setActiveChunkIndex(null)}
                  className={`p-3 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer ${
                    chunkColors[i % chunkColors.length]
                  } ${activeChunkIndex === i ? "ring-2 ring-[#EF3837] scale-[1.01]" : ""}`}
                >
                  <div className="flex justify-between items-center mb-1 text-[11px] font-mono font-bold">
                    <span>Chunk #{i + 1}</span>
                    <span className="opacity-70">{chunk.text.length} chars</span>
                  </div>
                  <p className="whitespace-pre-wrap">{chunk.text}</p>
                </div>
              ))}
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
          Use recursive character chunking (250–500 chars with 10–15% overlap) to preserve natural sentences without breaking words.
        </span>
      </div>

      {/* Video Reference */}
      <VideoReferenceCard
        title="The 5 Levels Of Text Splitting For Retrieval-Augmented Generation"
        speaker="Greg Kamradt"
        role="Founder of Data Independent / LLM Architecture Researcher"
        duration="34 min tutorial"
        youtubeId="8OJC21T2SL4"
        summary="Greg Kamradt systematically analyzes the five fundamental levels of document splitting in production RAG systems, demonstrating how chunk sizing and overlap thresholds directly dictate recall precision and LLM context coherence."
        chapters={[
          { time: "02:15", label: "Fixed-Size Splitting" },
          { time: "08:40", label: "Recursive Character Splitting" },
          { time: "18:20", label: "Document & Markdown Splitting" },
          { time: "25:10", label: "Semantic & Agentic Chunking" },
        ]}
      />
    </div>
  );
}
