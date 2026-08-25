export type SearchBuilder = (query: string) => string;

export type StartItem = {
	id: string;
	label: string;
	href: string;
	description: string;
	monogram: string;
	search?: SearchBuilder;
};

export type StartCategory = {
	id: string;
	label: string;
	icon: "search" | "daily" | "code" | "social" | "media" | "me";
	itemHeight: number;
	items: StartItem[];
};

const q = (base: string): SearchBuilder => (query) =>
	`${base}${encodeURIComponent(query)}`;

export const START_CATEGORIES: StartCategory[] = [
	{
		id: "search",
		label: "search",
		icon: "search",
		itemHeight: 184,
		items: [
			{
				id: "google",
				label: "Google",
				href: "https://www.google.com",
				description: "web search",
				monogram: "G",
				search: q("https://www.google.com/search?q="),
			},
			{
				id: "perplexity",
				label: "Perplexity",
				href: "https://www.perplexity.ai",
				description: "ask the web",
				monogram: "P",
				search: q("https://www.perplexity.ai/search?q="),
			},
			{
				id: "chatgpt",
				label: "ChatGPT",
				href: "https://chatgpt.com",
				description: "openai chat",
				monogram: "C",
				search: q("https://chatgpt.com/?q="),
			},
			{
				id: "claude",
				label: "Claude",
				href: "https://claude.ai",
				description: "anthropic chat",
				monogram: "Cl",
				search: q("https://claude.ai/new?q="),
			},
			{
				id: "grok",
				label: "Grok",
				href: "https://grok.com",
				description: "xAI chat",
				monogram: "X",
				search: q("https://grok.com/?q="),
			},
			{
				id: "wikipedia",
				label: "Wikipedia",
				href: "https://en.wikipedia.org",
				description: "the free encyclopedia",
				monogram: "W",
				search: q("https://en.wikipedia.org/wiki/Special:Search?search="),
			},
		],
	},
	{
		id: "daily",
		label: "daily",
		icon: "daily",
		itemHeight: 184,
		items: [
			{
				id: "gmail",
				label: "Gmail",
				href: "https://mail.google.com",
				description: "inbox",
				monogram: "M",
				search: q("https://mail.google.com/mail/u/0/#search/"),
			},
			{
				id: "calendar",
				label: "Calendar",
				href: "https://calendar.google.com",
				description: "today and upcoming",
				monogram: "Cal",
			},
			{
				id: "drive",
				label: "Drive",
				href: "https://drive.google.com",
				description: "files",
				monogram: "Dr",
				search: q("https://drive.google.com/drive/search?q="),
			},
			{
				id: "notion",
				label: "Notion",
				href: "https://www.notion.so",
				description: "notes and docs",
				monogram: "No",
			},
			{
				id: "todoist",
				label: "Todoist",
				href: "https://app.todoist.com",
				description: "tasks",
				monogram: "Td",
			},
		],
	},
	{
		id: "code",
		label: "code",
		icon: "code",
		itemHeight: 184,
		items: [
			{
				id: "github",
				label: "GitHub",
				href: "https://github.com",
				description: "repositories",
				monogram: "gh",
				search: q("https://github.com/search?q="),
			},
			{
				id: "vercel",
				label: "Vercel",
				href: "https://vercel.com/dashboard",
				description: "projects and deploys",
				monogram: "▲",
			},
			{
				id: "cursor",
				label: "Cursor",
				href: "https://cursor.com",
				description: "editor and agents",
				monogram: "Cu",
			},
			{
				id: "linear",
				label: "Linear",
				href: "https://linear.app",
				description: "issues",
				monogram: "Li",
			},
			{
				id: "npm",
				label: "npm",
				href: "https://www.npmjs.com",
				description: "packages",
				monogram: "npm",
				search: q("https://www.npmjs.com/search?q="),
			},
		],
	},
	{
		id: "social",
		label: "social",
		icon: "social",
		itemHeight: 184,
		items: [
			{
				id: "x",
				label: "X",
				href: "https://x.com",
				description: "timeline",
				monogram: "X",
				search: q("https://x.com/search?q="),
			},
			{
				id: "linkedin",
				label: "LinkedIn",
				href: "https://www.linkedin.com",
				description: "network",
				monogram: "in",
			},
			{
				id: "youtube",
				label: "YouTube",
				href: "https://www.youtube.com",
				description: "watch",
				monogram: "YT",
				search: q("https://www.youtube.com/results?search_query="),
			},
			{
				id: "reddit",
				label: "Reddit",
				href: "https://www.reddit.com",
				description: "feeds",
				monogram: "R",
				search: q("https://www.reddit.com/search/?q="),
			},
			{
				id: "discord",
				label: "Discord",
				href: "https://discord.com/channels/@me",
				description: "messages",
				monogram: "Ds",
			},
		],
	},
	{
		id: "media",
		label: "media",
		icon: "media",
		itemHeight: 184,
		items: [
			{
				id: "spotify",
				label: "Spotify",
				href: "https://open.spotify.com",
				description: "music",
				monogram: "Sp",
				search: q("https://open.spotify.com/search/"),
			},
			{
				id: "youtube-music",
				label: "YouTube",
				href: "https://www.youtube.com",
				description: "videos",
				monogram: "YT",
				search: q("https://www.youtube.com/results?search_query="),
			},
			{
				id: "netflix",
				label: "Netflix",
				href: "https://www.netflix.com",
				description: "films and series",
				monogram: "N",
			},
			{
				id: "twitch",
				label: "Twitch",
				href: "https://www.twitch.tv",
				description: "live",
				monogram: "Tw",
				search: q("https://www.twitch.tv/search?term="),
			},
		],
	},
	{
		id: "me",
		label: "me",
		icon: "me",
		itemHeight: 184,
		items: [
			{
				id: "site",
				label: "pranavkarthik.com",
				href: "https://pranavkarthik.com",
				description: "personal site",
				monogram: "PK",
			},
			{
				id: "writing",
				label: "writing",
				href: "https://pranavkarthik.com/blog",
				description: "notes and essays",
				monogram: "Wr",
			},
			{
				id: "projects",
				label: "projects",
				href: "https://pranavkarthik.com/projects",
				description: "selected work",
				monogram: "Pr",
			},
			{
				id: "github-me",
				label: "GitHub",
				href: "https://github.com/pranavkarthik10",
				description: "pranavkarthik10",
				monogram: "gh",
			},
			{
				id: "email",
				label: "email",
				href: "mailto:hi@pranavkarthik.com",
				description: "hi@pranavkarthik.com",
				monogram: "@",
			},
		],
	},
];

export function findStartItem(categoryId: string, itemId: string) {
	const category = START_CATEGORIES.find((entry) => entry.id === categoryId);
	return category?.items.find((item) => item.id === itemId);
}
