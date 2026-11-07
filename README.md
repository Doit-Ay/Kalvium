# RAG Studio — Interactive Engineering Laboratory

> **Live Deployment:** [RAG Pipeline Studio — Retrieval-Augmented Generation Interactive Laboratory](https://kalvium-lac.vercel.app/)

An interactive web-based learning experience that teaches students how to understand, build, and optimize a **Retrieval-Augmented Generation (RAG)** pipeline from first principles through hands-on visualizations, live architectural simulations, and interactive engineering challenges.

---

## Curriculum Structure

The complete curriculum is calibrated for a comprehensive 45-minute learning experience across 6 progressive modules:

| Module | Title | Estimated Time | Key Engineering Concept |
|---|---|---|---|
| 01 | **Why RAG?** | 7 min | Parametric vs Non-Parametric Memory, Hallucination Mechanics |
| 02 | **Document Ingestion & Chunking** | 8 min | Sliding Token Windows, Recursive Character Partitioning, Overlap |
| 03 | **Vector Space & Semantic Clusters** | 8 min | High-Dimensional Projection, Cosine Distance, 3D Clustering |
| 04 | **Vector Search & Similarity Retrieval** | 8 min | Cosine Similarity, Euclidean Distance, Dot Product, Top-K Depth |
| 05 | **End-to-End Pipeline Studio** | 10 min | Ingestion, Vector Indexing, Context Ingestion, Grounded LLM Synthesis |
| 06 | **Technical Assessment** | 4 min | 12-Question Comprehensive Evaluation with Rationale Analysis |

**Total Duration: 45 minutes of self-paced learning**

---

## Getting Started

### Prerequisites
- Node.js 18.0 or later installed on your system
- npm, pnpm, or yarn

### Installation & Local Run

```bash
# Clone the repository
git clone https://github.com/Doit-Ay/Kalvium.git

# Navigate to the project directory
cd Kalvium

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

```bash
npm run build
npm start
```

---

## Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router with Turbopack)
- **UI Library**: React 19
- **Language**: TypeScript 5 (Strict type checking)
- **Styling**: Tailwind CSS 4 with custom dark mode color tokens
- **Animations**: Framer Motion for slide transitions and interactive cards
- **Icons**: Lucide React
- **Visualization**: Custom SVG Dataflow Diagrams with SMIL signal pulse animations

---

## Key Features

1. **Animated Signal Flow Schematics**:
   - Every module includes an animated dataflow diagram illustrating exact data movement with traveling signal pulses.
   - Matches the end-to-end RAG architecture with separate lanes for Document Ingestion, Vector Database Indexing, and Query Retrieval.

2. **Visual Document Tape & Chunking Sandbox**:
   - Real-time partition visualizer showing how changing chunk size and boundary overlap affects document fragmentation.
   - Interactive comparison between Recursive Character, Sentence Boundary, and Fixed-Size splitting algorithms.

3. **Rotatable 3D Vector Space Studio**:
   - 3D interactive coordinate space displaying semantic clusters (Animals, Technology, Food).
   - Horizontal rotation controls and mouse drag orbit.
   - Real-time Cosine Similarity scoreboard calculating geometric alignment percentages against any clicked word.

4. **Multi-Metric Vector Search Simulator**:
   - Natural language query box with one-click presets.
   - Real-time toggles between Cosine Similarity, Euclidean Distance, and Dot Product.
   - Dynamic Top-K retrieval depth slider with ranked match percentage bars.

5. **3-Stage RAG Pipeline Runtime**:
   - Select and index raw enterprise documents (HR Policy, Tech Specs, Financial Report).
   - Step-by-step transparent inspection:
     - **Stage A**: Retrieved Top-K candidate chunks.
     - **Stage B**: In-context prompt assembly.
     - **Stage C**: Hallucination-free synthesis with verifiable citations.

6. **Curated Video Reference Masterclasses**:
   - In-app modal video player embedded in every module.
   - Curated lectures from leading AI researchers (Andrej Karpathy, Grant Sanderson / 3Blue1Brown, Greg Kamradt, James Briggs / Pinecone, and Harrison Chase / LangChain) with chapter timestamps.

7. **AI Tutor Assistant**:
   - Floating doubt-resolution helper in the bottom-right corner.
   - Context-aware question chips tailored to whichever slide the student is currently viewing.

8. **Comprehensive Dark Mode Support**:
   - Full dark mode and light mode implementation with anti-flash script and seamless local storage persistence.

---

## Zero External API Keys Required

The entire application runs completely locally without requiring paid API keys or cloud dependencies:
- In-memory vector embeddings and cosine similarity computations are executed client-side.
- Deterministic simulated LLM responses for reference corpora are bundled in local data files.
- Zero tracking or external telemetry.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                     # Root layout with theme provider
│   ├── page.tsx                       # Hero landing page & curriculum showcase
│   ├── globals.css                    # Tailwind CSS v4 styling & theme tokens
│   ├── course/
│   │   └── page.tsx                   # Main 6-module interactive course slider
│   └── modules/                       # Standalone direct slide routes
│       ├── why-rag/page.tsx
│       ├── document-processing/page.tsx
│       ├── embeddings/page.tsx
│       ├── vector-search/page.tsx
│       ├── full-pipeline/page.tsx
│       └── quiz/page.tsx
├── components/
│   ├── assistant/
│   │   └── AIAssistant.tsx            # Floating AI doubt solver helper
│   ├── common/
│   │   └── VideoReferenceCard.tsx     # Curated video player with modal & timestamps
│   ├── course/
│   │   └── CourseSlider.tsx           # Full-width slide stage with keyboard navigation
│   ├── home/
│   │   └── RagPipelineInfographic.tsx # Animated hero RAG pipeline schematic
│   ├── modules/                       # Core interactive learning modules
│   │   ├── Module1WhyRAG.tsx
│   │   ├── Module2Chunking.tsx
│   │   ├── Module3Embeddings.tsx
│   │   ├── Module4VectorSearch.tsx
│   │   ├── Module5FullPipeline.tsx
│   │   ├── Module6Quiz.tsx
│   │   └── diagrams/                  # Animated SVG dataflow schematics
│   │       ├── WhyRagDiagram.tsx
│   │       ├── ChunkingDiagram.tsx
│   │       ├── VectorSpaceDiagram.tsx
│   │       ├── VectorSearchDiagram.tsx
│   │       └── FullPipelineDiagram.tsx
│   └── theme/
│       ├── ThemeProvider.tsx          # React Context theme manager
│       └── ThemeToggle.tsx            # Accessible light/dark toggle
├── data/
│   ├── sampleDocuments.ts             # Knowledge base texts & simulated responses
│   └── quizQuestions.ts               # 12-question assessment bank
└── lib/
    ├── chunking.ts                    # Chunking algorithms (recursive, sentence, fixed)
    └── similarity.ts                  # Cosine, euclidean, and dot product math
```

---

## License

MIT License. Designed and developed for educational purposes.
