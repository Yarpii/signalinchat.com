"use client";

import { getAvailableProfiles } from "@/lib/gameProfiles";

// Game icons as SVG paths
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

export default function GameSelectorPage() {
  const profiles = getAvailableProfiles();

  const liveProfiles = profiles.filter((p) => p.status === "live");
  const comingSoonProfiles = profiles.filter((p) => p.status === "coming_soon");

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Select Your Game
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Each game has its own optimized chat behavior analysis tool with
            game-specific vocabulary, detection tuning, and chat format support.
          </p>
        </div>

        {/* Live Games */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {liveProfiles.map((profile) => (
            <a
              key={profile.id}
              href={`/analyzer/${profile.id}`}
              className="group relative bg-bg-secondary rounded-2xl border border-border p-8 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all hover:-translate-y-1"
            >
              {/* Live badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-success/15 border border-success/30 rounded-full">
                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                <span className="text-success text-xs font-semibold">LIVE</span>
              </div>

              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <svg
                  className="w-8 h-8 text-accent"
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
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {profile.description}
              </p>

              <div className="flex items-center gap-2 text-accent text-sm font-medium">
                Launch Analyzer
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
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Coming Soon
              </h2>
              <p className="text-text-muted text-sm">
                More games are being added with specialized detection profiles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {comingSoonProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="relative bg-bg-secondary rounded-2xl border border-border/50 p-6 text-center overflow-hidden"
                >
                  {/* Coming soon overlay */}
                  <div className="absolute inset-0 bg-bg-primary/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
                    <span className="px-4 py-2 bg-warning/15 border border-warning/30 text-warning text-sm font-semibold rounded-full">
                      COMING SOON
                    </span>
                  </div>

                  <div className="w-12 h-12 bg-bg-tertiary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-text-muted"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {GAME_ICONS[profile.id] || GAME_ICONS.generic}
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">
                    {profile.name}
                  </h3>
                  <p className="text-text-muted text-xs">
                    {profile.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Info box */}
        <div className="mt-12 bg-accent/5 border border-accent/20 rounded-xl p-6 text-center">
          <p className="text-text-secondary text-sm">
            The core forensic analysis engine works with any timestamped chat
            format. Game-specific profiles add optimized vocabulary filtering,
            detection tuning, and trade pattern recognition.
          </p>
          <p className="text-text-muted text-xs mt-2">
            100% client-side. Your chat logs never leave your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
