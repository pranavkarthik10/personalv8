import type { Metadata } from "next";
import Link from "next/link";
import { X } from "lucide-react";
import Lifeline from "@/components/lifeline";
import LifelineThemeToggle from "@/components/lifeline-theme-toggle";
import RESUME from "@/data/resume";

export const metadata: Metadata = {
	title: `Timeline | ${RESUME.name}`,
	description: "A horizontal walk through the years of my life.",
};

export default function TimelinePage() {
	return (
		<div className="fixed inset-0 z-50 flex flex-col bg-background text-foreground">
			{/* Top bar */}
			<header className="flex items-center justify-end px-6 py-5 sm:px-8">
				<Link
					href="/"
					aria-label="Close timeline"
					className="inline-flex h-7 w-7 items-center justify-center text-zinc-500 transition-colors hover:text-zinc-200"
				>
					<X className="h-5 w-5" />
				</Link>
			</header>

			{/* Timeline */}
			<main className="relative min-h-0 flex-1">
				<Lifeline />
			</main>

			{/* Bottom bar */}
			<footer className="flex items-center justify-between px-6 py-5 sm:px-8">
				<LifelineThemeToggle />
				<span className="font-mono text-xs text-zinc-600">© {new Date().getFullYear()}</span>
			</footer>
		</div>
	);
}
