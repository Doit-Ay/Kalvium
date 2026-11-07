"use client";

import { motion } from "framer-motion";

export default function RagPipelineInfographic() {
  return (
    <div className="w-full rounded-2xl border border-gray-200/90 dark:border-gray-800 bg-white dark:bg-[#15181C] p-4 sm:p-6 shadow-xl shadow-black/[0.03] transition-all">
      <svg
        viewBox="0 0 1000 620"
        className="w-full h-auto select-none overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Arrowhead marker */}
          <marker
            id="rag-arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-gray-700 dark:fill-gray-300" />
          </marker>
          <marker
            id="rag-arrow-red"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#EF3837" />
          </marker>

          {/* Gradients */}
          <linearGradient id="userGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDBA74" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
          <linearGradient id="dbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="100%" stopColor="#1F2937" />
          </linearGradient>
          <linearGradient id="robotGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEE2E2" />
            <stop offset="100%" stopColor="#FECACA" />
          </linearGradient>
        </defs>

        {/* 1. Header Title: RAG PIPELINE */}
        <text x="35" y="55" className="font-extrabold tracking-tight">
          <tspan fill="#EF3837" fontSize="40" fontWeight="900" fontFamily="sans-serif">
            RAG{" "}
          </tspan>
          <tspan className="fill-[#191919] dark:fill-white" fontSize="40" fontWeight="900" fontFamily="sans-serif">
            PIPELINE
          </tspan>
        </text>

        {/* ======================================================== */}
        {/* CONNECTING ARROWS                                         */}
        {/* ======================================================== */}

        {/* Arrow 1: Raw Data -> Ingestion & Chunking */}
        <line
          x1="135"
          y1="250"
          x2="175"
          y2="250"
          strokeWidth="2.5"
          className="stroke-gray-700 dark:stroke-gray-300"
          markerEnd="url(#rag-arrow)"
        />

        {/* Arrow 2: Chunking -> Generate Embeddings */}
        <line
          x1="265"
          y1="250"
          x2="320"
          y2="250"
          strokeWidth="2.5"
          className="stroke-gray-700 dark:stroke-gray-300"
          markerEnd="url(#rag-arrow)"
        />

        {/* Arrow 3: Generate Embeddings -> Vector DB (Double Arrow) */}
        <line
          x1="410"
          y1="244"
          x2="465"
          y2="244"
          strokeWidth="2"
          className="stroke-gray-700 dark:stroke-gray-300"
          markerEnd="url(#rag-arrow)"
        />
        <line
          x1="465"
          y1="256"
          x2="410"
          y2="256"
          strokeWidth="2"
          className="stroke-gray-700 dark:stroke-gray-300"
          markerEnd="url(#rag-arrow)"
        />

        {/* Arrow 4: User Query -> Generate Embeddings (Pointing LEFT) */}
        <line
          x1="825"
          y1="120"
          x2="745"
          y2="120"
          strokeWidth="2.5"
          className="stroke-gray-700 dark:stroke-gray-300"
          markerEnd="url(#rag-arrow)"
        />

        {/* Arrow 5: Generate Embeddings -> Vector DB (Diagonal pointing DOWN-LEFT) */}
        <line
          x1="655"
          y1="150"
          x2="540"
          y2="215"
          strokeWidth="2.5"
          className="stroke-gray-700 dark:stroke-gray-300"
          markerEnd="url(#rag-arrow)"
        />

        {/* Arrow 6: Vector DB -> Relevant Information Fetched (Diagonal pointing DOWN-RIGHT) */}
        <line
          x1="540"
          y1="285"
          x2="655"
          y2="345"
          strokeWidth="2.5"
          className="stroke-gray-700 dark:stroke-gray-300"
          markerEnd="url(#rag-arrow)"
        />

        {/* Arrow 7: Relevant Information Fetched -> LLM (Pointing RIGHT) */}
        <line
          x1="745"
          y1="380"
          x2="830"
          y2="380"
          strokeWidth="2.5"
          className="stroke-gray-700 dark:stroke-gray-300"
          markerEnd="url(#rag-arrow)"
        />

        {/* Arrow 8: LLM -> Response (Pointing DOWN) */}
        <line
          x1="885"
          y1="435"
          x2="885"
          y2="495"
          strokeWidth="2.5"
          className="stroke-gray-700 dark:stroke-gray-300"
          markerEnd="url(#rag-arrow)"
        />

        {/* Animated Signal Pulses along key paths */}
        <circle r="3.5" fill="#EF3837">
          <animateMotion
            path="M 135 250 L 175 250 M 265 250 L 320 250 M 410 244 L 465 244"
            dur="3.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="3.5" fill="#EF3837">
          <animateMotion
            path="M 825 120 L 745 120 M 655 150 L 540 215 M 540 285 L 655 345 M 745 380 L 830 380 M 885 435 L 885 495"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>

        {/* ======================================================== */}
        {/* NODES & ICONS                                            */}
        {/* ======================================================== */}

        {/* --- NODE 1: RAW DATA (Center X=80, Y=250) --- */}
        <g transform="translate(80, 250)">
          {/* Document 1 (Amber, tilted) */}
          <rect x="-42" y="-36" width="34" height="48" rx="3" transform="rotate(-12)" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          {/* Document 2 (Blue) */}
          <rect x="-30" y="-38" width="34" height="52" rx="3" fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.5" />
          {/* Document 3 (Slate with DATA sticker) */}
          <rect x="-16" y="-30" width="38" height="56" rx="4" fill="#1F2937" stroke="#111827" strokeWidth="2" />
          {/* DATA sticker */}
          <rect x="-8" y="-18" width="24" height="11" rx="2" fill="#F59E0B" />
          <text x="4" y="-10" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
            DATA
          </text>
          {/* Content lines */}
          <line x1="-8" y1="2" x2="14" y2="2" stroke="#9CA3AF" strokeWidth="1.5" />
          <line x1="-8" y1="9" x2="14" y2="9" stroke="#9CA3AF" strokeWidth="1.5" />
          <line x1="-8" y1="16" x2="8" y2="16" stroke="#9CA3AF" strokeWidth="1.5" />
        </g>
        {/* Node 1 Label */}
        <text x="80" y="325" textAnchor="middle" className="fill-[#191919] dark:fill-white font-bold" fontSize="16" fontFamily="sans-serif">
          Raw Data
        </text>

        {/* --- NODE 2: DOCUMENT INGESTION AND CHUNKING (Center X=220, Y=250) --- */}
        <g transform="translate(220, 250)">
          {/* Top Doc */}
          <rect x="-18" y="-44" width="36" height="30" rx="3" className="fill-gray-100 dark:fill-gray-800 stroke-gray-700 dark:stroke-gray-300" strokeWidth="1.8" />
          <line x1="-10" y1="-36" x2="10" y2="-36" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="1.5" />
          <line x1="-10" y1="-30" x2="10" y2="-30" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="1.5" />
          <line x1="-10" y1="-24" x2="4" y2="-24" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="1.5" />

          {/* Dividing Arrow Down */}
          <line x1="0" y1="-8" x2="0" y2="6" stroke="#EF3837" strokeWidth="2.5" />
          <polygon points="0,11 -4,5 4,5" fill="#EF3837" />

          {/* 3 Split Chunks */}
          <rect x="-28" y="16" width="16" height="15" rx="2.5" fill="#FEE2E2" stroke="#EF3837" strokeWidth="1.5" />
          <line x1="-24" y1="23.5" x2="-16" y2="23.5" stroke="#EF3837" strokeWidth="1.5" />

          <rect x="-8" y="16" width="16" height="15" rx="2.5" fill="#FEE2E2" stroke="#EF3837" strokeWidth="1.5" />
          <line x1="-4" y1="23.5" x2="4" y2="23.5" stroke="#EF3837" strokeWidth="1.5" />

          <rect x="12" y="16" width="16" height="15" rx="2.5" fill="#FEE2E2" stroke="#EF3837" strokeWidth="1.5" />
          <line x1="16" y1="23.5" x2="24" y2="23.5" stroke="#EF3837" strokeWidth="1.5" />
        </g>
        {/* Node 2 Label */}
        <text x="220" y="325" textAnchor="middle" className="fill-[#191919] dark:fill-white font-bold" fontSize="15" fontFamily="sans-serif">
          Document
        </text>
        <text x="220" y="347" textAnchor="middle" fill="#EF3837" fontWeight="bold" fontSize="15" fontFamily="sans-serif">
          Ingestion and
        </text>
        <text x="220" y="369" textAnchor="middle" fill="#EF3837" fontWeight="bold" fontSize="15" fontFamily="sans-serif">
          Chunking
        </text>

        {/* --- NODE 3: GENERATE EMBEDDINGS (Center X=365, Y=250) --- */}
        <g transform="translate(365, 250)">
          {/* Pins with red contact beads */}
          {[-12, 0, 12].map((off) => (
            <g key={off}>
              <line x1="-32" y1={off} x2="-18" y2={off} className="stroke-gray-700 dark:stroke-gray-300" strokeWidth="2" />
              <circle cx="-34" cy={off} r="2.5" fill="#EF3837" />
              <line x1="18" y1={off} x2="32" y2={off} className="stroke-gray-700 dark:stroke-gray-300" strokeWidth="2" />
              <circle cx="34" cy={off} r="2.5" fill="#EF3837" />
              <line x1={off} y1="-32" x2={off} y2="-18" className="stroke-gray-700 dark:stroke-gray-300" strokeWidth="2" />
              <circle cx={off} cy="-34" r="2.5" fill="#EF3837" />
              <line x1={off} y1="18" x2={off} y2="32" className="stroke-gray-700 dark:stroke-gray-300" strokeWidth="2" />
              <circle cx={off} cy="34" r="2.5" fill="#EF3837" />
            </g>
          ))}
          {/* Chip Center Body */}
          <rect x="-18" y="-18" width="36" height="36" rx="6" className="fill-gray-100 dark:fill-[#1F242C] stroke-gray-800 dark:stroke-gray-400" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fill="#EF3837" fontSize="12" fontWeight="bold" fontFamily="monospace">
            &lt; / &gt;
          </text>
        </g>
        {/* Node 3 Label */}
        <text x="365" y="325" textAnchor="middle" className="fill-[#191919] dark:fill-white font-bold" fontSize="15" fontFamily="sans-serif">
          Generate
        </text>
        <text x="365" y="347" textAnchor="middle" fill="#EF3837" fontWeight="bold" fontSize="15" fontFamily="sans-serif">
          Embeddings
        </text>

        {/* --- NODE 4: VECTOR DATABASE (Center X=505, Y=250) --- */}
        <g transform="translate(505, 250)">
          {/* Cylinder Main Body */}
          <rect x="-26" y="-32" width="52" height="64" rx="10" fill="url(#dbGrad)" stroke="#111827" strokeWidth="2" />
          {/* Top ellipse disc */}
          <ellipse cx="0" cy="-32" rx="26" ry="12" fill="#4B5563" stroke="#111827" strokeWidth="2" />
          {/* Divider rings */}
          <ellipse cx="0" cy="-6" rx="26" ry="10" fill="none" stroke="#111827" strokeWidth="1.5" />
          <ellipse cx="0" cy="14" rx="26" ry="10" fill="none" stroke="#111827" strokeWidth="1.5" />

          {/* Multicolored Vector Data dots */}
          <circle cx="-13" cy="-14" r="2.5" fill="#34D399" />
          <circle cx="0" cy="-14" r="2.5" fill="#EF3837" />
          <circle cx="13" cy="-14" r="2.5" fill="#60A5FA" />

          <circle cx="-13" cy="5" r="2.5" fill="#FBBF24" />
          <circle cx="0" cy="5" r="2.5" fill="#34D399" />
          <circle cx="13" cy="5" r="2.5" fill="#EF3837" />

          <circle cx="-13" cy="22" r="2.5" fill="#60A5FA" />
          <circle cx="0" cy="22" r="2.5" fill="#EF3837" />
          <circle cx="13" cy="22" r="2.5" fill="#34D399" />

          {/* Accent Gear on lower right of DB */}
          <circle cx="24" cy="20" r="13" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
          <circle cx="24" cy="20" r="4.5" fill="#2563EB" />
        </g>
        {/* Node 4 Label */}
        <text x="505" y="325" textAnchor="middle" fill="#EF3837" fontWeight="bold" fontSize="16" fontFamily="sans-serif">
          Vector
        </text>
        <text x="505" y="347" textAnchor="middle" className="fill-[#191919] dark:fill-white font-bold" fontSize="16" fontFamily="sans-serif">
          Database
        </text>

        {/* --- NODE 5: USER QUERY (Center X=885, Y=120) --- */}
        <g transform="translate(885, 120)">
          {/* Head */}
          <circle cx="0" cy="-22" r="17" fill="url(#userGrad)" stroke="#C2410C" strokeWidth="1.8" />
          {/* Hair */}
          <path d="M -16 -24 Q 0 -42 16 -24 Q 8 -30 0 -28 Q -8 -30 -16 -24 Z" fill="#78350F" />
          {/* Shoulders / Torso */}
          <path d="M -26 22 C -26 -2, 26 -2, 26 22 Z" className="fill-gray-700 dark:fill-gray-400 stroke-gray-900 dark:stroke-gray-300" strokeWidth="1.8" />
        </g>
        {/* Node 5 Label */}
        <text x="885" y="172" textAnchor="middle" className="fill-[#191919] dark:fill-white font-bold" fontSize="15" fontFamily="sans-serif">
          User{" "}
          <tspan fill="#EF3837">Query</tspan>
        </text>

        {/* --- NODE 6: GENERATE EMBEDDINGS FOR QUERY (Center X=700, Y=120) --- */}
        <g transform="translate(700, 120)">
          {[-10, 0, 10].map((off) => (
            <g key={off}>
              <line x1="-28" y1={off} x2="-16" y2={off} className="stroke-gray-700 dark:stroke-gray-300" strokeWidth="2" />
              <circle cx="-30" cy={off} r="2.2" fill="#EF3837" />
              <line x1="16" y1={off} x2="28" y2={off} className="stroke-gray-700 dark:stroke-gray-300" strokeWidth="2" />
              <circle cx="30" cy={off} r="2.2" fill="#EF3837" />
              <line x1={off} y1="-28" x2={off} y2="-16" className="stroke-gray-700 dark:stroke-gray-300" strokeWidth="2" />
              <circle cx={off} cy="-30" r="2.2" fill="#EF3837" />
              <line x1={off} y1="16" x2={off} y2="28" className="stroke-gray-700 dark:stroke-gray-300" strokeWidth="2" />
              <circle cx={off} cy="30" r="2.2" fill="#EF3837" />
            </g>
          ))}
          <rect x="-16" y="-16" width="32" height="32" rx="5" className="fill-gray-100 dark:fill-[#1F242C] stroke-gray-800 dark:stroke-gray-400" strokeWidth="2" />
          <text x="0" y="4" textAnchor="middle" fill="#EF3837" fontSize="11" fontWeight="bold" fontFamily="monospace">
            &lt; / &gt;
          </text>
        </g>
        {/* Node 6 Label */}
        <text x="700" y="172" textAnchor="middle" className="fill-[#191919] dark:fill-white font-bold" fontSize="14" fontFamily="sans-serif">
          Generate
        </text>
        <text x="700" y="192" textAnchor="middle" fill="#EF3837" fontWeight="bold" fontSize="14" fontFamily="sans-serif">
          Embeddings
        </text>

        {/* --- NODE 7: RELEVANT INFORMATION FETCHED (Center X=700, Y=380) --- */}
        <g transform="translate(700, 380)">
          {/* Bar Chart */}
          <rect x="-26" y="-2" width="7" height="18" rx="1.5" className="fill-gray-800 dark:fill-gray-200" />
          <rect x="-15" y="-14" width="7" height="30" rx="1.5" className="fill-gray-800 dark:fill-gray-200" />
          <rect x="-4" y="-28" width="7" height="44" rx="1.5" className="fill-gray-800 dark:fill-gray-200" />
          <rect x="7" y="-10" width="7" height="26" rx="1.5" className="fill-gray-800 dark:fill-gray-200" />
          <rect x="18" y="-20" width="7" height="36" rx="1.5" className="fill-gray-800 dark:fill-gray-200" />

          {/* Polyline trend over bars */}
          <polyline
            points="-22.5,-4 -11.5,-16 -0.5,-30 10.5,-12 21.5,-22"
            fill="none"
            stroke="#EF3837"
            strokeWidth="2"
          />
          <circle cx="-0.5" cy="-30" r="3" fill="#EF3837" />

          {/* Magnifying Glass */}
          <circle cx="18" cy="-8" r="14" fill="none" className="stroke-gray-900 dark:stroke-white" strokeWidth="3" />
          <line x1="28" y1="2" x2="40" y2="14" className="stroke-gray-900 dark:stroke-white" strokeWidth="4" strokeLinecap="round" />
        </g>
        {/* Node 7 Label */}
        <text x="700" y="435" textAnchor="middle" className="fill-[#191919] dark:fill-white font-bold" fontSize="15" fontFamily="sans-serif">
          Relevant
        </text>
        <text x="700" y="455" textAnchor="middle" className="fill-[#191919] dark:fill-white font-bold" fontSize="15" fontFamily="sans-serif">
          Information Fetched
        </text>

        {/* --- NODE 8: LLM (Center X=885, Y=380) --- */}
        <g transform="translate(885, 380)">
          {/* Antenna */}
          <line x1="0" y1="-28" x2="0" y2="-40" className="stroke-gray-700 dark:stroke-gray-300" strokeWidth="2.5" />
          <circle cx="0" cy="-44" r="4.5" fill="#F59E0B" />

          {/* Head Body */}
          <rect x="-24" y="-28" width="48" height="38" rx="8" fill="url(#robotGrad)" stroke="#EF3837" strokeWidth="2.5" />

          {/* Eyes */}
          <circle cx="-10" cy="-12" r="4.5" fill="#EF3837" />
          <circle cx="10" cy="-12" r="4.5" fill="#EF3837" />
          <circle cx="-8" cy="-14" r="1.5" fill="#FFFFFF" />
          <circle cx="12" cy="-14" r="1.5" fill="#FFFFFF" />

          {/* Smile curve */}
          <path d="M -8 -1 Q 0 6 8 -1" fill="none" stroke="#EF3837" strokeWidth="2" strokeLinecap="round" />

          {/* Neck & Chest Body */}
          <rect x="-18" y="16" width="36" height="22" rx="5" className="fill-gray-800 dark:fill-gray-200 stroke-gray-950 dark:stroke-white" strokeWidth="1.8" />
          {/* Signal Indicator on chest */}
          <circle cx="0" cy="27" r="3" fill="#10B981" />
        </g>
        {/* Node 8 Label */}
        <text x="885" y="435" textAnchor="middle" fill="#EF3837" fontWeight="bold" fontSize="16" fontFamily="sans-serif">
          LLM
        </text>

        {/* --- NODE 9: RESPONSE (Center X=885, Y=540) --- */}
        <g transform="translate(885, 540)">
          {/* Rounded Response Capsule */}
          <rect
            x="-75"
            y="-22"
            width="150"
            height="44"
            rx="14"
            fill="#D1FAE5"
            stroke="#10B981"
            strokeWidth="2"
          />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fill="#065F46"
            fontSize="18"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            Response
          </text>
        </g>
      </svg>
    </div>
  );
}
