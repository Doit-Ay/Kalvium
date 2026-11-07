import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata: Metadata = {
  title: "RAG Pipeline Studio — Retrieval-Augmented Generation Interactive Laboratory",
  description:
    "An interactive engineering laboratory on vector databases, dense embeddings, chunking algorithms, and in-context grounding for Large Language Models.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('rag_theme');
                if (stored === 'dark') document.documentElement.classList.add('dark');
                else document.documentElement.classList.remove('dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#191919] dark:bg-[#0D0E11] dark:text-[#F3F4F6] transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
