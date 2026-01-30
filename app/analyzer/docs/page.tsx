"use client";

export default function DocsPage() {
  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/analyzer"
            className="text-accent hover:underline text-sm mb-4 inline-block"
          >
            &larr; Back to Analyzer
          </a>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Chat Forensics Analyzer - Documentation
          </h1>
          <p className="text-text-secondary">
            Technical overview of the algorithms and detection methods used in the Signal In Chat analysis engine.
          </p>
        </div>

        {/* Introduction */}
        <section className="bg-bg-secondary rounded-xl border border-border p-6 mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Overview</h2>
          <p className="text-text-secondary mb-4">
            The Signal In Chat forensic analyzer uses multiple forensic linguistics techniques to detect
            alternative accounts (alts) and analyze social relationships between players. The system
            combines temporal analysis, stylometry, behavioral patterns, and network analysis to
            provide comprehensive insights.
          </p>
          <div className="bg-info/10 border border-info/30 rounded-lg p-4 text-sm">
            <strong className="text-info">Note:</strong>
            <span className="text-text-secondary ml-2">
              This tool provides probabilistic analysis only. Results should always be
              interpreted with caution and are not definitive proof of any connection
              between accounts.
            </span>
          </div>
        </section>

        {/* Temporal Analysis */}
        <section className="bg-bg-secondary rounded-xl border border-border p-6 mb-6">
          <h2 className="text-xl font-semibold text-error mb-4">1. Temporal Analysis</h2>
          <p className="text-text-secondary mb-4">
            Analyzes when players are online to detect accounts that are never active at the same time.
          </p>
          <div className="space-y-4">
            <div className="bg-bg-tertiary rounded-lg p-4">
              <h3 className="font-semibold text-text-primary mb-2">Never Online Together</h3>
              <p className="text-text-secondary text-sm mb-2">
                If two accounts are never online at the same time (0 overlapping minutes) despite
                both being highly active, this could suggest they may be linked.
              </p>
              <div className="text-xs text-text-muted">Score: <span className="text-error font-mono">+45 points</span> (weighted)</div>
            </div>
            <div className="bg-bg-tertiary rounded-lg p-4">
              <h3 className="font-semibold text-text-primary mb-2">Handoff Pattern Detection</h3>
              <p className="text-text-secondary text-sm mb-2">
                Detects when one player stops talking and another starts within 5 minutes. This
                &quot;handoff&quot; pattern may indicate someone switching between accounts.
              </p>
              <ul className="text-xs text-text-muted list-disc list-inside space-y-1">
                <li>Session gap: 10 minutes (considered &quot;stopped talking&quot;)</li>
                <li>Handoff window: 5 minutes</li>
                <li>Score: up to <span className="text-error font-mono">+40 points</span> if 50%+ transitions are handoffs</li>
              </ul>
            </div>
            <div className="bg-bg-tertiary rounded-lg p-4">
              <h3 className="font-semibold text-text-primary mb-2">Complementary Schedules</h3>
              <p className="text-text-secondary text-sm">
                Analyzes time-of-day activity patterns. If two accounts are never online together
                AND have different activity patterns (one plays mornings, another evenings), this
                adds to the overall similarity score.
              </p>
            </div>
          </div>
        </section>

        {/* Linguistic Analysis */}
        <section className="bg-bg-secondary rounded-xl border border-border p-6 mb-6">
          <h2 className="text-xl font-semibold text-warning mb-4">2. Linguistic Analysis</h2>
          <p className="text-text-secondary mb-4">
            The most reliable detection method. Analyzes writing style which is very difficult to fake.
          </p>
          <div className="space-y-4">
            <div className="bg-bg-tertiary rounded-lg p-4">
              <h3 className="font-semibold text-text-primary mb-2">Function Word Analysis</h3>
              <p className="text-text-secondary text-sm mb-2">
                <strong>Most reliable feature!</strong> Function words (the, a, an, I, you, but, and, etc.)
                are used unconsciously and are nearly impossible to fake. We analyze:
              </p>
              <ul className="text-xs text-text-muted list-disc list-inside space-y-1">
                <li>Articles (the, a, an)</li>
                <li>Pronouns (I, you, he, she, we, they)</li>
                <li>Prepositions (in, on, at, to, for)</li>
                <li>Conjunctions (and, but, or, so, because)</li>
                <li>Auxiliaries (is, are, was, have, will, can)</li>
                <li>I vs We ratio (personal vs collective language)</li>
              </ul>
              <div className="text-xs text-text-muted mt-2">Score: up to <span className="text-warning font-mono">+35 points</span> for 92%+ similarity</div>
            </div>
            <div className="bg-bg-tertiary rounded-lg p-4">
              <h3 className="font-semibold text-text-primary mb-2">Character N-grams</h3>
              <p className="text-text-secondary text-sm mb-2">
                Analyzes 3-character sequences in text. This captures typing patterns, common
                letter combinations, and subconscious writing habits.
              </p>
              <div className="text-xs text-text-muted">Threshold: 97%+ = high match, 94%+ = medium match</div>
            </div>
            <div className="bg-bg-tertiary rounded-lg p-4">
              <h3 className="font-semibold text-text-primary mb-2">Vocabulary Complexity</h3>
              <p className="text-text-secondary text-sm mb-2">Statistical measures of writing complexity:</p>
              <ul className="text-xs text-text-muted list-disc list-inside space-y-1">
                <li><strong>Yule&apos;s K:</strong> Vocabulary richness measure</li>
                <li><strong>Simpson&apos;s D:</strong> Diversity index</li>
                <li><strong>Brunet&apos;s W:</strong> Vocabulary size statistic</li>
              </ul>
            </div>
            <div className="bg-bg-tertiary rounded-lg p-4">
              <h3 className="font-semibold text-text-primary mb-2">Typo Patterns &amp; Micro-patterns</h3>
              <p className="text-text-secondary text-sm">
                People make consistent typos and have small typing habits (lowercase i, double spaces,
                no capitals, number substitutions) that are hard to change.
              </p>
            </div>
          </div>
        </section>

        {/* Behavioral */}
        <section className="bg-bg-secondary rounded-xl border border-border p-6 mb-6">
          <h2 className="text-xl font-semibold text-accent mb-4">3. Behavioral Analysis</h2>
          <p className="text-text-secondary mb-4">How players interact with the chat and what they talk about.</p>
          <div className="space-y-4">
            <div className="bg-bg-tertiary rounded-lg p-4">
              <h3 className="font-semibold text-text-primary mb-2">Message Length, Greeting/Farewell Style, Common Phrases, Rare Words</h3>
              <p className="text-text-secondary text-sm">
                Consistent message lengths, how someone greets and says goodbye, unique phrases, and
                rare vocabulary shared between accounts all contribute to the behavioral fingerprint.
              </p>
            </div>
          </div>
        </section>

        {/* Social */}
        <section className="bg-bg-secondary rounded-xl border border-border p-6 mb-6">
          <h2 className="text-xl font-semibold text-success mb-4">4. Social Analysis</h2>
          <div className="space-y-4">
            <div className="bg-bg-tertiary rounded-lg p-4 border-l-4 border-error">
              <h3 className="font-semibold text-text-primary mb-2">Self-Talk Detection</h3>
              <p className="text-text-secondary text-sm">If two accounts talk to each other but share very similar writing style, this is noteworthy. Different people typically have distinct writing styles.</p>
            </div>
            <div className="bg-bg-tertiary rounded-lg p-4 border-l-4 border-warning">
              <h3 className="font-semibold text-text-primary mb-2">Conflict Detection</h3>
              <p className="text-text-secondary text-sm">If two players are online together but never interact (while both chatting with others), they are more likely different people. This reduces the similarity score.</p>
            </div>
            <div className="bg-bg-tertiary rounded-lg p-4 border-l-4 border-info">
              <h3 className="font-semibold text-text-primary mb-2">Slip Detection</h3>
              <p className="text-text-secondary text-sm">Detects inconsistencies in typing style within a single account — capitalization changes, typo patterns appearing/disappearing mid-session.</p>
            </div>
          </div>
        </section>

        {/* Algorithm Modes */}
        <section className="bg-bg-secondary rounded-xl border border-border p-6 mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">5. Algorithm Modes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-primary">Mode</th>
                  <th className="text-left py-2 text-text-primary">Min Score</th>
                  <th className="text-left py-2 text-text-primary">Description</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-border"><td className="py-2 font-mono">balanced</td><td className="py-2">70</td><td className="py-2">Good balance (default)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-mono">strict</td><td className="py-2">100</td><td className="py-2">Fewer false positives</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-mono">sensitive</td><td className="py-2">50</td><td className="py-2">Catches more, may have false positives</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-mono">temporal</td><td className="py-2">60</td><td className="py-2">Emphasis on timing patterns</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-mono">linguistic</td><td className="py-2">60</td><td className="py-2">Emphasis on writing style</td></tr>
                <tr><td className="py-2 font-mono">wurm</td><td className="py-2">65</td><td className="py-2">Wurm Online specific patterns</td></tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-info/10 border border-info/30 rounded-lg p-4 text-sm">
            <strong className="text-info">Game Profiles:</strong>
            <span className="text-text-secondary ml-2">
              Use the game selector at the top of the analyzer to load game-specific vocabulary,
              system player filters, and optimized settings. Currently supported: Wurm Online, Generic/Other.
            </span>
          </div>
        </section>

        {/* Limitations */}
        <section className="bg-bg-secondary rounded-xl border border-border p-6 mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">6. Limitations</h2>
          <ul className="space-y-3 text-text-secondary">
            <li className="flex gap-2"><span className="text-warning">&#9888;</span><span><strong>Not 100% accurate:</strong> Probabilistic analysis, not proof. Always use human judgment.</span></li>
            <li className="flex gap-2"><span className="text-warning">&#9888;</span><span><strong>Needs enough data:</strong> Works best with 30+ messages per player.</span></li>
            <li className="flex gap-2"><span className="text-warning">&#9888;</span><span><strong>Similar writing styles:</strong> Some people naturally write similarly.</span></li>
            <li className="flex gap-2"><span className="text-warning">&#9888;</span><span><strong>Shared devices:</strong> Family members may show temporal patterns that look like alt switching.</span></li>
          </ul>
        </section>

        <div className="mt-8 text-center text-sm text-text-muted">
          <p>Signal In Chat - Chat Forensics Analyzer v4.1</p>
        </div>
      </div>
    </div>
  );
}
