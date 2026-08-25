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
	viewBox?: string;
	fillRule?: "evenodd" | "nonzero";
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
		hex: "74AA9C",
		viewBox: "0 0 320 320",
		fillRule: "evenodd",
		path: "m297.06 130.97c7.26-21.79 4.76-45.66-6.85-65.48-17.46-30.4-52.56-46.04-86.84-38.68-15.25-17.18-37.16-26.95-60.13-26.81-35.04-.08-66.13 22.48-76.91 55.82-22.51 4.61-41.94 18.7-53.31 38.67-17.59 30.32-13.58 68.54 9.92 94.54-7.26 21.79-4.76 45.66 6.85 65.48 17.46 30.4 52.56 46.04 86.84 38.68 15.24 17.18 37.16 26.95 60.13 26.8 35.06.09 66.16-22.49 76.94-55.86 22.51-4.61 41.94-18.7 53.31-38.67 17.57-30.32 13.55-68.51-9.94-94.51zm-120.28 168.11c-14.03.02-27.62-4.89-38.39-13.88.49-.26 1.34-.73 1.89-1.07l63.72-36.8c3.26-1.85 5.26-5.32 5.24-9.07v-89.83l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.97zm-128.84-55.03c-7.03-12.14-9.56-26.37-7.15-40.18.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83l-64.41 37.19c-28.69 16.52-65.33 6.7-81.92-21.95zm-16.77-139.09c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91-26.93 15.55c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94-7.01 12.14-18.05 21.44-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8c-3.23-1.89-7.23-1.89-10.47 0l-77.79 44.92v-31.1c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22 6.99 12.12 9.52 26.31 7.15 40.1zm-168.51 55.43-26.94-15.55c-.29-.14-.48-.42-.52-.74v-74.39c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07l-63.72 36.8c-3.26 1.85-5.26 5.31-5.24 9.06l-.04 89.79zm14.63-31.54 34.65-20.01 34.65 20v40.01l-34.65 20-34.65-20z",
	},
	grok: {
		title: "Grok",
		hex: "FFFFFF",
		viewBox: "0 0 1024 1024",
		path: "",
		paths: [
			{
				fill: "#ffffff",
				d: "M395.479 633.828L735.91 381.105C752.599 368.715 776.454 373.548 784.406 392.792C826.26 494.285 807.561 616.253 724.288 699.996C641.016 783.739 525.151 802.104 419.247 760.277L303.556 814.143C469.49 928.202 670.987 899.995 796.901 773.282C896.776 672.843 927.708 535.937 898.785 412.476L899.047 412.739C857.105 231.37 909.358 158.874 1016.4 10.6326C1018.93 7.11771 1021.47 3.60279 1024 0L883.144 141.651V141.212L395.392 633.916",
			},
			{
				fill: "#ffffff",
				d: "M325.226 695.251C206.128 580.84 226.662 403.776 328.285 301.668C403.431 226.097 526.549 195.254 634.026 240.596L749.454 186.994C728.657 171.88 702.007 155.623 671.424 144.2C533.19 86.9942 367.693 115.465 255.323 228.382C147.234 337.081 113.244 504.215 171.613 646.833C215.216 753.423 143.739 828.818 71.7385 904.916C46.2237 931.893 20.6216 958.87 0 987.429L325.139 695.339",
			},
		],
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
		<svg viewBox={mark.viewBox ?? "0 0 24 24"} className="start-brand-mark" aria-hidden="true">
			{mark.paths ? (
				mark.paths.map((part) => <path key={part.d.slice(0, 24)} d={part.d} fill={part.fill} />)
			) : (
				<path d={mark.path} fill={fill} fillRule={mark.fillRule} />
			)}
		</svg>
	);
}
