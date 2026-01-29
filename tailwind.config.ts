import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-tertiary": "var(--bg-tertiary)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        border: "var(--border)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        error: "var(--error)",
        warning: "var(--warning)",
        success: "var(--success)",
        info: "var(--info)",
      },
    },
  },
  plugins: [],
};

export default config;
