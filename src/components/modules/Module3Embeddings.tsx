"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { Plus, RotateCcw, Info } from "lucide-react";
import { cosineSimilarity } from "@/lib/similarity";
import VectorSpaceDiagram from "@/components/modules/diagrams/VectorSpaceDiagram";
import VideoReferenceCard from "@/components/common/VideoReferenceCard";

interface WordItem {
  text: string;
  category: "Animals" | "Technology" | "Food" | "Custom";
  color: string;
}

const defaultWords: WordItem[] = [
  // Animals cluster
  { text: "cat", category: "Animals", color: "#D97706" },
  { text: "dog", category: "Animals", color: "#D97706" },
  { text: "wolf", category: "Animals", color: "#D97706" },
  { text: "fish", category: "Animals", color: "#D97706" },

  // Tech cluster
  { text: "computer", category: "Technology", color: "#475569" },
  { text: "software", category: "Technology", color: "#475569" },
  { text: "database", category: "Technology", color: "#475569" },
  { text: "algorithm", category: "Technology", color: "#475569" },

  // Food cluster
  { text: "pizza", category: "Food", color: "#EF3837" },
  { text: "burger", category: "Food", color: "#EF3837" },
  { text: "sushi", category: "Food", color: "#EF3837" },
  { text: "pasta", category: "Food", color: "#EF3837" },
];

const semanticPositions: Record<string, [number, number, number]> = {
  cat: [-2.1, 1.2, 0.4],
  dog: [-1.8, 1.4, -0.2],
  wolf: [-1.6, 1.6, 0.2],
  fish: [-2.3, 0.7, 0.8],
  puppy: [-1.9, 1.3, -0.4],
  kitten: [-2.2, 1.1, 0.5],

  computer: [2.0, -1.0, 0.5],
  software: [1.8, -1.3, 0.2],
  database: [2.3, -0.6, -0.3],
  algorithm: [2.1, -0.8, -0.5],
  laptop: [2.1, -1.1, 0.4],
  coding: [1.9, -1.4, -0.2],

  pizza: [0.0, 1.9, -1.8],
  burger: [-0.3, 1.7, -1.5],
  sushi: [0.4, 2.1, -2.0],
  pasta: [0.1, 2.3, -1.7],
  taco: [-0.2, 1.8, -1.6],
  sandwich: [-0.1, 1.6, -1.4],
};

function getPosition(word: string): [number, number, number] {
  const lower = word.toLowerCase().trim();
  if (semanticPositions[lower]) return semanticPositions[lower];

  let hash = 0;
  for (let i = 0; i < lower.length; i++) {
    hash = ((hash << 5) - hash) + lower.charCodeAt(i);
  }
  return [
    ((hash & 0xFF) / 128 - 1) * 2,
    (((hash >> 8) & 0xFF) / 128 - 1) * 2,
    (((hash >> 16) & 0xFF) / 128 - 1) * 2,
  ];
}

function projectTo2D(pos: [number, number, number], rotY: number, rotX: number): { x: number; y: number; z: number; scale: number } {
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const x1 = pos[0] * cosY - pos[2] * sinY;
  const z1 = pos[0] * sinY + pos[2] * cosY;
  const y1 = pos[1];

  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const y2 = y1 * cosX - z1 * sinX;
  const z2 = y1 * sinX + z1 * cosX;

  const distance = 5.5;
  const depth = distance + z2;
  const scale = distance / Math.max(depth, 1.0);

  return {
    x: x1 * scale * 78,
    y: -y2 * scale * 78,
    z: z2,
    scale,
  };
}

export default function Module3Embeddings() {
  const [words, setWords] = useState<WordItem[]>(defaultWords);
  const [newWord, setNewWord] = useState("");
  const [rotation, setRotation] = useState(0.5);
  const [pitch, setPitch] = useState(0.2);
  const [selectedWord, setSelectedWord] = useState<string>("cat");

  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; rotY: number; rotX: number }>({ x: 0, y: 0, rotY: 0.5, rotX: 0.2 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY, rotY: rotation, rotX: pitch };
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setRotation(dragStartRef.current.rotY + dx * 0.008);
      setPitch(Math.max(-0.8, Math.min(0.8, dragStartRef.current.rotX + dy * 0.008)));
    },
    [isDragging]
  );

  const handleMouseUp = () => setIsDragging(false);

  const addWord = () => {
    const trimmed = newWord.trim().toLowerCase();
    if (!trimmed) return;
    if (words.some((w) => w.text.toLowerCase() === trimmed)) return;

    const newItem: WordItem = {
      text: trimmed,
      category: "Custom",
      color: "#EF3837",
    };
    setWords((prev) => [...prev, newItem]);
    setSelectedWord(trimmed);
    setNewWord("");
  };

  const reset = () => {
    setWords(defaultWords);
    setSelectedWord("cat");
    setRotation(0.5);
    setPitch(0.2);
  };

  const sortedPoints = useMemo(() => {
    return words
      .map((item) => {
        const p3d = getPosition(item.text);
        const projected = projectTo2D(p3d, rotation, pitch);
        return { ...item, p3d, projected };
      })
      .sort((a, b) => a.projected.z - b.projected.z);
  }, [words, rotation, pitch]);

  const selectedItem = words.find((w) => w.text === selectedWord) || words[0];

  const similarities = useMemo(() => {
    const baseP = getPosition(selectedWord);
    return words
      .filter((w) => w.text !== selectedWord)
      .map((w) => {
        const targetP = getPosition(w.text);
        const sim = cosineSimilarity(baseP, targetP);
        const percentage = Math.max(0, Math.min(100, Math.round(((sim + 1) / 2) * 100)));
        return { text: w.text, category: w.category, similarity: sim, percentage };
      })
      .sort((a, b) => b.percentage - a.percentage);
  }, [selectedWord, words]);

  return (
    <div className="max-w-5xl mx-auto py-8 w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#EF3837]/10 text-[#EF3837] border border-[#EF3837]/20 font-bold">
            MODULE 03
          </span>
          <span>ESTIMATED: 6 MINUTES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          Vector Space & Semantic Clusters
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          Mathematical models map texts into multidimensional geometric points. Words with related meanings cluster together automatically.
        </p>
      </div>

      {/* Animated Vector Projection & Angle Diagram */}
      <div className="mb-6">
        <VectorSpaceDiagram />
      </div>

      {/* 3D Vector Space Studio Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15181C] overflow-hidden shadow-sm mb-6">
        {/* Controls: Rotate & Add Word */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-3 bg-gray-50/70 dark:bg-[#181B20]/70 justify-between items-center">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">Rotate Space:</span>
            <input
              type="range"
              min={-3.14}
              max={3.14}
              step={0.02}
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-40 accent-[#EF3837]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addWord()}
              placeholder="Add word (e.g. puppy)..."
              className="px-3 py-1.5 text-xs border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121418] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#EF3837]"
            />
            <button
              onClick={addWord}
              className="px-3 py-1.5 bg-[#EF3837] hover:bg-[#D92D20] text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <Plus size={13} /> Add
            </button>
            <button
              onClick={reset}
              className="p-1.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#15181C] text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              title="Reset Space"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* 3D Orbit Canvas */}
        <div
          className={`relative h-[340px] sm:h-[380px] bg-gradient-to-b from-gray-50/30 via-white to-gray-50/30 dark:from-[#121418] dark:via-[#15181C] dark:to-[#121418] select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg viewBox="-220 -180 440 360" className="w-full h-full pointer-events-none">
            <line x1="-190" y1="0" x2="190" y2="0" stroke="#e5e7eb" strokeWidth="0.8" strokeDasharray="3 3" className="dark:stroke-gray-800" />
            <line x1="0" y1="-150" x2="0" y2="150" stroke="#e5e7eb" strokeWidth="0.8" strokeDasharray="3 3" className="dark:stroke-gray-800" />

            {sortedPoints.map((point) => {
              const isSelected = point.text === selectedWord;
              const pointRadius = (isSelected ? 7.5 : 5) * point.projected.scale;
              const opacity = Math.max(0.45, Math.min(1.0, 0.4 + point.projected.scale * 0.6));

              return (
                <g
                  key={point.text}
                  onClick={() => setSelectedWord(point.text)}
                  className="cursor-pointer pointer-events-auto group"
                >
                  {isSelected && (
                    <circle
                      cx={point.projected.x}
                      cy={point.projected.y}
                      r={pointRadius + 5}
                      fill="none"
                      stroke="#EF3837"
                      strokeWidth="2"
                      strokeDasharray="3 2"
                    />
                  )}

                  <circle
                    cx={point.projected.x}
                    cy={point.projected.y}
                    r={pointRadius}
                    fill={isSelected ? "#EF3837" : point.color}
                    fillOpacity={opacity}
                    stroke="white"
                    strokeWidth="1.5"
                  />

                  <text
                    x={point.projected.x}
                    y={point.projected.y - pointRadius - 4}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="monospace"
                    fill={isSelected ? "#EF3837" : "#191919"}
                    className={isSelected ? "" : "dark:fill-white"}
                    fontWeight={isSelected ? "800" : "600"}
                    opacity={isSelected ? 1.0 : Math.max(0.7, opacity)}
                  >
                    {point.text}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Clean Legend */}
          <div className="absolute bottom-3 left-3 flex gap-3 text-xs font-mono bg-white/95 dark:bg-[#181B20]/95 backdrop-blur px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs pointer-events-auto">
            <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]" /> Animals
            </span>
            <span className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" /> Tech
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" /> Food
            </span>
          </div>

          <div className="absolute top-3 left-3 bg-white/90 dark:bg-[#181B20]/90 backdrop-blur px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-[11px] font-mono text-gray-500 dark:text-gray-400">
            Click any word or drag to rotate
          </div>
        </div>

        {/* Clean Similarity Scoreboard */}
        <div className="p-4 sm:p-5 bg-white dark:bg-[#15181C] border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-500 dark:text-gray-400">Selected:</span>
              <span className="px-2.5 py-0.5 rounded-lg bg-[#EF3837] text-white font-mono text-xs font-bold">
                &quot;{selectedWord}&quot;
              </span>
              <span className="text-xs font-mono text-gray-400">({selectedItem?.category})</span>
            </div>
            <span className="text-[11px] font-mono text-gray-400">Ranked by Cosine Proximity</span>
          </div>

          {/* Match Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {similarities.slice(0, 6).map((item) => {
              const isHigh = item.percentage >= 70;
              return (
                <button
                  key={item.text}
                  onClick={() => setSelectedWord(item.text)}
                  className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#EF3837] bg-gray-50/70 dark:bg-[#181B20] text-left transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-1 text-xs font-mono">
                    <span className="font-bold text-gray-900 dark:text-white truncate">{item.text}</span>
                    <span className={`font-bold ${isHigh ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`}>
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isHigh ? "bg-emerald-600" : "bg-gray-400"}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Clean 1-Line Key Takeaway */}
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#15181C] border border-gray-200 dark:border-gray-800 flex items-center gap-3 text-xs text-gray-700 dark:text-gray-300 mb-6">
        <span className="px-2 py-0.5 rounded bg-[#EF3837]/10 text-[#EF3837] font-mono font-bold text-[10px] uppercase shrink-0">
          KEY TAKEAWAY
        </span>
        <span>
          Words in the same topic score 70–95% similarity, while unrelated words score under 20%. RAG uses this distance to find relevant passages.
        </span>
      </div>

      {/* Video Reference */}
      <VideoReferenceCard
        title="How Large Language Models Map Human Thought to Geometric Vectors"
        speaker="Grant Sanderson"
        role="Creator of 3Blue1Brown / Stanford Mathematics"
        duration="27 min visual masterclass"
        youtubeId="wjZofJX0v4U"
        summary="Grant Sanderson visually animates how deep learning transformer models embed tokens into high-dimensional geometric spaces, demonstrating why semantic relationships emerge naturally as directional alignments and cosine clusters."
        chapters={[
          { time: "01:30", label: "Words as Vectors in High Dimensions" },
          { time: "09:45", label: "Semantic Directions & Word Math" },
          { time: "16:10", label: "Attention & Contextual Vector Warping" },
          { time: "22:50", label: "Dot Products as Attention Scores" },
        ]}
      />
    </div>
  );
}
