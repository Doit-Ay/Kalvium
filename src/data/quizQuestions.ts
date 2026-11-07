export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  module: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary problem that RAG solves for LLMs?",
    options: [
      "Making LLMs run faster",
      "Reducing hallucinations by grounding responses in retrieved documents",
      "Making LLMs cheaper to train",
      "Improving the grammar of LLM outputs",
    ],
    correct: 1,
    explanation:
      "RAG grounds LLM responses in actual retrieved documents, dramatically reducing hallucinations. Instead of relying on potentially outdated or incorrect parametric memory, the LLM generates answers based on real, retrieved evidence.",
    module: "why-rag",
  },
  {
    id: 2,
    question: "Why do we chunk documents before creating embeddings?",
    options: [
      "To make the text look prettier",
      "Chunking is optional and doesn't affect quality",
      "Because embedding models have token limits and smaller chunks enable more precise retrieval",
      "To reduce storage costs only",
    ],
    correct: 2,
    explanation:
      "Embedding models have maximum token limits (e.g., 512 tokens). Smaller, focused chunks allow the retrieval system to find more precisely relevant passages rather than returning large, partially-relevant documents.",
    module: "document-processing",
  },
  {
    id: 3,
    question:
      "What happens if your chunk overlap is set to 0?",
    options: [
      "The pipeline will crash",
      "Information at chunk boundaries may be lost or split across chunks",
      "The embeddings become more accurate",
      "Nothing — overlap is purely cosmetic",
    ],
    correct: 1,
    explanation:
      "Without overlap, sentences or ideas that span chunk boundaries get split apart. A query about that specific information might not match either chunk well enough, causing relevant context to be missed during retrieval.",
    module: "document-processing",
  },
  {
    id: 4,
    question: "What does an embedding vector represent?",
    options: [
      "The number of words in a text",
      "A compressed ZIP file of the text",
      "A numerical representation capturing the semantic meaning of text",
      "The position of words in a dictionary",
    ],
    correct: 2,
    explanation:
      "Embeddings transform text into high-dimensional numerical vectors where semantically similar texts are positioned close together in vector space. This enables mathematical comparison of meaning.",
    module: "embeddings",
  },
  {
    id: 5,
    question: "What does cosine similarity measure between two vectors?",
    options: [
      "The length difference between two vectors",
      "The angle between two vectors, indicating directional similarity",
      "The number of matching dimensions",
      "The sum of all vector components",
    ],
    correct: 1,
    explanation:
      "Cosine similarity measures the cosine of the angle between two vectors. A value of 1 means identical direction (most similar), 0 means orthogonal (unrelated), and -1 means opposite directions.",
    module: "vector-search",
  },
  {
    id: 6,
    question: "In a RAG pipeline, what is the 'augmentation' step?",
    options: [
      "Training the LLM on new data",
      "Making the documents bigger",
      "Injecting retrieved context into the prompt sent to the LLM",
      "Increasing the model's parameter count",
    ],
    correct: 2,
    explanation:
      "Augmentation is the process of constructing a prompt that includes both the user's query AND the retrieved document chunks as context. This 'augmented' prompt gives the LLM the information it needs to generate a grounded answer.",
    module: "full-pipeline",
  },
  {
    id: 7,
    question:
      "Which chunking strategy preserves natural text boundaries like paragraphs and sentences?",
    options: [
      "Fixed-size chunking",
      "Random chunking",
      "Recursive character splitting",
      "Binary chunking",
    ],
    correct: 2,
    explanation:
      "Recursive character splitting tries to split on natural boundaries (paragraphs → sentences → words) before falling back to character-level splits. This preserves the semantic coherence of each chunk.",
    module: "document-processing",
  },
  {
    id: 8,
    question:
      "Why might a RAG system return irrelevant results even with good embeddings?",
    options: [
      "The embedding model is too large",
      "The chunk size may be too large, mixing relevant and irrelevant content in the same chunk",
      "The documents are too short",
      "Vector databases can only store 100 documents",
    ],
    correct: 1,
    explanation:
      "If chunks are too large, they contain a mix of topics. The embedding averages the meaning of all content, making it harder to match specific queries. Smaller, focused chunks produce more precise embeddings and better retrieval results.",
    module: "vector-search",
  },
  {
    id: 9,
    question: "What is a knowledge cutoff in the context of LLMs?",
    options: [
      "The maximum number of users an LLM can serve",
      "The date after which the LLM has no training data, making it unaware of recent information",
      "The point at which an LLM stops generating text",
      "A limit on how many tokens can be generated",
    ],
    correct: 1,
    explanation:
      "LLMs are trained on data up to a certain date. They have no knowledge of events, updates, or changes after that cutoff. RAG solves this by feeding current, up-to-date documents at inference time.",
    module: "why-rag",
  },
  {
    id: 10,
    question:
      "What is the purpose of the 'Top-K' parameter in vector search?",
    options: [
      "It sets the maximum document size",
      "It controls how many of the most similar chunks are retrieved",
      "It determines the embedding dimension",
      "It sets the learning rate for the model",
    ],
    correct: 1,
    explanation:
      "Top-K controls the number of most-similar chunks returned by the vector search. A higher K retrieves more context (better recall but possibly less precision), while a lower K is more focused but may miss relevant information.",
    module: "vector-search",
  },
  {
    id: 11,
    question:
      "Which of these is NOT a real-world application of RAG?",
    options: [
      "Customer support chatbot answering questions from product manuals",
      "Legal document analysis with citation tracking",
      "Training an LLM from scratch on proprietary data",
      "Enterprise knowledge base search across internal wikis",
    ],
    correct: 2,
    explanation:
      "RAG does NOT train or fine-tune the LLM. Instead, it retrieves relevant documents at inference time and injects them into the prompt. Training from scratch is a completely different process.",
    module: "why-rag",
  },
  {
    id: 12,
    question:
      "What advantage does a vector database have over a traditional SQL database for RAG?",
    options: [
      "Vector databases are always free",
      "Vector databases can perform fast similarity search on high-dimensional embeddings",
      "SQL databases cannot store text data",
      "Vector databases require no indexing",
    ],
    correct: 1,
    explanation:
      "Vector databases are optimized for similarity search operations on high-dimensional vectors. They use specialized indexes (like HNSW or IVF) to find nearest neighbors efficiently — something traditional SQL databases aren't designed for.",
    module: "vector-search",
  },
];
