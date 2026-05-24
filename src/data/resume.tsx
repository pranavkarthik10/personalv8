import React from 'react';

const RESUME = {
	name: "Pranav Karthik",
	avatar_path: "/me.jpg",
	bio: {
		intro: "Fourth year Computer Science student at UBC, passionate about building agentic experiences on the web, mobile, and spatial interfaces.",
		about: "TODO: move bio here",
	},
	experience: [
		{
			icon: (
				<svg
					aria-label="Vercel logomark"
					height="64"
					role="img"
					viewBox="0 0 74 64"
					style={{ width: "auto", overflow: "visible"}}
				>
					<path
						d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
						fill="hsl(var(--foreground))"
					/>
				</svg>
			),
			company: "Vercel",
			role: "Software Engineering Intern",
			description: "",
			start_date: "2025-09-01",
			end_date: "2025-12-01",
			location: "San Francisco, CA",
			company_website: "https://vercel.com",
		},
		{
			icon: (
				<svg
					aria-label="Apple logomark"
					role="img"
					viewBox="0 0 24 24"
					style={{ width: "auto", overflow: "visible" }}
				>
					<path
						d="M17.56 12.02c-.03-2.78 2.27-4.12 2.37-4.18-1.29-1.89-3.3-2.15-4.01-2.18-1.71-.17-3.34 1.01-4.2 1.01-.87 0-2.21-.99-3.63-.96-1.87.03-3.59 1.09-4.55 2.77-1.94 3.36-.5 8.34 1.39 11.07.92 1.33 2.02 2.83 3.46 2.77 1.39-.06 1.91-.9 3.59-.9 1.68 0 2.15.9 3.62.87 1.49-.03 2.44-1.36 3.35-2.7 1.06-1.55 1.49-3.05 1.52-3.13-.03-.01-2.88-1.1-2.91-4.44ZM14.8 3.86c.76-.92 1.27-2.2 1.13-3.47-1.09.04-2.42.73-3.2 1.64-.7.81-1.31 2.11-1.15 3.35 1.22.09 2.46-.62 3.22-1.52Z"
						fill="currentColor"
					/>
				</svg>
			),
			company: "Apple",
			role: "Swift Student Challenge Winner",
			description: "",
			start_date: "2022-01-01",
			end_date: "2024-12-31",
			location: "Remote",
			company_website: "https://developer.apple.com/swift-student-challenge/",
		},
		{
			icon: (
				<svg
					aria-label="Google logomark"
					height="64"
					role="img"
					viewBox="0 0 24 24"
					style={{ width: "auto", overflow: "visible" }}
				>
					<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
					<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
					<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
					<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
				</svg>
			),
			company: "Google",
			role: "Software Engineering Intern",
			description: "",
			start_date: "2025-05-01",
			end_date: "2025-08-31",
			location: "Seattle, WA",
			company_website: "https://google.com",
		},
		{
			icon: (
				<svg
					aria-label="Google logomark"
					height="64"
					role="img"
					viewBox="0 0 24 24"
					style={{ width: "auto", overflow: "visible" }}
				>
					<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
					<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
					<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
					<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
				</svg>
			),
			company: "Google",
			role: "STEP Intern",
			description: "",
			start_date: "2024-05-01",
			end_date: "2024-08-31",
			location: "Waterloo, ON",
			company_website: "https://google.com",
		},
		{
			icon: (
				<img
					src="/dyne.png"
					alt="DYNE logo"
					className="w-full h-full object-contain"
				/>
			),
			company: "DYNE",
			role: "App Development Intern",
			description: "",
			start_date: "2023-05-01",
			end_date: "2023-08-31",
			location: "Vancouver, BC",
			company_website: "https://dyneapp.ca",
		},
	],
	education: {
		institution: "University of British Columbia",
		degree: "Bachelor of Science",
		major: "Computer Science",
		start_year: "2022",
		end_year: "2026",
		location: "Vancouver, BC",
		icon: (
			<img
				src="/ubclogo.png"
				alt="UBC logo"
				className="w-full h-full object-contain"
			/>
		),
	},
	projects: [
		{
			slug: "google-workspace-marketplace",
			name: "Google Workspace Marketplace",
			description:
				"Featured partner apps experience for the Google Workspace Marketplace homepage.",
			longDescription:
				"At Google, I worked on the Google Workspace Marketplace homepage experience for featured partner apps, helping surface high-quality integrations for Workspace users.",
			imagePath: "/google-workspace-marketplace.png",
			liveUrl: "https://workspace.google.com/marketplace",
			stack: ["Java", "HTML", "Concurrency", "Google Workspace"],
			keyFeatures: [
				"Featured partner apps presentation",
				"Marketplace homepage experience",
				"Production user-facing Google Workspace surface",
			],
			challenges:
				"Building within a high-traffic marketplace surface meant balancing product clarity, partner presentation, accessibility, and frontend quality inside existing platform constraints.",
			inProgress: false,
			year: 2024,
		},
		{
			slug: "vercel-ts",
			name: "vercel.ts",
			description:
				"Programmatic project configuration for Vercel projects through a typed TypeScript file.",
			longDescription:
				"vercel.ts introduces programmatic project configuration for Vercel, letting teams define project settings with TypeScript instead of only static configuration. I contributed during my engineering internship at Vercel.",
			imagePath: "/vercel-ts-og.png",
			liveUrl: "https://vercel.com/changelog/vercel-ts",
			stack: ["TypeScript", "Vercel", "Developer Tools", "Configuration"],
			keyFeatures: [
				"Typed project configuration",
				"Programmatic Vercel project settings",
				"Developer-facing product surface",
			],
			challenges:
				"Designing a developer-facing configuration workflow requires balancing flexibility, type safety, and compatibility with existing Vercel project conventions.",
			inProgress: false,
			year: 2025,
		},
		{
			slug: "sim-grab",
			name: "sim-grab",
			description:
				"Select context for coding agents from native iOS apps through a live simulator inspector.",
			longDescription:
				"sim-grab streams the iOS Simulator into the browser and exposes the accessibility tree as an inspector. It lets coding agents receive precise UI context from SwiftUI, UIKit, React Native, Flutter, and system apps.",
			imagePath: "/sim-grab.png",
			liveUrl: "https://github.com/pranavkarthik10/sim-grab",
			githubUrl: "https://github.com/pranavkarthik10/sim-grab",
			stack: ["TypeScript", "Swift", "CSS", "JavaScript", "HTML"],
			keyFeatures: [
				"Live iOS Simulator stream in the browser",
				"Accessibility tree inspector with hover selection",
				"Agent-ready context copying",
				"Supports SwiftUI, UIKit, React Native, and Flutter apps",
			],
			challenges:
				"Bridging simulator video, accessibility metadata, and browser interactions into one reliable surface for coding-agent workflows.",
			inProgress: false,
			year: 2026,
		},
		{
			slug: "pdfp",
			name: "pdfp",
			description:
				"Fast PDF compression CLI with an interactive terminal UI, quality presets, and batch processing.",
			longDescription:
				"pdfp is a TypeScript CLI tool for compressing PDFs from the terminal using Ghostscript. It provides a clean interactive flow, multiple quality presets, batch processing support, and advanced output controls for balancing file size and quality.",
			imagePath: "/pdfp.png",
			githubUrl: "https://github.com/pranavkarthik10/pdfp",
			stack: ["TypeScript", "Node.js", "Ghostscript", "CLI"],
			keyFeatures: [
				"Interactive terminal-first compression workflow",
				"Multiple compression presets (screen, ebook, printer, prepress)",
				"Batch processing and quick auto mode",
				"Advanced options like target size and custom output paths",
			],
			challenges:
				"Building a friendly interactive CLI while handling cross-platform Ghostscript usage and predictable compression results across different PDF inputs.",
			inProgress: false,
			year: 2026,
		},
		{
			slug: "lazycal",
			name: "LazyCal",
			description:
				"A beautiful terminal Google Calendar client with day/week/month views, keyboard-first navigation, and optional Google Calendar sync.",
			longDescription:
				"LazyCal is a terminal-based Google Calendar interface built with OpenTUI and TypeScript. It supports day, week, and month modes, responsive layouts based on terminal width, a keyboard-help modal, and optional live Google Calendar integration via OAuth.",
			imagePath: "/lazycal.png",
			liveUrl: "https://www.npmjs.com/package/lazycal",
			githubUrl: "https://github.com/pranavkarthik10/lazycal",
			stack: ["TypeScript", "OpenTUI", "Google Calendar API", "OAuth 2.0"],
			keyFeatures: [
				"Day, week, and month calendar views",
				"Keyboard-first controls and help modal",
				"Responsive terminal layout and sidebar",
				"Optional Google Calendar API integration",
			],
			challenges:
				"Designing a rich, resize-aware terminal UI while keeping interactions fast and intuitive across day/week/month modes required careful layout and input handling.",
			inProgress: false,
			year: 2026,
		},
		{
			slug: "grokhunt",
			name: "GrokHunt",
			description:
				"AI-powered recruiting platform that autonomously searches for talented developers using Grok's reasoning engine.",
			longDescription:
				"GrokHunt is an autonomous recruiting platform built at the xAI Hackathon 2025. It scans Twitter for talented developers, evaluates their work using Grok's reasoning engine, generates candidate scores and narratives, and sends personalized interview invitations. The system uses reinforcement learning to continuously improve its accuracy.",
			imagePath: "/grokhunt.png",
			liveUrl: "https://devpost.com/software/grokhunt",
			stack: ["Next.js", "Python", "FastAPI", "Grok API", "X API"],
			keyFeatures: [
				"Autonomous candidate discovery from Twitter",
				"AI-powered evaluation using Grok's reasoning",
				"Personalized outreach and interview invitations",
				"Reinforcement learning feedback loop",
			],
			challenges: "Built a complete autonomous recruiting pipeline in under 48 hours that searches, scores, messages, and interviews candidates automatically. Demonstrated that reasoning-based evaluation outperforms traditional keyword matching.",
			collaborators: [
				{ name: "Pragalvha Sharma" },
				{ name: "Krishna Arya" },
			],
			awards: ["xAI Hackathon"],
			featuredLink: {
				label: "Featured by xAI",
				url: "https://x.com/xai/status/1997875261669621787",
			},
			inProgress: false,
			year: 2025,
		},
		{
			slug: "interconnected",
			name: "Interconnected",
			description:
				"Interactive Swift application introducing graph theory algorithms with custom physics simulation and drag-and-drop graph playground.",
			longDescription:
				"Interconnected is an interactive Swift application that introduces graph theory algorithms through a custom physics simulation and drag-and-drop graph playground. Built with SwiftUI, CoreGraphics, and Combine, it provides an intuitive way to learn and experiment with graph algorithms through hands-on interaction.",
			imagePath: "/interconnected.png",
			// liveUrl: "https://github.com/pranavkarthik10/interconnected",
			// githubUrl: "https://github.com/pranavkarthik10/interconnected",
			stack: ["SwiftUI", "CoreGraphics", "Combine"],
			keyFeatures: [
				"Custom physics simulation for graph visualization",
				"Drag-and-drop graph playground",
				"Interactive algorithm demonstrations",
				"Real-time graph manipulation",
			],
			challenges: "The main challenge was implementing a custom physics simulation that could handle dynamic graph layouts while maintaining performance. I had to optimize the force-directed layout algorithm and implement efficient collision detection for interactive node manipulation.",
			awards: ["Distinguished Winner - Apple Swift Student Challenge"],
			inProgress: false,
			year: 2024,
		},
		{
			slug: "discord-swiftui",
			name: "DiscordSwiftUI",
			description:
				"A native SwiftUI Discord client experiment recreating chat, servers, channels, and platform UI patterns.",
			longDescription:
				"DiscordSwiftUI is a native SwiftUI client experiment for Discord, exploring how a familiar chat product can feel when rebuilt with Apple platform conventions across shared iOS and macOS code.",
			imagePath: "/discord-swiftui.png",
			githubUrl: "https://github.com/pranavkarthik10/DiscordSwiftUI",
			stack: ["SwiftUI", "Swift", "iOS", "macOS"],
			keyFeatures: [
				"Native SwiftUI Discord-style interface",
				"Shared components across iOS and macOS targets",
				"Server, channel, and chat UI exploration",
				"Apple-platform take on a familiar messaging product",
			],
			challenges:
				"Recreating a dense, recognizable chat interface in SwiftUI meant translating web-first interaction patterns into native Apple layouts while keeping the UI responsive and familiar.",
			inProgress: false,
			year: 2020,
		},
		{
			slug: "travoai",
			name: "TravoAI",
			description:
				"Full-stack web application for AI-generated travel plans with streaming responses and modern React UI.",
			longDescription:
				"TravoAI is a comprehensive travel planning platform that leverages AI to generate personalized travel itineraries. The application features streaming responses for real-time content generation, a modern React-based user interface, and intelligent recommendations based on user preferences and budget constraints.",
			imagePath: "/travoai.jpg",
			liveUrl: "https://travoai.com",
			githubUrl: "https://github.com/pranavkarthik10/travoai",
			stack: ["React.js", "Node.js", "OpenAI API", "Express", "MongoDB"],
			keyFeatures: [
				"AI-powered travel plan generation",
				"Streaming response implementation",
				"Modern React UI with responsive design",
				"Budget and preference-based recommendations",
			],
			challenges: "Implementing streaming responses for AI-generated content required careful management of WebSocket connections and state synchronization between frontend and backend. Additionally, optimizing API costs while maintaining response quality was a key technical challenge.",
			collaborators: [
			],
			awards: ["StormHacks"],
			inProgress: false,
			year: 2023,
		},
		{
			slug: "trackr",
			name: "Trackr",
			description:
				"iOS app for assignment management with tens of thousands of App Store downloads and Siri integration.",
			longDescription:
				"Trackr is a comprehensive assignment management iOS application that has achieved tens of thousands of downloads on the App Store. The app features Siri integration for voice commands, CoreData for local storage, and a clean UIKit-based interface that helps students stay organized and on top of their academic responsibilities.",
			imagePath: "/trackr.png",
			liveUrl: "https://apps.apple.com/app/trackr/id1481234567",
			githubUrl: "https://github.com/pranavkarthik10/trackr",
			stack: ["UIKit", "CoreData", "SiriKit", "Swift"],
			keyFeatures: [
				"Siri integration for voice commands",
				"Assignment tracking and reminders",
				"Grade calculation and analytics",
				"Offline-first design with CoreData",
			],
			challenges: "The biggest challenge was implementing reliable Siri integration while maintaining data privacy. I had to carefully design the voice command system to work offline and ensure that sensitive academic data never left the device.",
			inProgress: false,
			year: 2019,
		}
	],
};

export default RESUME;
