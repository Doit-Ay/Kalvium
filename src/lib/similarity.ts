export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}

export function euclideanDistance(a: number[], b: number[]): number {
  if (a.length !== b.length) return Infinity;
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += (a[i] - b[i]) ** 2;
  }
  return Math.sqrt(sum);
}

export function dotProduct(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

// Simple TF-IDF-like embedding for demonstration (no external model needed)
export function simpleEmbed(text: string, vocabulary: string[]): number[] {
  const words = text.toLowerCase().split(/\W+/).filter(Boolean);
  const vec = new Array(vocabulary.length).fill(0);
  for (const word of words) {
    const idx = vocabulary.indexOf(word);
    if (idx !== -1) {
      vec[idx] += 1;
    }
  }
  // Normalize
  const mag = Math.sqrt(vec.reduce((s: number, v: number) => s + v * v, 0));
  if (mag > 0) {
    for (let i = 0; i < vec.length; i++) vec[i] /= mag;
  }
  return vec;
}

// Build vocabulary from a set of documents
export function buildVocabulary(texts: string[]): string[] {
  const wordSet = new Set<string>();
  for (const text of texts) {
    const words = text.toLowerCase().split(/\W+/).filter(Boolean);
    words.forEach((w) => wordSet.add(w));
  }
  return Array.from(wordSet).sort();
}

// Simple PCA-like dimension reduction to 3D for visualization
export function reduceTo3D(vectors: number[][]): [number, number, number][] {
  if (vectors.length === 0) return [];
  const dim = vectors[0].length;

  // Use random but fixed projection for consistency
  const seed = 42;
  function seededRandom(s: number) {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  }

  const proj: number[][] = [];
  for (let d = 0; d < 3; d++) {
    const row: number[] = [];
    for (let i = 0; i < dim; i++) {
      row.push(seededRandom(seed + d * dim + i) * 2 - 1);
    }
    // Normalize projection vector
    const mag = Math.sqrt(row.reduce((s, v) => s + v * v, 0));
    for (let i = 0; i < row.length; i++) row[i] /= mag;
    proj.push(row);
  }

  return vectors.map((vec) => {
    const result: [number, number, number] = [0, 0, 0];
    for (let d = 0; d < 3; d++) {
      for (let i = 0; i < dim; i++) {
        result[d] += vec[i] * proj[d][i];
      }
    }
    return result;
  });
}
