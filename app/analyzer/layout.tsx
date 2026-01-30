import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Forensics Analyzer",
  description:
    "Upload chat logs and run forensic linguistics, stylometry, and behavioral analysis to detect alt accounts and suspicious similarities.",
  alternates: {
    canonical: "/analyzer",
  },
  openGraph: {
    type: "website",
    url: "/analyzer",
    title: "Chat Forensics Analyzer",
    description:
      "Upload chat logs and run forensic linguistics, stylometry, and behavioral analysis to detect alt accounts and suspicious similarities.",
    siteName: "Signal In Chat",
  },
  twitter: {
    card: "summary",
    title: "Chat Forensics Analyzer",
    description:
      "Upload chat logs and run forensic linguistics, stylometry, and behavioral analysis to detect alt accounts and suspicious similarities.",
  },
};

export default function AnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
