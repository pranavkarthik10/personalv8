import type { Metadata } from "next";
import Link from "next/link";
import { Gauge, LayoutGrid, ShieldCheck, Plug } from "lucide-react";

export const metadata: Metadata = {
	title: "Limits | Pranav Karthik",
	description:
		"View your AI coding rate limits at a glance. Session usage, weekly quotas, and reset timers for Codex, Claude Code, and Cursor, on your iPhone.",
	robots: { index: false, follow: false },
};

const features = [
	{
		icon: Gauge,
		title: "Rate limits at a glance",
		description:
			"See session usage, weekly quotas, and reset timers in one place. Live countdowns keep ticking between refreshes.",
	},
	{
		icon: LayoutGrid,
		title: "Home and Lock Screen widgets",
		description:
			"Keep your remaining usage visible without opening the app. Glance, and get back to building.",
	},
	{
		icon: ShieldCheck,
		title: "Private and on-device",
		description:
			"Tokens stay in the iOS Keychain. Nothing is sent to a server of mine. No account, no analytics, no tracking.",
	},
	{
		icon: Plug,
		title: "Connect your providers",
		description:
			"Sign in to Codex (ChatGPT), Claude Code, and Cursor with your own accounts to read your usage.",
	},
];

export default function LimitsPage() {
	return (
		<main className="page-frame">
			<section>
				<p className="page-kicker">iOS App</p>
				<h1 className="page-title">Limits.</h1>
				<p className="page-description">
					View your AI coding rate limits at a glance. Session usage, weekly
					quotas, and reset timers for Codex, Claude Code, and Cursor, right on
					your iPhone.
				</p>

				{/* App Store badge placeholder. The listing is not live yet, so no link is shown. */}
				<div className="mt-8 flex flex-wrap items-center gap-3">
					<span className="inline-flex items-center rounded-full border border-border bg-card/70 px-4 py-2 font-mono text-xs text-muted-foreground">
						Coming soon to the App Store
					</span>
				</div>
			</section>

			<section className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
				{features.map((feature) => {
					const Icon = feature.icon;
					return (
						<div
							key={feature.title}
							className="rounded-xl border border-border bg-card/70 p-5"
						>
							<div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-foreground">
								<Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
							</div>
							<h2 className="mt-4 text-base font-semibold tracking-[-0.02em] text-foreground">
								{feature.title}
							</h2>
							<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
								{feature.description}
							</p>
						</div>
					);
				})}
			</section>

			<section className="mt-14 rounded-xl border border-border bg-card/70 p-6">
				<h2 className="text-base font-semibold tracking-[-0.02em] text-foreground">
					How it works
				</h2>
				<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
					Limits signs in to your provider accounts using OAuth and reads the
					same usage figures those services already track for you. Snapshots are
					cached on your device so the widgets can show them, and the app is
					independent and not affiliated with any of the providers it connects
					to. It is free, with no in-app purchases and no ads.
				</p>
			</section>

			<div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border/70 pt-6 text-sm text-muted-foreground">
				<Link href="/apps/limits/support" className="nav-link">
					Support
				</Link>
				<Link href="/apps/limits/privacy" className="nav-link">
					Privacy
				</Link>
				<a href="mailto:hi@pranavkarthik.com" className="nav-link">
					Contact
				</a>
			</div>
		</main>
	);
}
