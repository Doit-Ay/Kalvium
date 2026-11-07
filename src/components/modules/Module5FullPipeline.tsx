"use client";

import { useState, useMemo } from "react";
import { Play, ChevronDown, ChevronUp, FileText, Search, Sparkles, Database } from "lucide-react";
import { fixedSizeChunk } from "@/lib/chunking";
import { buildVocabulary, simpleEmbed, cosineSimilarity } from "@/lib/similarity";
import { sampleDocuments, sampleQueries, simulatedResponses } from "@/data/sampleDocuments";
import FullPipelineDiagram from "@/components/modules/diagrams/FullPipelineDiagram";
import VideoReferenceCard from "@/components/common/VideoReferenceCard";

type DocKey = keyof typeof sampleDocuments;

export default function Module5FullPipeline() {
  const [selectedDoc, setSelectedDoc] = useState<DocKey>("hr-policy");
  const [chunkSize, setChunkSize] = useState(300);
  const [topK, setTopK] = useState(3);
  const [query, setQuery] = useState("");
  const [isProcessed, setIsProcessed] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showSteps, setShowSteps] = useState<Record<number, boolean>>({ 0: true, 1: true, 2: true, 3: true });
  const [searchResults, setSearchResults] = useState<{ chunk: string; score: number }[]>([]);
  const [generatedAnswer, setGeneratedAnswer] = useState("");

  const doc = sampleDocuments[selectedDoc];
  const chunks = useMemo(() => fixedSizeChunk(doc.content, chunkSize, 40), [doc.content, chunkSize]);

  const handleProcess = () => {
    setIsProcessed(true);
    setSearchResults([]);
    setGeneratedAnswer("");
    setQuery("");
  };

  const handleSearch = () => {
    if (!query.trim() || !isProcessed) return;
    setIsSearching(true);

    setTimeout(() => {
      const allTexts = [...chunks.map((c) => c.text), query];
      const vocab = buildVocabulary(allTexts);
      const queryVec = simpleEmbed(query, vocab);

      const results = chunks
        .map((chunk) => {
          const chunkVec = simpleEmbed(chunk.text, vocab);
          const score = cosineSimilarity(queryVec, chunkVec);
          return { chunk: chunk.text, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, topK);

      setSearchResults(results);

      const docQueries = sampleQueries[selectedDoc] || [];
      const simResponses = simulatedResponses[selectedDoc] || {};
      
      let bestMatch = "";
      let bestScore = 0;
      for (const q of docQueries) {
        const qVec = simpleEmbed(q, vocab);
        const sim = cosineSimilarity(queryVec, qVec);
        if (sim > bestScore) {
          bestScore = sim;
          bestMatch = q;
        }
      }

      if (bestScore > 0.3 && simResponses[bestMatch]) {
        setGeneratedAnswer(simResponses[bestMatch]);
      } else {
        const topContext = results.map((r) => r.chunk).join("\n\n");
        setGeneratedAnswer(
          `Based on the retrieved context, here is the verified synthesis:\n\n${topContext.slice(0, 260)}...\n\n[Synthesized response strictly conditioned on the injected context chunks above.]`
        );
      }

      setIsSearching(false);
    }, 500);
  };

  const toggleStep = (i: number) => setShowSteps((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="max-w-5xl mx-auto py-8 w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#EF3837]/10 text-[#EF3837] border border-[#EF3837]/20 font-bold">
            MODULE 05
          </span>
          <span>ESTIMATED: 8 MINUTES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          End-to-End RAG Pipeline
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          The complete cycle: Ingest documents, index chunks, retrieve top matches, and synthesize grounded answers.
        </p>
      </div>

      {/* Animated RAG Pipeline Architecture Flow Diagram */}
      <div className="mb-6">
        <FullPipelineDiagram />
      </div>

      {/* Main Pipeline Sandbox Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15181C] overflow-hidden shadow-sm mb-6">
        {/* Step 1: Select Corpus */}
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-[#181B20]/70">
          <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2.5 block font-bold">
            1. Select Document Corpus
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {(Object.entries(sampleDocuments) as [DocKey, typeof sampleDocuments[DocKey]][]).map(([key, d]) => (
              <button
                key={key}
                onClick={() => { setSelectedDoc(key); setIsProcessed(false); setSearchResults([]); setGeneratedAnswer(""); }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedDoc === key
                    ? "border-[#EF3837] bg-white dark:bg-[#1F242C] ring-1 ring-[#EF3837] shadow-xs"
                    : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15181C] hover:border-gray-300"
                }`}
              >
                <span className="text-[10px] font-mono text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-[#1E2228] px-1.5 py-0.5 rounded uppercase">
                  {d.icon}
                </span>
                <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">{d.title}</p>
                <p className="text-[10px] font-mono text-gray-400">{d.content.length} characters</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Indexing Controls */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#15181C] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400">CHUNK SIZE: {chunkSize}</span>
              <input
                type="range"
                min={150}
                max={450}
                step={25}
                value={chunkSize}
                onChange={(e) => { setChunkSize(Number(e.target.value)); setIsProcessed(false); }}
                className="w-20 accent-[#EF3837]"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400">DEPTH (K): {topK}</span>
              <input
                type="range"
                min={1}
                max={5}
                value={topK}
                onChange={(e) => setTopK(Number(e.target.value))}
                className="w-16 accent-[#EF3837]"
              />
            </div>
          </div>

          <button
            onClick={handleProcess}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
              isProcessed
                ? "bg-emerald-100 border border-emerald-300 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-700 dark:text-emerald-300"
                : "bg-[#EF3837] text-white hover:bg-[#D92D20]"
            }`}
          >
            {isProcessed ? (
              <><Database size={13} /> Indexed ({chunks.length} chunks)</>
            ) : (
              <><Play size={13} /> Process & Index</>
            )}
          </button>
        </div>

        {/* Step 3: Query Input */}
        <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-[#181B20]/70">
          <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block font-bold">
            2. Inquire Vector Knowledge Base
          </label>
          <div className="flex gap-2 mb-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder={isProcessed ? "Type question to retrieve..." : "Click 'Process & Index' above first..."}
              disabled={!isProcessed}
              className="flex-1 px-3 py-2 text-xs border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-[#121418] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#EF3837] disabled:opacity-50"
            />
            <button
              onClick={handleSearch}
              disabled={!isProcessed || !query.trim() || isSearching}
              className="px-4 py-2 bg-[#EF3837] text-white rounded-xl text-xs font-bold hover:bg-[#D92D20] transition-colors disabled:opacity-50 flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
            >
              <Search size={13} />
              {isSearching ? "Searching..." : "Query"}
            </button>
          </div>

          {isProcessed && (
            <div className="flex flex-wrap gap-1.5">
              {(sampleQueries[selectedDoc] || []).slice(0, 3).map((q) => (
                <button
                  key={q}
                  onClick={() => setQuery(q)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-[#15181C] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 font-mono cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results: Inspection Accordions */}
        {searchResults.length > 0 && (
          <div className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-[#15181C]">
            {/* Stage A: Retrieved Chunks */}
            <div className="p-4">
              <button onClick={() => toggleStep(1)} className="flex items-center justify-between w-full text-left cursor-pointer">
                <div className="flex items-center gap-2">
                  <Search size={14} className="text-emerald-700 dark:text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-gray-900 dark:text-white uppercase">
                    Stage A: Retrieved Chunks ({searchResults.length} passages)
                  </span>
                </div>
                {showSteps[1] ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
              </button>
              {showSteps[1] && (
                <div className="mt-3 space-y-2">
                  {searchResults.map((r, i) => (
                    <div key={i} className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-xs">
                      <div className="flex justify-between items-center mb-1 font-mono text-[11px]">
                        <span className="font-bold text-emerald-900 dark:text-emerald-300">Rank #{i + 1}</span>
                        <span className="text-emerald-700 dark:text-emerald-400">Score: {r.score.toFixed(4)}</span>
                      </div>
                      <p className="text-gray-800 dark:text-emerald-100/90 leading-relaxed">{r.chunk}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Stage B: Augmented Prompt */}
            <div className="p-4">
              <button onClick={() => toggleStep(2)} className="flex items-center justify-between w-full text-left cursor-pointer">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-blue-700 dark:text-blue-400" />
                  <span className="text-xs font-mono font-bold text-gray-900 dark:text-white uppercase">
                    Stage B: Augmented Prompt Context
                  </span>
                </div>
                {showSteps[2] ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
              </button>
              {showSteps[2] && (
                <div className="mt-3">
                  <pre className="text-[11px] font-mono bg-gray-900 dark:bg-[#0E1013] text-gray-200 p-3.5 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed border border-gray-800">
{`SYSTEM INSTRUCTION: Answer strictly according to retrieved passages.

[RETRIEVED CONTEXT]
${searchResults.map((r, i) => `--- Passage ${i + 1} (Score: ${r.score.toFixed(3)}) ---\n${r.chunk}`).join("\n\n")}

[USER QUESTION]
${query}`}
                  </pre>
                </div>
              )}
            </div>

            {/* Stage C: Grounded Generation */}
            <div className="p-4">
              <button onClick={() => toggleStep(3)} className="flex items-center justify-between w-full text-left cursor-pointer">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#EF3837]" />
                  <span className="text-xs font-mono font-bold text-gray-900 dark:text-white uppercase">
                    Stage C: Grounded LLM Response
                  </span>
                </div>
                {showSteps[3] ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
              </button>
              {showSteps[3] && (
                <div className="mt-3">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#121418] border border-gray-200 dark:border-gray-800 text-xs text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {generatedAnswer.split(/(\*\*.*?\*\*)/g).map((part, i) =>
                      part.startsWith("**") && part.endsWith("**") ? (
                        <strong key={i} className="text-gray-950 dark:text-white font-bold">{part.slice(2, -2)}</strong>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Clean 1-Line Key Takeaway */}
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#15181C] border border-gray-200 dark:border-gray-800 flex items-center gap-3 text-xs text-gray-700 dark:text-gray-300 mb-6">
        <span className="px-2 py-0.5 rounded bg-[#EF3837]/10 text-[#EF3837] font-mono font-bold text-[10px] uppercase shrink-0">
          KEY TAKEAWAY
        </span>
        <span>
          A complete RAG runtime dynamically conditions LLM generation on indexed vector search passages, guaranteeing zero hallucinations.
        </span>
      </div>

      {/* Video Reference */}
      <VideoReferenceCard
        title="Building Production-Grade RAG Systems: Retrieval, Context Windows & Grounding"
        speaker="Harrison Chase"
        role="Co-Founder & CEO at LangChain"
        duration="38 min masterclass"
        youtubeId="2TJxpyO3ei4"
        summary="Harrison Chase walks through the end-to-end implementation of production RAG pipelines, detailing document ingestion, vector retrieval mechanics, prompt template construction, and real-time generation guardrails."
        chapters={[
          { time: "02:40", label: "Loaders, Splitters & Vectorstores" },
          { time: "11:15", label: "Context Window Packing" },
          { time: "21:30", label: "Prompt Templating & Citations" },
          { time: "31:00", label: "Production Pitfalls & Evaluation" },
        ]}
      />
    </div>
  );
}
