import CompanyLogo from "@/components/company-logo";
import NameAnimation from "@/components/name-animation";
import ShipRobots from "@/components/ship-robots";
import RESUME from "@/data/resume";
import Image from "next/image";
import Link from "next/link";

import { sortProjectsByOrder } from "@/data/project-order";

const featuredProjects = sortProjectsByOrder(
	RESUME.projects.filter((project) => project.slug !== "pdfp"),
);

const projectHighlights: Record<string, { label: string; detail: string }> = {
	"vercel-ts": {
		label: "150k+ weekly downloads",
		detail: "Typed project config used across Vercel apps.",
	},
	grokhunt: {
		label: "xAI Hackathon winner",
		detail: "Featured by xAI after the hackathon.",
	},
	interconnected: {
		label: "Apple Distinguished Winner",
		detail: "Swift Student Challenge graph theory playground.",
	},
	trackr: {
		label: "100k+ App Store downloads",
		detail: "Assignment planning app with Siri integration.",
	},
	"google-workspace-marketplace": {
		label: "40% download lift",
		detail: "Improved downloads for featured Marketplace partners.",
	},
	lazycal: {
		label: "41 GitHub stars",
		detail: "Terminal Google Calendar client with OAuth sync.",
	},
	"discord-swiftui": {
		label: "145 GitHub stars",
		detail: "Native SwiftUI Discord client experiment.",
	},
};

/*
function CurrentProjectCard({
	project,
	large = false,
}: {
	project: (typeof RESUME.projects)[number];
	large?: boolean;
}) {
	const highlight = projectHighlights[project.slug];

	return (
		<Link
			href={`/projects/${project.slug}`}
			className="project-card group relative overflow-visible rounded-lg border border-border bg-card transition duration-200 hover:z-10 hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-secondary/70 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 active:scale-[0.96]"
		>
			<div className="overflow-hidden rounded-lg">
				<div className={`relative bg-muted ${large ? "h-40" : "h-28"}`}>
					{project.imagePath ? (
						<Image
							src={project.imagePath}
							alt={`${project.name} screenshot`}
							fill
							sizes={large ? "(min-width: 1024px) 34vw, 100vw" : "(min-width: 1024px) 22vw, 100vw"}
							className="image-outline object-cover object-top opacity-90 saturate-[0.85] transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100 group-hover:saturate-100"
						/>
					) : null}
				</div>
				<div className={large ? "p-4" : "p-3.5"}>
					<h3 className="text-base font-semibold tracking-[-0.02em] text-foreground">
						{project.name}
					</h3>
					<p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
						{project.description}
					</p>
					<p className="mt-4 truncate text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80">
						{project.year} / {project.stack.slice(0, large ? 4 : 2).join(" / ")}
					</p>
				</div>
			</div>
			{highlight ? (
				<div className="project-card-popover pointer-events-none absolute left-4 right-4 top-4 translate-y-2 opacity-0 transition duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 lg:left-[calc(100%+0.75rem)] lg:right-auto lg:top-1/2 lg:w-56 lg:-translate-x-2 lg:-translate-y-1/2 lg:group-hover:translate-x-0 lg:group-hover:-translate-y-1/2 lg:group-focus-visible:translate-x-0 lg:group-focus-visible:-translate-y-1/2">
					<div className="rounded-md border border-border bg-background/96 p-3 shadow-lg backdrop-blur-md">
						<p className="text-sm font-semibold leading-5 tracking-[-0.01em] text-foreground">
							{highlight.label}
						</p>
						<p className="mt-1.5 text-xs leading-5 text-muted-foreground">
							{highlight.detail}
						</p>
					</div>
				</div>
			) : null}
		</Link>
	);
}
*/

function ProjectCard({
	project,
}: {
	project: (typeof RESUME.projects)[number];
}) {
	return (
		<Link
			href={`/projects/${project.slug}`}
			className="hybrid-project group"
		>
			<div className="hybrid-project-image">
				{project.imagePath ? (
					<Image
						src={project.imagePath}
						alt={`${project.name} screenshot`}
						fill
						sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 100vw"
						className="image-outline object-cover object-top opacity-90 saturate-[0.85] transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:saturate-100"
					/>
				) : null}
			</div>
			<div className="min-w-0">
				<div className="flex items-baseline justify-between gap-3">
					<h3 className="truncate text-base font-semibold tracking-[-0.025em] text-foreground">
						{project.name}
					</h3>
					<p className="font-mono text-[10px] text-muted-foreground/75">
						{project.year}
					</p>
				</div>
				<p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
					{project.description}
				</p>
				{project.awards?.length ? (
					<p className="mt-2 line-clamp-2 text-xs leading-5 text-[hsl(var(--accent))]">
						🏆 {project.awards[0]}
					</p>
				) : null}
				<p className="mt-3 truncate text-[10px] uppercase tracking-[0.14em] text-muted-foreground/75">
					{project.stack.slice(0, 3).join(" / ")}
				</p>
			</div>
		</Link>
	);
}

function Interest({ kind, children }: { kind: "pc" | "f1" | "chess" | "games"; children: React.ReactNode }) {
	const image =
		kind === "pc"
			? "/interests/computer.png"
			: kind === "f1"
				? "/interests/f1.png"
				: kind === "chess"
					? "/interests/chess.png"
					: "/interests/gamepad.png";
	const label =
		kind === "pc"
			? "computer"
			: kind === "f1"
				? "Formula 1 car"
				: kind === "chess"
					? "chess piece"
					: "game controller";

	return (
		<span className={`interest-token interest-${kind}`}>
			<span className="interest-image-wrap">
				<Image
					src={image}
					alt={label}
					width={72}
					height={72}
					className="interest-image"
				/>
			</span>
			<span>{children}</span>
		</span>
	);
}

export default function Home() {
	const visibleProjects = featuredProjects.slice(0, 6);
	const visibleExperience = RESUME.experience
		.filter((experience) => experience.company !== "Apple")
		.slice(0, 4);
	const google = RESUME.experience.find((experience) => experience.company === "Google");
	const vercel = RESUME.experience.find((experience) => experience.company === "Vercel");
	const apple = RESUME.experience.find((experience) => experience.company === "Apple");

	return (
		<main className="hybrid-home">
			<ShipRobots />
			<section className="hybrid-hero">
				<div className="hybrid-intro">
					<h1>
						hey, I&apos;m{" "}
						<span>
							<NameAnimation initialText="Pranav" text="Pranav Karthik" />
						</span>
					</h1>
					<div>
						I'm currently researching browser agents for HCI at{" "}
						<CompanyLogo
							icon={RESUME.education.icon}
							company="UBC"
							companyWebsite="https://www.ubc.ca"
						/>{" "} 
						and I&apos;ve previously done engineering at{" "}
						{vercel ? (
							<CompanyLogo
								icon={vercel.icon}
								company="Vercel"
								companyWebsite={vercel.company_website}
							/>
						) : (
							"Vercel"
						)}
						{" "}and{" "}
						{google ? (
							<CompanyLogo
								icon={google.icon}
								company="Google"
								companyWebsite={google.company_website}
							/>
						) : (
							"Google"
							)}
							, working on iOS/web infrastructure at scale.
						</div>
						<div>
							I&apos;m also a 3x{" "}
							{apple ? (
								<CompanyLogo
									icon={apple.icon}
									company="Apple Swift Student Challenge"
									companyWebsite={apple.company_website}
								/>
							) : (
								"Apple Swift Student Challenge"
						)}{" "}
						winner, including one Distinguished award.
					</div>
				</div>

				<div className="hybrid-socials">
					<a href="https://github.com/pranavkarthik10" target="_blank" rel="noopener noreferrer">github</a>
					<a href="https://linkedin.com/in/pranav-karthik" target="_blank" rel="noopener noreferrer">linkedin</a>
					<a href="https://x.com/pranavkarthik__" target="_blank" rel="noopener noreferrer">x</a>
					<a href="mailto:me@pranavkarthik.com">email</a>
				</div>
			</section>

			<section className="hybrid-grid">
				<div className="hybrid-column">
					<div className="hybrid-section-heading">
						<h2>Experience</h2>
					</div>
					<div className="hybrid-timeline">
						{visibleExperience.map((experience) => (
							<Link
								key={`${experience.company}-${experience.role}-${experience.start_date}`}
								href={experience.company_website}
								target="_blank"
								rel="noopener noreferrer"
								className="hybrid-experience-row"
							>
								<span className="hybrid-experience-icon">{experience.icon}</span>
								<span className="min-w-0">
									<span className="hybrid-experience-company">{experience.company}</span>
									<span className="hybrid-experience-role">{experience.role}</span>
								</span>
								<span className="hybrid-experience-meta">
									{experience.start_date.slice(0, 4)}
								</span>
							</Link>
						))}
					</div>

					<div className="hybrid-section-heading hybrid-section-heading-spaced">
						<h2>Education</h2>
					</div>
					<div className="hybrid-timeline">
						<a
							href="https://www.ubc.ca"
							target="_blank"
							rel="noopener noreferrer"
							className="hybrid-experience-row"
						>
							<span className="hybrid-experience-icon">{RESUME.education.icon}</span>
							<span className="min-w-0">
								<span className="hybrid-experience-company">
									{RESUME.education.institution}
								</span>
								<span className="hybrid-experience-role">
									{RESUME.education.degree}, {RESUME.education.major}
								</span>
							</span>
							<span className="hybrid-experience-meta">
								{RESUME.education.start_year} — {RESUME.education.end_year}
							</span>
						</a>
					</div>
				</div>

				<div className="hybrid-column hybrid-project-column">
					<div className="hybrid-section-heading">
						<h2>Projects</h2>
						<Link href="/projects" className="nav-link text-sm text-muted-foreground">
							view all
						</Link>
					</div>
					<div className="hybrid-project-list">
						{visibleProjects.map((project) => (
							<ProjectCard key={project.slug} project={project} />
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
