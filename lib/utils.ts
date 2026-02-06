// ============================================================================
// CHAT ANALYZER - UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate a consistent color for a player name based on hash
 */
export function getPlayerColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, var(--player-saturation, 60%), var(--player-lightness, 38%))`;
}

/**
 * Calculate cosine similarity between two frequency maps.
 * Optimized: iterates each map once instead of allocating a key union Set.
 * Dot product only needs shared keys; norms are computed per-map.
 */
export function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  // Compute normA and dot product in one pass over map a
  for (const [key, valA] of a) {
    normA += valA * valA;
    const valB = b.get(key);
    if (valB !== undefined) {
      dotProduct += valA * valB;
    }
  }

  // Compute normB in one pass over map b
  for (const valB of b.values()) {
    normB += valB * valB;
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Calculate distribution similarity between two arrays.
 * v4.4: Uses cosine similarity instead of L1 distance.
 * L1 overstates similarity when both distributions have many zero bins
 * (e.g. two short-message players match on absence of long messages).
 * Cosine similarity only rewards shared positive structure.
 */
export function distributionSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
