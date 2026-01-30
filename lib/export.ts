// ============================================================================
// CHAT ANALYZER - EXPORT FUNCTIONS
// ============================================================================

import type { ChatMessage, AdvancedPlayerStats, AltSuspicion, SocialInsight, SlipPattern, SimilarityMatrix } from "./types";
import { getPlayerColor } from "./utils";

// ============================================================================
// HELPERS
// ============================================================================

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function timestamp(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}_${String(d.getHours()).padStart(2, "0")}-${String(d.getMinutes()).padStart(2, "0")}`;
}

// ============================================================================
// 1. EXPORT PLAYER CHAT (TXT)
// ============================================================================

export function exportPlayerChat(messages: ChatMessage[], playerNames: string[]) {
  const filtered = messages.filter(m => playerNames.includes(m.player));
  if (filtered.length === 0) return;

  const label = playerNames.length === 1 ? playerNames[0] : `${playerNames.length}_players`;
  const lines = filtered.map(m => `[${m.timestamp}] <${m.player}> ${m.message}`);
  const header = `// Chat log for: ${playerNames.join(", ")}\n// Messages: ${filtered.length}\n// Exported: ${new Date().toISOString()}\n\n`;
  downloadFile(header + lines.join("\n"), `chat_${label}_${timestamp()}.txt`, "text/plain");
}

// ============================================================================
// 1b. EXPORT PLAYER CHAT (HTML)
// ============================================================================

function playerColorCSS(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 60%, 38%)`;
}

export function exportPlayerChatHTML(messages: ChatMessage[], playerNames: string[]) {
  const filtered = messages.filter(m => playerNames.includes(m.player));
  if (filtered.length === 0) return;

  const label = playerNames.length === 1 ? playerNames[0] : `${playerNames.length} players`;
  const fileLabel = playerNames.length === 1 ? playerNames[0] : `${playerNames.length}_players`;

  const uniquePlayers = [...new Set(filtered.map(m => m.player))];
  const legend = uniquePlayers.map(p =>
    `<span style="color:${playerColorCSS(p)};font-weight:bold;margin-right:12px;">${escapeHtml(p)}</span>`
  ).join("");

  const rows = filtered.map(m =>
    `<div class="msg"><span class="ts">[${escapeHtml(m.timestamp)}]</span> <span class="player" style="color:${playerColorCSS(m.player)}">&lt;${escapeHtml(m.player)}&gt;</span> <span class="text">${escapeHtml(m.message)}</span></div>`
  ).join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat Log - ${escapeHtml(label)}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Consolas', 'Monaco', 'Courier New', monospace; background: #f8f9fb; color: #1a1a2e; padding: 24px; }
    .container { max-width: 900px; margin: 0 auto; }
    h1 { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 22px; margin-bottom: 4px; }
    .meta { color: #6b7280; font-size: 13px; margin-bottom: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .legend { background: #ffffff; border: 1px solid #d8dce3; border-radius: 8px; padding: 10px 16px; margin-bottom: 16px; font-size: 13px; }
    .legend-label { color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .chat { background: #ffffff; border: 1px solid #d8dce3; border-radius: 12px; padding: 16px; overflow-y: auto; max-height: 80vh; }
    .msg { padding: 3px 8px; border-radius: 4px; font-size: 13px; line-height: 1.6; }
    .msg:hover { background: #f0f2f5; }
    .ts { color: #8a8aa0; }
    .player { font-weight: bold; cursor: default; }
    .text { color: #374151; word-break: break-word; }
    .footer { margin-top: 20px; color: #9ca3af; font-size: 11px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    @media print {
      body { background: #fff; color: #000; }
      .chat { background: #f9f9f9 !important; max-height: none; }
      .msg:hover { background: transparent; }
      .text { color: #222; }
      .ts { color: #999; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Chat Log: ${escapeHtml(label)}</h1>
    <div class="meta">${filtered.length} messages | Exported ${new Date().toLocaleString()}</div>
    <div class="legend">
      <div class="legend-label">Players</div>
      ${legend}
    </div>
    <div class="chat">
${rows}
    </div>
    <div class="footer">Signal In Chat | Chat Forensics Analyzer</div>
  </div>
</body>
</html>`;

  downloadFile(html, `chat_${fileLabel}_${timestamp()}.html`, "text/html");
}

// ============================================================================
// 2. EXPORT FULL REPORT (JSON)
// ============================================================================

interface FullReportData {
  messages: ChatMessage[];
  playerStats: AdvancedPlayerStats[];
  altSuspicions: AltSuspicion[];
  socialInsights: SocialInsight[];
  slipPatterns: SlipPattern[];
  similarityMatrix: SimilarityMatrix;
  algorithmMode: string;
}

function serializePlayerStats(stats: AdvancedPlayerStats) {
  return {
    name: stats.name,
    messageCount: stats.messageCount,
    wordCount: stats.wordCount,
    avgWordsPerMessage: stats.avgWordsPerMessage,
    activeMinutes: [...stats.activeMinutes],
    sessionGaps: stats.sessionGaps,
    avgResponseTime: stats.avgResponseTime,
    activityPattern: stats.activityPattern,
    charNgrams: Object.fromEntries(stats.charNgrams),
    wordBigrams: Object.fromEntries(stats.wordBigrams),
    typoPatterns: stats.typoPatterns,
    punctuationStyle: stats.punctuationStyle,
    punctuationFrequency: Object.fromEntries(stats.punctuationFrequency),
    letterSubstitutions: Object.fromEntries(stats.letterSubstitutions),
    microPatterns: stats.microPatterns,
    emoticonStyle: stats.emoticonStyle,
    functionWords: stats.functionWords,
    vocabularyRichness: stats.vocabularyRichness,
    hapaxRatio: stats.hapaxRatio,
    yulesK: stats.yulesK,
    simpsonsD: stats.simpsonsD,
    brunetsW: stats.brunetsW,
    avgWordLength: stats.avgWordLength,
    wordLengthDistribution: stats.wordLengthDistribution,
    messageLengthDistribution: stats.messageLengthDistribution,
    sentencePatterns: stats.sentencePatterns,
    commonWords: stats.commonWords,
    commonPhrases: stats.commonPhrases,
    commonStarters: stats.commonStarters,
    commonEnders: stats.commonEnders,
    greetingStyle: stats.greetingStyle,
    farewellStyle: stats.farewellStyle,
    responsePartners: Object.fromEntries(stats.responsePartners),
    mentionedPlayers: [...stats.mentionedPlayers],
    topicFingerprint: Object.fromEntries(stats.topicFingerprint),
    gameTopics: Object.fromEntries(stats.gameTopics || stats.wurmTopics),
    wurmTopics: Object.fromEntries(stats.wurmTopics), // backwards compat
    allMessages: stats.allMessages,
    messageTimes: stats.messageTimes,
    absoluteTimes: stats.absoluteTimes,
  };
}

export function exportFullReportJSON(data: FullReportData) {
  const report = {
    exportedAt: new Date().toISOString(),
    version: "4.1",
    algorithmMode: data.algorithmMode,
    summary: {
      totalMessages: data.messages.length,
      totalPlayers: data.playerStats.length,
      totalDays: Math.max(...data.messages.map(m => m.dayIndex)) + 1,
      criticalMatches: data.altSuspicions.filter(s => s.category === "critical").length,
      highMatches: data.altSuspicions.filter(s => s.category === "high").length,
      mediumMatches: data.altSuspicions.filter(s => s.category === "medium").length,
      lowMatches: data.altSuspicions.filter(s => s.category === "low").length,
      socialInsights: data.socialInsights.length,
      slipPatterns: data.slipPatterns.length,
    },
    playerStats: data.playerStats.map(serializePlayerStats),
    altSuspicions: data.altSuspicions,
    socialInsights: data.socialInsights,
    slipPatterns: data.slipPatterns,
    similarityMatrix: data.similarityMatrix,
    messages: data.messages,
  };

  downloadFile(JSON.stringify(report, null, 2), `chat_report_${timestamp()}.json`, "application/json");
}

// ============================================================================
// 3. EXPORT SUMMARY HTML REPORT
// ============================================================================

export function exportSummaryHTML(data: FullReportData) {
  const criticals = data.altSuspicions.filter(s => s.category === "critical");
  const highs = data.altSuspicions.filter(s => s.category === "high");
  const mediums = data.altSuspicions.filter(s => s.category === "medium");
  const lows = data.altSuspicions.filter(s => s.category === "low");
  const totalDays = data.messages.length > 0 ? Math.max(...data.messages.map(m => m.dayIndex)) + 1 : 0;

  const suspicionRows = data.altSuspicions.map(s => {
    const badgeColor = s.category === "critical" ? "#dc2626" : s.category === "high" ? "#d97706" : s.category === "medium" ? "#2563eb" : "#6b7280";
    const tags: string[] = [];
    if (s.neverOnlineTogether) tags.push('<span style="background:#dc2626;color:#fff;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:bold;">NEVER ONLINE TOGETHER</span>');
    if (s.handoffScore >= 20) tags.push('<span style="background:#d97706;color:#000;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:bold;">HANDOFF PATTERN</span>');

    const reasonsList = s.reasons.map(r =>
      `<li><strong style="text-transform:uppercase;font-size:11px;color:${
        r.type === "temporal" ? "#dc2626" : r.type === "linguistic" ? "#d97706" : r.type === "behavioral" ? "#7c3aed" : r.type === "network" ? "#16a34a" : "#2563eb"
      }">${r.type}</strong> ${escapeHtml(r.description)} <span style="color:#6b7280;">(+${r.weight})</span>${r.evidence ? `<br/><small style="color:#9ca3af;">${escapeHtml(r.evidence)}</small>` : ""}</li>`
    ).join("");

    return `
      <div style="background:#ffffff;border:1px solid ${badgeColor}44;border-radius:12px;padding:20px;margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <span style="font-size:18px;font-weight:bold;">${escapeHtml(s.player1)}</span>
            <span style="color:#6b7280;">&#8596;</span>
            <span style="font-size:18px;font-weight:bold;">${escapeHtml(s.player2)}</span>
            ${tags.join(" ")}
          </div>
          <span style="background:${badgeColor};color:#fff;padding:6px 14px;border-radius:999px;font-weight:bold;font-size:16px;">
            ${s.confidence}% similarity
          </span>
        </div>
        <div style="background:#f0f2f5;border-radius:8px;padding:12px;margin-bottom:12px;">
          <div style="font-size:13px;color:#374151;white-space:pre-line;">${escapeHtml(s.humanExplanation)}</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-bottom:12px;">
          ${scoreBar("Temporal", s.scoreBreakdown.temporal + s.scoreBreakdown.handoff, 80, "#dc2626")}
          ${scoreBar("Linguistic", s.scoreBreakdown.linguistic + s.scoreBreakdown.rareWords, 80, "#d97706")}
          ${scoreBar("Behavioral", s.scoreBreakdown.behavioral, 50, "#7c3aed")}
          ${scoreBar("Network", s.scoreBreakdown.network, 20, "#16a34a")}
          ${s.scoreBreakdown.bonus > 0 ? scoreBar("Bonus", s.scoreBreakdown.bonus, 50, "#2563eb") : ""}
        </div>
        ${s.sharedRareWords.length > 0 ? `
          <div style="margin-bottom:12px;">
            <span style="font-size:12px;color:#6b7280;">Shared unique words: </span>
            ${s.sharedRareWords.slice(0, 8).map(w => `<span style="background:#d9770622;color:#d97706;padding:2px 8px;border-radius:4px;font-size:12px;margin-right:4px;">${escapeHtml(w)}</span>`).join("")}
          </div>
        ` : ""}
        <details>
          <summary style="cursor:pointer;color:#6b7280;font-size:13px;">View all ${s.reasons.length} reasons...</summary>
          <ul style="margin-top:8px;padding-left:20px;font-size:13px;color:#374151;line-height:1.8;">${reasonsList}</ul>
        </details>
      </div>`;
  }).join("");

  const socialRows = data.socialInsights.map(i => {
    const borderColor = i.insightType === "self_talk_suspected" ? "#dc2626" : i.insightType === "conflict_detected" ? "#d97706" : "#2563eb";
    const label = i.insightType === "self_talk_suspected" ? "SELF-TALK DETECTED" : i.insightType === "conflict_detected" ? "POSSIBLE CONFLICT" : i.insightType.replace(/_/g, " ").toUpperCase();
    return `
      <div style="background:#ffffff;border:1px solid ${borderColor}44;border-radius:12px;padding:16px;margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <strong>${escapeHtml(i.player1)}</strong>
            <span style="color:#6b7280;">&#8596;</span>
            <strong>${escapeHtml(i.player2)}</strong>
            <span style="background:${borderColor};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:bold;">${label}</span>
          </div>
          <span style="color:${borderColor};font-weight:bold;">${i.confidence}%</span>
        </div>
        <p style="color:#374151;font-size:13px;margin:8px 0;">${escapeHtml(i.description)}</p>
        <ul style="font-size:12px;color:#9ca3af;padding-left:20px;">
          ${i.evidence.map(e => `<li>${escapeHtml(e)}</li>`).join("")}
        </ul>
      </div>`;
  }).join("");

  const slipRows = data.slipPatterns.map(s => {
    const borderColor = s.suspicionLevel === "high" ? "#dc2626" : s.suspicionLevel === "medium" ? "#d97706" : "#2563eb";
    return `
      <div style="background:#ffffff;border:1px solid ${borderColor}44;border-radius:12px;padding:16px;margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <strong>${escapeHtml(s.playerName)}</strong>
          <span style="background:${borderColor};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:bold;">${s.slipType.replace(/_/g, " ").toUpperCase()}</span>
        </div>
        <p style="color:#374151;font-size:13px;margin:8px 0;">${escapeHtml(s.description)}</p>
        <ul style="font-size:12px;color:#9ca3af;padding-left:20px;">
          ${s.evidence.map(e => `<li>${escapeHtml(e)}</li>`).join("")}
        </ul>
      </div>`;
  }).join("");

  const playerTable = data.playerStats
    .sort((a, b) => b.messageCount - a.messageCount)
    .map(s => `
      <tr>
        <td style="padding:8px 12px;font-weight:bold;">${escapeHtml(s.name)}</td>
        <td style="padding:8px 12px;text-align:center;">${s.messageCount}</td>
        <td style="padding:8px 12px;text-align:center;">${s.wordCount}</td>
        <td style="padding:8px 12px;text-align:center;">${s.avgWordsPerMessage.toFixed(1)}</td>
        <td style="padding:8px 12px;text-align:center;">${(s.vocabularyRichness * 100).toFixed(0)}%</td>
        <td style="padding:8px 12px;text-align:center;">${s.yulesK}</td>
        <td style="padding:8px 12px;text-align:center;">${s.avgWordLength}</td>
        <td style="padding:8px 12px;text-align:center;">${s.typoPatterns.length > 0 ? escapeHtml(s.typoPatterns.slice(0, 3).join(", ")) : "-"}</td>
        <td style="padding:8px 12px;text-align:center;">${s.commonPhrases.length > 0 ? escapeHtml(s.commonPhrases.slice(0, 2).join(", ")) : "-"}</td>
      </tr>
    `).join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat Forensics Report - ${new Date().toLocaleDateString()}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8f9fb; color: #1a1a2e; padding: 24px; }
    .container { max-width: 1100px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 4px; }
    h2 { font-size: 20px; margin: 32px 0 16px; padding-bottom: 8px; border-bottom: 1px solid #d8dce3; }
    .subtitle { color: #6b7280; font-size: 14px; margin-bottom: 24px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 24px; }
    .stat-card { background: #ffffff; border: 1px solid #d8dce3; border-radius: 12px; padding: 16px; text-align: center; }
    .stat-value { font-size: 28px; font-weight: bold; }
    .stat-label { color: #6b7280; font-size: 12px; margin-top: 4px; }
    .critical { color: #dc2626; }
    .high { color: #d97706; }
    .medium { color: #2563eb; }
    .low { color: #6b7280; }
    table { width: 100%; border-collapse: collapse; background: #ffffff; border: 1px solid #d8dce3; border-radius: 12px; overflow: hidden; font-size: 13px; }
    th { background: #f0f2f5; padding: 10px 12px; text-align: left; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
    td { border-top: 1px solid #e5e7eb; }
    tr:hover td { background: #f0f2f5; }
    details summary { cursor: pointer; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #d8dce3; color: #9ca3af; font-size: 12px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Chat Forensics Report</h1>
    <p class="subtitle">Generated ${new Date().toLocaleString()} | Algorithm: ${escapeHtml(data.algorithmMode)}</p>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${data.messages.length}</div>
        <div class="stat-label">Messages</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${data.playerStats.length}</div>
        <div class="stat-label">Players</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${totalDays}</div>
        <div class="stat-label">Day(s)</div>
      </div>
      <div class="stat-card">
        <div class="stat-value critical">${criticals.length}</div>
        <div class="stat-label">Critical Matches</div>
      </div>
      <div class="stat-card">
        <div class="stat-value high">${highs.length}</div>
        <div class="stat-label">High Matches</div>
      </div>
      <div class="stat-card">
        <div class="stat-value medium">${mediums.length}</div>
        <div class="stat-label">Medium Matches</div>
      </div>
      <div class="stat-card">
        <div class="stat-value low">${lows.length}</div>
        <div class="stat-label">Low Matches</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${data.socialInsights.length}</div>
        <div class="stat-label">Social Insights</div>
      </div>
    </div>

    ${data.altSuspicions.length > 0 ? `
    <h2>Alt Account Similarities (${data.altSuspicions.length})</h2>
    ${suspicionRows}
    ` : "<h2>No Notable Similarities Found</h2><p style='color:#6b7280;'>The analysis found no notable similarities.</p>"}

    ${data.socialInsights.length > 0 ? `
    <h2>Social Insights (${data.socialInsights.length})</h2>
    ${socialRows}
    ` : ""}

    ${data.slipPatterns.length > 0 ? `
    <h2>Typing Inconsistencies (${data.slipPatterns.length})</h2>
    ${slipRows}
    ` : ""}

    <h2>Player Statistics</h2>
    <div style="overflow-x:auto;">
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th style="text-align:center;">Messages</th>
            <th style="text-align:center;">Words</th>
            <th style="text-align:center;">Avg/msg</th>
            <th style="text-align:center;">Vocab</th>
            <th style="text-align:center;">Yule's K</th>
            <th style="text-align:center;">Avg Word Len</th>
            <th style="text-align:center;">Typos</th>
            <th style="text-align:center;">Phrases</th>
          </tr>
        </thead>
        <tbody>
          ${playerTable}
        </tbody>
      </table>
    </div>

    <div class="footer">
      Signal In Chat | Chat Forensics Analyzer v4.1 | ${new Date().toISOString()}
    </div>
  </div>
</body>
</html>`;

  downloadFile(html, `chat_report_${timestamp()}.html`, "text/html");
}

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function scoreBar(label: string, value: number, max: number, color: string): string {
  const pct = Math.min((value / max) * 100, 100);
  return `
    <div style="background:#f0f2f5;border-radius:8px;padding:8px 10px;">
      <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px;">
        <span style="color:${color};font-weight:bold;">${label}</span>
        <span style="color:#6b7280;">${value}/${max}</span>
      </div>
      <div style="height:6px;background:#e5e7eb;border-radius:999px;overflow:hidden;">
        <div style="height:100%;width:${pct}%;background:${color};border-radius:999px;"></div>
      </div>
    </div>`;
}
