"use client";

export default function DocsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <a
            href="/analyzer"
            className="inline-flex items-center gap-1 text-text-muted hover:text-text-secondary transition-colors text-sm mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Analyzer
          </a>
          <h1 className="text-3xl font-bold text-text-primary mb-3">
            Technical Documentation
          </h1>
          <p className="text-text-secondary max-w-2xl">
            A detailed overview of the algorithms, detection methods, and scoring system used in the Signal In Chat analysis engine.
          </p>
        </div>

        {/* Table of contents */}
        <nav className="bg-bg-secondary rounded-xl border border-border p-6 mb-8">
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Contents</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <li><a href="#overview" className="text-accent hover:underline">Overview</a></li>
            <li><a href="#temporal" className="text-accent hover:underline">1. Temporal Analysis</a></li>
            <li><a href="#linguistic" className="text-accent hover:underline">2. Linguistic Analysis</a></li>
            <li><a href="#behavioral" className="text-accent hover:underline">3. Behavioral Analysis</a></li>
            <li><a href="#social" className="text-accent hover:underline">4. Social Analysis</a></li>
            <li><a href="#modes" className="text-accent hover:underline">5. Algorithm Modes</a></li>
            <li><a href="#limitations" className="text-accent hover:underline">6. Limitations</a></li>
          </ol>
        </nav>

        {/* Overview */}
        <section id="overview" className="bg-bg-secondary rounded-xl border border-border p-6 mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Overview</h2>
          <p className="text-text-secondary mb-4 leading-relaxed">
            The Signal In Chat forensic analyzer uses multiple forensic linguistics techniques to detect
            alternative accounts (alts) and analyze social relationships between players. The system
            combines temporal analysis, stylometry, behavioral patterns, and network analysis to
            provide comprehensive insights.
          </p>
          <div className="bg-info/10 border border-info/30 rounded-lg p-4 text-sm flex gap-3">
            <svg className="w-5 h-5 text-info flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-text-secondary">
              <strong className="text-info">Important:</strong>{" "}
              This tool provides probabilistic analysis only. Results should always be
              interpreted with caution and are not definitive proof of any connection
              between accounts.
            </span>
          </div>
        </section>

        {/* Temporal Analysis */}
        <section id="temporal" className="bg-bg-secondary rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-error/10 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-text-primary">1. Temporal Analysis</h2>
          </div>
          <p className="text-text-secondary mb-5 leading-relaxed">
            Analyzes when players are online to detect accounts that are never active at the same time.
          </p>
          <div className="space-y-4">
            <DocCard
              title="Never Online Together"
              score="+45 points"
              scoreColor="text-error"
            >
              If two accounts are never online at the same time (0 overlapping minutes) despite
              both being highly active, this could suggest they may be linked.
            </DocCard>
            <DocCard
              title="Handoff Pattern Detection"
              score="up to +40 points"
              scoreColor="text-error"
            >
              <p className="mb-2">
                Detects when one player stops talking and another starts within 5 minutes. This
                &quot;handoff&quot; pattern may indicate someone switching between accounts.
              </p>
              <ul className="text-xs text-text-muted list-disc list-inside space-y-1">
                <li>Session gap: 10 minutes (considered &quot;stopped talking&quot;)</li>
                <li>Handoff window: 5 minutes</li>
                <li>Maximum score if 50%+ transitions are handoffs</li>
              </ul>
            </DocCard>
            <DocCard title="Complementary Schedules">
              Analyzes time-of-day activity patterns. If two accounts are never online together
              AND have different activity patterns (one plays mornings, another evenings), this
              adds to the overall similarity score.
            </DocCard>
          </div>
        </section>

        {/* Linguistic Analysis */}
        <section id="linguistic" className="bg-bg-secondary rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-text-primary">2. Linguistic Analysis</h2>
          </div>
          <p className="text-text-secondary mb-5 leading-relaxed">
            The most reliable detection method. Analyzes writing style which is very difficult to fake.
          </p>
          <div className="space-y-4">
            <DocCard
              title="Function Word Analysis"
              score="up to +35 points"
              scoreColor="text-warning"
              highlight
            >
              <p className="mb-3">
                <strong>Most reliable feature.</strong> Function words (the, a, an, I, you, but, and, etc.)
                are used unconsciously and are nearly impossible to fake. The system analyzes:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-text-muted">
                <div className="bg-bg-primary/50 rounded px-3 py-2">Articles (the, a, an)</div>
                <div className="bg-bg-primary/50 rounded px-3 py-2">Pronouns (I, you, he, she)</div>
                <div className="bg-bg-primary/50 rounded px-3 py-2">Prepositions (in, on, at, to)</div>
                <div className="bg-bg-primary/50 rounded px-3 py-2">Conjunctions (and, but, or)</div>
                <div className="bg-bg-primary/50 rounded px-3 py-2">Auxiliaries (is, are, was, have)</div>
                <div className="bg-bg-primary/50 rounded px-3 py-2">I vs We ratio</div>
              </div>
            </DocCard>
            <DocCard title="Character N-grams">
              <p className="mb-2">
                Analyzes 3-character sequences in text. This captures typing patterns, common
                letter combinations, and subconscious writing habits.
              </p>
              <div className="text-xs text-text-muted bg-bg-primary/50 rounded px-3 py-2 inline-block">
                Threshold: 97%+ = high match, 94%+ = medium match
              </div>
            </DocCard>
            <DocCard title="Vocabulary Complexity">
              <p className="mb-3">Statistical measures of writing complexity:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-accent text-xs bg-accent/10 px-2 py-0.5 rounded">K</span>
                  <span className="text-text-secondary"><strong>Yule&apos;s K</strong> &mdash; Vocabulary richness measure</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono text-accent text-xs bg-accent/10 px-2 py-0.5 rounded">D</span>
                  <span className="text-text-secondary"><strong>Simpson&apos;s D</strong> &mdash; Diversity index</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono text-accent text-xs bg-accent/10 px-2 py-0.5 rounded">W</span>
                  <span className="text-text-secondary"><strong>Brunet&apos;s W</strong> &mdash; Vocabulary size statistic</span>
                </div>
              </div>
            </DocCard>
            <DocCard title="Typo Patterns &amp; Micro-patterns">
              People make consistent typos and have small typing habits (lowercase i, double spaces,
              no capitals, number substitutions) that are hard to change.
            </DocCard>
          </div>
        </section>

        {/* Behavioral */}
        <section id="behavioral" className="bg-bg-secondary rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-text-primary">3. Behavioral Analysis</h2>
          </div>
          <p className="text-text-secondary mb-5 leading-relaxed">
            How players interact with the chat and what they talk about.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-bg-tertiary rounded-lg p-4">
              <h4 className="font-semibold text-text-primary text-sm mb-2">Message Length</h4>
              <p className="text-text-secondary text-sm">Consistent message lengths are compared across accounts.</p>
            </div>
            <div className="bg-bg-tertiary rounded-lg p-4">
              <h4 className="font-semibold text-text-primary text-sm mb-2">Greeting &amp; Farewell Style</h4>
              <p className="text-text-secondary text-sm">How someone greets and says goodbye is highly personal.</p>
            </div>
            <div className="bg-bg-tertiary rounded-lg p-4">
              <h4 className="font-semibold text-text-primary text-sm mb-2">Common Phrases</h4>
              <p className="text-text-secondary text-sm">Unique phrases and expressions shared between accounts.</p>
            </div>
            <div className="bg-bg-tertiary rounded-lg p-4">
              <h4 className="font-semibold text-text-primary text-sm mb-2">Shared Unique Words</h4>
              <p className="text-text-secondary text-sm">Vocabulary shared exclusively between suspected accounts.</p>
            </div>
          </div>
        </section>

        {/* Social */}
        <section id="social" className="bg-bg-secondary rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-text-primary">4. Social Analysis</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-bg-tertiary rounded-lg p-5 border-l-4 border-error">
              <h3 className="font-semibold text-text-primary mb-2">Self-Talk Detection</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                If two accounts talk to each other but share very similar writing style, this is noteworthy.
                Different people typically have distinct writing styles.
              </p>
            </div>
            <div className="bg-bg-tertiary rounded-lg p-5 border-l-4 border-warning">
              <h3 className="font-semibold text-text-primary mb-2">Conflict Detection</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                If two players are online together but never interact (while both chatting with others),
                they are more likely different people. This reduces the similarity score.
              </p>
            </div>
            <div className="bg-bg-tertiary rounded-lg p-5 border-l-4 border-info">
              <h3 className="font-semibold text-text-primary mb-2">Slip Detection</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Detects inconsistencies in typing style within a single account &mdash; capitalization changes,
                typo patterns appearing/disappearing mid-session.
              </p>
            </div>
          </div>
        </section>

        {/* Algorithm Modes */}
        <section id="modes" className="bg-bg-secondary rounded-xl border border-border p-6 mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-5">5. Algorithm Modes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 text-text-muted text-xs uppercase tracking-wider">Mode</th>
                  <th className="text-left py-3 pr-4 text-text-muted text-xs uppercase tracking-wider">Min Score</th>
                  <th className="text-left py-3 text-text-muted text-xs uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4"><span className="font-mono text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">balanced</span></td>
                  <td className="py-3 pr-4">70</td>
                  <td className="py-3">Good balance between accuracy and coverage (default)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4"><span className="font-mono text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">strict</span></td>
                  <td className="py-3 pr-4">100</td>
                  <td className="py-3">Fewer false positives, higher threshold</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4"><span className="font-mono text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">sensitive</span></td>
                  <td className="py-3 pr-4">50</td>
                  <td className="py-3">Catches more matches, may include false positives</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4"><span className="font-mono text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">temporal</span></td>
                  <td className="py-3 pr-4">60</td>
                  <td className="py-3">Emphasis on timing and session patterns</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4"><span className="font-mono text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">linguistic</span></td>
                  <td className="py-3 pr-4">60</td>
                  <td className="py-3">Emphasis on writing style analysis</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4"><span className="font-mono text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">wurm</span></td>
                  <td className="py-3 pr-4">65</td>
                  <td className="py-3">Wurm Online specific vocabulary and patterns</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-5 bg-info/10 border border-info/30 rounded-lg p-4 text-sm flex gap-3">
            <svg className="w-5 h-5 text-info flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-text-secondary">
              <strong className="text-info">Game profiles:</strong>{" "}
              Use the game selector to load game-specific vocabulary, system player filters, and optimized settings.
              Currently supported: Wurm Online, Generic/Other.
            </span>
          </div>
        </section>

        {/* Limitations */}
        <section id="limitations" className="bg-bg-secondary rounded-xl border border-border p-6 mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-5">6. Limitations</h2>
          <div className="space-y-3">
            <LimitationItem
              title="Not 100% accurate"
              description="Probabilistic analysis, not proof. Always use human judgment."
            />
            <LimitationItem
              title="Needs enough data"
              description="Works best with 30+ messages per player."
            />
            <LimitationItem
              title="Similar writing styles"
              description="Some people naturally write similarly."
            />
            <LimitationItem
              title="Shared devices"
              description="Family members may show temporal patterns that look like alt switching."
            />
          </div>
        </section>

        <div className="mt-10 text-center text-sm text-text-muted">
          <p>Signal In Chat &mdash; Chat Forensics Analyzer v4.1</p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function DocCard({
  title,
  score,
  scoreColor,
  highlight,
  children,
}: {
  title: string;
  score?: string;
  scoreColor?: string;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`bg-bg-tertiary rounded-lg p-5 ${highlight ? "ring-1 ring-accent/20" : ""}`}>
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-semibold text-text-primary">{title}</h3>
        {score && (
          <span className={`text-xs font-mono whitespace-nowrap ${scoreColor || "text-text-muted"}`}>{score}</span>
        )}
      </div>
      <div className="text-text-secondary text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function LimitationItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 bg-bg-tertiary rounded-lg p-4">
      <svg className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <div>
        <span className="font-semibold text-text-primary text-sm">{title}:</span>{" "}
        <span className="text-text-secondary text-sm">{description}</span>
      </div>
    </div>
  );
}
