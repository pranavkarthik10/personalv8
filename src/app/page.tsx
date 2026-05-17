import CompanyLogo from "@/components/company-logo";
import NameAnimation from "@/components/name-animation";
import RESUME from "@/data/resume";
import Image from "next/image";
import Link from "next/link";

const projectOrder = [
	"lazycal",
	"vercel-ts",
	"sim-grab",
	"grokhunt",
	"interconnected",
	"trackr",
	"google-workspace-marketplace",
	"pdfp",
];

const featuredProjects = [...RESUME.projects]
	.filter((project) => project.slug !== "travoai")
	.sort((a, b) => projectOrder.indexOf(a.slug) - projectOrder.indexOf(b.slug));

function ProjectCard({
	project,
	large = false,
}: {
	project: (typeof RESUME.projects)[number];
	large?: boolean;
}) {
	return (
		<Link
			href={`/projects/${project.slug}`}
			className="group overflow-hidden rounded-lg border border-border bg-card transition duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-secondary/70"
		>
			<div className={`relative bg-muted ${large ? "h-40" : "h-28"}`}>
				{project.imagePath ? (
					<Image
						src={project.imagePath}
						alt={`${project.name} screenshot`}
						fill
						sizes={large ? "(min-width: 1024px) 34vw, 100vw" : "(min-width: 1024px) 22vw, 100vw"}
						className="object-cover object-top opacity-90 saturate-[0.85] transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100 group-hover:saturate-100"
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
	const [firstProject, secondProject, ...restProjects] = featuredProjects;
	const google = RESUME.experience.find((experience) => experience.company === "Google");
	const vercel = RESUME.experience.find((experience) => experience.company === "Vercel");

	return (
		<main className="mx-auto max-w-4xl py-10 sm:py-14">
			<section>
				<div className="flex items-start gap-4">
					<Image
						src={RESUME.avatar_path}
						alt="Pranav Karthik"
						width={72}
						height={72}
						className="mt-1 size-14 rounded-full object-cover grayscale sm:size-16"
						priority
					/>
					<div>
						<h1 className="text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-[2.45rem]">
							<NameAnimation />
						</h1>
						<p className="mt-1 text-lg font-medium tracking-[-0.025em] text-muted-foreground sm:text-xl">
							Software engineer building tools for people and agents.
						</p>
					</div>
				</div>

				<div className="mt-9 space-y-6 text-xl leading-9 tracking-[-0.03em] text-muted-foreground sm:text-[1.55rem] sm:leading-10">
					<div>
						I study Computer Science at{" "}
						<CompanyLogo
							icon={RESUME.education.icon}
							company="UBC"
							companyWebsite="https://www.ubc.ca"
						/>{" "}
						and build product-minded software across web, mobile, developer
						tools, and agent interfaces.
					</div>
					<div>
						I&apos;ve done engineering at{" "}
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
						, working on developer tools, production marketplace surfaces, and
						interfaces that need to be fast, legible, and useful.
					</div>
					<div>
						Outside code, I&apos;m usually{" "}
						<Interest kind="pc">tinkering with PCs and electronics</Interest>
						,{" "}
						<Interest kind="f1">following F1</Interest>
						,{" "}
						<Interest kind="chess">playing chess</Interest>
						, or getting lost in{" "}
						<Interest kind="games">a game</Interest>
						.
					</div>
				</div>
			</section>

			<section className="mt-20">
				<div className="mb-5 flex items-end justify-between gap-5">
					<h2 className="text-2xl font-semibold tracking-[-0.04em]">Projects</h2>
					<Link href="/projects" className="nav-link text-sm text-muted-foreground">
						view all
					</Link>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<ProjectCard project={firstProject} large />
					<ProjectCard project={secondProject} large />
				</div>

				<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{restProjects.map((project) => (
						<ProjectCard key={project.slug} project={project} />
					))}
				</div>
			</section>
		</main>
	);
}
