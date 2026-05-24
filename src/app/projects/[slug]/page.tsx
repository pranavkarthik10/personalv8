import { Badge } from "@/components/ui/badge";
import { GitHubLogo } from "@/components/github-logo";
import RESUME from "@/data/resume";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const project = RESUME.projects.find((p) => p.slug === slug);

	if (!project) notFound();

	return (
		<main className="page-frame">
			<header className="mb-10">
				<p className="page-kicker">{project.year}</p>
				<div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
					<div className="min-w-0">
						<h1 className="page-title">{project.name}</h1>
						<p className="page-description">{project.description}</p>
					</div>
					<div className="project-actions">
						{project.githubUrl ? (
							<Link
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="project-action-button"
							>
								<GitHubLogo className="h-3.5 w-3.5" />
								<span>GitHub</span>
							</Link>
						) : null}
						{project.liveUrl ? (
							<Link
								href={project.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="project-action-button"
							>
								<ExternalLink className="h-3.5 w-3.5" />
								<span>Visit</span>
							</Link>
						) : null}
					</div>
				</div>
			</header>

			{project.imagePath ? (
				<div className="mb-10 overflow-hidden rounded-lg border border-border bg-card">
					<Image
						src={project.imagePath}
						alt={`${project.name} screenshot`}
						width={1400}
						height={900}
						className="h-auto w-full object-cover"
						priority
					/>
				</div>
			) : null}

			<div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_16rem]">
				<div className="article-prose">
					<h2>Overview</h2>
					<p>{project.longDescription || project.description}</p>

					{project.keyFeatures?.length ? (
						<>
							<h2>Details</h2>
							<ul>
								{project.keyFeatures.map((feature) => (
									<li key={feature}>{feature}</li>
								))}
							</ul>
						</>
					) : null}

					{project.challenges ? (
						<>
							<h2>Notes</h2>
							<p>{project.challenges}</p>
						</>
					) : null}
				</div>

				<aside className="space-y-5 text-sm">
					<section>
						<p className="page-kicker">Stack</p>
						<div className="mt-3 flex flex-wrap gap-2">
							{project.stack.map((tech) => (
								<Badge key={tech} variant="outline" className="rounded-md">
									{tech}
								</Badge>
							))}
						</div>
					</section>

					{project.awards?.length ? (
						<section>
							<p className="page-kicker">Awards</p>
							<ul className="mt-3 space-y-2 text-muted-foreground">
								{project.awards.map((award) => (
									<li key={award}>{award}</li>
								))}
							</ul>
						</section>
					) : null}

					{project.featuredLink ? (
						<section>
							<p className="page-kicker">Featured</p>
							<Link
								href={project.featuredLink.url}
								target="_blank"
								rel="noopener noreferrer"
								className="nav-link mt-3 inline-block text-muted-foreground"
							>
								{project.featuredLink.label}
							</Link>
						</section>
					) : null}
				</aside>
			</div>
		</main>
	);
}
