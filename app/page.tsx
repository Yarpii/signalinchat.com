"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Intersection Observer hook for scroll animations
// ---------------------------------------------------------------------------
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ---------------------------------------------------------------------------
// Animated counter hook
// ---------------------------------------------------------------------------
function useAnimatedCounter(target: number, duration = 1200, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function HomePage() {
  const hero = useInView(0.1);
  const metrics = useInView(0.2);
  const features = useInView(0.1);
  const howItWorks = useInView(0.1);
  const games = useInView(0.1);
  const science = useInView(0.1);
  const privacy = useInView(0.1);
  const faq = useInView(0.1);
  const cta = useInView(0.1);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div
          ref={hero.ref}
          className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 ${hero.inView ? "animate-fade-in-up" : "opacity-0"}`}
        >
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
              <span className="gradient-text-animated">
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
                className="px-8 py-3.5 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all text-base font-semibold shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:-translate-y-0.5 animate-pulse-glow"
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
          <div className="mt-16 max-w-5xl mx-auto animate-scale-in delay-300">
            <div className="bg-bg-secondary rounded-2xl border border-border p-6 shadow-xl hover-lift">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-error/40" />
                <div className="w-3 h-3 rounded-full bg-warning/40" />
                <div className="w-3 h-3 rounded-full bg-success/40" />
                <span className="ml-3 text-text-muted text-sm font-mono">
                  signal-in-chat / analyzer
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <HeroStatCard value={1247} label="Messages Analyzed" started={hero.inView} />
                <HeroStatCard value={23} label="Players Detected" started={hero.inView} />
                <HeroStatCard value={3} label="Alt Account Matches" started={hero.inView} color="error" />
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
        <div
          ref={metrics.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ${metrics.inView ? "" : "opacity-0"}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedMetric value={6} label="Analysis Categories" started={metrics.inView} delay={0} />
            <AnimatedMetric value={6} label="Algorithm Modes" started={metrics.inView} delay={100} />
            <AnimatedMetric value={100} label="Client-Side" suffix="%" started={metrics.inView} delay={200} />
            <AnimatedMetric value={0} label="Data Sent to Server" started={metrics.inView} delay={300} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div
          ref={features.ref}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className={`text-center mb-16 ${features.inView ? "animate-fade-in-up" : "opacity-0"}`}>
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
            {[
              { color: "error", title: "Temporal Analysis", description: "Detect accounts that are never online together and find handoff patterns where one player stops and another starts within minutes.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />, delay: 0 },
              { color: "warning", title: "Stylometry Engine", description: "Function word analysis, character n-grams, and vocabulary complexity metrics (Yule's K, Simpson's D, Brunet's W) to fingerprint writing style.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />, delay: 100 },
              { color: "accent", title: "Behavioral Profiling", description: "Greeting and farewell style, typo patterns, micro-typing habits, emoticon preferences, and shared unique vocabulary detection.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />, delay: 200 },
              { color: "success", title: "Social Network Analysis", description: "Map who talks to whom, detect self-talk between accounts, identify conflicts, and find one-way interaction patterns.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />, delay: 300 },
              { color: "info", title: "Similarity Matrix", description: "Interactive heatmap comparing all player pairs simultaneously. Click any cell to open the forensics comparison lab.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />, delay: 400 },
              { color: "warning", title: "Export & Reports", description: "Generate comprehensive JSON data exports, shareable HTML summary reports, and color-coded chat logs for documentation.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />, delay: 500 },
            ].map((card, i) => (
              <div
                key={i}
                className={`bg-bg-secondary rounded-2xl border border-border p-6 hover-lift group ${features.inView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${card.delay}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${card.color}/10`}>
                  <svg className={`w-6 h-6 text-${card.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {card.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{card.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-bg-secondary/50">
        <div
          ref={howItWorks.ref}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className={`text-center mb-16 ${howItWorks.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Getting started</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Three steps to actionable intelligence
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              From raw chat logs to forensic insights in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { number: "1", title: "Upload Chat Logs", description: "Drag & drop or upload .txt chat log files. The tool supports multi-day analysis with automatic day detection across multiple files.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /> },
              { number: "2", title: "Automatic Analysis", description: "The engine runs temporal, linguistic, behavioral, network, shared vocabulary, and social pattern analysis. Choose from 6 algorithm modes.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
              { number: "3", title: "Review Results", description: "Browse player profiles, alt account matches with confidence scores, social insights, the similarity matrix, and deep-dive forensics comparisons.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> },
            ].map((step, i) => (
              <div
                key={i}
                className={`text-center ${howItWorks.inView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="w-16 h-16 bg-accent/10 border-2 border-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-5 animate-float" style={{ animationDelay: `${i * 500}ms` }}>
                  <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {step.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Connector line */}
          <div className="hidden md:flex justify-center mt-10">
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
        <div
          ref={games.ref}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className={`text-center mb-16 ${games.inView ? "animate-fade-in-up" : "opacity-0"}`}>
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
            <a
              href="/analyzer/wurm"
              className={`bg-bg-secondary rounded-2xl border border-border p-8 text-center relative overflow-hidden hover:border-accent/50 hover-lift group ${games.inView ? "animate-fade-in-up" : "opacity-0"}`}
            >
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

            <div className={`bg-bg-secondary rounded-2xl border border-border/50 p-8 text-center relative overflow-hidden ${games.inView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
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

            <a
              href="/analyzer/generic"
              className={`bg-bg-secondary rounded-2xl border border-border p-8 text-center relative overflow-hidden hover:border-accent/50 hover-lift group ${games.inView ? "animate-fade-in-up delay-400" : "opacity-0"}`}
            >
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
        <div
          ref={science.ref}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className={`text-center mb-16 ${science.inView ? "animate-fade-in-up" : "opacity-0"}`}>
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
            {[
              { label: "Yule's K", description: "Vocabulary richness" },
              { label: "Simpson's D", description: "Diversity index" },
              { label: "Brunet's W", description: "Vocabulary complexity" },
              { label: "N-gram Analysis", description: "Character patterns" },
              { label: "Function Words", description: "Unconscious markers" },
              { label: "Cosine Similarity", description: "Vector comparison" },
              { label: "Handoff Detection", description: "Session analysis" },
              { label: "Stylometry", description: "Writing fingerprint" },
            ].map((badge, i) => (
              <div
                key={i}
                className={`bg-bg-secondary rounded-xl p-4 text-center border border-border hover-lift ${science.inView ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="font-semibold text-text-primary text-sm">{badge.label}</div>
                <div className="text-text-muted text-xs mt-1">{badge.description}</div>
              </div>
            ))}
          </div>

          {/* Methodology explainer */}
          <div className={`max-w-3xl mx-auto bg-bg-secondary rounded-2xl border border-border p-8 ${science.inView ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
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
        <div
          ref={privacy.ref}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className={`${privacy.inView ? "animate-slide-in-left" : "opacity-0"}`}>
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
                  {[
                    "No server uploads &mdash; all analysis runs locally",
                    "No user accounts or tracking",
                    "No cookies or persistent storage of chat data",
                    "Open analysis &mdash; all methods are documented",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-text-secondary text-sm" dangerouslySetInnerHTML={{ __html: text }} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`bg-bg-secondary rounded-2xl border border-border p-8 ${privacy.inView ? "animate-slide-in-right" : "opacity-0"}`}>
                <div className="space-y-4">
                  {[
                    { title: "Browser-only processing", desc: "JavaScript runs entirely in your browser tab. No backend API calls." },
                    { title: "Static website", desc: "The entire application is a static site \u2014 no server-side code." },
                    { title: "Exportable results", desc: "Download reports as JSON, HTML, or TXT \u2014 you own the output." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary text-sm">{item.title}</h4>
                        <p className="text-text-muted text-sm mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-bg-secondary/50">
        <div
          ref={faq.ref}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className={`text-center mb-16 ${faq.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How accurate is the alt detection?",
                a: "The analysis is probabilistic, not definitive proof. Accuracy depends on the amount of chat data available. With 30+ messages per player, the system provides strong indicators. Always use human judgment alongside the results.",
              },
              {
                q: "Is my chat data sent anywhere?",
                a: "No. Signal In Chat is a 100% client-side static website. All analysis runs in your browser using JavaScript. No data is uploaded, no API calls are made, and no cookies store your chat data. Close the tab and everything is gone.",
              },
              {
                q: "What chat format does it support?",
                a: "The standard format is [HH:MM:SS] <PlayerName> message. The generic parser works with most timestamped chat formats. Game-specific profiles (like Wurm Online) add optimized parsing for that game's log format.",
              },
              {
                q: "Can someone fool the detection by changing how they type?",
                a: "It's very difficult. Function word usage (the, a, but, and, etc.) is unconscious and nearly impossible to consistently change. The system analyzes multiple dimensions simultaneously \u2014 someone would need to alter their timing, vocabulary, punctuation, greeting style, and typo patterns all at once.",
              },
              {
                q: "What's the difference between the algorithm modes?",
                a: "Balanced (default) gives good accuracy. Strict reduces false positives but may miss some matches. Sensitive catches more but includes weaker signals. Temporal/Linguistic modes emphasize specific analysis categories. The Wurm mode is tuned for Wurm Online vocabulary.",
              },
              {
                q: "How many messages do I need for reliable results?",
                a: "At minimum, 10 messages per player for basic analysis. For reliable stylometry, 30+ messages gives much better results. Multi-day logs with 50+ messages per player provide the most comprehensive analysis.",
              },
            ].map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} inView={faq.inView} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div
          ref={cta.ref}
          className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${cta.inView ? "animate-fade-in-up" : "opacity-0"}`}
        >
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

function HeroStatCard({ value, label, started, color }: { value: number; label: string; started: boolean; color?: string }) {
  const animated = useAnimatedCounter(value, 1500, started);
  return (
    <div className="bg-bg-tertiary rounded-xl p-4 text-center stat-card">
      <div className={`text-3xl font-bold ${color ? `text-${color}` : "text-text-primary"}`}>
        {started ? animated.toLocaleString() : "0"}
      </div>
      <div className="text-text-muted text-sm mt-1">{label}</div>
    </div>
  );
}

function AnimatedMetric({ value, label, suffix, started, delay }: { value: number; label: string; suffix?: string; started: boolean; delay: number }) {
  const animated = useAnimatedCounter(value, 1000, started);
  return (
    <div
      className={`text-center stat-card ${started ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl font-bold text-text-primary">
        {started ? animated : "0"}{suffix || ""}
      </div>
      <div className="text-text-muted text-sm mt-1">{label}</div>
    </div>
  );
}

function FAQItem({ question, answer, inView, delay }: { question: string; answer: string; inView: boolean; delay: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`bg-bg-secondary rounded-xl border border-border overflow-hidden ${inView ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-bg-tertiary/50 transition-colors"
      >
        <span className="font-semibold text-text-primary text-sm">{question}</span>
        <svg
          className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pb-5 text-text-secondary text-sm leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}
