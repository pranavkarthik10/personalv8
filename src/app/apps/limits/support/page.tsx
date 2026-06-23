import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Limits Support | Pranav Karthik",
	description:
		"Get help with Limits, the iOS app for viewing your AI coding rate limits. Frequently asked questions and contact details.",
	robots: { index: false, follow: false },
};

export default function LimitsSupportPage() {
	return (
		<main className="page-frame">
			<header className="mb-10">
				<p className="page-kicker">Support</p>
				<h1 className="page-title">Limits support.</h1>
				<p className="page-description">
					Questions, bug reports, and feedback are all welcome. The fastest way
					to reach me is by email.
				</p>
			</header>

			<div className="rounded-xl border border-border bg-card/70 p-6">
				<h2 className="text-base font-semibold tracking-[-0.02em] text-foreground">
					Contact
				</h2>
				<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
					Email{" "}
					<a
						href="mailto:hi@pranavkarthik.com"
						className="text-foreground underline decoration-foreground/30 underline-offset-[0.22em] transition hover:decoration-foreground/60"
					>
						hi@pranavkarthik.com
					</a>{" "}
					and I will get back to you. Including your iOS version and which
					provider you were connecting helps me help you faster.
				</p>
			</div>

			<div className="article-prose mt-12">
				<h2>Frequently asked questions</h2>

				<h3>How do I connect a provider?</h3>
				<p>
					Open Limits, choose the provider you want to add (Codex, Claude Code,
					or Cursor), and sign in with your own account for that service. The
					sign-in uses OAuth, so you authenticate directly with the provider.
					Once connected, Limits reads your usage and shows your session and
					weekly figures.
				</p>

				<h3>A provider says my session expired. What do I do?</h3>
				<p>
					Sessions can expire over time on the provider side. When that happens,
					open Limits and sign in to that provider again. Your other connected
					providers are not affected, and the widgets will pick up fresh numbers
					on the next refresh.
				</p>

				<h3>Why is the background refresh timing approximate?</h3>
				<p>
					iOS decides when apps are allowed to run in the background, so Limits
					cannot guarantee an exact refresh schedule. The app updates when the
					system permits, and the live countdowns continue ticking between those
					updates. You can always open the app to force a fresh reading right
					away.
				</p>

				<h3>What about my privacy?</h3>
				<p>
					Sign-in tokens are stored on your device in the iOS Keychain, and
					usage snapshots are cached on-device so the widgets can read them.
					Nothing is sent to my servers, there is no account for Limits itself,
					and there is no analytics or tracking. For the full details, see the{" "}
					<Link href="/apps/limits/privacy">privacy policy</Link>.
				</p>
			</div>

			<div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border/70 pt-6 text-sm text-muted-foreground">
				<Link href="/apps/limits" className="nav-link">
					Limits home
				</Link>
				<Link href="/apps/limits/privacy" className="nav-link">
					Privacy
				</Link>
			</div>
		</main>
	);
}
