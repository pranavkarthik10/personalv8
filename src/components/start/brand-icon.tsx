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
		hex: "10A37F",
		viewBox: "0 0 16 16",
		path: "M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575 4.139 7.8a.05.05 0 0 1-.026-.037V4.049c0-.57.166-1.127.476-1.607s.752-.864 1.275-1.105a3.08 3.08 0 0 1 3.234.41l-.096.054-3.23 1.838a.53.53 0 0 0-.265.455zm.742-1.577 1.758-1 1.762 1v2l-1.755 1-1.762-1z",
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
