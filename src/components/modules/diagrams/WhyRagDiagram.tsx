"use client";

export default function WhyRagDiagram() {
  return (
    <div className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15181C] p-4 sm:p-5 shadow-xs overflow-hidden">
      <div className="flex items-center justify-between mb-3 text-xs font-mono">
        <span className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#EF3837] animate-pulse" />
          ARCHITECTURE DIAGRAM: PARAMETRIC GUESSING VS RAG GROUNDING
        </span>
        <span className="text-[10px] text-gray-400">DATAFLOW SCHEMATIC</span>
      </div>

      <svg
        viewBox="0 0 880 340"
        className="w-full h-auto select-none overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="flow-arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-gray-600 dark:fill-gray-400" />
          </marker>
          <marker id="flow-arr-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#EF3837" />
          </marker>
        </defs>

        {/* ================= PATH 1: PARAMETRIC ONLY (TOP) ================= */}
        {/* Background lane */}
        <rect x="20" y="30" width="840" height="125" rx="14" className="fill-amber-50/40 dark:fill-amber-950/10 stroke-amber-200/60 dark:stroke-amber-900/30" strokeWidth="1" />
        <text x="35" y="52" fontSize="10" fontFamily="monospace" fontWeight="bold" className="fill-amber-700 dark:fill-amber-400">
          PATH A: TRADITIONAL LLM (PARAMETRIC MEMORY ONLY)
        </text>

        {/* Node 1: User Query */}
        <g transform="translate(90, 95)">
          <circle cx="0" cy="-14" r="14" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
          <path d="M -18 18 C -18 2, 18 2, 18 18 Z" className="fill-gray-700 dark:fill-gray-300" />
          <text x="0" y="32" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-800 dark:fill-gray-200">
            User Query
          </text>
        </g>

        {/* Arrow 1 -> 2 */}
        <line x1="140" y1="95" x2="310" y2="95" strokeWidth="2" className="stroke-gray-400 dark:stroke-gray-600" markerEnd="url(#flow-arr)" />

        {/* Node 2: Frozen LLM */}
        <g transform="translate(370, 95)">
          <rect x="-55" y="-30" width="110" height="60" rx="10" className="fill-white dark:fill-[#1E2228] stroke-amber-500" strokeWidth="2" />
          <text x="0" y="-8" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            Frozen LLM
          </text>
          <text x="0" y="8" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#D97706" fontWeight="bold">
            TRAINING CUTOFF
          </text>
          <text x="0" y="20" textAnchor="middle" fontSize="8" fontFamily="monospace" className="fill-gray-400">
            (No Live Search)
          </text>
        </g>

        {/* Arrow 2 -> 3 */}
        <line x1="430" y1="95" x2="630" y2="95" strokeWidth="2" className="stroke-gray-400 dark:stroke-gray-600" markerEnd="url(#flow-arr)" />

        {/* Node 3: Hallucinated Output */}
        <g transform="translate(710, 95)">
          <rect x="-70" y="-30" width="140" height="60" rx="10" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2" />
          <text x="0" y="-6" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="bold" fill="#DC2626">
            Hallucination
          </text>
          <text x="0" y="12" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#991B1B">
            Plausible but false
          </text>
        </g>

        {/* Animated Pulse Top */}
        <circle r="4" fill="#D97706">
          <animateMotion path="M 140 95 L 310 95 M 430 95 L 630 95" dur="2.5s" repeatCount="indefinite" />
        </circle>

        {/* ================= PATH 2: WITH RAG (BOTTOM) ================= */}
        {/* Background lane */}
        <rect x="20" y="175" width="840" height="145" rx="14" className="fill-emerald-50/40 dark:fill-emerald-950/10 stroke-emerald-200/60 dark:stroke-emerald-900/30" strokeWidth="1" />
        <text x="35" y="196" fontSize="10" fontFamily="monospace" fontWeight="bold" className="fill-emerald-700 dark:fill-emerald-400">
          PATH B: RETRIEVAL-AUGMENTED GENERATION (NON-PARAMETRIC GROUNDING)
        </text>

        {/* Node 1: User Query */}
        <g transform="translate(90, 255)">
          <circle cx="0" cy="-14" r="14" fill="#D1FAE5" stroke="#059669" strokeWidth="1.5" />
          <path d="M -18 18 C -18 2, 18 2, 18 18 Z" className="fill-gray-700 dark:fill-gray-300" />
          <text x="0" y="32" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-800 dark:fill-gray-200">
            User Query
          </text>
        </g>

        {/* Arrow to Retriever */}
        <line x1="140" y1="255" x2="220" y2="255" strokeWidth="2" className="stroke-gray-400 dark:stroke-gray-600" markerEnd="url(#flow-arr)" />

        {/* Node 2: Document Retriever */}
        <g transform="translate(280, 255)">
          <rect x="-50" y="-30" width="100" height="60" rx="10" className="fill-white dark:fill-[#1E2228] stroke-gray-700 dark:stroke-gray-400" strokeWidth="1.8" />
          <text x="0" y="-8" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            Retriever
          </text>
          <text x="0" y="8" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#059669" fontWeight="bold">
            Vector DB Index
          </text>
          <text x="0" y="20" textAnchor="middle" fontSize="8" fontFamily="monospace" className="fill-gray-400">
            Verified docs
          </text>
        </g>

        {/* Arrow to Prompt Context */}
        <line x1="335" y1="255" x2="415" y2="255" strokeWidth="2" className="stroke-gray-400 dark:stroke-gray-600" markerEnd="url(#flow-arr)" />

        {/* Node 3: Augmented Prompt */}
        <g transform="translate(480, 255)">
          <rect x="-55" y="-30" width="110" height="60" rx="10" className="fill-white dark:fill-[#1E2228] stroke-[#EF3837]" strokeWidth="2" />
          <text x="0" y="-8" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" fill="#EF3837">
            Augmented Context
          </text>
          <text x="0" y="8" textAnchor="middle" fontSize="9" fontFamily="monospace" className="fill-gray-700 dark:fill-gray-300">
            Query + Docs
          </text>
          <text x="0" y="20" textAnchor="middle" fontSize="8" fontFamily="monospace" className="fill-gray-400">
            Closed-Book
          </text>
        </g>

        {/* Arrow to LLM */}
        <line x1="540" y1="255" x2="615" y2="255" strokeWidth="2" className="stroke-gray-400 dark:stroke-gray-600" markerEnd="url(#flow-arr)" />

        {/* Node 4: Grounded LLM */}
        <g transform="translate(660, 255)">
          <rect x="-40" y="-30" width="80" height="60" rx="10" className="fill-white dark:fill-[#1E2228] stroke-emerald-600" strokeWidth="1.8" />
          <text x="0" y="-4" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            LLM
          </text>
          <text x="0" y="12" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#059669" fontWeight="bold">
            SYNTHESIS
          </text>
        </g>

        {/* Arrow to Verified Response */}
        <line x1="705" y1="255" x2="755" y2="255" strokeWidth="2" className="stroke-gray-400 dark:stroke-gray-600" markerEnd="url(#flow-arr)" />

        {/* Node 5: Verified Response */}
        <g transform="translate(810, 255)">
          <rect x="-50" y="-25" width="100" height="50" rx="12" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
          <text x="0" y="2" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" fill="#065F46">
            100% Verified
          </text>
          <text x="0" y="15" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#047857">
            With Citations
          </text>
        </g>

        {/* Animated Pulse Bottom */}
        <circle r="4" fill="#EF3837">
          <animateMotion path="M 140 255 L 220 255 M 335 255 L 415 255 M 540 255 L 615 255 M 705 255 L 755 255" dur="2.8s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
