"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, ChevronDown, RefreshCw, CheckCircle2 } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

// Module-specific doubts for fast student guidance
const contextualDoubts: Record<number, string[]> = {
  0: [
    "Why can't we just fine-tune an LLM on private documents?",
    "What causes hallucinations in parametric memory?",
    "How does RAG provide deterministic inline citations?",
  ],
  1: [
    "What is the trade-off between 200-char and 1000-char chunks?",
    "Why is boundary overlap necessary between chunks?",
    "When should I use Recursive vs Sentence-boundary chunking?",
  ],
  2: [
    "Why is Cosine Similarity preferred over Euclidean distance?",
    "What do the 384 or 1536 dimensions physically represent?",
    "How does dense embedding differ from sparse TF-IDF / BM25?",
  ],
  3: [
    "What is HNSW and why does it achieve O(log N) search?",
    "How do I determine the optimal Top-K retrieval depth?",
    "What is the difference between a Bi-Encoder and Cross-Encoder?",
  ],
  4: [
    "How do you construct a production prompt template?",
    "What is the Lost-in-the-Middle phenomenon?",
    "How do we handle conflicting or outdated documents in RAG?",
  ],
  5: [
    "What is the difference between Recall@K and MRR?",
    "How do we measure RAG faithfulness using RAGAS?",
    "How does Maximal Marginal Relevance (MMR) prevent redundancy?",
  ],
};

// Rich engineering knowledge base for automated doubt resolution
const knowledgeBase: { keywords: string[]; question: string; answer: string }[] = [
  {
    keywords: ["fine-tune", "fine-tuning", "sft", "why not fine-tune", "training"],
    question: "Why can't we just fine-tune an LLM on private documents instead of building RAG?",
    answer:
      "Fine-tuning adapts model behavior, style, and domain grammar—it does NOT reliably store factual knowledge. Key limitations of fine-tuning for knowledge storage:\n\n1. Hallucination Risk: Parametric weights store probabilistic token associations, which frequently hallucinate on specific numerical or edge queries.\n2. Staleness: Updating knowledge requires re-running training epochs with GPU compute; RAG updates instantly via database inserts.\n3. Source Attribution: Weights are a non-transparent black box; fine-tuning cannot cite exact passage offsets.\n4. Access Control: You cannot enforce row-level tenant permissions inside model weights, whereas vector databases allow metadata security filters.",
  },
  {
    keywords: ["hallucination", "hallucinate", "parametric", "why hallucinate"],
    question: "What causes hallucinations in parametric memory?",
    answer:
      "Language models are trained on next-token prediction: P(w_t | w_<t). They optimize for semantic plausibility rather than factual truth. When asked about domain-specific facts or private documents outside their pretraining corpus, models sample statistically plausible sequences that sound convincing but are factually fabricated. RAG solves this by providing grounding evidence in the prompt context.",
  },
  {
    keywords: ["chunk size", "chunking", "trade-off", "size", "split"],
    question: "What is the trade-off between small and large chunk sizes?",
    answer:
      "Chunk sizing balances retrieval precision against contextual coherence:\n\n- Small chunks (100–300 tokens): Maximize search precision. The embedding vector tightly represents a single fact without semantic dilution. However, they may lack supporting context.\n- Large chunks (800–1500 tokens): Preserve narrative flow and surrounding context, but dilute vector embeddings with multiple topics and consume prompt token limits.\n\nProduction rule of thumb: 250–500 tokens with 10–20% overlap window.",
  },
  {
    keywords: ["overlap", "window overlap", "boundary", "why overlap"],
    question: "Why is chunk boundary overlap necessary?",
    answer:
      "Without overlap, key relationships or sentences that span across partition boundaries get severed. For example, if a conditional clause ('Unless approved by HR...') is cut off from its rule ('Remote work is prohibited...'), the retrieval system will index two incomplete fragments. Overlap ensures contiguous semantic continuity across chunk borders.",
  },
  {
    keywords: ["cosine", "euclidean", "dot product", "distance", "metric"],
    question: "Why is Cosine Similarity preferred over Euclidean distance for text embeddings?",
    answer:
      "Cosine similarity measures the angle between two vectors: cos(theta) = (A · B) / (||A|| * ||B||). It is invariant to vector magnitude (length). In text embeddings, longer passages often produce larger norm vectors due to token accumulation even if their topic is identical. Cosine similarity focuses strictly on semantic direction rather than document length.\n\nNote: If all vectors are normalized to unit length (||A|| = 1), Cosine Similarity, Dot Product, and Euclidean Distance are monotonically equivalent.",
  },
  {
    keywords: ["dimensions", "dimension", "384", "1536", "vector space"],
    question: "What do the high dimensions (e.g., 384 or 1536) physically represent?",
    answer:
      "Each dimension corresponds to a latent semantic feature discovered during transformer pretraining. While individual axes rarely map to clean human labels (like 'is_animal' or 'sentiment'), groups of dimensions encode semantic facets like tense, formality, syntactic role, and topical domain. The high dimensionality allows the model to separate millions of distinct linguistic concepts without geometric collision.",
  },
  {
    keywords: ["hnsw", "approximate nearest neighbor", "ann", "graph", "faiss"],
    question: "What is HNSW and why does it achieve sub-millisecond search?",
    answer:
      "Hierarchical Navigable Small World (HNSW) is an approximate nearest neighbor (ANN) graph algorithm. It creates multi-layer geometric graphs:\n\n1. Upper layers have sparse long-range links for fast global routing.\n2. Lower layers have dense local links for fine-grained convergence.\n\nInstead of checking every vector O(N brute-force), HNSW traverses from top to bottom like a skip-list in O(log N) time, searching billions of vectors in 1–5 milliseconds.",
  },
  {
    keywords: ["top k", "top-k", "depth", "k value", "how many chunks"],
    question: "How do I choose the optimal Top-K retrieval depth?",
    answer:
      "Top-K determines how many passages are injected into the LLM prompt:\n\n- K too small (e.g. K=1): Risk missing the necessary context if the first match lacks critical details.\n- K too large (e.g. K=20): Introduces prompt noise, increases latency and token inference costs, and triggers the 'Lost-in-the-Middle' effect where LLMs ignore passages in the middle of long contexts.\n\nIndustry standard: Start with Top-K = 3 to 5, and optionally pair with a Cross-Encoder Reranker.",
  },
  {
    keywords: ["bi-encoder", "cross-encoder", "reranker", "rerank"],
    question: "What is the difference between a Bi-Encoder and a Cross-Encoder?",
    answer:
      "1. Bi-Encoder: Encodes query and documents independently into vectors: q = f(Q), d = f(D). Similarity is a fast dot product. Used for initial retrieval over millions of chunks (latency < 5ms).\n2. Cross-Encoder: Concatenates query and document together: score = f(Q, D), allowing cross-attention between every token in Q and D. Far more accurate, but computationally expensive.\n\nTwo-Stage Pattern: Use Bi-Encoder to fetch Top-50 candidates, then Cross-Encoder to rerank the Top-5.",
  },
  {
    keywords: ["lost in the middle", "middle", "prompt context position"],
    question: "What is the 'Lost-in-the-Middle' phenomenon?",
    answer:
      "Research (Liu et al., Stanford) shows that language models attend best to information placed at the very beginning and very end of their input context window. When relevant passages are placed in the middle of a large prompt (e.g., passage 4 out of 10), retrieval performance degrades significantly. Mitigation: Sort retrieved chunks by relevance score, placing highest-ranking passages first or last.",
  },
  {
    keywords: ["prompt", "template", "prompt injection", "system prompt"],
    question: "How do you construct an effective RAG prompt template?",
    answer:
      "A production RAG prompt template follows this structure:\n\n1. System Boundary: Explicitly instruct the model to answer strictly using the provided context, and state 'I do not have sufficient information' if the answer is absent.\n2. Context Section: Insert numbered or tagged passages with metadata [Passage 1 | Source: file.pdf].\n3. Grounding Rule: Forbid reliance on prior assumptions.\n4. User Query: Present the user's exact input prompt.",
  },
  {
    keywords: ["recall", "mrr", "metric", "evaluation", "precision"],
    question: "What is the difference between Recall@K and MRR?",
    answer:
      "- Recall@K: Proportion of all relevant documents that were successfully captured within the Top-K results.\n- Mean Reciprocal Rank (MRR): Evaluates where the first correct answer appears. If the first relevant match is rank 1, score is 1.0; if rank 2, score is 0.5. MRR penalizes systems that bury the right answer deep in the list.",
  },
  {
    keywords: ["ragas", "evaluation", "faithfulness", "groundedness"],
    question: "How do we evaluate RAG pipelines using RAGAS?",
    answer:
      "RAGAS evaluates RAG across two distinct axes:\n\n1. Retrieval Quality:\n   - Context Relevance: Is the retrieved passage concise and free of noise?\n   - Context Recall: Did we capture all facts needed to answer the question?\n\n2. Generation Quality:\n   - Faithfulness: Can every sentence in the LLM answer be verified in the retrieved context?\n   - Answer Relevance: Does the generated response directly answer the user's question?",
  },
];

function findAnswer(query: string): string {
  const q = query.toLowerCase().trim();
  if (!q) return "Please ask a question about RAG architecture, chunking, embeddings, or vector retrieval.";

  let bestMatch: { score: number; answer: string } = { score: 0, answer: "" };

  for (const item of knowledgeBase) {
    let score = 0;
    for (const kw of item.keywords) {
      if (q.includes(kw)) score += 2;
    }
    // Check word overlap with question
    const qWords = item.question.toLowerCase().split(/\s+/);
    for (const word of qWords) {
      if (word.length > 3 && q.includes(word)) score += 1;
    }

    if (score > bestMatch.score) {
      bestMatch = { score, answer: item.answer };
    }
  }

  if (bestMatch.score >= 2) {
    return bestMatch.answer;
  }

  // Pedagogical fallback response generator
  return `Regarding your question on "${query}":

In RAG engineering architectures, this is handled through the separation of state and computation:
1. Ingestion & Transformation: Raw unstructured source documents are cleaned, tokenized, and partitioned into discrete contextual chunks.
2. High-Dimensional Representation: Neural encoders map natural language phrases into ℝ^d space where semantic cosine distance dictates topical proximity.
3. Sub-Millisecond Retrieval: Graph-based indices (such as HNSW) isolate the Top-K most relevant reference chunks.
4. Grounded Augmentation: The retrieved passages are injected into the prompt context with strict citation instructions, preventing parametric confabulation.

Would you like to explore how this applies specifically to chunking, vector indexing, or prompt engineering?`;
}

interface AIAssistantProps {
  currentSlide: number;
}

export default function AIAssistant({ currentSlide }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro-1",
      sender: "ai",
      text: "Hello! I am your RAG Pipeline Engineering Tutor. Have a doubt about chunking, embeddings, vector search, or prompt grounding? Ask me or select a quick question below.",
      timestamp: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const answer = findAnswer(text);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleClear = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: "ai",
        text: "Conversation refreshed. What architectural or implementation question can I help you resolve?",
        timestamp: "Just now",
      },
    ]);
  };

  const currentDoubts = contextualDoubts[currentSlide] || contextualDoubts[0];

  return (
    <>
      {/* Floating Helper Trigger Button at Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 bg-[#191919] hover:bg-[#EF3837] text-white rounded-full shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-[#EF3837]/30 transition-all duration-300 hover:scale-105 border border-gray-800 cursor-pointer group"
            title="Ask AI Tutor — Solve your RAG doubts"
          >
            <div className="relative flex items-center justify-center">
              <Bot size={20} className="text-white group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#EF3837] rounded-full border-2 border-[#191919]" />
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 group-hover:text-white/80 block leading-tight">
                Have a Doubt?
              </span>
              <span className="font-bold text-xs leading-tight block">Ask AI Tutor</span>
            </div>
          </button>
        )}
      </div>

      {/* Floating Glassmorphic Chat Widget Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[82vh] h-[580px] bg-white/95 dark:bg-[#15181C]/95 backdrop-blur-xl border border-gray-200/90 dark:border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="px-4 py-3.5 bg-[#191919] text-white flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EF3837] flex items-center justify-center font-bold text-sm text-white shadow-xs">
                AI
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm tracking-tight text-white leading-tight">RAG AI Tutor</h3>
                  <span className="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[10px] font-mono text-gray-400">Engineering Knowledge Base Active</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                title="Restart conversation"
              >
                <RefreshCw size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                title="Close AI Assistant"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Quick Contextual Question Chips */}
          <div className="px-3.5 py-2.5 bg-gray-50 dark:bg-[#111317] border-b border-gray-100 dark:border-gray-800 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles size={11} className="text-[#EF3837]" />
              Quick:
            </span>
            {currentDoubts.map((doubt, i) => (
              <button
                key={i}
                onClick={() => handleSend(doubt)}
                className="text-[11px] font-mono text-gray-700 dark:text-gray-300 bg-white dark:bg-[#181B20] hover:bg-[#EF3837]/10 dark:hover:bg-[#EF3837]/20 hover:text-[#EF3837] hover:border-[#EF3837]/30 border border-gray-200 dark:border-gray-700 px-2.5 py-1 rounded-full whitespace-nowrap transition-all shrink-0 text-left shadow-2xs cursor-pointer"
              >
                {doubt}
              </button>
            ))}
          </div>

          {/* Conversation Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-white dark:bg-[#15181C] text-xs leading-relaxed">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl whitespace-pre-wrap font-sans ${
                    m.sender === "user"
                      ? "bg-[#EF3837] text-white rounded-br-xs shadow-xs"
                      : "bg-gray-50 dark:bg-[#1A1D22] text-gray-800 dark:text-gray-200 border border-gray-200/80 dark:border-gray-800 rounded-bl-xs shadow-2xs"
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
                <span className="text-[9px] font-mono text-gray-400 dark:text-gray-500 mt-1 px-1">{m.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-gray-400 text-xs font-mono p-2 bg-gray-50 dark:bg-[#1A1D22] rounded-xl border border-gray-100 dark:border-gray-800 w-24">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF3837] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF3837] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF3837] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-[#111317]/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask any doubt about RAG..."
                className="flex-1 px-3.5 py-2 text-xs bg-white dark:bg-[#1C2026] text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#EF3837] focus:border-[#EF3837] transition-all shadow-2xs"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="w-8 h-8 rounded-xl bg-[#EF3837] hover:bg-[#D92D20] disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-xs"
                title="Send query"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
