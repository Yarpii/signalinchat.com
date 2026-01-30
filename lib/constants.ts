// ============================================================================
// CHAT ANALYZER - CONSTANTS
// ============================================================================

// ============================================================================
// ALGORITHM MODES - Selectable detection presets
// ============================================================================

export type AlgorithmMode =
  | "balanced"      // Default - good balance of accuracy and false positive rate
  | "strict"        // Conservative - fewer false positives, may miss some alts
  | "sensitive"     // Aggressive - catches more alts, but more false positives
  | "temporal"      // Focus on timing patterns (handoff, never online together)
  | "linguistic"    // Focus on writing style (function words, n-grams, typos)
  | "wurm";         // Wurm Online optimized - tuned for game-specific patterns

export interface AlgorithmConfig {
  name: string;
  description: string;
  // Minimum thresholds
  minMessages: number;          // Minimum messages per player
  minScoreToReport: number;     // Minimum total score to report
  minStrongReasons: number;     // Minimum strong reasons required
  // Weight multipliers for each category (1.0 = normal)
  temporalWeight: number;
  linguisticWeight: number;
  behavioralWeight: number;
  networkWeight: number;
  // Specific feature weights
  functionWordWeight: number;   // Function words are most reliable
  ngramWeight: number;
  typoWeight: number;
  rareWordWeight: number;
  handoffWeight: number;
  // Thresholds for triggering features
  ngramThresholdHigh: number;   // N-gram similarity for high score
  ngramThresholdMed: number;    // N-gram similarity for medium score
  functionWordThresholdHigh: number;
  functionWordThresholdMed: number;
  // Confidence calculation
  confidenceMultiplier: number;
  confidenceBase: number;
}

export const ALGORITHM_CONFIGS: Record<AlgorithmMode, AlgorithmConfig> = {
  balanced: {
    name: "Balanced (v4.2)",
    description: "Default algorithm with good accuracy and low false positives. Tuned to reduce false positives for same-language speakers.",
    minMessages: 20,
    minScoreToReport: 70,
    minStrongReasons: 2,
    temporalWeight: 1.0,
    linguisticWeight: 1.0,
    behavioralWeight: 1.0,
    networkWeight: 1.0,
    functionWordWeight: 1.0,
    ngramWeight: 0.7,           // Reduced - n-grams are language-dependent, not person-dependent
    typoWeight: 1.0,
    rareWordWeight: 1.0,
    handoffWeight: 1.0,
    ngramThresholdHigh: 0.985,  // Raised - same-language speakers already score ~0.94-0.97
    ngramThresholdMed: 0.97,    // Raised
    functionWordThresholdHigh: 0.92,
    functionWordThresholdMed: 0.85,
    confidenceMultiplier: 0.40,
    confidenceBase: 12,
  },
  strict: {
    name: "Strict (Low False Positives)",
    description: "Conservative mode - only reports high-confidence matches",
    minMessages: 30,
    minScoreToReport: 100,
    minStrongReasons: 3,
    temporalWeight: 1.2,
    linguisticWeight: 1.0,
    behavioralWeight: 0.8,
    networkWeight: 0.5,
    functionWordWeight: 1.3,
    ngramWeight: 0.5,           // Reduced - n-grams unreliable across same language
    typoWeight: 1.2,
    rareWordWeight: 1.0,
    handoffWeight: 1.2,
    ngramThresholdHigh: 0.99,   // Raised
    ngramThresholdMed: 0.98,    // Raised
    functionWordThresholdHigh: 0.94,
    functionWordThresholdMed: 0.88,
    confidenceMultiplier: 0.35,
    confidenceBase: 15,
  },
  sensitive: {
    name: "Sensitive (Catch More)",
    description: "Aggressive mode - catches more potential alts, may have false positives",
    minMessages: 15,
    minScoreToReport: 50,
    minStrongReasons: 1,
    temporalWeight: 1.0,
    linguisticWeight: 1.2,
    behavioralWeight: 1.2,
    networkWeight: 1.0,
    functionWordWeight: 1.0,
    ngramWeight: 0.8,           // Reduced - n-grams have high same-language baseline
    typoWeight: 1.0,
    rareWordWeight: 1.2,
    handoffWeight: 1.0,
    ngramThresholdHigh: 0.98,   // Raised
    ngramThresholdMed: 0.95,    // Raised
    functionWordThresholdHigh: 0.88,
    functionWordThresholdMed: 0.78,
    confidenceMultiplier: 0.45,
    confidenceBase: 10,
  },
  temporal: {
    name: "Temporal Focus",
    description: "Emphasizes timing patterns - handoffs, never online together",
    minMessages: 20,
    minScoreToReport: 60,
    minStrongReasons: 2,
    temporalWeight: 1.5,
    linguisticWeight: 0.7,
    behavioralWeight: 0.8,
    networkWeight: 1.2,
    functionWordWeight: 0.8,
    ngramWeight: 0.5,           // Low - temporal mode doesn't rely on n-grams
    typoWeight: 0.8,
    rareWordWeight: 0.8,
    handoffWeight: 1.5,
    ngramThresholdHigh: 0.985,
    ngramThresholdMed: 0.97,
    functionWordThresholdHigh: 0.92,
    functionWordThresholdMed: 0.85,
    confidenceMultiplier: 0.42,
    confidenceBase: 10,
  },
  linguistic: {
    name: "Linguistic Focus",
    description: "Emphasizes writing style - function words, n-grams, typos. Calibrated to avoid same-language false positives.",
    minMessages: 25,
    minScoreToReport: 70,
    minStrongReasons: 2,
    temporalWeight: 0.7,
    linguisticWeight: 1.4,
    behavioralWeight: 1.0,
    networkWeight: 0.6,
    functionWordWeight: 1.5,
    ngramWeight: 0.8,           // Reduced - n-grams are language-level, not person-level
    typoWeight: 1.3,
    rareWordWeight: 1.2,
    handoffWeight: 0.7,
    ngramThresholdHigh: 0.985,  // Raised significantly
    ngramThresholdMed: 0.97,    // Raised
    functionWordThresholdHigh: 0.90,
    functionWordThresholdMed: 0.82,
    confidenceMultiplier: 0.40,
    confidenceBase: 12,
  },
  wurm: {
    name: "Wurm Online Optimized",
    description: "Tuned for Wurm Online chat patterns and terminology",
    minMessages: 20,
    minScoreToReport: 65,
    minStrongReasons: 2,
    temporalWeight: 1.2,  // Important - alts often don't overlap
    linguisticWeight: 1.1,
    behavioralWeight: 1.2, // Wurm has specific behavioral patterns
    networkWeight: 0.8,   // Less weight - people often don't interact in general chat
    functionWordWeight: 1.0,
    ngramWeight: 0.7,     // Reduced - English n-grams too uniform for person-level detection
    typoWeight: 1.1,
    rareWordWeight: 1.3,  // Important - Wurm-specific vocabulary
    handoffWeight: 1.3,   // Multiboxing/alt-switching is common
    ngramThresholdHigh: 0.985, // Raised - same-language speakers score ~0.94-0.97
    ngramThresholdMed: 0.97,   // Raised
    functionWordThresholdHigh: 0.90,
    functionWordThresholdMed: 0.83,
    confidenceMultiplier: 0.42,
    confidenceBase: 11,
  },
};

// STOP WORDS for analysis - common words to filter out
export const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "must", "shall", "can", "need", "dare",
  "to", "of", "in", "for", "on", "with", "at", "by", "from", "as",
  "into", "through", "during", "before", "after", "above", "below",
  "between", "under", "again", "further", "then", "once", "here",
  "there", "when", "where", "why", "how", "all", "each", "few", "more",
  "most", "other", "some", "such", "no", "nor", "not", "only", "own",
  "same", "so", "than", "too", "very", "just", "and", "but", "if", "or",
  "because", "until", "while", "about", "against",
  "i", "me", "my", "myself", "we", "our", "you", "your", "he", "him",
  "she", "her", "it", "its", "they", "them", "their", "what", "which",
  "who", "whom", "this", "that", "these", "those", "am", "im", "ive",
  "dont", "doesnt", "didnt", "wont", "wouldnt", "cant", "couldnt",
  "yeah", "yes", "ok", "okay", "oh", "ah", "lol", "haha", "hehe",
]);

// Common words that should NEVER be considered "rare" - they're just normal vocabulary
export const COMMON_GAMING_WORDS = new Set([
  // -----------------------------------------------------------------------
  // Common English words — these are everyday vocabulary, NOT rare/unique
  // -----------------------------------------------------------------------
  // Basic verbs and verb forms
  "just", "like", "really", "think", "know", "want", "need", "good", "nice",
  "back", "going", "getting", "making", "doing", "trying", "looking", "coming",
  "work", "working", "works", "worked", "play", "playing", "player", "players",
  "take", "taken", "taking", "give", "given", "giving", "keep", "keeping",
  "come", "coming", "leave", "leaving", "start", "started", "starting",
  "stop", "stopped", "stopping", "move", "moved", "moving", "turn", "turned",
  "stand", "standing", "run", "running", "walk", "walking", "sit", "sitting",
  "hold", "holding", "bring", "bringing", "send", "sending", "read", "reading",
  "write", "writing", "learn", "learning", "change", "changed", "changing",
  "close", "closed", "closing", "open", "opened", "opening", "pull", "pulling",
  "push", "pushing", "show", "showed", "showing", "tell", "telling", "call",
  "called", "calling", "catch", "caught", "build", "built", "break", "broken",
  "spend", "spent", "understand", "understood", "remember", "forget", "forgot",
  "believe", "imagine", "realize", "notice", "happen", "happened", "happens",
  "begin", "began", "finish", "finished", "continue", "exist", "exists",
  "follow", "followed", "reach", "reached", "offer", "offered", "create",
  "destroy", "destroyed", "cover", "covered", "suggest", "include", "included",
  "allow", "allowed", "expect", "expected", "cause", "caused", "wonder",
  "promise", "promised", "explain", "explained", "decide", "decided",
  "consider", "appear", "appeared", "seems", "become", "became", "remain",
  "setting", "helping", "helped", "fixing", "fixed", "ended", "ending",
  "buying", "bought", "selling", "using", "losing", "winning", "paying",
  "asking", "waiting", "coming", "talking", "saying", "going", "seeing",
  "trying", "dying", "lying", "sitting", "hitting", "letting", "putting",
  "running", "getting", "cutting", "looking", "fighting", "laughing",
  "falling", "feeling", "meeting", "picking", "spending", "standing",
  "catching", "holding", "hearing", "keeping", "leading", "reading",
  "speaking", "thinking", "finding", "giving", "knowing", "living",
  "beating", "leaving", "meaning", "passing", "pulling", "raising",
  "setting", "showing", "telling", "turning", "walking", "watching",
  "wearing", "writing", "adding", "betting", "dealing", "feeding",
  "hanging", "hiding", "hurting", "lacking", "landing", "lasting",
  "lending", "loading", "looking", "missing", "moving", "needing",
  "paying", "pointing", "proving", "pushing", "reaching", "resting",
  "riding", "rising", "saving", "sending", "sharing", "singing",
  "sleeping", "solving", "sorting", "starting", "stopping", "taking",
  "testing", "trading", "turning", "wanting", "wishing", "working",
  "struggling", "attacking", "spawning",
  // Common adjectives
  "pretty", "quite", "very", "much", "well", "also", "still", "even", "though",
  "great", "little", "small", "large", "long", "short", "high", "young",
  "important", "different", "early", "late", "hard", "easy", "fast", "slow",
  "better", "worse", "best", "worst", "right", "wrong", "real", "true", "false",
  "full", "empty", "whole", "half", "certain", "clear", "ready", "simple",
  "strong", "possible", "free", "special", "difficult", "happy", "sorry",
  "green", "black", "white", "blue", "dark", "light", "hot", "cold",
  "tired", "sick", "crazy", "silly", "weird", "cool", "funny", "serious",
  "blind", "straight", "fancy", "bigger", "smaller", "faster", "slower",
  "closer", "further", "higher", "lower", "longer", "shorter", "harder",
  "easier", "deeper", "wider", "older", "newer", "safer", "worse",
  "aggressive", "careful", "useful", "broken", "hidden", "entire", "recent",
  "bugged", "random", "decent", "massive", "insane", "proper", "actual",
  // Common nouns
  "something", "anything", "nothing", "everything", "someone", "anyone", "everyone",
  "stuff", "thing", "things", "place", "time", "people", "person", "guys", "dude",
  "point", "part", "world", "house", "home", "story", "money", "night",
  "morning", "water", "power", "state", "month", "music", "area", "issue",
  "hand", "group", "problem", "fact", "company", "system", "program",
  "question", "number", "school", "order", "business", "country", "room",
  "case", "woman", "price", "reason", "letter", "girl", "body", "market",
  "side", "land", "child", "class", "family", "mother", "father", "head",
  "stand", "hours", "minutes", "seconds", "today", "tomorrow", "yesterday",
  "week", "weeks", "month", "months", "year", "years", "winter", "summer",
  "spring", "easter", "christmas", "chance", "sense", "couple", "moment",
  "amount", "access", "doubt", "message", "ideas", "brain", "ticket",
  "community", "trouble", "boxes", "knives", "snake", "corpse", "matter",
  "scroll", "reflex", "slime", "combo", "champs", "brutes", "perfume",
  "prices", "behind", "above", "below", "inside", "outside", "between",
  // Common adverbs and discourse markers
  "yeah", "yep", "nope", "maybe", "probably", "actually", "basically", "literally",
  "always", "never", "often", "sometimes", "already", "almost", "rather",
  "enough", "either", "together", "finally", "recently", "quickly", "slowly",
  "simply", "certainly", "obviously", "exactly", "especially", "definitely",
  "usually", "apparently", "currently", "generally", "clearly", "seriously",
  "honestly", "suddenly", "entirely", "mostly", "nearly", "likely", "merely",
  "apart", "along", "across", "around", "besides", "instead", "despite",
  // Common expressions and interjections
  "jesus", "christ", "damn", "dammit", "gonna", "gotta", "wanna", "kinda",
  "sorta", "dunno", "shouldnt", "wouldnt", "couldnt", "didnt", "doesnt",
  "gotten", "lookin", "nothin", "somethin", "anythin",
  // Common gaming terms
  "game", "server", "online", "offline", "login", "logout", "spawn", "respawn",
  "kill", "killed", "death", "dead", "died", "alive", "health", "damage", "attack",
  "level", "skill", "skills", "grind", "grinding", "farm", "farming", "loot",
  "item", "items", "gear", "armor", "weapon", "weapons", "tool", "tools",
  "quest", "mission", "event", "update", "patch", "buff", "nerf", "stats",
  "guild", "clan", "alliance", "team", "group", "party", "friend", "friends",
  "noob", "newbie", "veteran", "admin", "moderator", "owner",
  // Common game items/concepts (generic, not game-specific)
  "horse", "cart", "boat", "ship", "house", "building",
  "wood", "iron", "steel", "silver", "gold", "copper", "stone", "rock",
  "water", "food", "meat", "fish", "leather", "cloth",
  "highway", "road", "bridge", "door", "floor", "gate",
  "quality", "damage", "weight", "volume", "temperature",
  "timer", "cooldown", "decay", "bonus", "stamina",
  "guard", "guards", "tower",
  // Common English words that falsely appear as "rare" in small groups
  // These are normal vocabulary, not stylistic fingerprints
  "recall", "stance", "drive", "window", "control", "recipe",
  "manage", "option", "handle", "assume", "afford", "avoid",
  "blame", "claim", "confirm", "convince", "defeat", "defend",
  "delay", "deliver", "demand", "detect", "discuss", "display",
  "divide", "enable", "engage", "ensure", "escape", "evolve",
  "expand", "expose", "extend", "focus", "ignore", "impose",
  "invest", "involve", "judge", "launch", "limit", "locate",
  "obtain", "oppose", "perform", "permit", "phrase", "prefer",
  "preserve", "prevent", "process", "produce", "promote", "protect",
  "prove", "pursue", "quote", "reduce", "refer", "reflect",
  "reform", "refuse", "reject", "relate", "relief", "rely",
  "remove", "repeat", "replace", "report", "request", "require",
  "resolve", "respond", "restore", "reveal", "review", "reward",
  "rotate", "secure", "select", "settle", "signal", "solve",
  "spread", "submit", "succeed", "supply", "support", "survive",
  "suspect", "switch", "target", "threat", "transfer", "trigger",
  "update", "volume", "comment", "device", "effect", "effort",
  "energy", "engine", "figure", "growth", "impact", "income",
  "method", "normal", "period", "pocket", "profit", "result",
  "safety", "screen", "search", "season", "sector", "speech",
  "status", "stress", "strike", "supply", "symbol", "talent",
  "theory", "threat", "tissue", "travel", "vision", "wealth",
  // Gaming peripherals / hardware terms (not fingerprinting)
  "hotas", "mouse", "keyboard", "joystick", "throttle", "pedals",
  "monitor", "headset", "controller", "gamepad", "setup", "config",
]);

/**
 * Build a merged set of common words for a game profile.
 * Combines the global COMMON_GAMING_WORDS with game-specific words.
 */
export function buildCommonWordsForGame(gameCommonWords: string[]): Set<string> {
  const merged = new Set(COMMON_GAMING_WORDS);
  for (const w of gameCommonWords) {
    merged.add(w);
  }
  return merged;
}

// Generic topic words for fingerprinting (game-agnostic)
export const TOPIC_WORDS = [
  "skill", "grind", "weapon", "armor", "shield",
  "newbie", "noob", "veteran",
  "help", "need", "want", "sell", "buy", "trade", "price",
  "lag", "bug", "fix", "dev", "update", "patch",
  "alliance", "enemy", "friend", "war", "peace",
];

// Typo patterns with commonality flag.
// "common" typos are made by many casual English typists and have low
// discriminative power for identifying individuals. Only "distinctive"
// (common: false) typos are strong fingerprints.
export const TYPO_CHECKS: { pattern: RegExp; label: string; common: boolean }[] = [
  // Common typos - most casual English speakers make these
  { pattern: /\bteh\b/g, label: "teh->the", common: true },
  { pattern: /\bhte\b/g, label: "hte->the", common: true },
  { pattern: /\bwiht\b/g, label: "wiht->with", common: true },
  { pattern: /\balot\b/g, label: "alot", common: true },
  { pattern: /\byuo\b/g, label: "yuo->you", common: true },
  { pattern: /\bwaht\b/g, label: "waht->what", common: true },
  { pattern: /\btaht\b/g, label: "taht->that", common: true },
  { pattern: /([a-z])\1{2,}/g, label: "triple-letters", common: true },
  // Distinctive typos - these indicate individual spelling habits
  { pattern: /\bthier\b/g, label: "thier->their", common: false },
  { pattern: /\bdefinately\b/g, label: "definately", common: false },
  { pattern: /\brecieve\b/g, label: "recieve", common: false },
  { pattern: /\boccured\b/g, label: "occured", common: false },
  { pattern: /\buntill\b/g, label: "untill", common: false },
  { pattern: /\bwich\b/g, label: "wich->which", common: false },
  { pattern: /\bbeacuse\b/g, label: "beacuse", common: false },
  { pattern: /\bfreind\b/g, label: "freind", common: false },
  { pattern: /\bgoverment\b/g, label: "goverment", common: false },
  { pattern: /\bgrammer\b/g, label: "grammer", common: false },
];

// Letter substitution patterns (txtspk)
export const LETTER_SUBSTITUTION_PATTERNS = [
  { pattern: /\bu\b/g, label: "u->you" },
  { pattern: /\br\b/g, label: "r->are" },
  { pattern: /\bur\b/g, label: "ur->your" },
  { pattern: /\by\b/g, label: "y->why" },
  { pattern: /\bk\b/g, label: "k->ok" },
  { pattern: /\bb4\b/g, label: "b4->before" },
  { pattern: /\b2\b(?!\d)/g, label: "2->to/too" },
  { pattern: /\b4\b(?!\d)/g, label: "4->for" },
  { pattern: /\bcuz\b/g, label: "cuz->because" },
  { pattern: /\bplz\b/g, label: "plz->please" },
  { pattern: /\bthx\b/g, label: "thx->thanks" },
  { pattern: /\bppl\b/g, label: "ppl->people" },
  { pattern: /\brn\b/g, label: "rn->right now" },
  { pattern: /\bidk\b/g, label: "idk" },
  { pattern: /\bimo\b/g, label: "imo" },
  { pattern: /\btbh\b/g, label: "tbh" },
  { pattern: /\bngl\b/g, label: "ngl" },
];

// Emoticon patterns to detect
export const EMOTE_PATTERNS = [
  { pattern: /\bxD+\b/gi, name: "xD" },
  { pattern: /\blol\b/gi, name: "lol" },
  { pattern: /\blmao\b/gi, name: "lmao" },
  { pattern: /\brofl\b/gi, name: "rofl" },
  { pattern: /\bhaha+\b/gi, name: "haha" },
  { pattern: /\bhehe+\b/gi, name: "hehe" },
  { pattern: /:[)]/g, name: ":)" },
  { pattern: /:\(/g, name: ":(" },
  { pattern: /:D/g, name: ":D" },
  { pattern: /:P/gi, name: ":P" },
  { pattern: /;\)/g, name: ";)" },
  { pattern: /\bo\.O\b|\bO\.o\b/g, name: "o.O" },
  { pattern: /\^\^/g, name: "^^" },
  { pattern: /<3/g, name: "<3" },
];
