import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import RESUME from "@/data/resume";
import AnimatedSignature from "@/components/animated-signature";
import FooterTime from "@/components/footer-time";
import CommandMenu from "@/components/command-menu";
import Link from "next/link";

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
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `try{if(localStorage.getItem("light-preview")==="true"){document.documentElement.classList.add("light-preview")}}catch(e){}`,
					}}
				/>
			</head>
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
					<header className="site-container flex flex-col items-start gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
						<Link href="/" className="text-sm text-foreground/90 transition hover:text-foreground">
							home
						</Link>
						<nav className="flex w-full items-center gap-4 overflow-x-auto text-xs text-muted-foreground sm:w-auto sm:gap-5 sm:overflow-visible">
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
							<Link href="/stats" className="nav-link">
								stats
							</Link>
							<CommandMenu />
						</nav>
					</header>
					<div className="site-container pb-10">
						{children}
					</div>
					<footer className="site-container mt-8 flex flex-col gap-4 border-t border-border/70 pb-10 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-end sm:justify-between">
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
