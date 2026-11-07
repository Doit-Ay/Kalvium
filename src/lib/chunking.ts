export interface Chunk {
  id: number;
  text: string;
  start: number;
  end: number;
  overlapStart?: number;
  overlapEnd?: number;
}

export function fixedSizeChunk(
  text: string,
  size: number,
  overlap: number
): Chunk[] {
  const chunks: Chunk[] = [];
  if (!text || size <= 0) return chunks;

  let start = 0;
  let id = 0;
  while (start < text.length) {
    const end = Math.min(start + size, text.length);
    chunks.push({
      id: id++,
      text: text.slice(start, end),
      start,
      end,
      overlapStart: start > 0 ? start : undefined,
      overlapEnd: start > 0 ? Math.min(start + overlap, end) : undefined,
    });
    const step = size - overlap;
    if (step <= 0) break;
    start += step;
  }
  return chunks;
}

export function sentenceChunk(text: string, maxSize: number): Chunk[] {
  const sentences = text.match(/[^.!?]+[.!?]+\s*/g) || [text];
  const chunks: Chunk[] = [];
  let current = "";
  let currentStart = 0;
  let id = 0;
  let pos = 0;

  for (const sentence of sentences) {
    if (current.length + sentence.length > maxSize && current.length > 0) {
      chunks.push({
        id: id++,
        text: current.trim(),
        start: currentStart,
        end: pos,
      });
      currentStart = pos;
      current = "";
    }
    current += sentence;
    pos += sentence.length;
  }

  if (current.trim()) {
    chunks.push({
      id: id++,
      text: current.trim(),
      start: currentStart,
      end: pos,
    });
  }

  return chunks;
}

export function recursiveChunk(
  text: string,
  size: number,
  overlap: number,
  separators: string[] = ["\n\n", "\n", ". ", " "]
): Chunk[] {
  const chunks: Chunk[] = [];
  let id = 0;

  function splitRecursive(txt: string, sepIndex: number, offset: number) {
    if (txt.length <= size) {
      if (txt.trim()) {
        chunks.push({
          id: id++,
          text: txt,
          start: offset,
          end: offset + txt.length,
        });
      }
      return;
    }

    if (sepIndex >= separators.length) {
      // Fall back to fixed size
      const fixed = fixedSizeChunk(txt, size, overlap);
      for (const c of fixed) {
        chunks.push({
          id: id++,
          text: c.text,
          start: offset + c.start,
          end: offset + c.end,
        });
      }
      return;
    }

    const sep = separators[sepIndex];
    const parts = txt.split(sep);
    let current = "";
    let currentOffset = offset;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i] + (i < parts.length - 1 ? sep : "");
      if (current.length + part.length > size && current.length > 0) {
        splitRecursive(current, sepIndex + 1, currentOffset);
        currentOffset += current.length;
        current = "";
      }
      current += part;
    }

    if (current.trim()) {
      splitRecursive(current, sepIndex + 1, currentOffset);
    }
  }

  splitRecursive(text, 0, 0);
  return chunks;
}
