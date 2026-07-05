"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sparkles, Sun } from "lucide-react";

const THEMES = ["light", "dark", "starry"] as const;
type ThemeName = (typeof THEMES)[number];

export default function LifelineThemeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);
	if (!mounted) return null;

	const current = (theme || resolvedTheme || "dark") as ThemeName;
	const idx = THEMES.indexOf(current);
	const next = THEMES[(idx + 1) % THEMES.length];
	const Icon = current === "light" ? Sun : current === "dark" ? Moon : Sparkles;

	return (
		<button
			type="button"
			aria-label={`Switch theme (${current} → ${next})`}
			onClick={() => setTheme(next)}
			className="inline-flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 transition-colors hover:text-zinc-200"
		>
			<Icon className="h-[18px] w-[18px]" />
		</button>
	);
}
