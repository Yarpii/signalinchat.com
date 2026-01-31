// ============================================================================
// CHAT ANALYZER - PLAYER ANALYSIS
// ============================================================================

import type { ChatMessage, AdvancedPlayerStats, AltReason } from "./types";
import {
  extractCharNgrams,
  calculateYulesK,
  detectTypoPatterns,
  detectLetterSubstitutions,
  analyzePunctuationStyle,
  calculateWordLengthDistribution,
  detectMicroPatterns,
  detectEmoticonStyle,
  // NEW imports
  extractWordBigrams,
  analyzeFunctionWords,
  calculateSimpsonsD,
  calculateBrunetsW,
  analyzePunctuationFrequency,
  calculateMessageLengthDistribution,
  analyzeActivityPattern,
  detectGreetingStyle,
  detectFarewellStyle,
  extractCommonEnders,
  // v4.3 imports
  analyzeSentencePatterns,
  buildEmoticonProfile,
  buildPunctuationFingerprint,
} from "./linguistic";
import { extractTopicFingerprint, findResponsePartners, findMentionedPlayers, extractCommonWords, extractCommonPhrases, extractGameTopics } from "./behavioral";
import type { GameProfile } from "./gameProfiles";

/**
 * Analyze a player and build comprehensive stats
 */
export function analyzePlayerAdvanced(
  name: string,
  messages: ChatMessage[],
  allPlayers: string[],
  gameProfile?: GameProfile
): AdvancedPlayerStats {
  const playerMessages = messages.filter(m => m.player === name);
  const texts = playerMessages.map(m => m.message);
  const allText = texts.join(" ");
  const words = allText.split(/\s+/).filter(w => w.length > 0);
  const cleanWords = words.map(w => w.toLowerCase().replace(/[^a-z]/g, "")).filter(w => w);

  // Active minutes (for temporal analysis) - both global and per-day
  const activeMinutes = new Set<number>();
  const activeDayMinutes = new Map<number, Set<number>>();
  const messageTimes: number[] = [];
  const absoluteTimes: number[] = [];

  for (const msg of playerMessages) {
    const mins = Math.floor(msg.timeSeconds / 60);
    activeMinutes.add(mins);
    messageTimes.push(msg.timeSeconds);
    absoluteTimes.push(msg.absoluteTime);

    // Track per-day activity
    if (!activeDayMinutes.has(msg.dayIndex)) {
      activeDayMinutes.set(msg.dayIndex, new Set());
    }
    activeDayMinutes.get(msg.dayIndex)!.add(mins);
  }

  // Session gaps
  const sessionGaps: number[] = [];
  for (let i = 1; i < messageTimes.length; i++) {
    const gap = messageTimes[i] - messageTimes[i - 1];
    if (gap > 0) sessionGaps.push(gap);
  }

  // Average response time
  const avgResponseTime = sessionGaps.length > 0
    ? sessionGaps.reduce((a, b) => a + b, 0) / sessionGaps.length
    : 0;

  // Vocabulary richness
  const uniqueWords = new Set(cleanWords);
  const vocabularyRichness = cleanWords.length > 0
    ? uniqueWords.size / cleanWords.length
    : 0;

  // Hapax ratio (words used only once)
  const wordFreq = new Map<string, number>();
  for (const w of cleanWords) {
    wordFreq.set(w, (wordFreq.get(w) || 0) + 1);
  }
  const hapaxCount = Array.from(wordFreq.values()).filter(c => c === 1).length;
  const hapaxRatio = uniqueWords.size > 0 ? hapaxCount / uniqueWords.size : 0;

  // Common starters
  const starters: Record<string, number> = {};
  for (const text of texts) {
    const firstWord = text.split(/\s+/)[0]?.toLowerCase();
    if (firstWord && firstWord.length > 1) {
      starters[firstWord] = (starters[firstWord] || 0) + 1;
    }
  }
  const commonStarters = Object.entries(starters)
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);

  return {
    name,
    messageCount: playerMessages.length,
    wordCount: words.length,
    avgWordsPerMessage: playerMessages.length > 0 ? words.length / playerMessages.length : 0,

    activeMinutes,
    activeDayMinutes,
    sessionGaps,
    avgResponseTime,
    activityPattern: analyzeActivityPattern(absoluteTimes, sessionGaps), // NEW

    charNgrams: extractCharNgrams(allText),
    wordBigrams: extractWordBigrams(texts), // NEW
    typoPatterns: detectTypoPatterns(texts),
    punctuationStyle: analyzePunctuationStyle(texts),
    punctuationFrequency: analyzePunctuationFrequency(texts), // NEW
    letterSubstitutions: detectLetterSubstitutions(texts),
    microPatterns: detectMicroPatterns(texts),
    emoticonStyle: detectEmoticonStyle(texts),
    emoticonProfile: buildEmoticonProfile(texts), // v4.3: Enhanced emoticon profiling
    functionWords: analyzeFunctionWords(texts), // NEW - MOST IMPORTANT!
    punctuationFingerprint: buildPunctuationFingerprint(texts), // v4.3: Deep punctuation analysis

    vocabularyRichness: Math.round(vocabularyRichness * 1000) / 1000,
    hapaxRatio: Math.round(hapaxRatio * 1000) / 1000,
    yulesK: calculateYulesK(cleanWords),
    simpsonsD: calculateSimpsonsD(cleanWords), // NEW
    brunetsW: calculateBrunetsW(cleanWords), // NEW
    avgWordLength: cleanWords.length > 0
      ? Math.round(cleanWords.reduce((a, b) => a + b.length, 0) / cleanWords.length * 10) / 10
      : 0,
    wordLengthDistribution: calculateWordLengthDistribution(cleanWords),
    messageLengthDistribution: calculateMessageLengthDistribution(texts), // NEW
    sentencePatterns: analyzeSentencePatterns(texts), // v4.3: Sentence structure fingerprint

    commonWords: extractCommonWords(texts),
    commonPhrases: extractCommonPhrases(texts),
    commonStarters,
    commonEnders: extractCommonEnders(texts), // NEW
    greetingStyle: detectGreetingStyle(texts), // NEW
    farewellStyle: detectFarewellStyle(texts), // NEW
    responsePartners: findResponsePartners(name, messages),
    mentionedPlayers: findMentionedPlayers(texts, allPlayers),
    topicFingerprint: extractTopicFingerprint(texts),
    gameTopics: extractGameTopics(texts, gameProfile?.gameTerms || []),
    wurmTopics: extractGameTopics(texts, gameProfile?.gameTerms || []),

    allMessages: texts,
    messageTimes,
    absoluteTimes,
  };
}

/**
 * Generate human-readable explanation for alt suspicion
 */
export function generateHumanExplanation(
  p1: AdvancedPlayerStats,
  p2: AdvancedPlayerStats,
  reasons: AltReason[],
  neverOnlineTogether: boolean,
  sharedRareWords: string[],
  handoffData: { handoffCount: number; totalTransitions: number; avgHandoffDelay?: number; delayConsistency?: number; dominantDirection?: string; sessionShadowing?: number },
  totalDays: number
): string {
  const parts: string[] = [];

  parts.push(`${p1.name} and ${p2.name} show similarities that could suggest a shared account because:`);

  // Temporal evidence
  if (neverOnlineTogether) {
    if (totalDays > 1) {
      parts.push(`- They were NEVER online at the same time across ${totalDays} days of chat`);
    } else {
      parts.push("- They were NEVER online at the same time");
    }
  }

  // Handoff pattern (enhanced v4.2)
  if (handoffData.handoffCount >= 3) {
    let handoffDesc = `- Clear "handoff" pattern: when one stops, the other starts within 5 minutes (detected ${handoffData.handoffCount}x)`;
    if (handoffData.delayConsistency && handoffData.delayConsistency >= 0.7 && handoffData.avgHandoffDelay) {
      handoffDesc += `\n- Suspiciously consistent timing: average ${Math.round(handoffData.avgHandoffDelay)}s delay between sessions`;
    }
    if (handoffData.dominantDirection && handoffData.dominantDirection !== "balanced") {
      handoffDesc += `\n- Handoffs mostly go ${handoffData.dominantDirection}`;
    }
    if (handoffData.sessionShadowing && handoffData.sessionShadowing >= 0.7) {
      handoffDesc += `\n- Sessions almost perfectly fill each other's gaps (${Math.round(handoffData.sessionShadowing * 100)}% coverage)`;
    }
    parts.push(handoffDesc);
  }

  // Function word analysis (NEW - most reliable)
  const functionWordReason = reasons.find(r => r.description.includes("function word"));
  if (functionWordReason && functionWordReason.weight >= 25) {
    parts.push(`- Nearly identical use of articles, pronouns, and prepositions (unconscious writing fingerprint)`);
  }

  // Vocabulary complexity (NEW)
  const vocabReason = reasons.find(r => r.description.includes("vocabulary complexity"));
  if (vocabReason) {
    parts.push(`- Same vocabulary complexity profile (Simpson's D, Yule's K metrics match)`);
  }

  // Shared unique words
  if (sharedRareWords.length >= 3) {
    const wordExamples = sharedRareWords.slice(0, 3).map(w => `'${w}'`).join(", ");
    parts.push(`- Both use words nobody else uses: ${wordExamples} (exclusive to this pair)`);
  }

  // Typos
  const sharedTypos = p1.typoPatterns.filter(t => p2.typoPatterns.includes(t));
  if (sharedTypos.length >= 2) {
    parts.push(`- Same typo patterns: ${sharedTypos.slice(0, 3).map(t => `'${t}'`).join(", ")}`);
  }

  // Greeting/farewell style (NEW)
  const sharedGreetings = p1.greetingStyle.filter(g => p2.greetingStyle.includes(g));
  const sharedFarewells = p1.farewellStyle.filter(f => p2.farewellStyle.includes(f));
  if (sharedGreetings.length >= 2 || sharedFarewells.length >= 2) {
    const greetPart = sharedGreetings.length >= 2 ? `greet with ${sharedGreetings.slice(0, 2).join("/")}` : "";
    const byePart = sharedFarewells.length >= 2 ? `say bye with ${sharedFarewells.slice(0, 2).join("/")}` : "";
    parts.push(`- Both ${[greetPart, byePart].filter(Boolean).join(" and ")}`);
  }

  // Common starters
  const sharedStarters = p1.commonStarters.filter(s => p2.commonStarters.includes(s));
  if (sharedStarters.length >= 3) {
    const percentage = Math.round((sharedStarters.length / Math.max(p1.commonStarters.length, 1)) * 100);
    parts.push(`- Start ${percentage}% of sentences with the same words: ${sharedStarters.slice(0, 3).map(s => `'${s}'`).join(", ")}`);
  }

  // Network - no interaction
  const p1MentionsP2 = p1.mentionedPlayers.has(p2.name);
  const p2MentionsP1 = p2.mentionedPlayers.has(p1.name);
  const p1RespondsToP2 = p1.responsePartners.has(p2.name);
  const p2RespondsToP1 = p2.responsePartners.has(p1.name);

  if (!p1MentionsP2 && !p2MentionsP1 && !p1RespondsToP2 && !p2RespondsToP1 &&
      p1.messageCount >= 50 && p2.messageCount >= 50) {
    parts.push(`- Never talk TO each other despite ${p1.messageCount}+ and ${p2.messageCount}+ messages each`);
  }

  // Micro patterns match
  const microMatches: string[] = [];
  if (p1.microPatterns.lowercaseI && p2.microPatterns.lowercaseI) microMatches.push("lowercase 'i'");
  if (p1.microPatterns.allLowercase && p2.microPatterns.allLowercase) microMatches.push("all lowercase");
  if (p1.microPatterns.excessiveCaps && p2.microPatterns.excessiveCaps) microMatches.push("EXCESSIVE CAPS");
  if (p1.microPatterns.noSpaceAfterPunct && p2.microPatterns.noSpaceAfterPunct) microMatches.push("no space after punctuation");
  if (p1.microPatterns.doubleSpaces && p2.microPatterns.doubleSpaces) microMatches.push("double spaces");

  if (microMatches.length >= 2) {
    parts.push(`- Identical writing habits: ${microMatches.join(", ")}`);
  }

  // Sentence structure (v4.3)
  const sentenceReason = reasons.find(r => r.description.includes("sentence structure") || r.description.includes("sentence construction"));
  if (sentenceReason && sentenceReason.weight >= 15) {
    parts.push(`- Nearly identical sentence construction habits (fragment rate, question tendency, how they open messages)`);
  }

  // Punctuation fingerprint (v4.3)
  const punctReason = reasons.find(r => r.description.includes("punctuation fingerprint") || r.description.includes("punctuation habits"));
  if (punctReason && punctReason.weight >= 15) {
    parts.push(`- Same punctuation habits (ellipsis style, exclamation chains, comma usage, terminal punctuation)`);
  }

  // Emoticon style (v4.3 enhanced)
  const emoticonReason = reasons.find(r => r.description.includes("emoticon"));
  if (emoticonReason && emoticonReason.weight >= 10) {
    const sharedEmotes = p1.emoticonProfile.commonEmotes.filter(e => p2.emoticonProfile.commonEmotes.includes(e));
    if (sharedEmotes.length >= 2) {
      parts.push(`- Same emoticon preferences: ${sharedEmotes.slice(0, 4).join(", ")} (including placement and frequency)`);
    } else {
      parts.push(`- Similar emoticon usage patterns (frequency, placement, variety)`);
    }
  } else if (p1.emoticonStyle.commonEmotes.length > 0 && p2.emoticonStyle.commonEmotes.length > 0) {
    const sharedEmotes = p1.emoticonStyle.commonEmotes.filter(e => p2.emoticonStyle.commonEmotes.includes(e));
    if (sharedEmotes.length >= 3) {
      parts.push(`- Same emoticons: ${sharedEmotes.slice(0, 4).join(", ")}`);
    }
  }

  // Word length preferences
  const wordLenReason = reasons.find(r => r.description.includes("word length"));
  if (wordLenReason) {
    parts.push(`- Same word length preferences (tendency toward short/long words matches)`);
  }

  // Letter substitution habits
  const letterSubReason = reasons.find(r => r.description.includes("letter substitution"));
  if (letterSubReason) {
    const sharedSubs: string[] = [];
    for (const [sub] of p1.letterSubstitutions) {
      if (p2.letterSubstitutions.has(sub)) sharedSubs.push(sub);
    }
    if (sharedSubs.length > 0) {
      parts.push(`- Same text shortcuts: ${sharedSubs.slice(0, 4).map(s => `'${s}'`).join(", ")}`);
    }
  }

  // Topic fingerprint
  const topicReason = reasons.find(r => r.description.includes("topic interest"));
  if (topicReason) {
    parts.push(`- Talk about the same topics with similar frequency`);
  }

  if (parts.length <= 1) {
    parts.push("- Multiple patterns in writing style and behavior match");
  }

  return parts.join("\n");
}
