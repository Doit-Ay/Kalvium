"use client";

export default function VectorSearchDiagram() {
  return (
    <div className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15181C] p-4 sm:p-5 shadow-xs overflow-hidden mb-6">
      <div className="flex items-center justify-between mb-3 text-xs font-mono">
        <span className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#EF3837] animate-pulse" />
          ANIMATED SCHEMATIC: NEAREST NEIGHBOR SIMILARITY RETRIEVAL
        </span>
        <span className="text-[10px] text-gray-400">VECTOR RETRIEVAL</span>
      </div>

      <svg
        viewBox="0 0 880 220"
        className="w-full h-auto select-none overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="src-arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-gray-600 dark:fill-gray-400" />
          </marker>
        </defs>

        {/* 1. Natural Language Query Vector */}
        <g transform="translate(100, 110)">
          <rect x="-65" y="-50" width="130" height="100" rx="10" className="fill-gray-50 dark:fill-[#1E2228] stroke-gray-300 dark:stroke-gray-700" strokeWidth="2" />
          <circle cx="0" cy="-14" r="14" fill="#FEE2E2" stroke="#EF3837" strokeWidth="1.5" />
          <path d="M -16 16 C -16 2, 16 2, 16 16 Z" fill="#EF3837" />

          <text x="0" y="32" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#EF3837">
            q_vec: [1536]
          </text>

          <text x="0" y="70" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            1. Query Vector
          </text>
        </g>

        {/* Arrow 1 -> 2 */}
        <line x1="180" y1="110" x2="270" y2="110" strokeWidth="2.5" className="stroke-gray-400 dark:stroke-gray-600" markerEnd="url(#src-arr)" />

        {/* 2. Vector Database ANN Engine */}
        <g transform="translate(370, 110)">
          {/* Cylinder shape */}
          <rect x="-55" y="-50" width="110" height="100" rx="14" className="fill-white dark:fill-[#1E2228] stroke-gray-800 dark:stroke-gray-300" strokeWidth="2" />
          <ellipse cx="0" cy="-50" rx="55" ry="14" className="fill-gray-100 dark:fill-[#252A32] stroke-gray-800 dark:stroke-gray-300" strokeWidth="1.8" />
          <line x1="-55" y1="-10" x2="55" y2="-10" className="stroke-gray-300 dark:stroke-gray-700" strokeWidth="1.5" />
          <line x1="-55" y1="20" x2="55" y2="20" className="stroke-gray-300 dark:stroke-gray-700" strokeWidth="1.5" />

          {/* Dots */}
          <circle cx="-25" cy="-28" r="3" fill="#10B981" />
          <circle cx="0" cy="-28" r="3" fill="#EF3837" />
          <circle cx="25" cy="-28" r="3" fill="#3B82F6" />

          <circle cx="-20" cy="5" r="3" fill="#3B82F6" />
          <circle cx="10" cy="5" r="3" fill="#10B981" />
          <circle cx="30" cy="5" r="3" fill="#EF3837" />

          <text x="0" y="70" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            2. Cosine Distance
          </text>
          <text x="0" y="85" textAnchor="middle" fontSize="9" fontFamily="monospace" className="fill-gray-400">
            cos(θ) = (A · B) / (|A||B|)
          </text>
        </g>

        {/* Arrow 2 -> 3 */}
        <line x1="440" y1="110" x2="540" y2="110" strokeWidth="2.5" className="stroke-gray-400 dark:stroke-gray-600" markerEnd="url(#src-arr)" />

        {/* 3. Top-K Ranked Matches */}
        <g transform="translate(690, 110)">
          <rect x="-110" y="-55" width="220" height="110" rx="10" className="fill-gray-50 dark:fill-[#1E2228] stroke-gray-300 dark:stroke-gray-700" strokeWidth="2" />

          {/* Match 1 */}
          <rect x="-95" y="-42" width="190" height="24" rx="6" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
          <text x="-80" y="-26" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#065F46">
            Rank #1 (Score: 0.942)
          </text>

          {/* Match 2 */}
          <rect x="-95" y="-12" width="190" height="24" rx="6" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
          <text x="-80" y="4" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#065F46">
            Rank #2 (Score: 0.887)
          </text>

          {/* Match 3 */}
          <rect x="-95" y="18" width="190" height="24" rx="6" className="fill-gray-100 dark:fill-gray-800" stroke="#9CA3AF" strokeWidth="1" />
          <text x="-80" y="34" fontSize="10" fontFamily="monospace" className="fill-gray-600 dark:fill-gray-400">
            Rank #3 (Score: 0.764)
          </text>

          <text x="0" y="70" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            3. Top-K Filtered Chunks
          </text>
        </g>

        {/* Traveling Signal Pulse */}
        <circle r="4" fill="#EF3837">
          <animateMotion path="M 180 110 L 270 110 M 440 110 L 540 110" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
