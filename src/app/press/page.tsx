import MentionsCarousel from "@/components/mentions-carousel";

const logoData = [
	{ name: "OMNI", url: "https://www.omnitv.ca/ab/en/videos/pranav-karthik-coding-prodigy/", logo: "omni-tv.png" },
	{ name: "CTV", url: "https://bc.ctvnews.ca/vancouver-teen-coding-phenom-using-skills-for-good-1.4995106", logo: "ctv.svg" },
	{ name: "Journal de Montreal", url: "https://www.journaldemontreal.com/a-13-ans-ce-developpeur-canadien-attire-lattention-dapple", logo: "journal-de-montreal.svg" },
	{ name: "ViewTheVibe", url: "https://viewthevibe.com/canadian-representation-game-strong-wwdc20s-swift-student-challenge-winners/", logo: "view-the-vibe.png" },
	{ name: "MobileSyrup", url: "https://mobilesyrup.com/2020/06/15/canadian-ios-app-developers-covid-19-pandemic-ipnos-ko_op-manavata-maple/", logo: "mobile-syrup.svg" },
	{ name: "News1130", url: "https://www.citynews1130.com/2020/06/13/vancouver-teen-app/", logo: "citynews.png" },
	{ name: "OwlConnected", url: "http://owlconnected.com/archives/interview-canadian-coding-wunderkid-pranav/", logo: "owl-connected.png" },
	{ name: "GeekWire", url: "https://www.geekwire.com/2019/pranav-karthik/", logo: "geekwire.png" },
	{ name: "DailyHive", url: "https://dailyhive.com/vancouver/apple-ceo-tim-cook-shout-out-vancouver-teen", logo: "daily-hive.svg" },
];

export default function PressPage() {
	return (
		<main className="page-frame">
			<section>
				<p className="page-kicker">Press</p>
				<h1 className="page-title">Mentions and coverage.</h1>
				<p className="page-description">
					A small archive of interviews, coverage, and a few nice shout-outs.
				</p>
			</section>

			<div className="mt-12 mb-0">
				<h2 className="text-xl font-medium tracking-[-0.03em] mb-0">Notable mentions</h2>
				<MentionsCarousel />
			</div>

			{/* News Section */}
			<div className="mt-12">
				<h2 className="text-xl font-medium tracking-[-0.03em] mb-6">News</h2>
				
				{/* Press Logos */}
				<div className="rounded-lg border border-border bg-card/70 p-8">
				<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
					{logoData.map((item) => (
						<a
							key={item.name}
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center hover:scale-105 transition-transform"
						>
							<img
								src={`/press-logos/${item.logo}`}
								alt={item.name}
								className="max-w-full h-12 object-contain opacity-80 hover:opacity-100 transition-opacity"
							/>
						</a>
					))}
				</div>
				</div>
			</div>

			{/* 2025 */}
			<div className="mt-12">
				<h2 className="text-2xl font-medium tracking-tight mb-4">2025</h2>
				<ul className="space-y-2">
					<li>
						<a
							href="https://vercel.com/changelog/vercel-ts"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							Vercel Changelog: Programmatic project configuration with vercel.ts
						</a>
					</li>
					<li>
						<a
							href="https://x.com/xai/status/1997875261669621787"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							xAI on X: GrokHunt featured after the xAI Hackathon
						</a>
					</li>
				</ul>
			</div>

			{/* 2024 */}
			<div className="mt-8">
				<h2 className="text-2xl font-medium tracking-tight mb-4">2024</h2>
				<ul className="space-y-2">
					<li>
						<a
							href="https://workspaceupdates.googleblog.com/2024/10/google-workspace-marketplace-featured-partner-apps.html"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							Google Workspace Updates: Featured partner apps on the Marketplace homepage
						</a>
					</li>
				</ul>
			</div>

			{/* 2021 */}
			<div className="mt-8">
				<h2 className="text-2xl font-medium tracking-tight mb-4">2021</h2>
				<ul className="space-y-2">
					<li>
						<a
							href="http://owlconnected.com/archives/interview-canadian-coding-wunderkid-pranav/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							OWL CONNECTED
						</a>
					</li>
				</ul>
			</div>

			{/* 2020 */}
			<div className="mt-8">
				<h2 className="text-2xl font-medium tracking-tight mb-4">2020</h2>
				<ul className="space-y-2">
					<li>
						<a
							href="https://www.omnitv.ca/ab/en/videos/pranav-karthik-coding-prodigy/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							OMNI TV
						</a>
					</li>
					<li>
						<a
							href="https://bc.ctvnews.ca/vancouver-teen-coding-phenom-using-skills-for-good-1.4995106"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							CTV Vancouver: Vancouver teen coding phenom using skills for good
						</a>
					</li>
					<li>
						<a
							href="https://dailyhive.com/vancouver/apple-wwdc20-conference-winners"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							DailyHive: Canadian Students
						</a>
					</li>
					<li>
						<a
							href="https://viewthevibe.com/canadian-representation-game-strong-wwdc20s-swift-student-challenge-winners/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							Canadian Representation Game Strong: WWDC20&apos;s Swift Student Challenge Winners
						</a>
					</li>
					<li>
						<a
							href="https://dailyhive.com/vancouver/canadian-winners-apple-wwdc20-swift-student-challenge"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							DailyHive: Meet the 11 Canadian students who won Apple&apos;s Swift Challenge
						</a>
					</li>
					<li>
						<a
							href="https://mobilesyrup.com/2020/06/15/canadian-ios-app-developers-covid-19-pandemic-ipnos-ko_op-manavata-maple/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							MobileSyrup
						</a>
					</li>
					<li>
						<a
							href="https://www.citynews1130.com/2020/06/13/vancouver-teen-app/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							News1130
						</a>
					</li>
					<li>
						<a
							href="https://getconnectedmedia.com/app-show-video-podcast-tech-hoarders-unite/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							GetConnected Podcast
						</a>
					</li>
					<li>
						<a
							href="https://dailyhive.com/vancouver/apple-wwdc20-student-scholarship"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							DailyHive: WWDC - Where they are now?
						</a>
					</li>
					<li>
						<a
							href="https://www.vsb.bc.ca/News/_layouts/15/ci/post.aspx?oaid=2066f1d2-75af-4174-b4f8-8b5c35aac1f3&oact=20001"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							Vancouver School Board: Google Code-In
						</a>
					</li>
					<li>
						<a
							href="https://medium.com/turkishkit/ba%C5%9Far%C4%B1-hikayesi-pranav-karthik-57539fe7be43"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							TurkishKit Blog
						</a>
					</li>
				</ul>
			</div>

			{/* 2019 */}
			<div className="mt-8">
				<h2 className="text-2xl font-medium tracking-tight mb-4">2019</h2>
				<ul className="space-y-2">
					<li>
						<a
							href="https://www.geekwire.com/2019/best-ways-manage-everyday-work-life-tips-tricks-2019-geeks-week/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							GeekWire Time Management
						</a>
					</li>
					<li>
						<a
							href="https://www.vsb.bc.ca/News/_layouts/15/ci/post.aspx?oaid=61e8579f-ba7a-4571-98b3-eefdc8b50e34&oact=20001"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							Vancouver School Board: WWDC
						</a>
					</li>
					<li>
						<a
							href="https://dailyhive.com/vancouver/apple-ceo-tim-cook-shout-out-vancouver-teen"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							DailyHive
						</a>
					</li>
					<li>
						<a
							href="https://www.journaldemontreal.com/a-13-ans-ce-developpeur-canadien-attire-lattention-dapple"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							Journal de Montreal
						</a>
					</li>
					<li>
						<a
							href="https://www.btvancouver.ca/videos/apples-worldwide-developer-conference/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							Live TV on Breakfast Television Vancouver
						</a>
					</li>
					<li>
						<a
							href="https://www.omnitv.ca/bc/pa/videos/pranav-karthik-profile/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							Live TV on Omni Punjabi
						</a>
					</li>
					<li>
						<a
							href="https://www.btvancouver.ca/videos/13-year-old-coder-gets-apple-ceos-attention/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							CityNews
						</a>
					</li>
					<li>
						<a
							href="https://twitter.com/tim_cook/status/1135700109931343872"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							By Tim Cook on Twitter
						</a>
					</li>
					<li>
						<a
							href="https://www.geekwire.com/2019/pranav-karthik/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline text-foreground hover:text-foreground/80 transition-colors"
						>
							GeekWire&apos;s Geek of the Week
						</a>
					</li>
				</ul>
			</div>
		</main>
	);
}
