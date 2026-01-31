// ============================================================================
// CHAT ANALYZER - LINGUISTIC FINGERPRINTING
// ============================================================================

import type { MicroPatterns, EmoticonStyle, EmoticonProfile, PunctuationStyle, PunctuationFingerprint, SentencePattern, FunctionWordProfile, ActivityPattern } from "./types";
import { TYPO_CHECKS, LETTER_SUBSTITUTION_PATTERNS, EMOTE_PATTERNS } from "./constants";

// ============================================================================
// FUNCTION WORD LISTS - Most reliable stylometry feature!
// ============================================================================

const ARTICLES = new Set(["the", "a", "an"]);
const PRONOUNS = new Set([
  "i", "me", "my", "myself", "mine",
  "you", "your", "yourself", "yours",
  "he", "him", "his", "himself",
  "she", "her", "hers", "herself",
  "it", "its", "itself",
  "we", "us", "our", "ourselves", "ours",
  "they", "them", "their", "themselves", "theirs",
  "who", "whom", "whose", "which", "that",
]);
const PREPOSITIONS = new Set([
  "in", "on", "at", "to", "for", "with", "by", "from", "about",
  "into", "through", "during", "before", "after", "above", "below",
  "between", "under", "over", "out", "up", "down", "off", "against",
]);
const CONJUNCTIONS = new Set([
  "and", "but", "or", "nor", "so", "yet", "for",
  "because", "although", "though", "while", "if", "when", "unless",
  "since", "until", "whereas", "whether",
]);
const AUXILIARIES = new Set([
  "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "having",
  "do", "does", "did", "doing",
  "will", "would", "shall", "should",
  "can", "could", "may", "might", "must",
]);
const QUANTIFIERS = new Set([
  "all", "some", "any", "many", "much", "few", "more", "most",
  "every", "each", "both", "several", "enough", "none", "no",
]);

// Greetings and farewells for behavioral fingerprinting
const GREETINGS = ["hi", "hey", "hello", "yo", "sup", "hiya", "heya", "hola", "greetings", "morning", "evening", "afternoon"];
const FAREWELLS = ["bye", "cya", "later", "bb", "goodbye", "night", "gnight", "gn", "ttyl", "bbl", "brb", "afk", "laterz", "peace", "ciao"];

/**
 * Character n-gram extraction (forensic linguistics technique)
 */
export function extractCharNgrams(text: string, n: number = 3): Map<string, number> {
  const ngrams = new Map<string, number>();
  const cleaned = text.toLowerCase().replace(/\s+/g, " ");

  for (let i = 0; i <= cleaned.length - n; i++) {
    const gram = cleaned.substring(i, i + n);
    ngrams.set(gram, (ngrams.get(gram) || 0) + 1);
  }

  return ngrams;
}

/**
 * Yule's K - measures vocabulary consistency (stylometry)
 */
export function calculateYulesK(words: string[]): number {
  if (words.length === 0) return 0;

  const freqMap = new Map<string, number>();
  for (const word of words) {
    const w = word.toLowerCase();
    freqMap.set(w, (freqMap.get(w) || 0) + 1);
  }

  // Count frequency of frequencies
  const freqOfFreq = new Map<number, number>();
  for (const count of freqMap.values()) {
    freqOfFreq.set(count, (freqOfFreq.get(count) || 0) + 1);
  }

  // Calculate M1 and M2
  const N = words.length;
  let M1 = 0;
  let M2 = 0;

  for (const [freq, count] of freqOfFreq) {
    M1 += count;
    M2 += count * freq * freq;
  }

  if (M1 === 0) return 0;

  // Yule's K = 10^4 * (M2 - M1) / (M1 * M1)
  const K = 10000 * (M2 - M1) / (M1 * M1);
  return Math.round(K * 100) / 100;
}

/**
 * Detect common typo patterns
 */
export function detectTypoPatterns(messages: string[]): string[] {
  const typoPatterns: string[] = [];
  const allText = messages.join(" ").toLowerCase();

  for (const check of TYPO_CHECKS) {
    if (check.pattern.test(allText)) {
      typoPatterns.push(check.label);
    }
  }

  return typoPatterns;
}

/**
 * Detect letter substitution patterns (txtspk)
 */
export function detectLetterSubstitutions(messages: string[]): Map<string, number> {
  const subs = new Map<string, number>();
  const allText = messages.join(" ").toLowerCase();

  for (const p of LETTER_SUBSTITUTION_PATTERNS) {
    const matches = allText.match(p.pattern);
    if (matches && matches.length > 0) {
      subs.set(p.label, matches.length);
    }
  }

  return subs;
}

/**
 * Analyze punctuation style (forensic fingerprint)
 */
export function analyzePunctuationStyle(messages: string[]): PunctuationStyle {
  const allText = messages.join(" ");

  return {
    spaceBefore: / [?!]/.test(allText),
    doublePunctuation: /[?!]{2,}/.test(allText),
    ellipsisStyle: /\.{3,}/.test(allText) ? "dots" : /…/.test(allText) ? "unicode" : "none",
    commaSpacing: /\s,/.test(allText), // Space before comma (unusual)
  };
}

/**
 * Calculate word length distribution
 */
export function calculateWordLengthDistribution(words: string[]): number[] {
  const dist = new Array(16).fill(0); // 0-14, 15+

  for (const word of words) {
    const len = Math.min(word.length, 15);
    dist[len]++;
  }

  // Normalize
  const total = words.length || 1;
  return dist.map(c => Math.round((c / total) * 1000) / 1000);
}

/**
 * Detect micro-patterns for forensic fingerprinting
 */
export function detectMicroPatterns(messages: string[]): MicroPatterns {
  let lowercaseICount = 0;
  let noCapitalStartCount = 0;
  let allLowercaseCount = 0;
  let excessiveCapsCount = 0;
  let numberSubCount = 0;
  let doubleSpaceCount = 0;
  let noSpaceAfterPunctCount = 0;

  for (const msg of messages) {
    // Lowercase "i" instead of "I"
    if (/\bi\b/.test(msg) && !/\bI\b/.test(msg)) {
      lowercaseICount++;
    }

    // No capital at start
    if (msg.length > 0 && msg[0] === msg[0].toLowerCase() && /^[a-z]/.test(msg)) {
      noCapitalStartCount++;
    }

    // All lowercase message
    if (msg === msg.toLowerCase() && /[a-z]/.test(msg)) {
      allLowercaseCount++;
    }

    // Excessive caps (>50% uppercase letters)
    const letters = msg.replace(/[^a-zA-Z]/g, "");
    const upperCount = (msg.match(/[A-Z]/g) || []).length;
    if (letters.length > 5 && upperCount / letters.length > 0.5) {
      excessiveCapsCount++;
    }

    // Number substitutions (2 for to, 4 for for)
    if (/\b2\b|\b4\b|\b2day\b|\b4ever\b|\bb4\b|\bl8r\b|\bgr8\b/.test(msg.toLowerCase())) {
      numberSubCount++;
    }

    // Double spaces
    if (/  /.test(msg)) {
      doubleSpaceCount++;
    }

    // No space after punctuation
    if (/[.!?,][a-zA-Z]/.test(msg)) {
      noSpaceAfterPunctCount++;
    }
  }

  const threshold = Math.max(3, messages.length * 0.1);

  return {
    lowercaseI: lowercaseICount >= threshold,
    noCapitalStart: noCapitalStartCount >= messages.length * 0.5,
    allLowercase: allLowercaseCount >= messages.length * 0.7,
    excessiveCaps: excessiveCapsCount >= threshold,
    numberSubstitution: numberSubCount >= threshold,
    doubleSpaces: doubleSpaceCount >= threshold,
    noSpaceAfterPunct: noSpaceAfterPunctCount >= threshold,
  };
}

/**
 * Detect emoticon/emoji style fingerprint
 */
export function detectEmoticonStyle(messages: string[]): EmoticonStyle {
  const allText = messages.join(" ");

  // Check for nose in emoticons
  const noseEmotes = (allText.match(/:-[)(/\\|DPp]/g) || []).length;
  const noNoseEmotes = (allText.match(/(?<!:):[)(/\\|DPp]/g) || []).length;

  // Check for unicode emoji
  const emojiCount = (allText.match(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu) || []).length;

  // Common emotes tracking
  const foundEmotes: string[] = [];
  let totalEmoteCount = 0;

  for (const ep of EMOTE_PATTERNS) {
    const matches = allText.match(ep.pattern);
    if (matches && matches.length > 0) {
      foundEmotes.push(ep.name);
      totalEmoteCount += matches.length;
    }
  }

  return {
    usesNose: noseEmotes > noNoseEmotes && noseEmotes >= 2,
    usesEmoji: emojiCount >= 3,
    commonEmotes: foundEmotes.slice(0, 5),
    emoteFrequency: messages.length > 0 ? Math.round((totalEmoteCount / messages.length) * 100) : 0,
  };
}

// ============================================================================
// NEW ADVANCED ANALYSIS FUNCTIONS
// ============================================================================

/**
 * Extract word bigrams (pairs of consecutive words)
 * More specific than character n-grams for identifying writing patterns
 */
export function extractWordBigrams(messages: string[]): Map<string, number> {
  const bigrams = new Map<string, number>();

  for (const msg of messages) {
    const words = msg.toLowerCase().split(/\s+/).filter(w => w.length > 1);
    for (let i = 0; i < words.length - 1; i++) {
      const bigram = `${words[i]} ${words[i + 1]}`;
      bigrams.set(bigram, (bigrams.get(bigram) || 0) + 1);
    }
  }

  return bigrams;
}

/**
 * Analyze function word usage - THE MOST RELIABLE stylometry feature
 * Function words are unconsciously used and very hard to fake
 */
export function analyzeFunctionWords(messages: string[]): FunctionWordProfile {
  const allText = messages.join(" ").toLowerCase();
  const words = allText.split(/\s+/).filter(w => w.length > 0);
  const totalWords = words.length || 1;

  let articleCount = 0;
  let pronounCount = 0;
  let prepositionCount = 0;
  let conjunctionCount = 0;
  let auxiliaryCount = 0;
  let quantifierCount = 0;
  let iCount = 0;
  let weCount = 0;
  let butCount = 0;
  let andCount = 0;

  for (const word of words) {
    const clean = word.replace(/[^a-z]/g, "");
    if (ARTICLES.has(clean)) articleCount++;
    if (PRONOUNS.has(clean)) pronounCount++;
    if (PREPOSITIONS.has(clean)) prepositionCount++;
    if (CONJUNCTIONS.has(clean)) conjunctionCount++;
    if (AUXILIARIES.has(clean)) auxiliaryCount++;
    if (QUANTIFIERS.has(clean)) quantifierCount++;

    if (clean === "i") iCount++;
    if (clean === "we" || clean === "us" || clean === "our") weCount++;
    if (clean === "but") butCount++;
    if (clean === "and") andCount++;
  }

  // Count question marks
  const questionCount = (allText.match(/\?/g) || []).length;

  return {
    articles: Math.round((articleCount / totalWords) * 1000) / 1000,
    pronouns: Math.round((pronounCount / totalWords) * 1000) / 1000,
    prepositions: Math.round((prepositionCount / totalWords) * 1000) / 1000,
    conjunctions: Math.round((conjunctionCount / totalWords) * 1000) / 1000,
    auxiliaries: Math.round((auxiliaryCount / totalWords) * 1000) / 1000,
    quantifiers: Math.round((quantifierCount / totalWords) * 1000) / 1000,
    iVsWe: weCount > 0 ? Math.round((iCount / weCount) * 100) / 100 : (iCount > 0 ? 10 : 0),
    butVsAnd: andCount > 0 ? Math.round((butCount / andCount) * 100) / 100 : 0,
    questionMarks: Math.round((questionCount / messages.length) * 100) / 100,
  };
}

/**
 * Calculate Simpson's Diversity Index
 * Measures vocabulary diversity - lower = more diverse
 */
export function calculateSimpsonsD(words: string[]): number {
  if (words.length < 2) return 0;

  const freqMap = new Map<string, number>();
  for (const word of words) {
    const w = word.toLowerCase();
    freqMap.set(w, (freqMap.get(w) || 0) + 1);
  }

  const N = words.length;
  let sum = 0;
  for (const count of freqMap.values()) {
    sum += count * (count - 1);
  }

  // D = sum(n(n-1)) / N(N-1)
  const D = sum / (N * (N - 1));
  return Math.round(D * 10000) / 10000;
}

/**
 * Calculate Brunet's W statistic
 * More stable measure of vocabulary richness
 * W = N^(V^(-0.172)) where N = total words, V = unique words
 */
export function calculateBrunetsW(words: string[]): number {
  if (words.length === 0) return 0;

  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  const N = words.length;
  const V = uniqueWords.size;

  if (V === 0) return 0;

  // W = N^(V^(-0.172))
  const W = Math.pow(N, Math.pow(V, -0.172));
  return Math.round(W * 100) / 100;
}

/**
 * Analyze punctuation frequency (more detailed than style)
 */
export function analyzePunctuationFrequency(messages: string[]): Map<string, number> {
  const freq = new Map<string, number>();
  const allText = messages.join(" ");
  const totalChars = allText.length || 1;

  const punctuation = [".", ",", "!", "?", ":", ";", "-", "'", '"', "(", ")", "...", "..."];

  for (const p of punctuation) {
    const regex = new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    const count = (allText.match(regex) || []).length;
    if (count > 0) {
      // Normalize per 1000 characters
      freq.set(p, Math.round((count / totalChars) * 1000 * 100) / 100);
    }
  }

  return freq;
}

/**
 * Calculate message length distribution
 */
export function calculateMessageLengthDistribution(messages: string[]): number[] {
  // Buckets: 0-10, 11-20, 21-30, 31-50, 51-75, 76-100, 101-150, 151+
  const buckets = [10, 20, 30, 50, 75, 100, 150, Infinity];
  const dist = new Array(buckets.length).fill(0);

  for (const msg of messages) {
    const len = msg.length;
    for (let i = 0; i < buckets.length; i++) {
      if (len <= buckets[i]) {
        dist[i]++;
        break;
      }
    }
  }

  // Normalize
  const total = messages.length || 1;
  return dist.map(c => Math.round((c / total) * 1000) / 1000);
}

/**
 * Analyze activity pattern (time of day preference)
 */
export function analyzeActivityPattern(
  messageTimes: number[],
  sessionGaps: number[]
): ActivityPattern {
  let morning = 0;   // 6am-12pm (6*3600 to 12*3600)
  let afternoon = 0; // 12pm-6pm (12*3600 to 18*3600)
  let evening = 0;   // 6pm-12am (18*3600 to 24*3600)
  let night = 0;     // 12am-6am (0 to 6*3600)

  for (const time of messageTimes) {
    const seconds = time % 86400; // Normalize to day
    if (seconds >= 6 * 3600 && seconds < 12 * 3600) morning++;
    else if (seconds >= 12 * 3600 && seconds < 18 * 3600) afternoon++;
    else if (seconds >= 18 * 3600) evening++;
    else night++;
  }

  const total = messageTimes.length || 1;

  // Calculate burstiness (coefficient of variation of gaps)
  let burstiness = 0;
  if (sessionGaps.length > 1) {
    const mean = sessionGaps.reduce((a, b) => a + b, 0) / sessionGaps.length;
    const variance = sessionGaps.reduce((sum, gap) => sum + Math.pow(gap - mean, 2), 0) / sessionGaps.length;
    const stdDev = Math.sqrt(variance);
    burstiness = mean > 0 ? Math.min(stdDev / mean, 3) / 3 : 0; // Normalize to 0-1
  }

  // Calculate average session length
  const SESSION_GAP_THRESHOLD = 600; // 10 minutes
  let sessionCount = 1;
  let totalSessionTime = 0;
  let sessionStart = messageTimes[0] || 0;

  for (let i = 1; i < messageTimes.length; i++) {
    const gap = messageTimes[i] - messageTimes[i - 1];
    if (gap > SESSION_GAP_THRESHOLD) {
      totalSessionTime += messageTimes[i - 1] - sessionStart;
      sessionStart = messageTimes[i];
      sessionCount++;
    }
  }
  if (messageTimes.length > 0) {
    totalSessionTime += messageTimes[messageTimes.length - 1] - sessionStart;
  }

  return {
    morningActive: Math.round((morning / total) * 1000) / 1000,
    afternoonActive: Math.round((afternoon / total) * 1000) / 1000,
    eveningActive: Math.round((evening / total) * 1000) / 1000,
    nightActive: Math.round((night / total) * 1000) / 1000,
    burstiness: Math.round(burstiness * 1000) / 1000,
    avgSessionLength: sessionCount > 0 ? Math.round(totalSessionTime / sessionCount / 60) : 0, // in minutes
  };
}

/**
 * Detect greeting style
 */
export function detectGreetingStyle(messages: string[]): string[] {
  const found: string[] = [];

  for (const greeting of GREETINGS) {
    const pattern = new RegExp(`^${greeting}\\b|\\b${greeting}$|^${greeting}$`, "i");
    const count = messages.filter(m => pattern.test(m.trim())).length;
    if (count >= 2) {
      found.push(greeting);
    }
  }

  return found.slice(0, 5);
}

/**
 * Detect farewell style
 */
export function detectFarewellStyle(messages: string[]): string[] {
  const found: string[] = [];

  for (const farewell of FAREWELLS) {
    const pattern = new RegExp(`^${farewell}\\b|\\b${farewell}$|^${farewell}$`, "i");
    const count = messages.filter(m => pattern.test(m.trim())).length;
    if (count >= 2) {
      found.push(farewell);
    }
  }

  return found.slice(0, 5);
}

/**
 * Extract common ending words/phrases
 */
export function extractCommonEnders(messages: string[]): string[] {
  const enders: Record<string, number> = {};

  for (const msg of messages) {
    const words = msg.trim().split(/\s+/);
    if (words.length > 0) {
      const lastWord = words[words.length - 1].toLowerCase().replace(/[^a-z]/g, "");
      if (lastWord && lastWord.length > 1) {
        enders[lastWord] = (enders[lastWord] || 0) + 1;
      }
    }
  }

  return Object.entries(enders)
    .filter(([, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word]) => word);
}

/**
 * Compare function word profiles - returns similarity score 0-1
 */
export function compareFunctionWordProfiles(p1: FunctionWordProfile, p2: FunctionWordProfile): number {
  // Focus on features that actually differentiate individuals within the same language.
  // Articles, prepositions, auxiliaries are very uniform across English speakers,
  // so they get LOW weight. Personal style markers (iVsWe, butVsAnd, questionMarks,
  // pronouns) vary more between individuals and get HIGH weight.
  const weights = {
    articles: 0.3,       // Very uniform in English - low discriminative power
    pronouns: 1.5,
    prepositions: 0.4,   // Very uniform in English - low discriminative power
    conjunctions: 0.8,
    auxiliaries: 0.3,    // Very uniform in English - low discriminative power
    quantifiers: 0.6,
    iVsWe: 2.0,          // Strong personal style marker
    butVsAnd: 1.5,       // Personal argumentation style
    questionMarks: 1.2,  // Personal interaction style
  };

  let totalDiff = 0;
  let totalWeight = 0;

  for (const [key, weight] of Object.entries(weights)) {
    const v1 = p1[key as keyof FunctionWordProfile];
    const v2 = p2[key as keyof FunctionWordProfile];
    // Normalize difference based on expected range
    const maxVal = Math.max(v1, v2, 0.1);
    const diff = Math.abs(v1 - v2) / maxVal;
    totalDiff += diff * weight;
    totalWeight += weight;
  }

  // Convert to similarity (1 = identical, 0 = very different)
  const avgDiff = totalDiff / totalWeight;
  // Apply baseline penalty: typical same-language speakers already score ~0.75-0.85
  // similarity on function words. Rescale so that baseline similarity maps to ~0.5
  // and only truly distinctive matches score high.
  const rawSimilarity = Math.max(0, 1 - avgDiff);
  const BASELINE = 0.82; // Expected similarity between same-dialect (e.g. American) English speakers
  if (rawSimilarity <= BASELINE) {
    return rawSimilarity * 0.5 / BASELINE; // Map 0..baseline -> 0..0.5
  }
  // Map baseline..1.0 -> 0.5..1.0
  return 0.5 + (rawSimilarity - BASELINE) * 0.5 / (1.0 - BASELINE);
}

/**
 * Compare activity patterns - returns similarity score 0-1
 */
export function compareActivityPatterns(p1: ActivityPattern, p2: ActivityPattern): number {
  // Compare time-of-day distributions
  const timeDiff =
    Math.abs(p1.morningActive - p2.morningActive) +
    Math.abs(p1.afternoonActive - p2.afternoonActive) +
    Math.abs(p1.eveningActive - p2.eveningActive) +
    Math.abs(p1.nightActive - p2.nightActive);

  // Max possible diff is 2.0 (if completely opposite schedules)
  const timeSimilarity = 1 - (timeDiff / 2);

  // Compare burstiness
  const burstDiff = Math.abs(p1.burstiness - p2.burstiness);
  const burstSimilarity = 1 - burstDiff;

  // Weighted average (time patterns more important)
  return timeSimilarity * 0.7 + burstSimilarity * 0.3;
}

/**
 * Compare word bigrams using Jaccard similarity
 */
export function compareWordBigrams(b1: Map<string, number>, b2: Map<string, number>): number {
  if (b1.size === 0 || b2.size === 0) return 0;

  // Only consider bigrams used 2+ times (to avoid noise)
  const set1 = new Set([...b1.entries()].filter(([, c]) => c >= 2).map(([k]) => k));
  const set2 = new Set([...b2.entries()].filter(([, c]) => c >= 2).map(([k]) => k));

  if (set1.size === 0 || set2.size === 0) return 0;

  let intersection = 0;
  for (const bigram of set1) {
    if (set2.has(bigram)) intersection++;
  }

  const union = set1.size + set2.size - intersection;
  return union > 0 ? intersection / union : 0;
}

// ============================================================================
// SENTENCE STRUCTURE ANALYSIS
// ============================================================================

const COMMON_PRONOUNS = new Set(["i", "you", "he", "she", "it", "we", "they", "me", "my", "your", "his", "her", "its", "our", "their", "who", "what", "this", "that", "these", "those"]);
const COMMON_CONJUNCTIONS = new Set(["and", "but", "or", "so", "because", "although", "though", "while", "if", "when", "unless", "since", "yet", "nor"]);
const COMMON_ADVERBS = new Set(["really", "actually", "basically", "literally", "honestly", "seriously", "obviously", "probably", "maybe", "definitely", "certainly", "apparently", "clearly", "simply", "just", "well", "also", "still", "even", "already", "never", "always", "sometimes"]);
const COMMON_VERBS = new Set(["go", "get", "make", "do", "try", "look", "come", "take", "give", "keep", "let", "help", "tell", "show", "stop", "run", "wait", "check", "add", "use", "buy", "sell", "kill", "join", "leave", "put", "set", "move"]);
const GREETING_WORDS = new Set(["hi", "hey", "hello", "yo", "sup", "hiya", "heya", "hola", "greetings", "morning", "evening", "afternoon", "howdy"]);

/**
 * Analyze sentence structure patterns for forensic fingerprinting.
 * How someone constructs messages (fragments vs full sentences, question tendency,
 * what they start with) is an unconscious habit and hard to fake.
 */
export function analyzeSentencePatterns(messages: string[]): SentencePattern {
  if (messages.length === 0) {
    return {
      startsWithPronoun: 0, startsWithVerb: 0, startsWithConjunction: 0,
      startsWithAdverb: 0, startsWithGreeting: 0, fragmentRate: 0,
      questionRate: 0, exclamationRate: 0, avgWordsPerMessage: 0, multiSentenceRate: 0,
    };
  }

  let pronounStart = 0;
  let verbStart = 0;
  let conjunctionStart = 0;
  let adverbStart = 0;
  let greetingStart = 0;
  let fragments = 0;
  let questions = 0;
  let exclamations = 0;
  let multiSentence = 0;
  let totalWords = 0;

  for (const msg of messages) {
    const trimmed = msg.trim();
    if (trimmed.length === 0) continue;

    const words = trimmed.split(/\s+/);
    totalWords += words.length;
    const firstWord = words[0].toLowerCase().replace(/[^a-z]/g, "");

    // Classify what the message starts with
    if (GREETING_WORDS.has(firstWord)) greetingStart++;
    else if (COMMON_PRONOUNS.has(firstWord)) pronounStart++;
    else if (COMMON_CONJUNCTIONS.has(firstWord)) conjunctionStart++;
    else if (COMMON_ADVERBS.has(firstWord)) adverbStart++;
    else if (COMMON_VERBS.has(firstWord)) verbStart++;

    // Fragment detection (1-3 words, no sentence punctuation inside)
    if (words.length <= 3) fragments++;

    // Question / exclamation detection
    if (trimmed.endsWith("?") || trimmed.endsWith("??") || trimmed.endsWith("???")) questions++;
    if (trimmed.endsWith("!") || trimmed.endsWith("!!") || trimmed.endsWith("!!!")) exclamations++;

    // Multi-sentence detection (contains . or ! or ? followed by a capital letter or space+capital)
    if (/[.!?]\s+[A-Z]/.test(trimmed)) multiSentence++;
  }

  const total = messages.length;
  return {
    startsWithPronoun: Math.round((pronounStart / total) * 1000) / 1000,
    startsWithVerb: Math.round((verbStart / total) * 1000) / 1000,
    startsWithConjunction: Math.round((conjunctionStart / total) * 1000) / 1000,
    startsWithAdverb: Math.round((adverbStart / total) * 1000) / 1000,
    startsWithGreeting: Math.round((greetingStart / total) * 1000) / 1000,
    fragmentRate: Math.round((fragments / total) * 1000) / 1000,
    questionRate: Math.round((questions / total) * 1000) / 1000,
    exclamationRate: Math.round((exclamations / total) * 1000) / 1000,
    avgWordsPerMessage: Math.round((totalWords / total) * 10) / 10,
    multiSentenceRate: Math.round((multiSentence / total) * 1000) / 1000,
  };
}

/**
 * Compare sentence patterns between two players - returns similarity 0-1
 */
export function compareSentencePatterns(p1: SentencePattern, p2: SentencePattern): number {
  // Weight features by discriminative power
  const features: { key: keyof SentencePattern; weight: number }[] = [
    { key: "startsWithPronoun", weight: 1.5 },     // Strong habit
    { key: "startsWithConjunction", weight: 1.8 },  // Very distinctive
    { key: "startsWithAdverb", weight: 1.2 },
    { key: "startsWithVerb", weight: 1.0 },
    { key: "fragmentRate", weight: 1.5 },            // Strong habit
    { key: "questionRate", weight: 1.3 },
    { key: "exclamationRate", weight: 1.0 },
    { key: "multiSentenceRate", weight: 1.2 },
  ];

  let totalDiff = 0;
  let totalWeight = 0;

  for (const { key, weight } of features) {
    const v1 = p1[key];
    const v2 = p2[key];
    const maxVal = Math.max(v1, v2, 0.05); // Avoid division by near-zero
    const diff = Math.abs(v1 - v2) / maxVal;
    totalDiff += diff * weight;
    totalWeight += weight;
  }

  return Math.max(0, 1 - (totalDiff / totalWeight));
}

// ============================================================================
// ENHANCED EMOTICON PROFILING
// ============================================================================

/**
 * Build a detailed emoticon usage profile.
 * Where someone places emotes, how many unique ones they use, and whether
 * they repeat them are all unconscious communication habits.
 */
export function buildEmoticonProfile(messages: string[]): EmoticonProfile {
  const allText = messages.join(" ");
  const totalMessages = messages.length || 1;

  // Basic detection (reuse existing logic)
  const noseEmotes = (allText.match(/:-[)(/\\|DPp]/g) || []).length;
  const noNoseEmotes = (allText.match(/(?<!:):[)(/\\|DPp]/g) || []).length;
  const emojiCount = (allText.match(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu) || []).length;

  // Track found emotes
  const foundEmotes: string[] = [];
  let totalEmoteCount = 0;
  for (const ep of EMOTE_PATTERNS) {
    const matches = allText.match(ep.pattern);
    if (matches && matches.length > 0) {
      foundEmotes.push(ep.name);
      totalEmoteCount += matches.length;
    }
  }

  // Position analysis: where do emotes appear in messages?
  let posStart = 0;
  let posEnd = 0;
  let posInline = 0;
  let repeatedEmoteMessages = 0;
  const totalWords = allText.split(/\s+/).length || 1;

  // Kaomoji detection
  const kaomojiPattern = /[\(（][\s]*[°╯╰ᕙᕕ☞☜✧✦]*[\s]*[□○●◕▽△▼◠◡╥ω°・ᗒᗕ]*[\s]*[□○●◕▽△▼◠◡╥ω°・ᗒᗕ]*[\s]*[°╯╰ᕙᕕ☞☜✧✦]*[\s]*[\)）]/g;
  const hasKaomoji = kaomojiPattern.test(allText);

  // Broad emote pattern for position detection
  const emoteRegex = /(?:x[Dd]+|:[)(/\\|DPp]|:-[)(/\\|DPp]|;\)|<3|\^\^|:3|[Dd]:|\blo+l\b|\blmao\b|\bhaha+\b|\bhehe+\b|\brofl\b)/gi;

  for (const msg of messages) {
    const trimmed = msg.trim();
    const emoteMatches = [...trimmed.matchAll(emoteRegex)];
    if (emoteMatches.length === 0) continue;

    // Check position of first and last emote
    const firstIndex = emoteMatches[0].index || 0;
    const lastMatch = emoteMatches[emoteMatches.length - 1];
    const lastIndex = (lastMatch.index || 0) + lastMatch[0].length;

    if (firstIndex <= 2) posStart++;
    if (lastIndex >= trimmed.length - 2) posEnd++;
    if (emoteMatches.length > 0 && firstIndex > 2 && lastIndex < trimmed.length - 2) posInline++;

    // Repeated emote detection (same emote appears 2+ times in one message)
    const emoteNames = emoteMatches.map(m => m[0].toLowerCase());
    const emoteSet = new Set(emoteNames);
    if (emoteNames.length > emoteSet.size) repeatedEmoteMessages++;
  }

  const totalPositioned = posStart + posEnd + posInline || 1;

  return {
    usesNose: noseEmotes > noNoseEmotes && noseEmotes >= 2,
    usesEmoji: emojiCount >= 3,
    commonEmotes: foundEmotes.slice(0, 5),
    emoteFrequency: Math.round((totalEmoteCount / totalMessages) * 100),
    emotePositionStart: Math.round((posStart / totalPositioned) * 1000) / 1000,
    emotePositionEnd: Math.round((posEnd / totalPositioned) * 1000) / 1000,
    emotePositionInline: Math.round((posInline / totalPositioned) * 1000) / 1000,
    kaomoji: hasKaomoji,
    repeatsEmotes: repeatedEmoteMessages >= 3,
    uniqueEmoteCount: foundEmotes.length,
    emoteToWordRatio: Math.round((totalEmoteCount / totalWords) * 1000) / 1000,
  };
}

/**
 * Compare emoticon profiles - returns similarity 0-1
 */
export function compareEmoticonProfiles(p1: EmoticonProfile, p2: EmoticonProfile): number {
  let score = 0;
  let maxScore = 0;

  // Shared common emotes (Jaccard)
  const set1 = new Set(p1.commonEmotes);
  const set2 = new Set(p2.commonEmotes);
  let emoteIntersection = 0;
  for (const e of set1) { if (set2.has(e)) emoteIntersection++; }
  const emoteUnion = set1.size + set2.size - emoteIntersection;
  const emoteJaccard = emoteUnion > 0 ? emoteIntersection / emoteUnion : 0;
  score += emoteJaccard * 3; // Weight: 3
  maxScore += 3;

  // Emote frequency similarity
  const maxFreq = Math.max(p1.emoteFrequency, p2.emoteFrequency, 1);
  const freqDiff = Math.abs(p1.emoteFrequency - p2.emoteFrequency) / maxFreq;
  score += (1 - freqDiff) * 2;
  maxScore += 2;

  // Position preference similarity
  const posDiff = Math.abs(p1.emotePositionEnd - p2.emotePositionEnd) +
    Math.abs(p1.emotePositionStart - p2.emotePositionStart);
  score += Math.max(0, 1 - posDiff) * 1.5;
  maxScore += 1.5;

  // Boolean matches
  if (p1.usesNose === p2.usesNose) score += 1;
  maxScore += 1;
  if (p1.kaomoji === p2.kaomoji && (p1.kaomoji || p2.kaomoji)) score += 1.5; // Distinctive
  maxScore += 1.5;
  if (p1.repeatsEmotes === p2.repeatsEmotes) score += 0.5;
  maxScore += 0.5;

  // Variety similarity
  const varietyDiff = Math.abs(p1.uniqueEmoteCount - p2.uniqueEmoteCount);
  score += Math.max(0, 1 - varietyDiff / 5) * 1;
  maxScore += 1;

  return maxScore > 0 ? score / maxScore : 0;
}

// ============================================================================
// DEEP PUNCTUATION FINGERPRINTING
// ============================================================================

/**
 * Build a deep punctuation fingerprint.
 * How someone uses ellipses, exclamations, dashes, parentheticals, and
 * terminal punctuation is surprisingly distinctive and hard to consciously fake.
 */
export function buildPunctuationFingerprint(messages: string[]): PunctuationFingerprint {
  const total = messages.length || 1;

  let ellipsisCount = 0;
  let totalEllipsisDots = 0;
  let ellipsisMsgCount = 0;
  let trailingEllipsis = 0;

  let exclamationCount = 0;
  let multiExclamation = 0;
  let totalExclChainLength = 0;
  let exclChainCount = 0;

  let multiQuestion = 0;
  let questionCount = 0;

  let dashCount = 0;
  let parentheticalCount = 0;
  let totalCommas = 0;
  let endsWithPeriod = 0;
  let endsWithNoPunct = 0;
  let tildeCount = 0;
  let slashCount = 0;
  let oxfordYes = 0;
  let oxfordNo = 0;

  for (const msg of messages) {
    const trimmed = msg.trim();

    // Ellipsis analysis
    const ellipsisMatches = trimmed.match(/\.{2,}/g);
    if (ellipsisMatches) {
      ellipsisCount += ellipsisMatches.length;
      ellipsisMsgCount++;
      for (const m of ellipsisMatches) {
        totalEllipsisDots += m.length;
      }
    }
    if (/\.{2,}\s*$/.test(trimmed)) trailingEllipsis++;
    if (/…/.test(trimmed)) {
      ellipsisCount++;
      ellipsisMsgCount++;
      totalEllipsisDots += 3;
    }

    // Exclamation analysis
    const exclMatches = trimmed.match(/!+/g);
    if (exclMatches) {
      for (const m of exclMatches) {
        exclamationCount++;
        totalExclChainLength += m.length;
        exclChainCount++;
        if (m.length >= 2) multiExclamation++;
      }
    }

    // Question analysis
    if (trimmed.includes("?")) questionCount++;
    const qMatches = trimmed.match(/\?{2,}/g);
    if (qMatches) multiQuestion++;

    // Dash usage (-- or — or isolated -)
    if (/\s-\s|--|—/.test(trimmed)) dashCount++;

    // Parenthetical usage
    if (/\([^)]+\)/.test(trimmed)) parentheticalCount++;

    // Comma count
    const commas = (trimmed.match(/,/g) || []).length;
    totalCommas += commas;

    // Terminal punctuation
    const lastChar = trimmed.slice(-1);
    if (lastChar === ".") endsWithPeriod++;
    if (!/[.!?…~]$/.test(trimmed)) endsWithNoPunct++;

    // Tilde
    if (/~/.test(trimmed)) tildeCount++;

    // Slash (for expressions like "lol/cry", "yes/no")
    if (/[a-z]\/[a-z]/i.test(trimmed)) slashCount++;

    // Oxford comma detection: look for "x, y, and z" vs "x, y and z"
    const oxfordMatch = trimmed.match(/\w+,\s+\w+,?\s+and\s+\w+/i);
    if (oxfordMatch) {
      if (/,\s+and\b/.test(oxfordMatch[0])) oxfordYes++;
      else oxfordNo++;
    }
  }

  return {
    ellipsisFrequency: Math.round((ellipsisMsgCount / total) * 100 * 10) / 10,
    ellipsisLength: ellipsisCount > 0 ? Math.round((totalEllipsisDots / ellipsisCount) * 10) / 10 : 0,
    trailingEllipsis: Math.round((trailingEllipsis / total) * 1000) / 1000,
    exclamationFrequency: Math.round((exclamationCount / total) * 100 * 10) / 10,
    multiExclamation: exclChainCount > 0 ? Math.round((multiExclamation / exclChainCount) * 1000) / 1000 : 0,
    avgExclamationLength: exclChainCount > 0 ? Math.round((totalExclChainLength / exclChainCount) * 10) / 10 : 0,
    multiQuestion: questionCount > 0 ? Math.round((multiQuestion / questionCount) * 1000) / 1000 : 0,
    rhetoricalQuestions: 0, // Would need conversational context to detect properly
    dashFrequency: Math.round((dashCount / total) * 100 * 10) / 10,
    parentheticalFrequency: Math.round((parentheticalCount / total) * 100 * 10) / 10,
    commasPerMessage: Math.round((totalCommas / total) * 100) / 100,
    oxfordComma: oxfordYes > oxfordNo && (oxfordYes + oxfordNo) >= 2,
    endsWithPeriod: Math.round((endsWithPeriod / total) * 1000) / 1000,
    endsWithNoPunctuation: Math.round((endsWithNoPunct / total) * 1000) / 1000,
    tildeUsage: tildeCount >= 3,
    slashUsage: Math.round((slashCount / total) * 100 * 10) / 10,
  };
}

/**
 * Compare punctuation fingerprints - returns similarity 0-1
 * Punctuation habits are unconscious and surprisingly distinctive.
 */
export function comparePunctuationFingerprints(p1: PunctuationFingerprint, p2: PunctuationFingerprint): number {
  // Weight features by discriminative power
  const numericFeatures: { v1: number; v2: number; weight: number; maxRange: number }[] = [
    { v1: p1.ellipsisFrequency, v2: p2.ellipsisFrequency, weight: 2.0, maxRange: 50 },
    { v1: p1.ellipsisLength, v2: p2.ellipsisLength, weight: 1.5, maxRange: 3 },
    { v1: p1.trailingEllipsis, v2: p2.trailingEllipsis, weight: 1.5, maxRange: 0.5 },
    { v1: p1.exclamationFrequency, v2: p2.exclamationFrequency, weight: 1.5, maxRange: 50 },
    { v1: p1.multiExclamation, v2: p2.multiExclamation, weight: 1.8, maxRange: 1 },
    { v1: p1.avgExclamationLength, v2: p2.avgExclamationLength, weight: 1.5, maxRange: 3 },
    { v1: p1.multiQuestion, v2: p2.multiQuestion, weight: 1.2, maxRange: 1 },
    { v1: p1.dashFrequency, v2: p2.dashFrequency, weight: 2.0, maxRange: 20 },
    { v1: p1.parentheticalFrequency, v2: p2.parentheticalFrequency, weight: 2.0, maxRange: 20 },
    { v1: p1.commasPerMessage, v2: p2.commasPerMessage, weight: 1.5, maxRange: 3 },
    { v1: p1.endsWithPeriod, v2: p2.endsWithPeriod, weight: 2.0, maxRange: 1 },
    { v1: p1.endsWithNoPunctuation, v2: p2.endsWithNoPunctuation, weight: 2.0, maxRange: 1 },
  ];

  let totalDiff = 0;
  let totalWeight = 0;

  for (const { v1, v2, weight, maxRange } of numericFeatures) {
    const diff = Math.abs(v1 - v2) / Math.max(maxRange, 0.001);
    totalDiff += Math.min(diff, 1) * weight;
    totalWeight += weight;
  }

  // Boolean features
  if (p1.oxfordComma === p2.oxfordComma) totalDiff -= 0; // neutral
  else { totalDiff += 1.0; totalWeight += 1.0; }
  totalWeight += 1.0; // account for match case

  if (p1.tildeUsage === p2.tildeUsage && (p1.tildeUsage || p2.tildeUsage)) {
    // Both use or both don't use tildes - distinctive if both use
    totalWeight += 1.5;
  } else if (p1.tildeUsage !== p2.tildeUsage) {
    totalDiff += 1.5;
    totalWeight += 1.5;
  }

  return Math.max(0, 1 - (totalDiff / totalWeight));
}
