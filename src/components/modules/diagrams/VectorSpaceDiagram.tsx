"use client";

export default function VectorSpaceDiagram() {
  return (
    <div className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15181C] p-4 sm:p-5 shadow-xs overflow-hidden mb-6">
      <div className="flex items-center justify-between mb-3 text-xs font-mono">
        <span className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#EF3837] animate-pulse" />
          ANIMATED SCHEMATIC: TEXT TO GEOMETRIC VECTOR PROJECTION
        </span>
        <span className="text-[10px] text-gray-400">GEOMETRIC EMBEDDING</span>
      </div>

      <svg
        viewBox="0 0 880 230"
        className="w-full h-auto select-none overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="vec-arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-gray-600 dark:fill-gray-400" />
          </marker>
        </defs>

        {/* 1. Discrete Words Input */}
        <g transform="translate(100, 115)">
          <rect x="-65" y="-50" width="130" height="100" rx="10" className="fill-gray-50 dark:fill-[#1E2228] stroke-gray-300 dark:stroke-gray-700" strokeWidth="2" />
          <rect x="-50" y="-38" width="100" height="24" rx="6" fill="#FEE2E2" stroke="#EF3837" strokeWidth="1.5" />
          <text x="0" y="-22" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#EF3837">
            &quot;kitten&quot;
          </text>

          <rect x="-50" y="-8" width="100" height="24" rx="6" fill="#FEE2E2" stroke="#EF3837" strokeWidth="1.5" />
          <text x="0" y="8" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#EF3837">
            &quot;puppy&quot;
          </text>

          <rect x="-50" y="22" width="100" height="24" rx="6" className="fill-gray-100 dark:fill-gray-800" stroke="#9CA3AF" strokeWidth="1" />
          <text x="0" y="38" textAnchor="middle" fontSize="11" fontFamily="monospace" className="fill-gray-600 dark:fill-gray-400">
            &quot;laptop&quot;
          </text>

          <text x="0" y="70" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            1. Raw Text Tokens
          </text>
        </g>

        {/* Arrow 1 -> 2 */}
        <line x1="180" y1="115" x2="280" y2="115" strokeWidth="2.5" className="stroke-gray-400 dark:stroke-gray-600" markerEnd="url(#vec-arr)" />

        {/* 2. Neural Vector Transformer */}
        <g transform="translate(380, 115)">
          {/* Pins with beads */}
          {[-16, 0, 16].map((off) => (
            <g key={off}>
              <line x1="-50" y1={off} x2="-35" y2={off} className="stroke-gray-600 dark:stroke-gray-400" strokeWidth="2" />
              <circle cx="-52" cy={off} r="3" fill="#EF3837" />
              <line x1="35" y1={off} x2="50" y2={off} className="stroke-gray-600 dark:stroke-gray-400" strokeWidth="2" />
              <circle cx="52" cy={off} r="3" fill="#EF3837" />
            </g>
          ))}
          <rect x="-35" y="-45" width="70" height="90" rx="10" className="fill-white dark:fill-[#1E2228] stroke-gray-800 dark:stroke-gray-300" strokeWidth="2" />
          <text x="0" y="-12" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            Embedding
          </text>
          <text x="0" y="4" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" fill="#EF3837">
            Model
          </text>
          <text x="0" y="24" textAnchor="middle" fontSize="8" fontFamily="monospace" className="fill-gray-400">
            1536-D Output
          </text>

          <text x="0" y="70" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            2. Transformer Projection
          </text>
        </g>

        {/* Arrow 2 -> 3 */}
        <line x1="450" y1="115" x2="550" y2="115" strokeWidth="2.5" className="stroke-gray-400 dark:stroke-gray-600" markerEnd="url(#vec-arr)" />

        {/* 3. 3D Geometric Space & Angular Alignment */}
        <g transform="translate(710, 115)">
          <rect x="-110" y="-55" width="220" height="110" rx="10" className="fill-gray-50 dark:fill-[#1E2228] stroke-gray-300 dark:stroke-gray-700" strokeWidth="2" />

          {/* Coordinate axes */}
          <line x1="-80" y1="25" x2="80" y2="25" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="1.5" />
          <line x1="-80" y1="25" x2="-80" y2="-40" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="1.5" />
          <line x1="-80" y1="25" x2="-35" y2="45" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="1.5" />

          {/* Vector A (kitten) */}
          <line x1="-80" y1="25" x2="25" y2="-20" stroke="#EF3837" strokeWidth="2.5" markerEnd="url(#vec-arr)" />
          <circle cx="25" cy="-20" r="4" fill="#EF3837" />
          <text x="45" y="-22" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#EF3837">
            v(&quot;kitten&quot;)
          </text>

          {/* Vector B (puppy) */}
          <line x1="-80" y1="25" x2="35" y2="-5" stroke="#D97706" strokeWidth="2" markerEnd="url(#vec-arr)" />
          <circle cx="35" cy="-5" r="4" fill="#D97706" />
          <text x="50" y="-3" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#D97706">
            v(&quot;puppy&quot;)
          </text>

          {/* Acute angle arc */}
          <path d="M -40 8 A 45 45 0 0 1 -35 15" fill="none" stroke="#EF3837" strokeWidth="1.5" />
          <text x="-32" y="2" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#EF3837">
            θ ≈ 18°
          </text>

          {/* Orthogonal Vector C (laptop) */}
          <line x1="-80" y1="25" x2="-75" y2="-35" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="-65" y="-38" fontSize="8" fontFamily="monospace" className="fill-gray-500">
            v(&quot;laptop&quot;) [θ ≈ 84°]
          </text>

          <text x="0" y="70" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="bold" className="fill-gray-900 dark:fill-white">
            3. Geometric Vector Coordinates
          </text>
        </g>

        {/* Traveling Signal Pulse */}
        <circle r="4" fill="#EF3837">
          <animateMotion path="M 180 115 L 280 115 M 450 115 L 550 115" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
