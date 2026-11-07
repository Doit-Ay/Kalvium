"use client";

import { useState } from "react";
import { Play, Video, Clock, X, ExternalLink, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoReferenceProps {
  title: string;
  speaker: string;
  role: string;
  duration: string;
  youtubeId: string;
  summary: string;
  chapters: { time: string; label: string }[];
}

export default function VideoReferenceCard({
  title,
  speaker,
  role,
  duration,
  youtubeId,
  summary,
  chapters,
}: VideoReferenceProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Video Reference Trigger Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15181C] p-4 sm:p-5 shadow-xs transition-all hover:border-gray-300 dark:hover:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left info */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#1E2228] border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#EF3837] shrink-0 mt-0.5">
              <Video size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#EF3837] font-bold">
                  CURATED VIDEO REFERENCE
                </span>
                <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">·</span>
                <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Clock size={10} /> {duration}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-snug">
                {title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Lecture by <strong className="text-gray-700 dark:text-gray-300 font-semibold">{speaker}</strong> · {role}
              </p>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="flex items-center gap-2 shrink-0 sm:self-center">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 rounded-xl text-xs font-semibold font-mono transition-all shadow-2xs cursor-pointer group"
            >
              <Play size={13} className="text-[#EF3837] fill-[#EF3837] group-hover:scale-110 transition-transform" />
              <span>Watch Lecture</span>
            </button>
            <a
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1E2228] text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              title="Open directly on YouTube"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Chapters Strip */}
        <div className="mt-3.5 pt-3.5 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-2 text-[11px] font-mono">
          <span className="text-gray-400 dark:text-gray-500 uppercase text-[10px] mr-1">Key Chapters:</span>
          {chapters.map((ch, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md bg-gray-50 dark:bg-[#181B20] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            >
              <span className="text-[#EF3837] font-semibold mr-1">{ch.time}</span>
              {ch.label}
            </span>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl bg-white dark:bg-[#15181C] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-[#181B20]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EF3837]" />
                  <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white font-mono truncate">
                    {title} — {speaker}
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Video Player Embed */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Modal Footer Summary */}
              <div className="p-4 bg-white dark:bg-[#15181C] text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2 leading-relaxed">
                <BookOpen size={14} className="text-[#EF3837] shrink-0 mt-0.5" />
                <span>{summary}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
