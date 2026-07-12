"use client";

import {
	BriefcaseBusiness,
	FolderGit2,
	Home,
	Layers,
	Lightbulb,
	ChartNoAxesCombined,
	Linkedin,
	Mail,
	Moon,
	PenLine,
	Search,
	Sun,
	Twitter,
} from "lucide-react";
import { GitHubLogo } from "@/components/github-logo";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

type CommandAction = {
	key: string;
	title: string;
	hint: string;
	shortcut: string;
	icon: ReactNode;
	href: string;
	external?: boolean;
	section: "Navigation" | "Links";
};

const actions: CommandAction[] = [
	{
		key: "home",
		title: "Go to Home",
		hint: "About me and what I'm up to",
		shortcut: "H",
		icon: <Home />,
		href: "/",
		section: "Navigation",
	},
	{
		key: "projects",
		title: "Go to Projects",
		hint: "Selected work and side projects",
		shortcut: "P",
		icon: <FolderGit2 />,
		href: "/projects",
		section: "Navigation",
	},
	{
		key: "writing",
		title: "Go to Writing",
		hint: "Notes and essays",
		shortcut: "W",
		icon: <PenLine />,
		href: "/blog",
		section: "Navigation",
	},
	{
		key: "press",
		title: "Go to Press",
		hint: "Mentions and coverage",
		shortcut: "R",
		icon: <BriefcaseBusiness />,
		href: "/press",
		section: "Navigation",
	},
	{
		key: "stack",
		title: "Go to Stack",
		hint: "Tools I use",
		shortcut: "S",
		icon: <Layers />,
		href: "/stack",
		section: "Navigation",
	},
	{
		key: "stats",
		title: "Go to AI Stats",
		hint: "Public aggregate AI usage",
		shortcut: "A",
		icon: <ChartNoAxesCombined />,
		href: "/stats",
		section: "Navigation",
	},
	{
		key: "x",
		title: "X Profile",
		hint: "@pranavkarthik__",
		shortcut: "X",
		icon: <Twitter />,
		href: "https://x.com/pranavkarthik__",
		external: true,
		section: "Links",
	},
	{
		key: "linkedin",
		title: "LinkedIn Profile",
		hint: "Pranav Karthik",
		shortcut: "L",
		icon: <Linkedin />,
		href: "https://linkedin.com/in/pranav-karthik",
		external: true,
		section: "Links",
	},
	{
		key: "github",
		title: "GitHub Profile",
		hint: "pranavkarthik10",
		shortcut: "G",
		icon: <GitHubLogo />,
		href: "https://github.com/pranavkarthik10",
		external: true,
		section: "Links",
	},
	{
		key: "email",
		title: "Email",
		hint: "hi@pranavkarthik.com",
		shortcut: "E",
		icon: <Mail />,
		href: "mailto:hi@pranavkarthik.com",
		section: "Links",
	},
];

function go(action: CommandAction) {
	if (action.external || action.href.startsWith("mailto:")) {
		window.open(action.href, action.href.startsWith("mailto:") ? "_self" : "_blank", "noopener,noreferrer");
		return;
	}

	window.location.href = action.href;
}

export default function CommandMenu() {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [light, setLight] = useState(false);

	const filtered = useMemo(() => {
		const normalized = query.trim().toLowerCase();
		if (!normalized) return actions;
		return actions.filter((action) =>
			`${action.title} ${action.hint} ${action.section}`
				.toLowerCase()
				.includes(normalized),
		);
	}, [query]);

	useEffect(() => {
		setLight(window.localStorage.getItem("light-preview") === "true");
	}, []);

	useEffect(() => {
		document.documentElement.classList.toggle("light-preview", light);
		window.localStorage.setItem("light-preview", String(light));
	}, [light]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const key = event.key.toLowerCase();
			if ((event.metaKey || event.ctrlKey) && key === "k") {
				event.preventDefault();
				setOpen((value) => !value);
				return;
			}
			if (event.key === "Escape") {
				setOpen(false);
				return;
			}
			if (!open) return;
			if (event.key === "Enter" && filtered[0]) {
				event.preventDefault();
				go(filtered[0]);
				return;
			}
			const action = actions.find((item) => item.shortcut.toLowerCase() === key);
			if (action) {
				event.preventDefault();
				go(action);
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [filtered, open]);

	const groups = {
		Navigation: filtered.filter((action) => action.section === "Navigation"),
		Links: filtered.filter((action) => action.section === "Links"),
	};

	return (
		<>
			<div className="nav-controls" aria-label="Site controls">
				<button
					className={`icon-control${light ? " is-lit" : ""}`}
					type="button"
					onClick={() => setLight((value) => !value)}
					aria-label="Toggle light preview"
					aria-pressed={light}
				>
					<span className="theme-icon-stack" aria-hidden="true">
						<Sun className="theme-icon theme-icon-sun" />
						<Moon className="theme-icon theme-icon-moon" />
					</span>
				</button>
				<button className="command-trigger" type="button" onClick={() => setOpen(true)} aria-label="Open command menu">
					<span>⌘</span>
					<kbd>K</kbd>
				</button>
			</div>

			{open && (
				<div className="command-overlay" role="presentation" onMouseDown={() => setOpen(false)}>
					<div
						className="command-dialog"
						role="dialog"
						aria-modal="true"
						aria-label="Command menu"
						onMouseDown={(event) => event.stopPropagation()}
					>
						<div className="command-feature">
							<div className="command-feature-icon">
								<Home />
							</div>
							<div>
								<p className="command-feature-title">Home</p>
								<p className="command-feature-subtitle">About me and what I&apos;m up to</p>
							</div>
						</div>

						<label className="command-search">
							<Search />
							<input
								autoFocus
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Search for actions..."
							/>
						</label>

						<div className="command-list">
							{(["Navigation", "Links"] as const).map((section) =>
								groups[section].length > 0 ? (
									<div key={section} className="command-section">
										<p className="command-section-title">{section}</p>
										{groups[section].map((action) => (
											<button
												key={action.key}
												type="button"
												className="command-item"
												onClick={() => go(action)}
											>
												<span className="command-item-icon">{action.icon}</span>
												<span>
													<span className="command-item-title">{action.title}</span>
													<span className="command-item-hint">{action.hint}</span>
												</span>
												<kbd>{action.shortcut}</kbd>
											</button>
										))}
									</div>
								) : null,
							)}
						</div>

						<div className="command-footer">
							<span>
								<Lightbulb /> Type
							</span>
							<kbd>↵</kbd>
							<span>to select</span>
							<span className="ml-auto">Press</span>
							<kbd>esc</kbd>
							<span>to close</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
