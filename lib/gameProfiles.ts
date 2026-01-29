// ============================================================================
// GAME PROFILES — Per-game configuration for chat parsing and analysis
// ============================================================================

export interface GameChatFormat {
  /** Regex that captures (timestamp) and (player) and (message) */
  pattern: RegExp;
  /** Regex that captures (date timestamp) and (player) and (message) */
  patternWithDate?: RegExp;
  /** Description shown in UI */
  formatExample: string;
  /** Day-change marker regex (if applicable) */
  dayChangePattern?: RegExp;
}

export interface GameProfile {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  status: "live" | "coming_soon";
  /** Chat format patterns for parsing */
  chatFormats: GameChatFormat[];
  /** System/bot player names to exclude */
  systemPlayers: string[];
  /** System player prefix patterns (startsWith checks) */
  systemPrefixes: string[];
  /** Game-specific terms (everyone uses these — not rare) */
  commonGameWords: string[];
  /** Game-specific topic words for fingerprinting */
  topicWords: string[];
  /** Game-specific abbreviations (trade chat, etc.) */
  abbreviations: Record<string, string>;
  /** Algorithm mode to recommend */
  recommendedAlgorithm: string;
}

// ============================================================================
// WURM ONLINE
// ============================================================================

const wurmOnline: GameProfile = {
  id: "wurm",
  name: "Wurm Online",
  icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
  color: "#22c55e",
  description: "Full support with 100+ game-specific terms, Wurm terminology, and an optimized detection mode.",
  status: "live",
  chatFormats: [
    {
      pattern: /^\[(\d{2}:\d{2}:\d{2})\]\s*<([^>]+)>\s*(.*)$/,
      patternWithDate: /^\[(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})\]\s*<([^>]+)>\s*(.*)$/,
      formatExample: "[21:25:05] <PlayerName> message here",
      dayChangePattern: /---\s*Day changed to (\d{4}-\d{2}-\d{2})\s*---/i,
    },
  ],
  systemPlayers: [
    "system", "systeem", "server", "wurm", "gm", "gamemaster",
    "admin", "administrator", "bot", "announcement", "info",
    "event", "news", "alert", "warning", "notice",
  ],
  systemPrefixes: ["system", "systeem", "gm-", "gm_", "admin", "[system", "[gm"],
  commonGameWords: [
    "deed", "village", "kingdom", "priest", "horse", "cart", "boat", "ship",
    "mine", "mining", "forge", "anvil", "skill", "improve", "improving", "quality",
    "rare", "supreme", "fantastic", "drake", "scale", "troll", "unique",
    "bulk", "crate", "wagon", "highway", "road", "bridge", "house", "building",
    "wood", "iron", "steel", "silver", "gold", "copper", "stone", "rock",
    "water", "food", "meat", "fish", "wheat", "cotton", "leather", "cloth",
    "faith", "favor", "prayer", "channeling", "exorcism", "preaching",
    "casted", "casting", "enchant", "enchanted", "enchanting", "dispel",
    "imping", "imped", "mending", "repairing", "repaired", "creating",
    "digging", "flattening", "leveling", "paving", "planning", "building",
    "chopping", "cutting", "woodcutting", "logging", "planting", "harvesting",
    "sowing", "farming", "tending", "picking", "foraging", "botanizing",
    "fishing", "cooking", "baking", "roasting", "butchering", "milking",
    "taming", "breeding", "grooming", "leading", "hitching", "riding",
    "sailing", "mooring", "embarking", "disembarking", "loading", "unloading",
    "smithing", "smelting", "casting", "tempering", "sharpening", "polishing",
    "masonry", "carpentry", "tailoring", "leatherworking", "pottery", "alchemy",
    "meditation", "meditating", "fighting", "archery", "shielding", "healing",
    "prospecting", "analyzing", "examining", "repairing", "lockpicking",
    "potato", "potatoes", "garlic", "onion", "pumpkin", "corn", "barley",
    "oat", "rye", "wemp", "reed", "rice", "strawberry", "blueberry",
    "plank", "planks", "shaft", "brick", "bricks", "mortar", "concrete",
    "slate", "marble", "sandstone", "clay", "lump", "ribbon", "rope",
    "chain", "rivet", "nails", "fence", "gate", "door", "floor",
    "oven", "kiln", "campfire", "fireplace", "still", "cauldron",
    "pickaxe", "shovel", "hatchet", "hammer", "mallet", "chisel",
    "longsword", "shortsword", "twohander", "spear", "halberd", "shield",
    "saddle", "horseshoe", "bridle", "barding",
    "rowboat", "sailboat", "corbita", "cog", "knarr", "caravel",
    "backpack", "satchel", "knapsack", "quiver", "toolbelt",
    "zinc", "tin", "lead", "bronze", "brass", "electrum", "adamantine",
    "glimmersteel", "seryll", "moonmetal",
    "spider", "scorpion", "goblin", "crocodile", "anaconda",
    "hellhound", "hellhorse", "lava", "fiend", "dragon", "hatchling",
    "unicorn", "bison", "deer", "pheasant", "rooster", "chicken",
    "nimbleness", "mindstealer", "frostbrand", "flaming", "venom",
    "rotting", "lifetransfer", "lurker", "opulence", "demise",
    "blessing", "aura", "genesis", "strongwall", "charm",
    "courier", "dark", "messenger", "reveal",
    "wurm", "karma", "sleep", "bonus", "affinity", "affinities",
    "stamina", "nutrition", "thirst", "alignment", "reputation",
    "premium", "trader", "merchant", "token", "upkeep", "coffers",
    "highway", "catseye", "waystone", "mailbox", "spirit",
    "guard", "guards", "tower", "lighthouse", "colossus",
    "rift", "source", "crystal", "fragment", "journal",
    "harmony", "melody", "cadence", "independence", "deliverance", "exodus",
    "celebration", "xanadu", "pristine", "release", "defiance", "chaos", "elevation",
  ],
  topicWords: [
    "deed", "village", "kingdom", "pvp", "pve", "skill", "grind",
    "horse", "cart", "boat", "ship", "mine", "forge", "anvil",
    "weapon", "armor", "shield", "sword", "axe", "maul",
    "priest", "mag", "vyn", "fo", "lib", "channeling", "prayer",
    "drake", "scale", "rare", "supreme", "fantastic",
    "newbie", "noob", "vet", "veteran",
    "help", "need", "want", "sell", "buy", "trade", "price",
    "lag", "bug", "fix", "dev", "update", "patch",
    "alliance", "enemy", "friend", "war", "peace",
    "troll", "dragon", "unique", "rift", "valrei",
  ],
  abbreviations: {
    "BSB": "Bulk Storage Bin",
    "FSB": "Food Storage Bin",
    "CoC": "Circle of Cunning",
    "WoA": "Wind of Ages",
    "LT": "Life Transfer",
    "MS": "Mindstealer",
    "BotD": "Blessings of the Dark",
    "QL": "Quality Level",
    "WTS": "Want to Sell",
    "WTB": "Want to Buy",
    "WTT": "Want to Trade",
    "PC": "Price Check",
  },
  recommendedAlgorithm: "wurm",
};

// ============================================================================
// MINECRAFT
// ============================================================================

const minecraft: GameProfile = {
  id: "minecraft",
  name: "Minecraft",
  icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  color: "#8b5cf6",
  description: "Supports vanilla and popular server plugin chat formats (Essentials, LuckPerms, etc.).",
  status: "coming_soon",
  chatFormats: [
    {
      // Vanilla: <Player> message
      pattern: /^<([^>]+)>\s*(.*)$/,
      formatExample: "<Steve> hello world",
    },
    {
      // Server with timestamp: [12:34:56] [Chat] <Player> message
      pattern: /^\[(\d{2}:\d{2}:\d{2})\]\s*(?:\[(?:Chat|Server)\]\s*)?<([^>]+)>\s*(.*)$/,
      formatExample: "[12:34:56] [Chat] <Steve> hello",
    },
    {
      // Rank prefix: [Admin] Player: message OR [VIP] Player >> message
      pattern: /^\[(\d{2}:\d{2}:\d{2})\]\s*(?:\[[^\]]+\]\s+)?(\w+)(?::|>>?)\s*(.*)$/,
      formatExample: "[12:34:56] [Admin] Steve: hello",
    },
  ],
  systemPlayers: [
    "server", "console", "system", "rcon", "admin",
    "spigot", "bukkit", "paper", "velocity", "bungeecord",
  ],
  systemPrefixes: ["server", "console", "system", "[server", "[console"],
  commonGameWords: [
    "minecraft", "creeper", "enderman", "zombie", "skeleton", "spider",
    "diamond", "netherite", "emerald", "redstone", "obsidian", "bedrock",
    "nether", "end", "overworld", "biome", "chunk", "spawn",
    "enchant", "enchanting", "enchantment", "anvil", "brewing",
    "crafting", "smelting", "mining", "farming", "fishing",
    "pickaxe", "sword", "axe", "shovel", "hoe", "bow", "crossbow",
    "armor", "helmet", "chestplate", "leggings", "boots", "shield",
    "potion", "splash", "lingering", "tipped", "effect",
    "villager", "pillager", "wandering", "trader", "golem",
    "beacon", "conduit", "shulker", "elytra", "trident", "totem",
    "mob", "mobs", "hostile", "passive", "neutral", "boss",
    "wither", "dragon", "blaze", "ghast", "piglin", "hoglin",
    "xp", "experience", "level", "levels", "hunger", "health",
    "creative", "survival", "hardcore", "spectator", "adventure",
    "plugin", "plugins", "mod", "mods", "modpack", "datapack",
    "grief", "griefing", "griefed", "griefer", "rollback",
    "worldedit", "essentials", "claim", "claims", "land",
    "tpa", "home", "sethome", "warp", "warps", "tp", "teleport",
  ],
  topicWords: [
    "base", "house", "farm", "mine", "nether", "end", "portal",
    "enchant", "diamond", "netherite", "mob", "raid", "trade",
    "pvp", "grief", "build", "redstone", "plugin", "mod",
    "spawn", "warp", "home", "claim", "rank",
  ],
  abbreviations: {
    "TP": "Teleport",
    "TPA": "Teleport Ask",
    "XP": "Experience Points",
    "GG": "Good Game",
    "PVP": "Player vs Player",
    "AFK": "Away from Keyboard",
  },
  recommendedAlgorithm: "balanced",
};

// ============================================================================
// RUNESCAPE / OSRS
// ============================================================================

const runescape: GameProfile = {
  id: "runescape",
  name: "RuneScape / OSRS",
  icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  color: "#f59e0b",
  description: "Old School RuneScape and RS3 chat log analysis with GE terminology and skill tracking.",
  status: "coming_soon",
  chatFormats: [
    {
      // RuneLite format: [12:34:56] PlayerName: message
      pattern: /^\[(\d{2}:\d{2}:\d{2})\]\s*(\w[\w\s\-]+?):\s+(.*)$/,
      formatExample: "[12:34:56] Zezima: selling lobsters 250 each",
    },
  ],
  systemPlayers: [
    "system", "server", "jagex", "mod", "news", "game",
  ],
  systemPrefixes: ["mod ", "mod_", "jagex", "[system", "[game"],
  commonGameWords: [
    "runescape", "osrs", "gielinor", "lumbridge", "varrock", "falador",
    "camelot", "ardougne", "edgeville", "wilderness", "wildy",
    "ge", "grand exchange", "bank", "trading", "staking", "duel",
    "woodcutting", "mining", "smithing", "fishing", "cooking",
    "firemaking", "crafting", "herblore", "agility", "thieving",
    "slayer", "farming", "runecraft", "hunter", "construction",
    "prayer", "magic", "ranged", "melee", "hitpoints", "defence",
    "attack", "strength", "fletching", "divination", "invention",
    "quest", "quests", "boss", "bosses", "raid", "raids",
    "bond", "bonds", "membership", "f2p", "p2p",
    "whip", "scimitar", "godsword", "bandos", "armadyl", "zamorak",
    "saradomin", "dragon", "rune", "adamant", "mithril",
    "spec", "special", "prayer", "flick", "tick", "xp", "gp",
    "max", "maxed", "comp", "trimmed", "ironman", "hcim", "uim",
    "pet", "pets", "clue", "clues", "barrows", "zulrah", "vorkath",
    "corp", "tob", "cox", "inferno", "gauntlet", "colosseum",
  ],
  topicWords: [
    "skill", "boss", "quest", "trade", "ge", "bank", "wilderness",
    "pvp", "pvm", "slayer", "raid", "drop", "loot", "pet",
    "ironman", "hcim", "maxed", "xp", "gp", "bond",
  ],
  abbreviations: {
    "GE": "Grand Exchange",
    "GP": "Gold Pieces",
    "XP": "Experience",
    "KC": "Kill Count",
    "PB": "Personal Best",
    "HCIM": "Hardcore Ironman",
    "UIM": "Ultimate Ironman",
    "GIM": "Group Ironman",
    "WTS": "Want to Sell",
    "WTB": "Want to Buy",
    "B": "Billion (GP)",
    "M": "Million (GP)",
    "K": "Thousand (GP)",
  },
  recommendedAlgorithm: "balanced",
};

// ============================================================================
// DISCORD
// ============================================================================

const discord: GameProfile = {
  id: "discord",
  name: "Discord",
  icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  color: "#5865f2",
  description: "Analyze exported Discord chat logs. Works with DiscordChatExporter and similar tools.",
  status: "coming_soon",
  chatFormats: [
    {
      // DiscordChatExporter CSV: timestamp,author,content
      pattern: /^(\d{2}:\d{2})\s*-\s*(\w[\w\s]+?):\s+(.*)$/,
      formatExample: "14:30 - Username: message here",
    },
    {
      // Alternative: [12:34] Username#1234: message
      pattern: /^\[(\d{2}:\d{2}(?::\d{2})?)\]\s*([^#:]+(?:#\d{4})?):\s*(.*)$/,
      formatExample: "[14:30:00] Username#1234: message",
    },
  ],
  systemPlayers: [
    "system", "clyde", "wumpus", "server",
  ],
  systemPrefixes: ["system", "bot-", "[bot]", "webhook"],
  commonGameWords: [
    "discord", "server", "channel", "voice", "text", "thread",
    "role", "roles", "admin", "mod", "moderator", "owner",
    "ping", "pinged", "mention", "mentioned", "react", "reaction",
    "emoji", "emote", "sticker", "gif", "meme", "link",
    "ban", "banned", "kick", "kicked", "mute", "muted", "warn",
    "dm", "dms", "message", "reply", "thread",
    "nitro", "boost", "boosted", "booster",
    "vc", "voice", "stream", "streaming", "screenshare",
    "bot", "bots", "webhook", "integration",
  ],
  topicWords: [
    "server", "channel", "role", "admin", "mod", "ban",
    "voice", "stream", "bot", "nitro", "boost",
  ],
  abbreviations: {
    "VC": "Voice Channel",
    "DM": "Direct Message",
    "GG": "Good Game",
    "AFK": "Away from Keyboard",
  },
  recommendedAlgorithm: "linguistic",
};

// ============================================================================
// GENERIC / CUSTOM
// ============================================================================

const generic: GameProfile = {
  id: "generic",
  name: "Generic / Custom",
  icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
  color: "#6b7280",
  description: "Any timestamped chat format. The analysis engine works without game-specific optimization.",
  status: "live",
  chatFormats: [
    {
      pattern: /^\[(\d{2}:\d{2}:\d{2})\]\s*<([^>]+)>\s*(.*)$/,
      formatExample: "[21:25:05] <Player> message",
    },
    {
      pattern: /^\[(\d{2}:\d{2}:\d{2})\]\s*(\w[\w\s\-]+?):\s+(.*)$/,
      formatExample: "[21:25:05] Player: message",
    },
    {
      pattern: /^(\d{2}:\d{2}(?::\d{2})?)\s*-\s*(\w[\w\s]+?):\s+(.*)$/,
      formatExample: "21:25 - Player: message",
    },
  ],
  systemPlayers: [
    "system", "server", "admin", "administrator", "bot",
    "announcement", "info", "event", "news", "alert", "warning", "notice",
  ],
  systemPrefixes: ["system", "admin", "bot-", "[system", "[server"],
  commonGameWords: [],
  topicWords: [],
  abbreviations: {},
  recommendedAlgorithm: "balanced",
};

// ============================================================================
// REGISTRY
// ============================================================================

export const GAME_PROFILES: Record<string, GameProfile> = {
  wurm: wurmOnline,
  minecraft: minecraft,
  runescape: runescape,
  discord: discord,
  generic: generic,
};

/** Games that are available to use */
export const AVAILABLE_GAMES = Object.values(GAME_PROFILES);

/** Games that are currently live */
export const LIVE_GAMES = AVAILABLE_GAMES.filter(g => g.status === "live");

/** Get a game profile by ID, falls back to generic */
export function getGameProfile(id: string): GameProfile {
  return GAME_PROFILES[id] ?? GAME_PROFILES.generic;
}
