"use client";

export default function ChunkingDiagram() {
  return (
    <div className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15181C] p-4 sm:p-5 shadow-xs overflow-hidden mb-6">
      <div className="flex items-center justify-between mb-3 text-xs font-mono">
        <span className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#EF3837] animate-pulse" />
          ANIMATED SCHEMATIC: TOKEN SCANNING & SLIDING OVERLAP
        </span>
        <span className="text-[10px] text-gray-400">INGESTION PIPELINE</span>
      </div>

      <svg
        viewBox="0 0 880 220"
        className="w-full h-auto select-none overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="chk-arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-gray-600 dark:fill-gray-400" />
          </marker>
        </defs>

        {/* Step 1: Raw Document */}
        <g transform="translate(90, 110)">
          <rect x="-45" y="-55" width="90" height="110" rx="8" className="fill-gray-50 dark:fill-[#1E2228] stroke-gray-300 dark:stroke-gray-700" strokeWidth="2" />
          <line x1="-30" y1="-35" x2="30" y2="-35" className="stroke-gray-400 dark:stroke-gray-600" strokeWidth="2" />
          <line x1="-30" y1="-22" x2="30" y2="-22" className="stroke-gray-400 dark:stroke-gray-600" strokeWidth="2" />
          <line x1="-30" y1="-9" x2="15" y2="-9" className="stroke-gray-400 dark:stroke-gray-600" strokeWidth="2" />
          <line x1="-30" y1="4" x2="30" y2="4" className="stroke-gray-400 dark:stroke-gray-600" strokeWidth="2" />
          <line x1="-30" y1="17" x2="25" y2="17" className="stroke-gray-400 dark:stroke-gray-600" strokeWidth="2" />
          <line x1="-30" y1="30" x2="0" y2="30" className="stroke-gray-400 dark:stroke-gray-600" strokeWidth="2" />

          {/* Animated Scanner Beam */}
          <line x1="-42" y1="0" x2="42" y2="0" stroke="#EF3837" strokeWidth="3" opacity="0.9">
            <animate attributeName="y1" values="-45;45;-45" dur="3s" repeatCount="indefinite" />
            <animate attributeName="y2" values="-45;45;-45" dur="3s" repeatCount="indefinite" />
          </line>

          <text x="0" y="75" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            1. Raw Document
          </text>
          <text x="0" y="90" textAnchor="middle" fontSize="9" fontFamily="monospace" className="fill-gray-400">
            5,000+ Tokens
          </text>
        </g>

        {/* Arrow 1 -> 2 */}
        <line x1="150" y1="110" x2="250" y2="110" strokeWidth="2.5" className="stroke-gray-400 dark:stroke-gray-600" markerEnd="url(#chk-arr)" />

        {/* Step 2: Sliding Window Scanner */}
        <g transform="translate(360, 110)">
          <rect x="-85" y="-55" width="170" height="110" rx="10" className="fill-white dark:fill-[#1E2228] stroke-gray-300 dark:stroke-gray-700" strokeWidth="2" />
          <text x="0" y="-32" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            2. Sliding Window (Recursive)
          </text>

          {/* Window Frame */}
          <rect x="-65" y="-18" width="130" height="34" rx="6" fill="#FEE2E2" stroke="#EF3837" strokeWidth="2" />
          <text x="0" y="4" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#EF3837">
            CHUNK SIZE: 300 TOKENS
          </text>

          {/* Overlap Marker */}
          <rect x="25" y="-18" width="40" height="34" rx="4" fill="#FCA5A5" opacity="0.6" />
          <text x="45" y="4" textAnchor="middle" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#991B1B">
            OVERLAP
          </text>

          <text x="0" y="75" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            Delimiter Parser
          </text>
          <text x="0" y="90" textAnchor="middle" fontSize="9" fontFamily="monospace" className="fill-gray-400">
            Paragraphs → Sentences
          </text>
        </g>

        {/* Arrow 2 -> 3 */}
        <line x1="460" y1="110" x2="560" y2="110" strokeWidth="2.5" className="stroke-gray-400 dark:stroke-gray-600" markerEnd="url(#chk-arr)" />

        {/* Step 3: Partitioned Chunks */}
        <g transform="translate(710, 110)">
          {/* Chunk 1 */}
          <rect x="-120" y="-45" width="70" height="80" rx="8" className="fill-gray-50 dark:fill-[#1E2228] stroke-gray-300 dark:stroke-gray-700" strokeWidth="1.8" />
          <rect x="-115" y="-38" width="60" height="14" rx="3" fill="#EF3837" />
          <text x="-85" y="-28" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="white" fontWeight="bold">
            CHUNK #1
          </text>
          <line x1="-110" y1="-12" x2="-60" y2="-12" className="stroke-gray-400" strokeWidth="1.5" />
          <line x1="-110" y1="-2" x2="-70" y2="-2" className="stroke-gray-400" strokeWidth="1.5" />
          {/* Overlap Tail */}
          <rect x="-70" y="8" width="20" height="22" rx="2" fill="#FCA5A5" opacity="0.7" />

          {/* Chunk 2 */}
          <rect x="-35" y="-45" width="70" height="80" rx="8" className="fill-gray-50 dark:fill-[#1E2228] stroke-[#EF3837]" strokeWidth="2" />
          <rect x="-30" y="-38" width="60" height="14" rx="3" fill="#EF3837" />
          <text x="0" y="-28" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="white" fontWeight="bold">
            CHUNK #2
          </text>
          {/* Overlap Head */}
          <rect x="-30" y="-18" width="20" height="22" rx="2" fill="#FCA5A5" opacity="0.7" />
          <line x1="-25" y1="12" x2="25" y2="12" className="stroke-gray-400" strokeWidth="1.5" />
          <line x1="-25" y1="22" x2="15" y2="22" className="stroke-gray-400" strokeWidth="1.5" />

          {/* Chunk 3 */}
          <rect x="50" y="-45" width="70" height="80" rx="8" className="fill-gray-50 dark:fill-[#1E2228] stroke-gray-300 dark:stroke-gray-700" strokeWidth="1.8" />
          <rect x="55" y="-38" width="60" height="14" rx="3" fill="#EF3837" />
          <text x="85" y="-28" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="white" fontWeight="bold">
            CHUNK #3
          </text>
          <line x1="60" y1="-12" x2="110" y2="-12" className="stroke-gray-400" strokeWidth="1.5" />
          <line x1="60" y1="-2" x2="100" y2="-2" className="stroke-gray-400" strokeWidth="1.5" />

          <text x="0" y="75" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            3. Uniform Chunks + Overlap
          </text>
          <text x="0" y="90" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#EF3837" fontWeight="bold">
            Ready for Vector Index
          </text>
        </g>

        {/* Traveling Signal Pulse */}
        <circle r="4" fill="#EF3837">
          <animateMotion path="M 150 110 L 250 110 M 460 110 L 560 110" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
