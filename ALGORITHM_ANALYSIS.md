# Algorithm Improvement Analysis

Comprehensive analysis of all detection algorithms in Signal In Chat, identifying
concrete improvements for accuracy, performance, and false-positive reduction.

---

## Executive Summary

The engine uses **32 distinct algorithms** across 4 categories (temporal, linguistic,
behavioral, network) with ~5,500 lines of core logic. The architecture is solid, but
there are meaningful improvements available in three areas:

| Area | Issues Found | Impact |
|------|-------------|--------|
| **Accuracy / Detection Quality** | 9 | High |
| **False Positive Reduction** | 5 | High |
| **Performance** | 6 | Medium |
| **Missing Algorithms** | 7 | Medium-High |

---

## 1. Accuracy / Detection Quality

### 1.1 Confidence Formula Is Linear (Should Be Sigmoid)

**File:** `altDetection.ts:1009`
```
confidence = min(totalScore * 0.40 + 12, 95)
```

**Problem:** A linear formula means that going from score 100 to 150 adds the same
confidence as going from 150 to 200. In reality, additional evidence has diminishing
returns at high scores and should matter more at medium scores. A score of 300 hits
the 95 cap the same way a score of 208 does.

**Improvement:** Use a logistic/sigmoid function:
```ts
confidence = Math.min(Math.round(95 / (1 + Math.exp(-0.03 * (totalScore - 120)))), 95)
```
This creates an S-curve centered around score 120 where:
- Score 50 -> ~10% confidence (low evidence = low confidence)
- Score 120 -> ~48% confidence (moderate evidence)
- Score 200 -> ~88% confidence (strong evidence, diminishing returns)
- Score 250+ -> approaches 95% asymptotically

### 1.2 Vocabulary Metrics Ignore Sample Size

**File:** `altDetection.ts:413-433`
```ts
if (simpsonsDiff < 0.005 && brunetsWDiff < 0.5 && yulesKDiff < 10) {
```

**Problem:** Simpson's D, Brunet's W, and Yule's K are all heavily influenced by
sample size. A player with 20 messages has wildly different baseline metrics than
one with 500 messages. Two players with 25 messages each might coincidentally match
on these metrics simply because of insufficient data, while two players with 500
messages matching is much more meaningful.

**Improvement:** Scale the thresholds by a confidence factor derived from the
minimum message count:
```ts
const minMsgs = Math.min(p1.messageCount, p2.messageCount);
const sampleConfidence = Math.min(1, (minMsgs - 20) / 80); // 0 at 20 msgs, 1 at 100+
// Tighten thresholds when data is abundant
const simpsonThresh = 0.005 + 0.01 * (1 - sampleConfidence);
const brunetsThresh = 0.5 + 1.0 * (1 - sampleConfidence);
```

### 1.3 N-gram Similarity Not Adjusted for Corpus Size

**File:** `altDetection.ts:537-558`

**Problem:** Character trigram cosine similarity converges to ~0.94-0.97 between
*any* two English speakers as text volume increases. With 500+ messages each, nearly
everyone exceeds the 0.97 medium threshold. With 25 messages, the natural similarity
is much lower and a 0.97 score is actually significant.

**Improvement:** Dynamically adjust the n-gram threshold based on corpus size:
```ts
const corpusSize = Math.min(p1.wordCount, p2.wordCount);
const ngramBaseline = 0.92 + Math.min(0.05, corpusSize / 10000);
// Use this baseline to shift thresholds
```

### 1.4 Activity Pattern Ignores Circular Nature of Time

**File:** `linguistic.ts:586-603`

**Problem:** The time-of-day comparison splits activity into 4 bins (morning,
afternoon, evening, night) and computes Manhattan distance. This works for large
differences but fails at boundaries. A player active 23:00-01:00 would register as
"evening" + "night", while a player active 22:00-00:00 is purely "evening". They're
nearly identical but the algorithm sees a difference.

**Improvement:** Use overlapping bins or compute a proper circular distance metric.
Alternatively, use 8 or 12 narrower time bins and compute the overlap with a
wraparound-aware comparison.

### 1.5 Shared Rare Words Threshold Doesn't Scale With Player Count

**File:** `behavioral.ts:230`
```ts
const uniqueThreshold = 2;
```

**Problem:** In a 5-player chat, a word used by 2 players (40% of all players) is
not particularly rare. In a 200-player chat, a word used by 2 players (1%) is
extremely distinctive. The fixed threshold of 2 conflates these very different
situations.

**Improvement:**
```ts
const uniqueThreshold = totalPlayers <= 5
  ? 1  // In tiny chats, only truly exclusive words matter
  : 2; // In larger chats, 2 out of many is already rare
```
Also consider weighting shared rare words by inverse player frequency (IDF-like):
`weight = log(totalPlayers / usageCount)`.

### 1.6 Handoff Directionality Misses Balanced Bidirectional Patterns

**File:** `altDetection.ts:188-190`
```ts
if (handoffCount >= 4 && directionality >= 0.8) {
  score += 5;
}
```

**Problem:** Only one-directional handoffs (always A->B) get a bonus. But *perfectly
balanced* bidirectional handoffs (A->B and B->A equally) with high count are arguably
*more* suspicious — it means both accounts take turns logging in/out symmetrically,
which is consistent with a single user switching between accounts.

**Improvement:** Add scoring for low directionality + high handoff count:
```ts
// Perfectly balanced alternation is also suspicious
if (handoffCount >= 6 && directionality <= 0.2) {
  score += 7; // Symmetric switching pattern
}
```

### 1.7 Slip Detection Uses Message Index Instead of Time Windows

**File:** `behavioral.ts:452-457`

**Problem:** Messages are split into thirds by index (first 33%, middle 33%, last
33%). In a multi-day log, different days might have different users on the same
account. Index-based splitting can put Day 1 and Day 2 messages into the same
"third", diluting the signal.

**Improvement:** Split by session or by day (using `dayIndex`), then compare style
across time windows:
```ts
const dayGroups = new Map<number, ChatMessage[]>();
for (const msg of playerMessages) {
  if (!dayGroups.has(msg.dayIndex)) dayGroups.set(msg.dayIndex, []);
  dayGroups.get(msg.dayIndex)!.push(msg);
}
// Compare style consistency across days
```

### 1.8 Function Word Baseline Adjustment Creates Derivative Discontinuity

**File:** `linguistic.ts:574-580`
```ts
if (rawSimilarity <= BASELINE) {
  return rawSimilarity * 0.5 / BASELINE;
}
return 0.5 + (rawSimilarity - BASELINE) * 0.5 / (1.0 - BASELINE);
```

**Problem:** This piecewise linear rescaling has a slope change at `rawSimilarity =
0.82`. While the function is continuous, its derivative jumps from `0.5/0.82 = 0.61`
to `0.5/0.18 = 2.78`. This means small changes around the baseline get inconsistent
amplification.

**Improvement:** Use a smooth logistic rescaling instead:
```ts
const z = (rawSimilarity - BASELINE) / 0.06; // stddev-like scaling
return 1 / (1 + Math.exp(-z));
```

### 1.9 Self-Talk Detection Duplicates Work With Main Loop

**File:** `behavioral.ts:314-393` and `altDetection.ts:231-236`

**Problem:** `detectSelfTalk()` iterates all O(n^2) pairs computing n-gram
similarity, function word similarity, and typo/micro-pattern comparisons. Then the
main `detectAltsAdvanced()` loop at line 247 iterates all O(n^2) pairs again,
computing many of the same metrics independently. This is wasted computation and
means the two scoring paths can diverge.

**Improvement:** Integrate self-talk detection into the main pair loop in
`detectAltsAdvanced`. Compute all similarity metrics once per pair, then use them
for both self-talk scoring and general alt detection.

---

## 2. False Positive Reduction

### 2.1 No Global Confidence Scaling by Message Count

**Across all of `altDetection.ts`**

**Problem:** Comparing two players with 500 messages each produces far more reliable
signals than comparing two players with 25 messages each. But the scoring system
applies the same thresholds and point values regardless. This is the single biggest
source of false positives for low-activity players.

**Improvement:** Apply a global confidence scaling factor:
```ts
const minMessages = Math.min(p1.messageCount, p2.messageCount);
const dataConfidence = Math.min(1, (minMessages - config.minMessages) / 80);
// Apply to final score
totalScore = Math.round(totalScore * (0.6 + 0.4 * dataConfidence));
```
This reduces scores by up to 40% for players near the minimum threshold.

### 2.2 Phrase Overlap Doesn't Filter Common Language Phrases

**File:** `altDetection.ts:821-843`

**Problem:** `commonPhrases` are checked for 3+ word overlap, but very common
English phrases ("I think that", "I don't know", "going to be") can match between
any two English speakers. The `COMMON_GAMING_WORDS` filter is applied to rare words
but not to phrases.

**Improvement:** Add a common phrase filter:
```ts
const COMMON_PHRASES = new Set([
  "i dont know", "i think so", "going to be", "i want to",
  "do you know", "i need to", "have to go", "going to go",
  // ... etc
]);
const phraseOverlap = p1.commonPhrases.filter(p =>
  p2.commonPhrases.includes(p) &&
  p.split(' ').length >= 3 &&
  !COMMON_PHRASES.has(p.toLowerCase())
);
```

### 2.3 `distributionSimilarity` Overstates Similarity for Sparse Distributions

**File:** `utils.ts:42-51`

**Problem:** L1 distance (`1 - sumDiff/2`) gives high similarity when both
distributions have many zero-valued bins. For message length distribution (8 bins),
two players who both only send short messages would have `[0.8, 0.1, 0.05, ...]` —
identical because of the *absence* of long messages, not because of genuinely
matching behavior.

**Improvement:** Use Jensen-Shannon divergence or cosine similarity on the
distribution vectors, which better handles sparse distributions:
```ts
export function distributionSimilarity(a: number[], b: number[]): number {
  // Cosine similarity handles sparse vectors better
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
```

### 2.4 `compareSentencePatterns` Amplifies Tiny Absolute Differences

**File:** `linguistic.ts:720-732`

**Problem:** The relative difference `abs(v1 - v2) / maxVal` is unstable when both
values are near zero. If both players have a `startsWithConjunction` rate of 0.01
and 0.02, the relative difference is 50% — suggesting they're very different. But
the absolute difference of 0.01 is meaningless noise.

**Improvement:** Use a meaningful absolute floor per feature:
```ts
const maxVal = Math.max(v1, v2, 0.05); // Floor of 5% for rates
// For avgWordsPerMessage, use a different floor
const maxVal = key === "avgWordsPerMessage"
  ? Math.max(v1, v2, 3.0)
  : Math.max(v1, v2, 0.05);
```

### 2.5 Boolean Micro-pattern Matching Too Coarse

**File:** `altDetection.ts:700-732`

**Problem:** Micro-patterns are binary (true/false) — a player who uses lowercase
`i` once over threshold is treated the same as one who does it 90% of the time. Two
players could both cross the threshold while having very different actual rates.

**Improvement:** Store micro-pattern rates (0.0-1.0) instead of just booleans, and
compare the rates when matching:
```ts
interface MicroPatterns {
  lowercaseI: number;      // 0.0-1.0 rate instead of boolean
  noCapitalStart: number;
  // ...
}
// When comparing:
if (Math.abs(p1.microPatterns.lowercaseI - p2.microPatterns.lowercaseI) < 0.15
    && p1.microPatterns.lowercaseI > 0.3) { /* match */ }
```

---

## 3. Performance Improvements

### 3.1 Handoff Detection Uses Nested Loops

**File:** `altDetection.ts:68-95`

**Problem:** The P1->P2 handoff check iterates all P2 sessions for every P1 session:
O(s1 * s2). For players with many sessions, this is quadratic.

**Improvement:** Sort sessions by start time, then use a two-pointer approach:
```ts
// After sorting both arrays by start time
let j = 0;
for (const p1Sess of p1Sessions) {
  while (j < p2Sessions.length && p2Sessions[j].start <= p1Sess.end) j++;
  // Check only the next few sessions starting after p1Sess.end
  for (let k = j; k < p2Sessions.length; k++) {
    const diff = p2Sessions[k].start - p1Sess.end;
    if (diff > HANDOFF_WINDOW) break;
    if (diff > 0) { /* found handoff */ }
  }
}
```
This reduces to O(s1 + s2) after sorting.

### 3.2 Rare Word Index Recomputes Text Splitting

**File:** `behavioral.ts:179-248`

**Problem:** `buildRareWordIndex()` splits all messages into words for every player.
Then `detectSharedUniqueWords()` splits the same messages again for each pair
comparison. This means the text is split `1 + C(n,2)` times where n = player count.

**Improvement:** Precompute and cache word sets per player during
`buildRareWordIndex`, returning them alongside the index:
```ts
function buildRareWordIndex(allStats: AdvancedPlayerStats[]): {
  index: Map<string, Set<string>>;
  playerWords: Map<string, Set<string>>;
}
```

### 3.3 Greeting/Farewell Detection Creates Regex per Pattern per Message

**File:** `linguistic.ts:482-511`

**Problem:** For each of 12 greetings and 15 farewells, a regex is created and tested
against every message via `.filter()`. That's 27 full scans of the message array.

**Improvement:** Iterate messages once and check all patterns per message:
```ts
const greetingCounts = new Map<string, number>();
for (const msg of messages) {
  const trimmed = msg.trim().toLowerCase();
  const firstWord = trimmed.split(/\s/)[0];
  const lastWord = trimmed.split(/\s/).pop();
  for (const greeting of GREETINGS) {
    if (firstWord === greeting || lastWord === greeting || trimmed === greeting) {
      greetingCounts.set(greeting, (greetingCounts.get(greeting) || 0) + 1);
    }
  }
}
```

### 3.4 Cosine Similarity Allocates Unnecessary Set

**File:** `utils.ts:20-37`

**Problem:** `new Set([...a.keys(), ...b.keys()])` creates two arrays and a Set for
every similarity computation. Since most pairs share many keys (both are English
speakers), this is wasteful.

**Improvement:** Iterate the smaller map, accumulating dot product. Then compute
norms from each map independently:
```ts
export function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const [key, valA] of a) {
    normA += valA * valA;
    const valB = b.get(key);
    if (valB !== undefined) dotProduct += valA * valB;
  }
  for (const valB of b.values()) {
    normB += valB * valB;
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
```
This avoids allocating the key union entirely.

### 3.5 Typo/Substitution Detection Joins All Messages Into One String

**Files:** `linguistic.ts:102-113, 118-130`

**Problem:** `messages.join(" ")` creates a potentially huge string for regex
matching. For a player with 1000 messages averaging 50 chars each, that's a 50KB
string created twice (once for typos, once for substitutions).

**Improvement:** For short-circuitable patterns (most typo checks), iterate
messages individually. For frequency-based counts, the join is acceptable but should
be done once and shared between typo detection, substitution detection, and other
text-level analysis.

### 3.6 `detectSelfTalk` Runs as Separate O(n^2) Pass

**File:** `behavioral.ts:314-393`

**Problem:** As noted in 1.9, this runs before the main detection loop, computing
n-gram similarity and function word similarity for all pairs. The main loop then
recomputes many of the same metrics. For 50 players, that's 1,225 pairs processed
twice.

**Improvement:** Fold self-talk detection into the main `detectAltsAdvanced` loop
where similarity metrics are already being computed.

---

## 4. Missing Algorithm Opportunities

### 4.1 Cross-Day Pattern Analysis

**Currently absent.**

The system detects "never online together" across all time, but doesn't analyze
day-of-week patterns. A strong alt signal: Player A appears Mon/Wed/Fri while
Player B appears Tue/Thu/Sat — perfectly complementary weekly schedules. This is
particularly relevant for Wurm Online where play sessions are long.

**Implementation:** Track active days per player using `dayIndex`, then compare
the day-of-week distributions.

### 4.2 Response Latency Fingerprinting

**Currently absent.**

How quickly someone responds to messages is a surprisingly stable personal trait.
A histogram of response latencies (0-5s, 5-15s, 15-30s, 30-60s, 60s+) could be
compared between players. Two accounts with identical response time distributions
are likely the same person.

**Implementation:** Already have `responsePartners` data — extend it to track
response delays, then compare delay distributions.

### 4.3 Vocabulary Evolution / Drift Detection

**Currently absent.**

If a player's vocabulary significantly changes over time (beyond normal topic
drift), it may indicate account sharing. Compare Yule's K, Simpson's D, and
function word profiles between time windows within a single account.

**Implementation:** Split a player's messages by day, compute metrics per window,
then measure the intra-player variance. High variance = possible multiple users.

### 4.4 Message Entropy Analysis

**Currently absent.**

Information entropy (Shannon entropy) of messages measures predictability. Terse
"ok", "lol" chatters have low entropy; verbose descriptive chatters have high
entropy. This is more robust than word count alone.

**Implementation:**
```ts
function messageEntropy(messages: string[]): number {
  const charFreq = new Map<string, number>();
  const allText = messages.join("").toLowerCase();
  for (const c of allText) charFreq.set(c, (charFreq.get(c) || 0) + 1);
  let entropy = 0;
  for (const count of charFreq.values()) {
    const p = count / allText.length;
    entropy -= p * Math.log2(p);
  }
  return entropy;
}
```

### 4.5 Keyboard-Proximity Typo Analysis

**Currently absent.**

Many typos are caused by hitting adjacent keys on a QWERTY keyboard. If two
players consistently make the same keyboard-proximity errors (e.g., "thr" for
"the", "abd" for "and"), that's stronger evidence than generic typo matching
because it suggests the same physical typing habits.

**Implementation:** Build a QWERTY adjacency map, classify typos by whether
they're adjacent-key substitutions, and compare the specific error patterns.

### 4.6 Inter-Message Gap Autocorrelation

**Currently absent.**

The pattern of gaps between consecutive messages follows player-specific rhythms.
Some players send rapid bursts then go quiet; others maintain steady pacing.
Comparing the autocorrelation function of inter-message gaps would capture this
temporal fingerprint.

**Implementation:** Compute gap series, calculate autocorrelation at lags 1-5,
compare lag profiles between players.

### 4.7 Register/Code-Switching Patterns

**Currently absent.**

Players who mix formal/informal language or switch between languages do so in
personally distinctive ways. The frequency and triggers for code-switching are
fingerprints.

**Implementation:** Detect formality shifts (average word length, contraction
rate) per-message and build a "formality timeline." Compare the switching patterns
between players.

---

## 5. Priority Ranking

Ordered by impact-to-effort ratio:

| # | Improvement | Impact | Effort | Category |
|---|------------|--------|--------|----------|
| 1 | **2.1** Global confidence scaling by message count | Very High | Low | False Positives |
| 2 | **1.1** Sigmoid confidence formula | High | Low | Accuracy |
| 3 | **3.4** Cosine similarity optimization | Medium | Low | Performance |
| 4 | **1.2** Sample-size-aware vocab metric thresholds | High | Low | Accuracy |
| 5 | **2.3** Better distribution similarity metric | Medium | Low | False Positives |
| 6 | **1.6** Bidirectional handoff scoring | Medium | Low | Accuracy |
| 7 | **3.6/1.9** Integrate self-talk into main loop | Medium | Medium | Performance |
| 8 | **4.2** Response latency fingerprinting | High | Medium | New Feature |
| 9 | **1.3** Corpus-size-aware n-gram thresholds | High | Medium | Accuracy |
| 10 | **4.1** Cross-day pattern analysis | High | Medium | New Feature |
| 11 | **2.2** Common phrase filtering | Medium | Low | False Positives |
| 12 | **1.5** Scaled rare word threshold | Medium | Low | Accuracy |
| 13 | **2.5** Rate-based micro-patterns | Medium | Medium | False Positives |
| 14 | **3.1** Two-pointer handoff detection | Low | Medium | Performance |
| 15 | **1.7** Time-window-based slip detection | Medium | Medium | Accuracy |
| 16 | **4.4** Message entropy analysis | Medium | Low | New Feature |
| 17 | **3.3** Single-pass greeting/farewell detection | Low | Low | Performance |
| 18 | **1.4** Circular time-of-day comparison | Low | Medium | Accuracy |
| 19 | **4.5** Keyboard-proximity typo analysis | Medium | High | New Feature |
| 20 | **4.6** Gap autocorrelation fingerprint | Medium | High | New Feature |

---

## Summary

The three highest-value changes that would immediately improve detection quality:

1. **Scale all scoring by data confidence** (message count) — this alone would
   eliminate the majority of false positives on low-activity players.

2. **Switch to sigmoid confidence** — better calibrated confidence scores make the
   "critical" vs "high" vs "medium" categories more meaningful.

3. **Optimize cosine similarity** — small code change, runs in every pair comparison,
   measurable speedup for chats with 50+ players.

These three changes touch ~30 lines of code total and require no architectural
changes.
