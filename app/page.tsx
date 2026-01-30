"use client";

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm mb-8">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Multi-game support — select your game in the analyzer
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight">
              Find the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-info">
                signal
              </span>{" "}
              hidden
              <br />
              in game chat
            </h1>

            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
              Advanced forensic linguistics and stylometry to detect alt
              accounts, uncover player behavior patterns, and analyze social
              dynamics in online game communities.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/analyzer"
                className="px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all text-lg font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5"
              >
                Launch Analyzer
              </a>
              <a
                href="#how-it-works"
                className="px-8 py-4 bg-bg-secondary text-text-secondary rounded-xl hover:bg-bg-tertiary transition-colors text-lg border border-border"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Hero visual — mock analyzer UI */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="bg-bg-secondary rounded-2xl border border-border p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-error/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
                <span className="ml-3 text-text-muted text-sm font-mono">
                  signal-in-chat / analyzer
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stats cards */}
                <div className="bg-bg-tertiary rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-text-primary">
                    1,247
                  </div>
                  <div className="text-text-muted text-sm">
                    Messages Analyzed
                  </div>
                </div>
                <div className="bg-bg-tertiary rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-text-primary">23</div>
                  <div className="text-text-muted text-sm">
                    Players Detected
                  </div>
                </div>
                <div className="bg-bg-tertiary rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-error">3</div>
                  <div className="text-text-muted text-sm">
                    Alt Account Matches
                  </div>
                </div>
              </div>

              {/* Mock detection result */}
              <div className="mt-4 bg-bg-tertiary rounded-xl p-4 border-l-4 border-error">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-blue-400">
                      Player_A
                    </span>
                    <span className="text-text-muted">&harr;</span>
                    <span className="font-semibold text-green-400">
                      Player_B
                    </span>
                    <span className="px-2 py-0.5 bg-error text-white text-xs rounded font-bold">
                      NEVER ONLINE TOGETHER
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-error text-white rounded-full text-sm font-bold">
                    89% match
                  </span>
                </div>
                <p className="text-text-secondary text-sm">
                  Identical function word usage, matching typo patterns, and
                  clear handoff pattern detected across 3 days of chat logs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Forensic-grade chat analysis
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Built on proven forensic linguistics techniques used in
              authorship attribution research, adapted for online gaming.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              color="error"
              title="Temporal Analysis"
              description="Detect accounts that are never online together, find handoff patterns where one player stops and another starts within minutes."
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              }
            />
            <FeatureCard
              color="warning"
              title="Stylometry Engine"
              description="Function word analysis, character n-grams, vocabulary complexity metrics (Yule's K, Simpson's D, Brunet's W) to fingerprint writing style."
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              }
            />
            <FeatureCard
              color="accent"
              title="Behavioral Profiling"
              description="Greeting/farewell style, typo patterns, micro-typing habits, emoticon preferences, and shared rare vocabulary detection."
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              }
            />
            <FeatureCard
              color="success"
              title="Social Network Analysis"
              description="Map who talks to who, detect self-talk between accounts, identify conflicts, and find one-way interaction patterns."
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              }
            />
            <FeatureCard
              color="info"
              title="Similarity Matrix"
              description="Visual heatmap comparing all player pairs simultaneously. Click any cell to deep-dive into the forensics comparison lab."
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              }
            />
            <FeatureCard
              color="warning"
              title="Export & Reports"
              description="Generate full JSON data exports, shareable HTML summary reports, and color-coded chat logs for documentation."
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              }
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              How it works
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Three steps from raw chat logs to actionable intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Upload Chat Logs"
              description="Paste or upload .txt chat log files. Supports multi-day analysis with automatic day detection. Multiple files are treated as separate days."
            />
            <StepCard
              number="2"
              title="Automatic Analysis"
              description="The engine runs 6 analysis categories: temporal, linguistic, behavioral, network, rare words, and social patterns. Choose from 6 algorithm modes."
            />
            <StepCard
              number="3"
              title="Review Results"
              description="Browse player profiles, alt account matches with confidence scores, social insights, similarity matrix, and deep-dive forensics comparisons."
            />
          </div>
        </div>
      </section>

      {/* Supported Games */}
      <section id="games" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Supported games
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Select your game in the analyzer. The core analysis engine works
              with any timestamped chat format — game-specific profiles add
              vocabulary and tuning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-bg-secondary rounded-2xl border border-border p-8 text-center relative overflow-hidden">
              <div className="absolute top-3 right-3 px-2 py-1 bg-success/20 text-success text-xs rounded font-semibold">
                LIVE
              </div>
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Wurm Online
              </h3>
              <p className="text-text-secondary text-sm">
                Full support including 100+ Wurm-specific abbreviations,
                terminology, and optimized detection mode.
              </p>
            </div>

            <div className="bg-bg-secondary rounded-2xl border border-border/50 p-8 text-center opacity-60">
              <div className="absolute top-3 right-3 px-2 py-1 bg-warning/20 text-warning text-xs rounded font-semibold">
                COMING SOON
              </div>
              <div className="w-16 h-16 bg-bg-tertiary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Discord
              </h3>
              <p className="text-text-secondary text-sm">
                Analyze exported Discord server chat logs for the same forensic
                patterns.
              </p>
            </div>

            <div className="bg-bg-secondary rounded-2xl border border-border p-8 text-center relative overflow-hidden">
              <div className="absolute top-3 right-3 px-2 py-1 bg-success/20 text-success text-xs rounded font-semibold">
                LIVE
              </div>
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Generic / Other
              </h3>
              <p className="text-text-secondary text-sm">
                Any timestamped chat format. Works with any game — no
                game-specific vocabulary required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section className="py-24 bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Built on real science
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              The same forensic linguistics techniques used in academic
              authorship attribution, adapted for the gaming world.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TechBadge label="Yule's K" description="Vocabulary richness" />
            <TechBadge label="Simpson's D" description="Diversity index" />
            <TechBadge label="Brunet's W" description="Vocabulary complexity" />
            <TechBadge label="N-gram Analysis" description="Character patterns" />
            <TechBadge label="Function Words" description="Unconscious markers" />
            <TechBadge label="Cosine Similarity" description="Vector comparison" />
            <TechBadge label="Handoff Detection" description="Session analysis" />
            <TechBadge label="Stylometry" description="Writing fingerprint" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            Ready to find the signal?
          </h2>
          <p className="text-text-secondary text-lg mb-10 max-w-2xl mx-auto">
            Upload your chat logs and let the forensic analysis engine do the
            work. No account needed — runs entirely in your browser.
          </p>
          <a
            href="/analyzer"
            className="inline-block px-10 py-4 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all text-lg font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5"
          >
            Launch Analyzer
          </a>
          <p className="text-text-muted text-sm mt-4">
            100% client-side. Your chat logs never leave your browser.
          </p>
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FeatureCard({
  color,
  title,
  description,
  icon,
}: {
  color: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-bg-secondary rounded-2xl border border-border p-6 hover:border-border hover:shadow-lg transition-all group">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${color}/10`}
      >
        <svg
          className={`w-6 h-6 text-${color}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {icon}
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-accent/10 border-2 border-accent/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <span className="text-2xl font-bold text-accent">{number}</span>
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-3">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
}

function TechBadge({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="bg-bg-tertiary rounded-xl p-4 text-center border border-border/50">
      <div className="font-semibold text-text-primary text-sm">{label}</div>
      <div className="text-text-muted text-xs mt-1">{description}</div>
    </div>
  );
}
