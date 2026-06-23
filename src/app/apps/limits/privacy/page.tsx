import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Limits Privacy Policy | Pranav Karthik",
	description:
		"Privacy policy for Limits, the iOS app for viewing your AI coding rate limits. No personal data is collected and nothing leaves your device except your own sign-in traffic.",
	robots: { index: false, follow: false },
};

export default function LimitsPrivacyPage() {
	return (
		<main className="page-frame">
			<header className="mb-10">
				<p className="page-kicker">Privacy</p>
				<h1 className="page-title">Limits privacy policy.</h1>
				<p className="page-description">
					Limits is built to be private by default. No personal data is
					collected by the developer, and nothing leaves your device except your
					own direct sign-in traffic to the providers you choose to connect.
				</p>
			</header>

			<div className="article-prose">
				<p>Effective date: June 2026.</p>

				<h2>The short version</h2>
				<p>
					Limits has no backend, no account of its own, and no analytics or
					tracking. It does not send your information to me or to anyone else. It
					reads your AI coding usage from the providers you connect and shows it
					to you on your iPhone.
				</p>

				<h2>Information the developer collects</h2>
				<p>
					None. I do not collect, receive, store, or have access to any of your
					personal data, sign-in credentials, or usage figures. There is no
					server operated by me that the app talks to.
				</p>

				<h2>Sign-in and tokens</h2>
				<p>
					When you connect a provider, you sign in through OAuth, a flow you
					start yourself that authenticates you directly with that provider. The
					resulting access tokens are stored on your device in the iOS Keychain.
					They stay on your device and are used only to read your usage from the
					provider.
				</p>

				<h2>Usage snapshots on your device</h2>
				<p>
					So the Home Screen and Lock Screen widgets can show your limits, the
					app caches your most recent usage snapshots on your device in a shared
					App Group container. This data stays on your device and is not
					transmitted to me.
				</p>

				<h2>Traffic to providers</h2>
				<p>
					The only network traffic Limits makes on your behalf goes directly
					from your device to the providers you connect (Codex from ChatGPT,
					Claude Code, and Cursor), in order to sign in and read your usage. That
					traffic is governed by each provider&apos;s own terms and privacy
					policy. Limits does not route this traffic through any service of mine.
				</p>

				<h2>No tracking, no ads, no purchases</h2>
				<p>
					Limits contains no advertising, no third-party analytics, and no
					tracking technologies. It is a free app with no in-app purchases.
				</p>

				<h2>Children&apos;s privacy</h2>
				<p>
					Limits is a developer utility and is not directed at children. Because
					the app collects no personal data, it does not knowingly collect
					information from anyone, including children.
				</p>

				<h2>Not affiliated</h2>
				<p>
					Limits is an independent app and is not affiliated with, endorsed by,
					or sponsored by Anthropic, OpenAI, or Anysphere. Provider names such as
					Codex, ChatGPT, Claude Code, and Cursor are used only to identify the
					services you choose to connect.
				</p>

				<h2>Changes to this policy</h2>
				<p>
					If this policy changes, the updated version will be posted on this
					page with a new effective date.
				</p>

				<h2>Contact</h2>
				<p>
					Questions about privacy? Email{" "}
					<a href="mailto:hi@pranavkarthik.com">
						hi@pranavkarthik.com
					</a>
					.
				</p>
			</div>

			<div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border/70 pt-6 text-sm text-muted-foreground">
				<Link href="/apps/limits" className="nav-link">
					Limits home
				</Link>
				<Link href="/apps/limits/support" className="nav-link">
					Support
				</Link>
			</div>
		</main>
	);
}
