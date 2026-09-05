export type SearchBuilder = (query: string) => string;

export type StartItem = {
	id: string;
	label: string;
	href: string;
	description: string;
	brand: string;
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
				brand: "google",
				search: q("https://www.google.com/search?q="),
			},
			{
				id: "grok",
				label: "Grok",
				href: "https://grok.com",
				description: "xAI chat",
				brand: "grok",
				search: q("https://grok.com/?q="),
			},
			{
				id: "chatgpt",
				label: "ChatGPT",
				href: "https://chatgpt.com",
				description: "openai chat",
				brand: "chatgpt",
				search: q("https://chatgpt.com/?q="),
			},
			{
				id: "claude",
				label: "Claude",
				href: "https://claude.ai",
				description: "anthropic chat",
				brand: "claude",
				search: q("https://claude.ai/new?q="),
			},
			{
				id: "wikipedia",
				label: "Wikipedia",
				href: "https://en.wikipedia.org",
				description: "the free encyclopedia",
				brand: "wikipedia",
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
				brand: "gmail",
				search: q("https://mail.google.com/mail/u/0/#search/"),
			},
			{
				id: "calendar",
				label: "Calendar",
				href: "https://calendar.google.com",
				description: "today and upcoming",
				brand: "calendar",
			},
			{
				id: "drive",
				label: "Drive",
				href: "https://drive.google.com",
				description: "files",
				brand: "drive",
				search: q("https://drive.google.com/drive/search?q="),
			},
			{
				id: "notion",
				label: "Notion",
				href: "https://www.notion.so",
				description: "notes and docs",
				brand: "notion",
			},
			{
				id: "todoist",
				label: "Todoist",
				href: "https://app.todoist.com",
				description: "tasks",
				brand: "todoist",
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
				brand: "github",
				search: q("https://github.com/search?q="),
			},
			{
				id: "vercel",
				label: "Vercel",
				href: "https://vercel.com/dashboard",
				description: "projects and deploys",
				brand: "vercel",
			},
			{
				id: "cursor",
				label: "Cursor",
				href: "https://cursor.com",
				description: "editor and agents",
				brand: "cursor",
			},
			{
				id: "linear",
				label: "Linear",
				href: "https://linear.app",
				description: "issues",
				brand: "linear",
			},
			{
				id: "npm",
				label: "npm",
				href: "https://www.npmjs.com",
				description: "packages",
				brand: "npm",
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
				brand: "x",
				search: q("https://x.com/search?q="),
			},
			{
				id: "linkedin",
				label: "LinkedIn",
				href: "https://www.linkedin.com",
				description: "network",
				brand: "linkedin",
			},
			{
				id: "youtube",
				label: "YouTube",
				href: "https://www.youtube.com",
				description: "watch",
				brand: "youtube",
				search: q("https://www.youtube.com/results?search_query="),
			},
			{
				id: "reddit",
				label: "Reddit",
				href: "https://www.reddit.com",
				description: "feeds",
				brand: "reddit",
				search: q("https://www.reddit.com/search/?q="),
			},
			{
				id: "discord",
				label: "Discord",
				href: "https://discord.com/channels/@me",
				description: "messages",
				brand: "discord",
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
				brand: "spotify",
				search: q("https://open.spotify.com/search/"),
			},
			{
				id: "youtube-music",
				label: "YouTube",
				href: "https://www.youtube.com",
				description: "videos",
				brand: "youtube",
				search: q("https://www.youtube.com/results?search_query="),
			},
			{
				id: "netflix",
				label: "Netflix",
				href: "https://www.netflix.com",
				description: "films and series",
				brand: "netflix",
			},
			{
				id: "twitch",
				label: "Twitch",
				href: "https://www.twitch.tv",
				description: "live",
				brand: "twitch",
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
				brand: "site",
			},
			{
				id: "writing",
				label: "writing",
				href: "https://pranavkarthik.com/blog",
				description: "notes and essays",
				brand: "writing",
			},
			{
				id: "projects",
				label: "projects",
				href: "https://pranavkarthik.com/projects",
				description: "selected work",
				brand: "projects",
			},
			{
				id: "github-me",
				label: "GitHub",
				href: "https://github.com/pranavkarthik10",
				description: "pranavkarthik10",
				brand: "github",
			},
			{
				id: "email",
				label: "email",
				href: "mailto:hi@pranavkarthik.com",
				description: "hi@pranavkarthik.com",
				brand: "email",
			},
		],
	},
];

export function findStartItem(categoryId: string, itemId: string) {
	const category = START_CATEGORIES.find((entry) => entry.id === categoryId);
	return category?.items.find((item) => item.id === itemId);
}
