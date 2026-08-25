"use client";

import {
	siClaude,
	siCursor,
	siDiscord,
	siGithub,
	siGmail,
	siGooglecalendar,
	siGoogledrive,
	siLinear,
	siNetflix,
	siNotion,
	siNpm,
	siPerplexity,
	siReddit,
	siSpotify,
	siTodoist,
	siTwitch,
	siVercel,
	siWikipedia,
	siX,
	siYoutube,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

type BrandMark = {
	title: string;
	path: string;
	hex: string;
	paths?: Array<{ d: string; fill: string }>;
};

function fromSimple(icon: SimpleIcon): BrandMark {
	return { title: icon.title, path: icon.path, hex: icon.hex };
}

// Official brand SVGs from Simple Icons (CC0). A few marks are inlined
// because Simple Icons does not currently ship them (LinkedIn, OpenAI, Grok)
// or because the four-color Google G is more recognizable than a flat fill.
const MARKS: Record<string, BrandMark> = {
	github: fromSimple(siGithub),
	gmail: fromSimple(siGmail),
	calendar: fromSimple(siGooglecalendar),
	drive: fromSimple(siGoogledrive),
	notion: fromSimple(siNotion),
	todoist: fromSimple(siTodoist),
	vercel: fromSimple(siVercel),
	cursor: fromSimple(siCursor),
	linear: fromSimple(siLinear),
	npm: fromSimple(siNpm),
	x: fromSimple(siX),
	youtube: fromSimple(siYoutube),
	reddit: fromSimple(siReddit),
	discord: fromSimple(siDiscord),
	spotify: fromSimple(siSpotify),
	netflix: fromSimple(siNetflix),
	twitch: fromSimple(siTwitch),
	wikipedia: fromSimple(siWikipedia),
	perplexity: fromSimple(siPerplexity),
	claude: fromSimple(siClaude),
	google: {
		title: "Google",
		hex: "4285F4",
		path: "",
		paths: [
			{ fill: "#4285F4", d: "M24 12.27c0-.81-.07-1.57-.2-2.32H12.24v4.39h6.61a5.66 5.66 0 0 1-2.45 3.71v3.08h3.96C22.4 19.05 24 15.96 24 12.27z" },
			{ fill: "#34A853", d: "M12.24 24c3.31 0 6.09-1.1 8.12-2.97l-3.96-3.08c-1.1.74-2.5 1.18-4.16 1.18-3.2 0-5.91-2.16-6.88-5.06H1.28v3.18A11.99 11.99 0 0 0 12.24 24z" },
			{ fill: "#FBBC05", d: "M5.36 14.07A7.2 7.2 0 0 1 4.98 12c0-.72.13-1.41.38-2.07V6.75H1.28A11.99 11.99 0 0 0 0 12c0 1.94.46 3.77 1.28 5.25l4.08-3.18z" },
			{ fill: "#EA4335", d: "M12.24 4.75c1.8 0 3.42.62 4.7 1.83l3.52-3.52C18.32 1.09 15.54 0 12.24 0 7.48 0 3.37 2.73 1.28 6.75l4.08 3.18c.97-2.9 3.68-5.18 6.88-5.18z" },
		],
	},
	linkedin: {
		title: "LinkedIn",
		hex: "0A66C2",
		path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
	},
	chatgpt: {
		title: "ChatGPT",
		hex: "10A37F",
		path: "M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.774-4.181 5.989 5.989 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.749-7.098zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387 2.02-1.163a.071.071 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.412-.678zm2.01-3.023-.142-.085-4.772-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.163V8.114a.08.08 0 0 1 .033-.062l4.83-2.787a.778.778 0 0 0 .785 0l4.83 2.787a.066.066 0 0 1 .028.061v5.574l-2.02 1.163a.075.075 0 0 1-.071 0z",
	},
	grok: {
		title: "Grok",
		hex: "FFFFFF",
		path: "M6.4 2.4 12 12 6.4 21.6H2.1L7.7 12 2.1 2.4h4.3zm11.2 0H21.9L16.3 12l5.6 9.6h-4.3L12 12l5.6-9.6z",
	},
	email: {
		title: "Email",
		hex: "FFFFFF",
		path: "M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13zm1.8.7 8.2 6.1 8.2-6.1-8.2 5.4z",
	},
	writing: {
		title: "Writing",
		hex: "FFFFFF",
		path: "M3.2 20.8 4.7 15.2 16.9 3a2.15 2.15 0 0 1 3.05 3.05L7.75 18.25 3.2 20.8z",
	},
	projects: {
		title: "Projects",
		hex: "FFFFFF",
		path: "M3 7.6A2.6 2.6 0 0 1 5.6 5h3.3l1.5 2.2H18.4A2.6 2.6 0 0 1 21 9.8v8.6a2.6 2.6 0 0 1-2.6 2.6H5.6A2.6 2.6 0 0 1 3 18.4V7.6z",
	},
	site: {
		title: "Site",
		hex: "FFFFFF",
		path: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 1.7c.8 1.4 1.4 3.6 1.6 6.1h-3.2c.2-2.5.8-4.7 1.6-6.1zM8.4 9.8H4.1a8.3 8.3 0 0 1 3.4-5.3c-.6 1.6-1 3.4-1.1 5.3zm7.2 0c-.1-1.9-.5-3.7-1.1-5.3a8.3 8.3 0 0 1 3.4 5.3h-2.3zM4.1 12.2h4.3c.1 2 .5 3.9 1.1 5.3A8.3 8.3 0 0 1 4.1 12.2zm6.3 0h3.2c-.2 2.5-.8 4.8-1.6 6.4-.8-1.6-1.4-3.9-1.6-6.4zm4.9 0h4.3a8.3 8.3 0 0 1-4.5 5.3c.6-1.4 1-3.3 1.1-5.3z",
	},
};

function hexLuminance(hex: string) {
	const value = hex.replace("#", "");
	const r = Number.parseInt(value.slice(0, 2), 16) / 255;
	const g = Number.parseInt(value.slice(2, 4), 16) / 255;
	const b = Number.parseInt(value.slice(4, 6), 16) / 255;
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export default function BrandIcon({ slug }: { slug: string }) {
	const mark = MARKS[slug];
	if (!mark) {
		return <span className="start-monogram">{slug.slice(0, 2)}</span>;
	}

	const fill = hexLuminance(mark.hex) < 0.18 ? "#ffffff" : `#${mark.hex.replace("#", "")}`;

	return (
		<svg viewBox="0 0 24 24" className="start-brand-mark" aria-hidden="true">
			{mark.paths ? (
				mark.paths.map((part) => <path key={part.fill} d={part.d} fill={part.fill} />)
			) : (
				<path d={mark.path} fill={fill} />
			)}
		</svg>
	);
}
