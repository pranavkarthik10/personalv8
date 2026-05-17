import { ProjectCard } from "@/components/project-card";
import RESUME from "@/data/resume";
import Link from "next/link";

function projectType(project: (typeof RESUME.projects)[number]) {
	const workSignals = ["grokhunt", "travoai"];
	if (workSignals.includes(project.slug)) return "work";
	if (project.awards?.some((award) => award.toLowerCase().includes("hackathon"))) return "work";
	return "personal";
}

export default function ProjectsPage() {
	const personalProjects = RESUME.projects.filter((project) => projectType(project) === "personal");
	const workProjects = RESUME.projects.filter((project) => projectType(project) === "work");

	return (
		<main className="py-8 sm:py-12">
			<section className="max-w-2xl py-8">
				<h1 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">
					Projects
				</h1>
				<p className="mt-4 text-sm leading-7 text-muted-foreground">
					Personal projects and work projects, kept together as a small archive of
					things I have built.
				</p>
			</section>

			<section className="grid gap-8 py-6 lg:grid-cols-[10rem_minmax(0,1fr)]">
				<aside className="space-y-4 text-xs text-muted-foreground">
					<div>
						<p className="uppercase tracking-[0.18em]">personal</p>
						<p className="mt-1 text-foreground">{personalProjects.length} projects</p>
					</div>
					<div>
						<p className="uppercase tracking-[0.18em]">work</p>
						<p className="mt-1 text-foreground">{workProjects.length} projects</p>
					</div>
					<Link
						href="https://github.com/pranavkarthik10"
						className="nav-link inline-block"
					>
						more on GitHub
					</Link>
				</aside>

				<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
					{RESUME.projects.map((project) => (
						<ProjectCard
							key={project.slug}
							project={{ ...project, kind: projectType(project) }}
						/>
					))}
				</div>
			</section>

			{RESUME.projects.length === 0 && (
				<div className="py-16 text-center">
					<h3 className="font-display text-3xl">Nothing here yet</h3>
					<p className="mt-2 text-muted-foreground">The project index is waiting for its first entry.</p>
				</div>
			)}
		</main>
	);
}
