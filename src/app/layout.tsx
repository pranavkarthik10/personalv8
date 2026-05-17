import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import RESUME from "@/data/resume";
import Link from "next/link";
import AnimatedSignature from "@/components/animated-signature";
import FooterTime from "@/components/footer-time";

const geist = Geist({
	variable: "--font-geist",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: `${RESUME.name}`,
	description: `${RESUME.bio.intro}`,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				suppressHydrationWarning
				className={`${geist.variable} ${geistMono.variable} antialiased`}
			>
				<Script
					defer
					src="https://cloud.umami.is/script.js"
					data-website-id="49a2368b-f573-4184-9dbe-26af0c1b2fdd"
				/>
				<div className="site-shell min-h-screen">
					<header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
						<Link href="/" className="text-sm text-foreground/90 transition hover:text-foreground">
							pranav karthik
						</Link>
						<nav className="flex items-center gap-4 text-xs text-muted-foreground sm:gap-5">
							<Link href="/projects" className="nav-link">
								projects
							</Link>
							<Link href="/blog" className="nav-link">
								writing
							</Link>
							<Link href="/press" className="nav-link">
								press
							</Link>
							<Link href="/stack" className="nav-link">
								stack
							</Link>
						</nav>
					</header>
					<div className="mx-auto w-full max-w-5xl px-5 pb-10 sm:px-8">
						{children}
					</div>
					<footer className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-5 pb-10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-end sm:justify-between sm:px-8">
						<div>
							<AnimatedSignature />
						</div>
						<div className="flex flex-col gap-4 sm:items-end">
							<FooterTime />
						</div>
					</footer>
				</div>
				<Analytics />
			</body>
		</html>
	);
}
