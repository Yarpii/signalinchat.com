// ============================================================================
// GAME PROFILES - Multi-game support configuration
// ============================================================================
//
// Each game profile defines game-specific vocabulary, system players,
// chat formats, and algorithm tuning. The core analysis engine (stylometry,
// temporal, behavioral) is game-agnostic; only these profiles change.
// ============================================================================

import type { AlgorithmConfig } from "./constants";

// ============================================================================
// GAME PROFILE INTERFACE
// ============================================================================

export interface GameProfile {
  id: string;
  name: string;
  description: string;
  status: "live" | "beta" | "coming_soon";

  // Game-specific vocabulary for topic fingerprinting
  gameTerms: string[];

  // Common game-specific words that should NOT be considered "rare"
  // (merged with the global COMMON_GAMING_WORDS at runtime)
  commonGameWords: string[];

  // System/bot player names to filter out (merged with global defaults)
  systemPlayers: string[];

  // Trade chat patterns (e.g. WTS/WTB prefixes)
  tradePatterns: RegExp[];

  // Game-specific abbreviations used for fingerprinting
  abbreviations: string[];

  // Common short responses to ignore in similarity (e.g. "ty", "gg")
  commonResponses: string[];

  // Algorithm config override (if the game has its own tuned preset)
  algorithmConfig: AlgorithmConfig | null;

  // Chat format hints
  chatFormatHint: string; // Example line shown as placeholder
  dateChangePattern: RegExp | null; // Game-specific date change marker
}

// ============================================================================
// WURM ONLINE PROFILE
// ============================================================================

export const WURM_ONLINE_PROFILE: GameProfile = {
  id: "wurm",
  name: "Wurm Online",
  description: "Sandbox MMO with extensive chat system. Optimized for Wurm-specific vocabulary, trade patterns, and multiboxing detection.",
  status: "live",

  gameTerms: [
    "deed", "village", "alliance", "kingdom",
    "kos", "templars", "highway", "rift", "unique",
    "priest", "vyn", "mag", "fo", "lib", "nahjo",
    "drake", "scale", "rare", "supreme", "fantastic",
    "terraform", "mine", "forge", "imp", "improving",
    "channeling", "prayer", "benediction", "sermon",
    "pvp", "pve", "defiance", "chaos", "elevation",
    "independence", "deliverance", "exodus", "celebration",
    "xanadu", "pristine", "release", "harmony", "melody", "cadence",
    "troll", "dragon", "goblin", "spider", "hell", "valrei",
    "wurm", "karma", "sleep", "bonus", "affinity",
    "bulk", "bsb", "fsb", "crate", "wagon", "knarr",
    "corbita", "caravel", "sailboat", "rowboat",
    "longsword", "shortsword", "maul", "axe", "pickaxe",
    "shovel", "rake", "scythe", "sickle", "hammer",
  ],

  commonGameWords: [
    // Wurm skills and actions
    "faith", "favor", "prayer", "channeling", "exorcism", "preaching",
    "casted", "casting", "enchant", "enchanted", "enchanting", "dispel",
    "imping", "imped", "mending", "repairing", "repaired", "creating",
    "digging", "flattening", "leveling", "paving", "planning",
    "chopping", "woodcutting", "logging", "planting", "harvesting",
    "sowing", "tending", "foraging", "botanizing",
    "cooking", "baking", "roasting", "butchering", "milking",
    "taming", "breeding", "grooming", "hitching",
    "sailing", "mooring", "embarking", "disembarking",
    "smithing", "smelting", "tempering", "sharpening", "polishing",
    "masonry", "carpentry", "tailoring", "leatherworking", "pottery", "alchemy",
    "meditation", "meditating", "archery", "shielding",
    "prospecting", "analyzing", "examining", "lockpicking",
    // Wurm items and materials
    "potato", "potatoes", "garlic", "onion", "pumpkin",
    "corn", "barley", "oat", "rye", "wemp", "reed", "rice",
    "strawberry", "blueberry", "raspberry", "lingonberry", "cherry", "lemon",
    "olive", "grape", "apple", "maple", "birch", "cedar",
    "willow", "walnut", "chestnut", "linden", "lavender", "camellia", "oleander",
    "rose", "acorn", "hazelnut", "nutmeg", "fennel", "ginger", "basil",
    "oregano", "parsley", "rosemary", "thyme", "sage", "cumin", "paprika",
    "turmeric", "sassafras", "lovage", "nettles",
    "plank", "planks", "shaft", "shafts", "brick", "bricks", "mortar",
    "concrete", "slate", "marble", "sandstone", "clay",
    "lump", "lumps", "ribbon", "string", "rope", "chain", "rivet",
    "nails", "fence", "gate", "door", "floor",
    "oven", "kiln", "campfire", "fireplace", "cauldron",
    "needle", "spindle", "loom", "grindstone", "whetstone",
    "pickaxe", "shovel", "hatchet", "hammer", "mallet", "chisel",
    "rake", "scythe", "sickle", "trowel", "knife", "saw", "file",
    "longsword", "shortsword", "twohander", "spear", "halberd", "shield",
    "staff", "scepter", "statuette", "altar", "coffin", "fountain",
    "lamp", "torch", "lantern", "candelabra", "brazier",
    "saddle", "horseshoe", "bridle", "barding",
    "rowboat", "sailboat", "corbita", "cog", "knarr", "caravel",
    "dredge", "anchor", "mooring",
    "backpack", "satchel", "knapsack", "quiver", "toolbelt",
    "barrel", "bucket", "flask", "jar", "bowl", "plate", "cup",
    "pelt", "hide", "fleece", "wool", "fur",
    "zinc", "tin", "lead", "bronze", "brass", "electrum", "adamantine",
    "glimmersteel", "seryll", "moonmetal",
    // Wurm creatures
    "spider", "scorpion", "goblin", "crocodile", "anaconda",
    "hellhound", "hellhorse", "lava", "fiend", "dragon", "hatchling",
    "unicorn", "bison", "deer", "pheasant", "rooster", "chicken", "hen",
    "cattle", "bull", "calf", "sheep", "lamb", "pig", "dog", "cat",
    "wolf", "bear", "lion", "gorilla", "hyena", "jackal", "cobra",
    // Wurm enchantments
    "nimbleness", "mindstealer", "frostbrand", "flaming", "venom",
    "rotting", "lifetransfer", "lurker", "opulence", "demise",
    "blessing", "aura", "genesis", "strongwall", "charm",
    "courier", "messenger", "reveal",
    // Wurm game mechanics
    "karma", "affinity", "affinities",
    "stamina", "nutrition", "thirst", "alignment", "reputation",
    "difficulty", "timer", "cooldown", "decay",
    "premium", "trader", "merchant", "token", "upkeep", "coffers",
    "catseye", "waystone", "mailbox", "spirit",
    "guard", "guards", "tower", "lighthouse", "colossus",
    "rift", "source", "crystal", "fragment", "journal",
    "terraforming", "surface",
    "underground", "reinforced", "collapsed", "ceiling",
    "perimeter", "border", "tile", "tiles", "slope",
    // Server names
    "harmony", "melody", "cadence", "independence", "deliverance", "exodus",
    "celebration", "xanadu", "pristine", "release", "defiance", "chaos", "elevation",
  ],

  systemPlayers: ["wurm"],

  tradePatterns: [
    /^wts\b/i,
    /^wtb\b/i,
    /^wtt\b/i,
    /^pc\b/i,
  ],

  abbreviations: [
    "bsb", "fsb", "ql", "coc", "woa", "botd",
    "imp", "lt", "nim", "ms", "fb", "rt",
    "aosp", "ed", "wd",
    "hots", "jk", "mr", "bl", "wl",
  ],

  commonResponses: [
    "ok", "ty", "thx", "thanks", "np", "yw", "yes", "no", "yeah", "yep",
    "nope", "sure", "done", "nice", "cool", "lol", "haha", "xd",
    "gl", "gj", "gz", "gratz", "wb", "brb", "afk", "back",
  ],

  algorithmConfig: {
    name: "Wurm Online Optimized",
    description: "Tuned for Wurm Online chat patterns and terminology",
    minMessages: 20,
    minScoreToReport: 65,
    minStrongReasons: 2,
    temporalWeight: 1.2,
    linguisticWeight: 1.1,
    behavioralWeight: 1.2,
    networkWeight: 0.8,
    functionWordWeight: 1.0,
    ngramWeight: 0.7,
    typoWeight: 1.1,
    rareWordWeight: 1.3,
    handoffWeight: 1.3,
    ngramThresholdHigh: 0.985,
    ngramThresholdMed: 0.97,
    functionWordThresholdHigh: 0.90,
    functionWordThresholdMed: 0.83,
    confidenceMultiplier: 0.42,
    confidenceBase: 11,
  },

  chatFormatHint: "[21:25:05] <PlayerName> hey everyone whats up\n[21:25:12] <AnotherPlayer> not much just imping",
  dateChangePattern: /---\s*Day changed to (\d{4}-\d{2}-\d{2})\s*---/i,
};

// ============================================================================
// GENERIC PROFILE (works with any timestamped chat)
// ============================================================================

export const GENERIC_PROFILE: GameProfile = {
  id: "generic",
  name: "Generic / Other",
  description: "Works with any timestamped chat format. No game-specific vocabulary or tuning.",
  status: "live",

  gameTerms: [],
  commonGameWords: [],
  systemPlayers: [],
  tradePatterns: [],
  abbreviations: [],
  commonResponses: [
    "ok", "ty", "thx", "thanks", "np", "yw", "yes", "no", "yeah", "yep",
    "nope", "sure", "done", "nice", "cool", "lol", "haha", "xd",
    "gg", "brb", "afk", "back",
  ],

  algorithmConfig: null, // Uses the selected algorithm mode as-is

  chatFormatHint: "[21:25:05] <PlayerName> hello everyone\n[21:25:12] <AnotherPlayer> hey!",
  dateChangePattern: null,
};

// ============================================================================
// COMING SOON PROFILES
// ============================================================================

export const RUST_PROFILE: GameProfile = {
  id: "rust",
  name: "Rust",
  description: "Survival game with team-based chat. Optimized for Rust-specific callouts and team dynamics.",
  status: "coming_soon",
  gameTerms: [],
  commonGameWords: [],
  systemPlayers: [],
  tradePatterns: [],
  abbreviations: [],
  commonResponses: [],
  algorithmConfig: null,
  chatFormatHint: "",
  dateChangePattern: null,
};

export const ARK_PROFILE: GameProfile = {
  id: "ark",
  name: "ARK: Survival Evolved",
  description: "Dinosaur survival game. Tribe chat analysis with ARK-specific terminology.",
  status: "coming_soon",
  gameTerms: [],
  commonGameWords: [],
  systemPlayers: [],
  tradePatterns: [],
  abbreviations: [],
  commonResponses: [],
  algorithmConfig: null,
  chatFormatHint: "",
  dateChangePattern: null,
};

export const WOW_PROFILE: GameProfile = {
  id: "wow",
  name: "World of Warcraft",
  description: "Classic MMO guild chat analysis. WoW-specific vocabulary and trade patterns.",
  status: "coming_soon",
  gameTerms: [],
  commonGameWords: [],
  systemPlayers: [],
  tradePatterns: [],
  abbreviations: [],
  commonResponses: [],
  algorithmConfig: null,
  chatFormatHint: "",
  dateChangePattern: null,
};

export const DISCORD_PROFILE: GameProfile = {
  id: "discord",
  name: "Discord",
  description: "Analyze exported Discord server chat logs for the same forensic patterns.",
  status: "coming_soon",
  gameTerms: [],
  commonGameWords: [],
  systemPlayers: [],
  tradePatterns: [],
  abbreviations: [],
  commonResponses: [],
  algorithmConfig: null,
  chatFormatHint: "",
  dateChangePattern: null,
};

// ============================================================================
// PROFILE REGISTRY
// ============================================================================

export const GAME_PROFILES: Record<string, GameProfile> = {
  wurm: WURM_ONLINE_PROFILE,
  generic: GENERIC_PROFILE,
  rust: RUST_PROFILE,
  ark: ARK_PROFILE,
  wow: WOW_PROFILE,
  discord: DISCORD_PROFILE,
};

export type GameProfileId = keyof typeof GAME_PROFILES;

/**
 * Get a game profile by ID, falling back to generic
 */
export function getGameProfile(id: string): GameProfile {
  return GAME_PROFILES[id] || GENERIC_PROFILE;
}

/**
 * Get all available game profiles (for UI selector)
 */
export function getAvailableProfiles(): GameProfile[] {
  return Object.values(GAME_PROFILES);
}
