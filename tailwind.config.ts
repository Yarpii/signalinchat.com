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
        "bg-elevated": "var(--bg-elevated)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        border: "var(--border)",
        "border-subtle": "var(--border-subtle)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-subtle": "var(--accent-subtle)",
        error: "var(--error)",
        warning: "var(--warning)",
        success: "var(--success)",
        info: "var(--info)",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      boxShadow: {
        "glow-sm": "0 0 20px 4px var(--accent-glow)",
        "glow-md": "0 0 40px 10px var(--accent-glow)",
        "glow-lg": "0 0 60px 20px var(--accent-glow)",
        "elevated": "0 1px 2px hsl(var(--shadow-color) / 0.04), 0 4px 12px hsl(var(--shadow-color) / 0.06)",
        "elevated-lg": "0 4px 12px hsl(var(--shadow-color) / 0.06), 0 16px 40px hsl(var(--shadow-color) / 0.1)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fadeIn 0.5s ease-out both",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-left": "slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-right": "slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        "gradient-shift": "gradient-shift 4s ease infinite",
        "shimmer": "shimmer 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
