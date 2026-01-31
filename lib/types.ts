// ============================================================================
// CHAT ANALYZER - TYPE DEFINITIONS
// ============================================================================

export interface ChatMessage {
  timestamp: string;
  player: string;
  message: string;
  lineNumber: number;
  timeSeconds: number; // Seconds since midnight for temporal analysis
  dayIndex: number; // Which day (0, 1, 2, ...) for multi-day analysis
  absoluteTime: number; // Absolute time for handoff detection (dayIndex * 86400 + timeSeconds)
}

export interface AdvancedPlayerStats {
  name: string;
  messageCount: number;
  wordCount: number;
  avgWordsPerMessage: number;

  // Temporal patterns
  activeMinutes: Set<number>; // Minutes in the day they were active
  activeDayMinutes: Map<number, Set<number>>; // Per day: minutes active
  sessionGaps: number[]; // Gaps between messages in seconds
  avgResponseTime: number;
  activityPattern: ActivityPattern; // NEW: Time-of-day activity fingerprint

  // Linguistic fingerprint
  charNgrams: Map<string, number>; // Character trigrams
  wordBigrams: Map<string, number>; // NEW: Word pairs (bigrams)
  typoPatterns: string[]; // Common misspellings
  punctuationStyle: PunctuationStyle;
  punctuationFrequency: Map<string, number>; // NEW: Punctuation usage frequency
  letterSubstitutions: Map<string, number>; // u->you, r->are, etc.
  microPatterns: MicroPatterns; // Detailed micro-patterns
  emoticonStyle: EmoticonStyle; // Emoticon fingerprint
  emoticonProfile: EmoticonProfile; // Enhanced emoticon fingerprint
  functionWords: FunctionWordProfile; // NEW: Function word fingerprint (most reliable!)
  punctuationFingerprint: PunctuationFingerprint; // Deep punctuation analysis

  // Statistical stylometry
  vocabularyRichness: number; // Unique words / total words (TTR)
  hapaxRatio: number; // Words used only once / total unique
  yulesK: number; // Yule's characteristic K
  simpsonsD: number; // NEW: Simpson's Diversity Index
  brunetsW: number; // NEW: Brunet's W statistic
  avgWordLength: number;
  wordLengthDistribution: number[]; // Distribution of word lengths 1-15+
  messageLengthDistribution: number[]; // NEW: Distribution of message lengths
  sentencePatterns: SentencePattern; // Sentence structure fingerprint

  // Behavioral
  commonWords: string[];
  commonPhrases: string[];
  commonStarters: string[];
  commonEnders: string[]; // NEW: Common ending words/phrases
  greetingStyle: string[]; // NEW: How they greet (hi, hey, hello, yo)
  farewellStyle: string[]; // NEW: How they say bye (cya, bye, later, bb)
  responsePartners: Map<string, number>; // Who they respond to most
  mentionedPlayers: Set<string>; // Players they mention
  topicFingerprint: Map<string, number>; // Topic word frequencies
  wurmTopics: Map<string, number>; // Game-specific topic usage (kept for backwards compat)
  gameTopics: Map<string, number>; // Game-specific topic usage

  // Raw data for comparison
  allMessages: string[];
  messageTimes: number[];
  absoluteTimes: number[]; // For handoff detection
}

// Function word profile - MOST RELIABLE stylometry feature
export interface FunctionWordProfile {
  // Relative frequencies of function word categories (0-1)
  articles: number;       // the, a, an
  pronouns: number;       // I, you, he, she, it, we, they, me, him, her, us, them
  prepositions: number;   // in, on, at, to, for, with, by, from, about
  conjunctions: number;   // and, but, or, so, because, if, when, while
  auxiliaries: number;    // is, are, was, were, have, has, had, do, does, did, will, would, can, could
  quantifiers: number;    // all, some, any, many, much, few, more, most, every
  // Specific high-value markers
  iVsWe: number;          // Ratio of "I" to "we" usage
  butVsAnd: number;       // Ratio of "but" to "and" (indicates argumentative style)
  questionMarks: number;  // Frequency of questions asked
}

// Activity pattern fingerprint
export interface ActivityPattern {
  morningActive: number;  // 6am-12pm activity percentage
  afternoonActive: number; // 12pm-6pm
  eveningActive: number;  // 6pm-12am
  nightActive: number;    // 12am-6am
  burstiness: number;     // How "bursty" vs steady the messaging is (0-1)
  avgSessionLength: number; // Average session length in minutes
}

export interface AltSuspicion {
  player1: string;
  player2: string;
  confidence: number;
  category: "critical" | "high" | "medium" | "low";
  reasons: AltReason[];
  neverOnlineTogether: boolean;
  similarityScore: number;
  scoreBreakdown: ScoreBreakdown; // Detailed breakdown for UI
  humanExplanation: string; // Readable explanation
  sharedRareWords: string[]; // Rare words both use
  handoffScore: number; // Handoff pattern score
}

export interface AltReason {
  type: string;
  description: string;
  weight: number;
  evidence?: string;
}

export interface SimilarityMatrix {
  players: string[];
  scores: number[][];
}

// Micro-patterns for forensic fingerprinting
export interface MicroPatterns {
  lowercaseI: boolean;        // writes "i" instead of "I"
  noCapitalStart: boolean;    // starts sentences without capital
  allLowercase: boolean;      // all lowercase
  excessiveCaps: boolean;     // USES LOTS OF CAPS
  numberSubstitution: boolean; // "2" for "to", "4" for "for"
  doubleSpaces: boolean;      // two spaces  between words
  noSpaceAfterPunct: boolean; // no space after.punctuation
}

// Emoticon style fingerprint
export interface EmoticonStyle {
  usesNose: boolean;      // :-) vs :)
  usesEmoji: boolean;     // Uses unicode emoji
  commonEmotes: string[]; // ["xD", "lol", ":P"]
  emoteFrequency: number; // per 100 messages
}

// Score breakdown per category for UI
export interface ScoreBreakdown {
  temporal: number;
  linguistic: number;
  behavioral: number;
  network: number;
  rareWords: number;
  handoff: number;
  bonus: number;
}

// Punctuation style fingerprint
export interface PunctuationStyle {
  spaceBefore: boolean; // Space before ? or !
  doublePunctuation: boolean; // !! or ??
  ellipsisStyle: string; // ... or .. or ...
  commaSpacing: boolean;
}

// Sentence structure fingerprint
export interface SentencePattern {
  // Structure distribution (what % of messages start with each type)
  startsWithPronoun: number;      // "I think...", "You should..."
  startsWithVerb: number;         // "Go there", "Think about it"
  startsWithConjunction: number;  // "But why", "And then"
  startsWithAdverb: number;       // "Really?", "Actually..."
  startsWithGreeting: number;     // "Hey", "Hi", "Yo"
  // Message structure habits
  fragmentRate: number;           // % of messages that are fragments (1-3 words)
  questionRate: number;           // % of messages that are questions
  exclamationRate: number;        // % of messages that are exclamations
  avgWordsPerMessage: number;     // Average words per message
  multiSentenceRate: number;      // % of messages with multiple sentences
}

// Enhanced emoticon fingerprint
export interface EmoticonProfile {
  usesNose: boolean;              // :-) vs :)
  usesEmoji: boolean;             // Unicode emoji
  commonEmotes: string[];         // Top emotes used
  emoteFrequency: number;         // Per 100 messages
  // Enhanced fields
  emotePositionStart: number;     // % of emotes at message start
  emotePositionEnd: number;       // % of emotes at message end
  emotePositionInline: number;    // % of emotes mid-message
  kaomoji: boolean;               // Uses Japanese-style (╯°□°)╯
  repeatsEmotes: boolean;         // Repeats emotes like ":) :) :)"
  uniqueEmoteCount: number;       // Variety of different emotes
  emoteToWordRatio: number;       // How much of communication is emotes
}

// Deep punctuation fingerprint
export interface PunctuationFingerprint {
  // Ellipsis habits
  ellipsisFrequency: number;      // Per 100 messages
  ellipsisLength: number;         // Average dots (2, 3, 4+)
  trailingEllipsis: number;       // % ending with ...
  // Exclamation habits
  exclamationFrequency: number;   // Per 100 messages
  multiExclamation: number;       // % that use !! or !!!
  avgExclamationLength: number;   // Average chain length (1, 2, 3+)
  // Question habits
  multiQuestion: number;          // % that use ?? or ???
  rhetoricalQuestions: number;     // Questions not directed at anyone
  // Dash and parenthetical habits
  dashFrequency: number;          // Per 100 messages (- or --)
  parentheticalFrequency: number; // Per 100 messages (text in parens)
  // Comma habits
  commasPerMessage: number;       // Average commas per message
  oxfordComma: boolean;           // Uses "a, b, and c" vs "a, b and c"
  // Terminal punctuation
  endsWithPeriod: number;         // % of messages ending with .
  endsWithNoPunctuation: number;  // % of messages with no terminal punct
  // Special patterns
  tildeUsage: boolean;            // Uses ~ for tone ("okay~", "thanks~")
  slashUsage: number;             // Frequency of / usage
}

// Parsed line result
export interface ParsedLine {
  message: ChatMessage | null;
  dateChange: string | null;
}

// Handoff detection result
export interface HandoffResult {
  score: number;
  handoffCount: number;
  totalTransitions: number;
  // Enhanced handoff data (v4.2)
  directionality: number;        // 0 = perfectly bidirectional, 1 = always one-way (more suspicious)
  dominantDirection: string;     // "P1→P2" or "P2→P1" or "balanced"
  p1ToP2Count: number;           // Handoffs from P1 ending → P2 starting
  p2ToP1Count: number;           // Handoffs from P2 ending → P1 starting
  avgHandoffDelay: number;       // Average seconds between session end and next start
  delayConsistency: number;      // 0-1, how consistent the delays are (1 = very consistent = suspicious)
  sessionShadowing: number;      // 0-1, how well sessions fill each other's gaps
  handoffDelays: number[];       // Individual delay values for visualization
}

// Game topic overlap result
export interface GameTopicOverlap {
  score: number;
  sharedTopics: string[];
}

// Backwards compatibility alias
export type WurmTopicOverlap = GameTopicOverlap;

// ============================================================================
// SOCIAL ANALYSIS TYPES (v4.1)
// ============================================================================

/**
 * Social insight - separate from alt detection
 * Analyzes relationships between players
 */
export interface SocialInsight {
  player1: string;
  player2: string;
  insightType: "self_talk_suspected" | "conflict_detected" | "close_friends" | "one_way_interaction";
  confidence: number;
  description: string;
  evidence: string[];
}

/**
 * Conversation pair analysis
 * Tracks who talks to who and how
 */
export interface ConversationPair {
  player1: string;
  player2: string;
  p1ToP2Count: number;       // How many times P1 responds to P2
  p2ToP1Count: number;       // How many times P2 responds to P1
  totalInteractions: number;
  stylisticSimilarity: number; // 0-1 how similar their writing is
  onlineTogetherMinutes: number;
  bothActiveButNoInteraction: boolean; // Key for conflict detection
}

/**
 * Slip detection - inconsistent typing patterns within one account
 * Indicates someone trying to type differently but "slipping"
 */
export interface SlipPattern {
  playerName: string;
  slipType: "typo_inconsistency" | "style_shift" | "vocabulary_change";
  description: string;
  evidence: string[];
  suspicionLevel: "low" | "medium" | "high";
}

/**
 * Extended alt suspicion with self-talk analysis
 */
export interface SelfTalkIndicator {
  player1: string;
  player2: string;
  talkToEachOther: boolean;
  sameWritingStyle: boolean;
  suspicionScore: number;
  reasoning: string;
}

// Re-export AlgorithmConfig from constants for convenience
export type { AlgorithmConfig, AlgorithmMode } from "./constants";
