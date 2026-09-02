import CompanyLogo from "@/components/company-logo";
import RESUME from "@/data/resume";

export default function CvPage() {
	return (
		<main className="page-frame">
			<section className="content-measure">
				<p className="page-kicker">CV</p>
				<h1 className="page-title">Experience and education.</h1>
				<p className="page-description">
					Experience, education, and the usual resume-shaped things.
				</p>
			</section>

			<div className="grid grid-cols-1 gap-12 py-6 md:grid-cols-2 md:gap-16">
				<section>
					<h2 className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
						Experience
					</h2>
					<div className="space-y-4">
						{RESUME.experience.map((experience) => (
							<div
								key={`${experience.company}-${experience.start_date}`}
								className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 border-t border-border pt-4"
							>
								<CompanyLogo
									icon={experience.icon}
									company={experience.company}
									companyWebsite={experience.company_website}
								/>
								<p className="text-right text-[11px] text-muted-foreground">
									{new Date(
										experience.start_date + "T00:00:00",
									).toLocaleDateString("en-US", {
										year: "2-digit",
									})}{" "}
									-{" "}
									{experience.end_date
										? new Date(
												experience.end_date + "T00:00:00",
											).toLocaleDateString("en-US", {
												year: "2-digit",
											})
										: "Present"}
								</p>
								<p className="col-start-1 mt-1 text-xs text-muted-foreground">
									{experience.role}
								</p>
								<p className="col-start-2 row-start-2 text-right text-xs text-muted-foreground">
									{experience.location}
								</p>
							</div>
						))}
					</div>
				</section>

				<section>
					<h2 className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
						Education
					</h2>
					<div className="border-t border-border pt-4">
						<div className="inline-flex items-center gap-2">
							<div className="size-5 flex-shrink-0 [&>img]:h-full [&>img]:w-full [&>img]:object-contain [&>svg]:h-full [&>svg]:w-full">
								{RESUME.education.icon}
							</div>
							<h3 className="text-sm">{RESUME.education.institution}</h3>
						</div>
						<p className="mt-1 text-xs text-muted-foreground">
							{RESUME.education.degree}, {RESUME.education.major}
						</p>
						<p className="mt-2 text-[11px] text-muted-foreground">
							{RESUME.education.start_year} - {RESUME.education.end_year}
						</p>
					</div>
				</section>
			</div>
		</main>
	);
}
