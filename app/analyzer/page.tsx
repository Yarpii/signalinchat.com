"use client";

import { getAvailableProfiles } from "@/lib/gameProfiles";

const GAME_ICONS: Record<string, React.ReactNode> = {
  wurm: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
    />
  ),
  generic: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
    />
  ),
  rust: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
    />
  ),
  ark: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  ),
  wow: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  ),
  discord: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  ),
};

const COMING_SOON_COLORS: Record<string, { gradient: string; accent: string; glow: string }> = {
  discord: {
    gradient: "from-indigo-500/15 to-violet-500/10",
    accent: "text-indigo-400",
    glow: "bg-indigo-500",
  },
  rust: {
    gradient: "from-orange-500/15 to-red-500/10",
    accent: "text-orange-400",
    glow: "bg-orange-500",
  },
  ark: {
    gradient: "from-emerald-500/15 to-teal-500/10",
    accent: "text-emerald-400",
    glow: "bg-emerald-500",
  },
  wow: {
    gradient: "from-amber-500/15 to-yellow-500/10",
    accent: "text-amber-400",
    glow: "bg-amber-500",
  },
};

export default function GameSelectorPage() {
  const profiles = getAvailableProfiles();

  const liveProfiles = profiles.filter((p) => p.status === "live");
  const comingSoonProfiles = profiles.filter((p) => p.status === "coming_soon");

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 animate-fade-in-up">
          <a
            href="/"
            className="inline-flex items-center gap-1 text-text-muted hover:text-text-secondary transition-colors text-sm mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </a>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            Select Your Game
          </h1>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            Each game profile includes optimized vocabulary, detection tuning, and chat format support.
          </p>
        </div>

        {/* Live Games */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 mt-10">
          {liveProfiles.map((profile, i) => (
            <a
              key={profile.id}
              href={`/analyzer/${profile.id}`}
              className={`group relative bg-bg-secondary rounded-2xl border border-border p-8 hover:border-accent/50 hover-lift animate-fade-in-up`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-success/15 border border-success/30 rounded-full">
                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                <span className="text-success text-xs font-semibold">LIVE</span>
              </div>

              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <svg
                  className="w-7 h-7 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {GAME_ICONS[profile.id] || GAME_ICONS.generic}
                </svg>
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                {profile.name}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {profile.description}
              </p>

              <div className="flex items-center gap-2 text-accent text-sm font-medium">
                Open Analyzer
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Coming Soon */}
        {comingSoonProfiles.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-8 animate-fade-in-up delay-200">
              <div className="h-px flex-1 bg-border" />
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                  Coming Soon
                </h2>
              </div>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {comingSoonProfiles.map((profile, i) => {
                const colors = COMING_SOON_COLORS[profile.id] || {
                  gradient: "from-accent/15 to-accent/5",
                  accent: "text-accent",
                  glow: "bg-accent",
                };
                return (
                  <div
                    key={profile.id}
                    className={`group relative bg-bg-secondary rounded-2xl border border-border p-6 overflow-hidden transition-all duration-300 hover:border-border hover:shadow-lg animate-fade-in-up`}
                    style={{ animationDelay: `${300 + i * 80}ms` }}
                  >
                    {/* Subtle gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    {/* Top accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-0.5 ${colors.glow} opacity-30`} />

                    <div className="relative">
                      {/* Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 bg-bg-tertiary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg
                            className={`w-6 h-6 text-text-muted group-hover:${colors.accent} transition-colors duration-300`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            {GAME_ICONS[profile.id] || GAME_ICONS.generic}
                          </svg>
                        </div>
                        <span className="px-2.5 py-1 bg-bg-tertiary border border-border rounded-full text-text-muted text-[10px] font-semibold uppercase tracking-wider group-hover:border-warning/30 group-hover:text-warning group-hover:bg-warning/10 transition-all duration-300">
                          Soon
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-text-primary mb-1.5 group-hover:text-text-primary transition-colors">
                        {profile.name}
                      </h3>
                      <p className="text-text-muted text-xs leading-relaxed mb-4">
                        {profile.description}
                      </p>

                      {/* Feature hints */}
                      <div className="flex flex-wrap gap-1.5">
                        {["Stylometry", "Temporal", "Network"].map((feature) => (
                          <span
                            key={feature}
                            className="px-2 py-0.5 bg-bg-tertiary rounded text-[10px] text-text-muted font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Notify / request section */}
            <div className="mt-8 bg-bg-secondary rounded-2xl border border-border p-6 animate-fade-in-up delay-600">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-text-primary text-sm mb-1">Want a specific game supported?</h4>
                  <p className="text-text-secondary text-sm">
                    The core forensic engine works with any timestamped chat. Game profiles add
                    vocabulary filtering and tuning. Use the <a href="/analyzer/generic" className="text-accent hover:underline font-medium">Generic analyzer</a> in the meantime.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Info box */}
        <div className="mt-8 bg-bg-secondary border border-border rounded-xl p-6 animate-fade-in-up delay-400">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary text-sm mb-1">Works with any chat format</h4>
              <p className="text-text-secondary text-sm">
                The core forensic analysis engine works with any timestamped chat format.
                Game-specific profiles add optimized vocabulary filtering, detection tuning,
                and trade pattern recognition.
              </p>
              <p className="text-text-muted text-xs mt-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                100% client-side. Your chat logs never leave your browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
