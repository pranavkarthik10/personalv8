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
	const apple = RESUME.experience.find((experience) => experience.company === "Apple");

	return (
		<main className="mx-auto max-w-4xl py-10 sm:py-14">
			<section>
				<div className="space-y-5 text-lg leading-8 tracking-[-0.025em] text-muted-foreground sm:text-xl sm:leading-9">
					<div>
						Hi, I&apos;m{" "}
							<span className="inline-photo-card" aria-hidden="true">
							<span className="inline-photo-thumb">
								<Image
									src="/pranav-inline.jpg"
									alt=""
									width={96}
									height={96}
									className="h-full w-full object-cover"
								/>
							</span>
							<span className="inline-photo-preview">
								<Image
									src="/pranav-inline.jpg"
									alt=""
									width={240}
									height={240}
									className="h-full w-full object-cover"
								/>
							</span>
						</span>
						<span className="font-semibold text-foreground">
							<NameAnimation text="Pranav Karthik" />
						</span>
						, a software engineer building intuitive experiences for the web, mobile, and agents.
					</div>
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
					<div>
						Outside code, I&apos;m usually{" "}
						<Interest kind="pc">tinkering on electronics</Interest>
						,{" "}
						<Interest kind="f1">watching F1</Interest>
						,{" "}
						<Interest kind="chess">playing chess</Interest>
						, or getting lost in{" "}
						<Interest kind="games">a game</Interest>
						.
					</div>
				</div>
				<div className="mt-7 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
					<span className="mr-1">you can find me at</span>
					<a className="contact-pill" href="https://linkedin.com/in/pranav-karthik" target="_blank" rel="noopener noreferrer">
						linkedin
					</a>
					<a className="contact-pill" href="https://x.com/pranavkarthik__" target="_blank" rel="noopener noreferrer">
						x
					</a>
					<a className="contact-pill" href="mailto:me@pranavkarthik.com">
						email
					</a>
					<a className="contact-pill" href="https://github.com/pranavkarthik10" target="_blank" rel="noopener noreferrer">
						github
					</a>
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
