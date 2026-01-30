# Signal In Chat

**Game chat intelligence platform.** Detect alt accounts, analyze player behavior, and uncover hidden patterns using forensic linguistics and stylometry.

[www.signalinchat.com](https://www.signalinchat.com)

---

## What is this?

Signal In Chat analyzes game chat logs to find the *signal* hidden in everyday conversation. Using the same forensic linguistics techniques from academic authorship attribution research, the platform builds writing fingerprints for each player and compares them to detect connections between accounts.

Everything runs **100% client-side** — your chat logs never leave your browser.

## Features

### Temporal Analysis
- Detect accounts that are never online at the same time
- Handoff pattern detection (one stops, another starts within minutes)
- Complementary schedule analysis (morning player vs evening player)

### Stylometry Engine
- **Function word profiling** — articles, pronouns, prepositions, conjunctions (unconscious and nearly impossible to fake)
- Character n-gram fingerprinting (3-letter typing patterns)
- Vocabulary complexity metrics: Yule's K, Simpson's D, Brunet's W
- Word bigram analysis (common word pairs)

### Behavioral Profiling
- Typo patterns and micro-typing habits (lowercase i, double spaces, no capitals)
- Greeting and farewell style detection
- Emoticon/emoji preferences
- Shared rare vocabulary fingerprinting
- Message length distribution matching

### Social Network Analysis
- Self-talk detection (accounts that talk to each other but write identically)
- Conflict detection (online together but never interacting)
- Slip detection (writing style changes mid-session)
- Response partner mapping

### Tools
- **Similarity Matrix** — visual heatmap of all player pairs
- **Forensics Lab** — deep side-by-side comparison of any two players
- **6 Algorithm Modes** — Balanced, Strict, Sensitive, Temporal, Linguistic, Wurm
- **Export** — Full JSON reports, shareable HTML summaries, color-coded chat logs

## Supported Games

| Game | Status |
|------|--------|
| Wurm Online | Live (100+ game-specific terms, optimized detection mode) |
| Discord | Coming soon |
| Generic / Custom | Coming soon |

The core analysis engine works with any timestamped chat format:
```
[21:25:05] <PlayerName> message text here
[2024-01-15 21:25:05] <PlayerName> message with date
```

## Tech Stack

- **Next.js 16.1** (App Router, static export)
- **React 18** with TypeScript
- **Tailwind CSS** with custom design tokens
- **Zero external analysis dependencies** — all forensic algorithms are pure TypeScript

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build (static export)
npm run build
```

The build outputs to `out/` as static HTML — deployable to any static hosting (Vercel, Netlify, Cloudflare Pages, etc.).

## Project Structure

```
signalinchat.com/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Navigation + footer
│   ├── globals.css               # Tailwind + design tokens
│   └── analyzer/
│       ├── page.tsx              # Chat forensics analyzer tool
│       └── docs/page.tsx         # Documentation
├── lib/
│   ├── altDetection.ts           # Alt detection engine
│   ├── linguistic.ts             # Stylometry & writing analysis
│   ├── behavioral.ts             # Behavioral & social analysis
│   ├── playerAnalysis.ts         # Player statistics generation
│   ├── parser.ts                 # Chat log parsing
│   ├── constants.ts              # Algorithm configs & word lists
│   ├── export.ts                 # Report export (JSON, HTML, TXT)
│   ├── types.ts                  # TypeScript interfaces
│   ├── utils.ts                  # Cosine similarity, helpers
│   └── index.ts                  # Module exports
└── website/                      # Original source files (legacy)
```

## How Detection Works

The engine scores player pairs across multiple categories:

| Category | What it measures | Max contribution |
|----------|-----------------|-----------------|
| Temporal | Never online together, handoff patterns | ~85 points |
| Linguistic | Function words, n-grams, typos, vocabulary | ~80 points |
| Behavioral | Greetings, phrases, message length | ~50 points |
| Network | Self-talk, no interaction, conflicts | ~45 points |
| Rare Words | Shared uncommon vocabulary | ~30 points |
| Combo Bonus | Multiple categories align | +35% |

Confidence formula: `min(totalScore × 0.40 + 12, 95)`

Results are categorized as **Critical** (82%+), **High** (72%+), **Medium** (55%+), or **Low**.

## Disclaimer

This tool provides **probabilistic analysis only**. Results should always be interpreted with caution and are not definitive proof of any connection between accounts. Similar writing styles can occur naturally — always apply human judgment.

---

Built for the gaming community.
