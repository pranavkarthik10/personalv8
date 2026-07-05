// Life timeline data for the /timeline route.
//
// Every year from START_YEAR to END_YEAR renders as a column. To add an event,
// add an entry to EVENTS keyed by the year. Event text supports inline markdown
// links: "Joined [Vercel](https://vercel.com)". Keep it to meaningful milestones.
//
// Age is derived from BIRTH_YEAR (Pranav was born Sep 10, 2005), so the age shown
// is the age reached during that calendar year (2022 -> 17, 2026 -> 21).

export const BIRTH_YEAR = 2005;
export const START_YEAR = 2005;
export const END_YEAR = 2026;

export interface TimelineCompany {
	name: string;
	href?: string;
}

export interface TimelineYear {
	companies?: TimelineCompany[];
	events?: string[];
}

export interface TimelineMarker extends TimelineYear {
	year: number;
}

const EVENTS: Record<number, TimelineYear> = {
	2005: {
		events: ["Born in Chennai, India, on September 10."],
	},
	2009: {
		events: ["Started primary school in India."],
	},
	2011: {
		events: ["Moved to Washington, USA, and started first grade."],
	},
	2019: {
		companies: [{ name: "Apple", href: "https://developer.apple.com/wwdc/" }],
		events: [
			"Moved to Canada and started high school.",
			"Won an Apple WWDC Scholarship and flew to California for the conference, where [Tim Cook](https://twitter.com/tim_cook/status/1135700109931343872) gave me a shout-out.",
			"Shipped [Trackr](https://apps.apple.com/app/trackr/id1481234567), my first iOS app, which reached tens of thousands of App Store downloads.",
		],
	},
	2020: {
		companies: [
			{ name: "Apple", href: "https://developer.apple.com/swift-student-challenge/" },
			{ name: "Google", href: "https://codein.withgoogle.com/" },
		],
		events: [
			"Won Apple's [Swift Student Challenge](https://developer.apple.com/swift-student-challenge/).",
			"Grand Prize Winner of Google Code-in.",
		],
	},
	2022: {
		companies: [{ name: "UBC", href: "https://ubc.ca" }],
		events: [
			"Began a BSc in Computer Science at the [University of British Columbia](https://ubc.ca).",
		],
	},
	2023: {
		companies: [{ name: "DYNE", href: "https://dyneapp.ca" }],
		events: [
			"Spent the summer as an App Development Intern at [DYNE](https://dyneapp.ca) in Vancouver.",
		],
	},
	2024: {
		companies: [
			{ name: "Google", href: "https://google.com" },
			{ name: "Apple", href: "https://developer.apple.com/swift-student-challenge/" },
		],
		events: [
			"Joined [Google](https://google.com) in Waterloo as a STEP Intern on the Workspace Marketplace.",
			"Named a Distinguished Winner of Apple's [Swift Student Challenge](https://developer.apple.com/swift-student-challenge/) for [Interconnected](/projects/interconnected).",
		],
	},
	2025: {
		companies: [
			{ name: "Google", href: "https://google.com" },
			{ name: "Vercel", href: "https://vercel.com" },
		],
		events: [
			"Software Engineering Intern at [Google](https://google.com) in Seattle.",
			"Software Engineering Intern at [Vercel](https://vercel.com) in San Francisco, contributing to [vercel.ts](https://vercel.com/changelog/vercel-ts).",
		],
	},
	2026: {
		companies: [{ name: "UBC", href: "https://ubc.ca" }],
		events: ["Graduating from [UBC](https://ubc.ca) with a BSc in Computer Science."],
	},
};

export const TIMELINE: TimelineMarker[] = Array.from(
	{ length: END_YEAR - START_YEAR + 1 },
	(_, i) => {
		const year = START_YEAR + i;
		return { year, ...EVENTS[year] };
	},
);
