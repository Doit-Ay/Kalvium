"use client";

export default function FullPipelineDiagram() {
  return (
    <div className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15181C] p-4 sm:p-5 shadow-xs overflow-hidden mb-6">
      <div className="flex items-center justify-between mb-3 text-xs font-mono">
        <span className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#EF3837] animate-pulse" />
          FULL RAG PIPELINE DATAFLOW ARCHITECTURE
        </span>
        <span className="text-[10px] text-gray-400">END-TO-END RUNTIME</span>
      </div>

      <svg
        viewBox="0 0 960 480"
        className="w-full h-auto select-none overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="fp-arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-gray-600 dark:fill-gray-400" />
          </marker>
        </defs>

        {/* 1. Raw Data */}
        <g transform="translate(80, 200)">
          <rect x="-35" y="-30" width="30" height="42" rx="3" transform="rotate(-12)" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          <rect x="-24" y="-32" width="30" height="46" rx="3" fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.5" />
          <rect x="-12" y="-25" width="34" height="50" rx="4" fill="#1F2937" stroke="#111827" strokeWidth="2" />
          <rect x="-5" y="-14" width="20" height="9" rx="2" fill="#F59E0B" />
          <text x="5" y="-7" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold" fontFamily="sans-serif">
            DATA
          </text>
          <text x="0" y="45" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            Raw Data
          </text>
        </g>

        {/* Arrow 1 -> 2 */}
        <line x1="130" y1="200" x2="190" y2="200" strokeWidth="2.5" className="stroke-gray-500 dark:stroke-gray-400" markerEnd="url(#fp-arr)" />

        {/* 2. Ingestion & Chunking */}
        <g transform="translate(250, 200)">
          <rect x="-18" y="-35" width="36" height="28" rx="3" className="fill-gray-100 dark:fill-gray-800 stroke-gray-700 dark:stroke-gray-300" strokeWidth="1.8" />
          <line x1="-10" y1="-28" x2="10" y2="-28" className="stroke-gray-400" strokeWidth="1.5" />
          <line x1="-10" y1="-20" x2="6" y2="-20" className="stroke-gray-400" strokeWidth="1.5" />
          {/* Down arrow */}
          <line x1="0" y1="-3" x2="0" y2="8" stroke="#EF3837" strokeWidth="2" />
          <polygon points="0,12 -3,7 3,7" fill="#EF3837" />
          {/* 3 split boxes */}
          <rect x="-22" y="16" width="12" height="12" rx="2" fill="#FEE2E2" stroke="#EF3837" strokeWidth="1.2" />
          <rect x="-6" y="16" width="12" height="12" rx="2" fill="#FEE2E2" stroke="#EF3837" strokeWidth="1.2" />
          <rect x="10" y="16" width="12" height="12" rx="2" fill="#FEE2E2" stroke="#EF3837" strokeWidth="1.2" />

          <text x="0" y="45" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            Document
          </text>
          <text x="0" y="60" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" fill="#EF3837">
            Chunking
          </text>
        </g>

        {/* Arrow 2 -> 3 */}
        <line x1="305" y1="200" x2="365" y2="200" strokeWidth="2.5" className="stroke-gray-500 dark:stroke-gray-400" markerEnd="url(#fp-arr)" />

        {/* 3. Generate Embeddings */}
        <g transform="translate(425, 200)">
          {[-10, 0, 10].map((off) => (
            <g key={off}>
              <line x1="-28" y1={off} x2="-18" y2={off} className="stroke-gray-700 dark:stroke-gray-300" strokeWidth="2" />
              <circle cx="-30" cy={off} r="2" fill="#EF3837" />
              <line x1="18" y1={off} x2="28" y2={off} className="stroke-gray-700 dark:stroke-gray-300" strokeWidth="2" />
              <circle cx="30" cy={off} r="2" fill="#EF3837" />
            </g>
          ))}
          <rect x="-18" y="-18" width="36" height="36" rx="6" className="fill-gray-100 dark:fill-[#1E2228] stroke-gray-800 dark:stroke-gray-300" strokeWidth="2" />
          <text x="0" y="4" textAnchor="middle" fill="#EF3837" fontSize="11" fontWeight="bold" fontFamily="monospace">
            &lt; / &gt;
          </text>
          <text x="0" y="45" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            Generate
          </text>
          <text x="0" y="60" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" fill="#EF3837">
            Vectors
          </text>
        </g>

        {/* Double Arrow 3 <-> 4 */}
        <line x1="475" y1="195" x2="525" y2="195" strokeWidth="2" className="stroke-gray-500 dark:stroke-gray-400" markerEnd="url(#fp-arr)" />
        <line x1="525" y1="205" x2="475" y2="205" strokeWidth="2" className="stroke-gray-500 dark:stroke-gray-400" markerEnd="url(#fp-arr)" />

        {/* 4. Vector Database */}
        <g transform="translate(570, 200)">
          <rect x="-24" y="-30" width="48" height="60" rx="10" fill="#374151" stroke="#111827" strokeWidth="2" />
          <ellipse cx="0" cy="-30" rx="24" ry="10" fill="#4B5563" stroke="#111827" strokeWidth="1.8" />
          <ellipse cx="0" cy="-5" rx="24" ry="8" fill="none" stroke="#111827" strokeWidth="1.2" />
          <ellipse cx="0" cy="14" rx="24" ry="8" fill="none" stroke="#111827" strokeWidth="1.2" />
          <circle cx="-10" cy="-14" r="2.5" fill="#34D399" />
          <circle cx="2" cy="-14" r="2.5" fill="#EF3837" />
          <circle cx="12" cy="-14" r="2.5" fill="#60A5FA" />
          <circle cx="22" cy="18" r="11" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
          <circle cx="22" cy="18" r="4" fill="#2563EB" />

          <text x="0" y="45" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="bold" fill="#EF3837">
            Vector DB
          </text>
          <text x="0" y="60" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            Index
          </text>
        </g>

        {/* Top-Right: User Query -> Embeddings -> Vector DB */}
        <g transform="translate(840, 90)">
          <circle cx="0" cy="-14" r="13" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5" />
          <path d="M -16 14 C -16 2, 16 2, 16 14 Z" className="fill-gray-700 dark:fill-gray-300" />
          <text x="0" y="30" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            User Query
          </text>
        </g>

        {/* Arrow User -> Embeddings */}
        <line x1="795" y1="90" x2="745" y2="90" strokeWidth="2.5" className="stroke-gray-500 dark:stroke-gray-400" markerEnd="url(#fp-arr)" />

        {/* Query Embeddings Chip */}
        <g transform="translate(700, 90)">
          <rect x="-16" y="-16" width="32" height="32" rx="5" className="fill-gray-100 dark:fill-[#1E2228] stroke-gray-800 dark:stroke-gray-300" strokeWidth="2" />
          <text x="0" y="4" textAnchor="middle" fill="#EF3837" fontSize="11" fontWeight="bold" fontFamily="monospace">
            &lt; / &gt;
          </text>
          <text x="0" y="30" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#EF3837">
            Vectorize
          </text>
        </g>

        {/* Arrow Embeddings -> Vector DB (Down-Left) */}
        <line x1="665" y1="110" x2="600" y2="165" strokeWidth="2.5" className="stroke-gray-500 dark:stroke-gray-400" markerEnd="url(#fp-arr)" />

        {/* Bottom-Right: Vector DB -> Relevant Info -> LLM -> Response */}
        <line x1="600" y1="235" x2="665" y2="290" strokeWidth="2.5" className="stroke-gray-500 dark:stroke-gray-400" markerEnd="url(#fp-arr)" />

        {/* Relevant Info Fetched */}
        <g transform="translate(710, 315)">
          <rect x="-20" y="0" width="6" height="15" rx="1" className="fill-gray-700 dark:fill-gray-300" />
          <rect x="-10" y="-10" width="6" height="25" rx="1" className="fill-gray-700 dark:fill-gray-300" />
          <rect x="0" y="-22" width="6" height="37" rx="1" className="fill-gray-700 dark:fill-gray-300" />
          <rect x="10" y="-6" width="6" height="21" rx="1" className="fill-gray-700 dark:fill-gray-300" />
          <circle cx="15" cy="-8" r="10" fill="none" stroke="#EF3837" strokeWidth="2.5" />
          <line x1="22" y1="-1" x2="30" y2="7" stroke="#EF3837" strokeWidth="3" strokeLinecap="round" />

          <text x="0" y="32" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            Top-K Matches
          </text>
        </g>

        {/* Arrow Info -> LLM */}
        <line x1="755" y1="315" x2="810" y2="315" strokeWidth="2.5" className="stroke-gray-500 dark:stroke-gray-400" markerEnd="url(#fp-arr)" />

        {/* LLM Robot */}
        <g transform="translate(850, 315)">
          <rect x="-18" y="-20" width="36" height="28" rx="6" fill="#FEE2E2" stroke="#EF3837" strokeWidth="2" />
          <circle cx="-7" cy="-8" r="3" fill="#EF3837" />
          <circle cx="7" cy="-8" r="3" fill="#EF3837" />
          <rect x="-12" y="12" width="24" height="16" rx="3" className="fill-gray-800 dark:fill-gray-200" />
          <text x="0" y="42" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" fill="#EF3837">
            LLM
          </text>
        </g>

        {/* Arrow LLM -> Response */}
        <line x1="850" y1="345" x2="850" y2="400" strokeWidth="2.5" className="stroke-gray-500 dark:stroke-gray-400" markerEnd="url(#fp-arr)" />

        {/* Response Capsule */}
        <g transform="translate(850, 425)">
          <rect x="-65" y="-18" width="130" height="36" rx="12" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fill="#065F46" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
            Response
          </text>
        </g>

        {/* Animated Pulses */}
        <circle r="3.5" fill="#EF3837">
          <animateMotion path="M 130 200 L 190 200 M 305 200 L 365 200 M 475 195 L 525 195" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="3.5" fill="#EF3837">
          <animateMotion path="M 795 90 L 745 90 M 665 110 L 600 165 M 600 235 L 665 290 M 755 315 L 810 315 M 850 345 L 850 400" dur="3.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
