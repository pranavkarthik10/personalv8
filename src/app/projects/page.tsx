import { ProjectCard } from "@/components/project-card";
import RESUME from "@/data/resume";
import Link from "next/link";

import { sortProjectsByOrder } from "@/data/project-order";

const projects = sortProjectsByOrder(RESUME.projects);

export default function ProjectsPage() {
	return (
		<main className="page-frame">
			<section>
				<p className="page-kicker">Projects</p>
				<h1 className="page-title">Things I&apos;ve built.</h1>
			</section>

			<section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
				{projects.map((project) => (
					<ProjectCard key={project.slug} project={project} />
				))}
			</section>

			<div className="mt-10">
				<Link href="https://github.com/pranavkarthik10" className="nav-link text-sm text-muted-foreground">
					more on GitHub
				</Link>
			</div>
		</main>
	);
}
