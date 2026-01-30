import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "./ThemeToggle";

export const metadata: Metadata = {
  title: "Signal In Chat - Forensic Chat Analysis Platform",
  description:
    "Detect alt accounts, analyze player behavior, and uncover hidden patterns in game chat logs using forensic linguistics and stylometry.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}`,
          }}
        />
      </head>
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
          <a href="/" className="flex items-center gap-2.5">
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
            <span className="text-base font-bold text-text-primary tracking-tight">
              Signal In Chat
            </span>
          </a>

          <div className="hidden sm:flex items-center gap-1">
            <a
              href="/#features"
              className="px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors text-sm"
            >
              Features
            </a>
            <a
              href="/#how-it-works"
              className="px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors text-sm"
            >
              How It Works
            </a>
            <a
              href="/analyzer/docs"
              className="px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors text-sm"
            >
              Docs
            </a>
            <div className="w-px h-5 bg-border mx-2" />
            <ThemeToggle />
            <a
              href="/analyzer"
              className="ml-1 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors text-sm font-medium"
            >
              Open Analyzer
            </a>
          </div>

          <div className="sm:hidden flex items-center gap-2">
            <ThemeToggle />
            <a
              href="/analyzer"
              className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium"
            >
              Analyzer
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
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
              <span className="text-base font-bold text-text-primary tracking-tight">
                Signal In Chat
              </span>
            </div>
            <p className="text-text-secondary text-sm max-w-sm leading-relaxed">
              Forensic chat analysis platform for online communities. Detect alt accounts and
              uncover behavioral patterns using proven stylometry techniques.
            </p>
            <p className="text-text-muted text-xs mt-4 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              100% client-side &mdash; your data never leaves your browser
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary text-sm mb-4">Product</h3>
            <ul className="space-y-2.5 text-sm text-text-secondary">
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
              <li>
                <a href="/#how-it-works" className="hover:text-text-primary transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary text-sm mb-4">
              Supported Games
            </h3>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <a href="/analyzer/wurm" className="hover:text-text-primary transition-colors">Wurm Online</a>
              </li>
              <li>
                <a href="/analyzer/generic" className="hover:text-text-primary transition-colors">Generic / Other</a>
              </li>
              <li className="text-text-muted text-xs pt-1">More games coming soon</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-xs text-text-muted">
          &copy; {new Date().getFullYear()} Signal In Chat. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
