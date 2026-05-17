"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Sparkles } from "lucide-react";

const THEMES = ["light", "dark", "starry"] as const;
type ThemeName = typeof THEMES[number];

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const current = (theme || resolvedTheme || "light") as ThemeName;
  const idx = THEMES.indexOf(current);
  const next = THEMES[(idx + 1) % THEMES.length];

  const icon = current === "light" ? (
    <Sun className="h-4 w-4" />
  ) : current === "dark" ? (
    <Moon className="h-4 w-4" />
  ) : (
    <Sparkles className="h-4 w-4" />
  );

  const label = `Switch theme (${current} → ${next})`;

  return (
    <button
      aria-label={label}
      title={label}
      onClick={() => setTheme(next)}
      className="fixed right-4 top-4 z-50 inline-flex items-center justify-center rounded-full border bg-background/80 px-3 py-2 text-foreground shadow-sm backdrop-blur transition hover:bg-accent hover:text-accent-foreground"
    >
      {icon}
    </button>
  );
}


