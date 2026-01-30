"use client";

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border rounded-full text-text-secondary text-sm mb-8 shadow-sm">
              <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              100% client-side &mdash; your data never leaves your browser
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight tracking-tight">
              Forensic chat analysis
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-info">
                for online communities
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
              Detect alt accounts and uncover behavioral patterns in game chat
              logs using proven stylometry and forensic linguistics techniques.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/analyzer"
                className="px-8 py-3.5 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all text-base font-semibold shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:-translate-y-0.5"
              >
                Open Analyzer
              </a>
              <a
                href="/analyzer/docs"
                className="px-8 py-3.5 bg-bg-secondary text-text-secondary rounded-xl hover:bg-bg-tertiary transition-colors text-base border border-border"
              >
                Read Documentation
              </a>
            </div>
          </div>

          {/* Hero visual — mock analyzer UI */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="bg-bg-secondary rounded-2xl border border-border p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-error/40" />
                <div className="w-3 h-3 rounded-full bg-warning/40" />
                <div className="w-3 h-3 rounded-full bg-success/40" />
                <span className="ml-3 text-text-muted text-sm font-mono">
                  signal-in-chat / analyzer
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-bg-tertiary rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-text-primary">
                    1,247
                  </div>
                  <div className="text-text-muted text-sm mt-1">
                    Messages Analyzed
                  </div>
                </div>
                <div className="bg-bg-tertiary rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-text-primary">23</div>
                  <div className="text-text-muted text-sm mt-1">
                    Players Detected
                  </div>
                </div>
                <div className="bg-bg-tertiary rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-error">3</div>
                  <div className="text-text-muted text-sm mt-1">
                    Alt Account Matches
                  </div>
                </div>
              </div>

              {/* Mock detection result */}
              <div className="mt-4 bg-bg-tertiary rounded-xl p-4 border-l-4 border-error">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-accent">
                      Player_A
                    </span>
                    <span className="text-text-muted">&harr;</span>
                    <span className="font-semibold text-success">
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

      {/* Key metrics bar */}
      <section className="border-y border-border bg-bg-secondary/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-text-primary">6</div>
              <div className="text-text-muted text-sm mt-1">Analysis Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-text-primary">6</div>
              <div className="text-text-muted text-sm mt-1">Algorithm Modes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-text-primary">100%</div>
              <div className="text-text-muted text-sm mt-1">Client-Side</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-text-primary">0</div>
              <div className="text-text-muted text-sm mt-1">Data Sent to Server</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Capabilities</p>
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
              description="Detect accounts that are never online together and find handoff patterns where one player stops and another starts within minutes."
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
              description="Function word analysis, character n-grams, and vocabulary complexity metrics (Yule's K, Simpson's D, Brunet's W) to fingerprint writing style."
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
              description="Greeting and farewell style, typo patterns, micro-typing habits, emoticon preferences, and shared unique vocabulary detection."
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
              description="Map who talks to whom, detect self-talk between accounts, identify conflicts, and find one-way interaction patterns."
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
              description="Interactive heatmap comparing all player pairs simultaneously. Click any cell to open the forensics comparison lab."
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
              description="Generate comprehensive JSON data exports, shareable HTML summary reports, and color-coded chat logs for documentation."
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
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Getting started</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Three steps to actionable intelligence
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              From raw chat logs to forensic insights in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard
              number="1"
              title="Upload Chat Logs"
              description="Paste or upload .txt chat log files. The tool supports multi-day analysis with automatic day detection across multiple files."
            />
            <StepCard
              number="2"
              title="Automatic Analysis"
              description="The engine runs temporal, linguistic, behavioral, network, shared vocabulary, and social pattern analysis. Choose from 6 algorithm modes."
            />
            <StepCard
              number="3"
              title="Review Results"
              description="Browse player profiles, alt account matches with confidence scores, social insights, the similarity matrix, and deep-dive forensics comparisons."
            />
          </div>

          {/* Connector lines (desktop) */}
          <div className="hidden md:flex justify-center mt-8">
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              All processing happens locally in your browser
            </div>
          </div>
        </div>
      </section>

      {/* Supported Games */}
      <section id="games" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Platform support</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Supported games
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              The core analysis engine works with any timestamped chat format.
              Game-specific profiles add vocabulary and detection tuning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a href="/analyzer/wurm" className="bg-bg-secondary rounded-2xl border border-border p-8 text-center relative overflow-hidden hover:border-accent/50 hover:-translate-y-1 transition-all group">
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-success/15 rounded-full">
                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                <span className="text-success text-xs font-semibold">LIVE</span>
              </div>
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">Wurm Online</h3>
              <p className="text-text-secondary text-sm">
                Full support with 100+ game-specific abbreviations,
                terminology, and an optimized detection mode.
              </p>
            </a>

            <div className="bg-bg-secondary rounded-2xl border border-border/50 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-bg-primary/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <span className="px-4 py-2 bg-warning/15 border border-warning/30 text-warning text-sm font-semibold rounded-full">COMING SOON</span>
              </div>
              <div className="w-16 h-16 bg-bg-tertiary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Discord</h3>
              <p className="text-text-secondary text-sm">
                Analyze exported Discord server chat logs for the same forensic patterns.
              </p>
            </div>

            <a href="/analyzer/generic" className="bg-bg-secondary rounded-2xl border border-border p-8 text-center relative overflow-hidden hover:border-accent/50 hover:-translate-y-1 transition-all group">
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-success/15 rounded-full">
                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                <span className="text-success text-xs font-semibold">LIVE</span>
              </div>
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">Generic / Other</h3>
              <p className="text-text-secondary text-sm">
                Works with any timestamped chat format &mdash; no
                game-specific vocabulary required.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Science / methodology section */}
      <section className="py-24 bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Methodology</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Built on real science
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              The same forensic linguistics techniques used in academic
              authorship attribution, adapted for the gaming world.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <TechBadge label="Yule's K" description="Vocabulary richness" />
            <TechBadge label="Simpson's D" description="Diversity index" />
            <TechBadge label="Brunet's W" description="Vocabulary complexity" />
            <TechBadge label="N-gram Analysis" description="Character patterns" />
            <TechBadge label="Function Words" description="Unconscious markers" />
            <TechBadge label="Cosine Similarity" description="Vector comparison" />
            <TechBadge label="Handoff Detection" description="Session analysis" />
            <TechBadge label="Stylometry" description="Writing fingerprint" />
          </div>

          {/* Methodology explainer */}
          <div className="max-w-3xl mx-auto bg-bg-secondary rounded-2xl border border-border p-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">How does stylometry work?</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Every person has a unique &ldquo;writing fingerprint&rdquo; &mdash; patterns in how they use
              function words (the, a, but, so), punctuation, greeting styles, and even typos. These
              unconscious habits are extremely difficult to fake or change, making them reliable
              indicators for authorship analysis.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              Signal In Chat combines these linguistic markers with temporal analysis (when players
              are online) and behavioral patterns (how they interact) to build a comprehensive
              profile for each player, then compares all profiles to identify potential matches.
            </p>
            <div className="mt-6">
              <a href="/analyzer/docs" className="text-accent text-sm font-medium hover:underline inline-flex items-center gap-1">
                Read full technical documentation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy-first section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Privacy first</p>
                <h2 className="text-3xl font-bold text-text-primary mb-4">
                  Your data stays with you
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Signal In Chat runs entirely in your browser. No chat logs are uploaded, no data
                  is sent to any server, and no account is required. Close the tab and everything
                  is gone.
                </p>
                <ul className="space-y-3">
                  <PrivacyItem text="No server uploads &mdash; all analysis runs locally" />
                  <PrivacyItem text="No user accounts or tracking" />
                  <PrivacyItem text="No cookies or persistent storage of chat data" />
                  <PrivacyItem text="Open analysis &mdash; all methods are documented" />
                </ul>
              </div>
              <div className="bg-bg-secondary rounded-2xl border border-border p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary text-sm">Browser-only processing</h4>
                      <p className="text-text-muted text-sm mt-1">JavaScript runs entirely in your browser tab. No backend API calls.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary text-sm">Static website</h4>
                      <p className="text-text-muted text-sm mt-1">The entire application is a static site &mdash; no server-side code.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary text-sm">Exportable results</h4>
                      <p className="text-text-muted text-sm mt-1">Download reports as JSON, HTML, or TXT &mdash; you own the output.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-bg-secondary/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            Ready to find the signal?
          </h2>
          <p className="text-text-secondary text-lg mb-10 max-w-2xl mx-auto">
            Upload your chat logs and let the forensic analysis engine do the
            work. No account needed &mdash; runs entirely in your browser.
          </p>
          <a
            href="/analyzer"
            className="inline-block px-10 py-4 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all text-lg font-semibold shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:-translate-y-0.5"
          >
            Open Analyzer
          </a>
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
    <div className="bg-bg-secondary rounded-2xl border border-border p-6 hover:shadow-lg transition-all group">
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
      <div className="w-14 h-14 bg-accent/10 border-2 border-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
        <span className="text-xl font-bold text-accent">{number}</span>
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-3">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
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
    <div className="bg-bg-secondary rounded-xl p-4 text-center border border-border">
      <div className="font-semibold text-text-primary text-sm">{label}</div>
      <div className="text-text-muted text-xs mt-1">{description}</div>
    </div>
  );
}

function PrivacyItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-text-secondary text-sm" dangerouslySetInnerHTML={{ __html: text }} />
    </li>
  );
}
