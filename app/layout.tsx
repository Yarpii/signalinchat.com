import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signal In Chat - Game Chat Intelligence Platform",
  description:
    "Detect alt accounts, analyze player behavior, and uncover hidden patterns in game chat logs using forensic linguistics and stylometry.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-text-primary">
              Signal In Chat
            </span>
          </a>

          <div className="hidden sm:flex items-center gap-6">
            <a
              href="/#features"
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              Features
            </a>
            <a
              href="/#how-it-works"
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              How It Works
            </a>
            <a
              href="/#games"
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              Supported Games
            </a>
            <a
              href="/analyzer"
              className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors text-sm font-medium"
            >
              Launch Analyzer
            </a>
          </div>

          {/* Mobile menu button */}
          <a
            href="/analyzer"
            className="sm:hidden px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium"
          >
            Analyzer
          </a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold text-text-primary">
                Signal In Chat
              </span>
            </div>
            <p className="text-text-secondary text-sm max-w-md">
              Game chat intelligence platform. Detect alt accounts, analyze
              player behavior, and uncover hidden patterns using forensic
              linguistics and stylometry.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <a href="/analyzer" className="hover:text-text-primary transition-colors">
                  Chat Analyzer
                </a>
              </li>
              <li>
                <a href="/analyzer/docs" className="hover:text-text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/#features" className="hover:text-text-primary transition-colors">
                  Features
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-4">
              Supported Games
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>Wurm Online</li>
              <li className="text-text-muted">More coming soon...</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Signal In Chat. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
