"use client";

import {
	House,
	Mail,
	NotebookPen,
	Newspaper,
	Zap,
	Laptop,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { GitHubLogo } from "@/components/github-logo";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";
import { cn, fetcher } from "@/lib/utils";
import { preload } from "swr";

interface Tab {
	name: string;
	icon: React.ReactNode;
	href: string;
}

const tabs: Tab[] = [
	{ name: "home", icon: <House />, href: "/" },
	{ name: "blog", icon: <NotebookPen />, href: "/blog" },
	{ name: "stack", icon: <Laptop />, href: "/stack" },
	// { name: "now", icon: <Zap />, href: "/now" },
	{ name: "press", icon: <Newspaper />, href: "/press" },
];

export default function Nav() {
	const pathname = usePathname();
	const [activeTab, setActiveTab] = useState("");
	const [hydrated, setHydrated] = useState(false);
	const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
	const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0 });
	const tabRefs = useRef<(HTMLElement | null)[]>([]);

	useEffect(() => {
		setHydrated(true);
	}, []);

	useEffect(() => {
    if (!pathname) return;
    const matchedTab = tabs.find((tab) => {
        if (tab.href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(tab.href);
    });
    setActiveTab(matchedTab ? matchedTab.name : "");
	}, [pathname]);

	useEffect(() => {
		const activeIndex = tabs.findIndex((tab) => tab.name === activeTab);
		const activeTabElement = tabRefs.current[activeIndex];

		if (activeTabElement) {
			const { offsetLeft, offsetWidth } = activeTabElement;
			setIndicatorStyle({
				left: offsetLeft,
				width: offsetWidth,
			});
			setHoverStyle({
				left: offsetLeft,
				width: offsetWidth,
			});
		}
	}, [activeTab, hydrated]);

	return (
		<>
			<div className="fixed left-0 bottom-0 w-full h-20 from-background via-background/75 to-transparent bg-gradient-to-t z-20" />
			{hydrated && (
				<nav className="fixed left-0 bottom-3 px-4 w-full flex justify-center z-30">
					<TooltipProvider>
						<div className="p-0.5 bg-background/75 shadow-xl rounded-lg border h-full flex justify-center max-w-xl backdrop-blur-sm">
							<div
								className="relative"
								onMouseLeave={() => {
									setHoverStyle({
										left: indicatorStyle.left,
										width: indicatorStyle.width,
									});
								}}
							>
								{/* Hover indicator */}
								<div
									className="absolute top-0 rounded-md bg-input/5 transition-all duration-150 ease-out z-0 border"
									style={{
										left: hoverStyle.left,
										width: hoverStyle.width,
										height: 36,
										opacity:
											hoverStyle.left !== indicatorStyle.left ||
											hoverStyle.width !== indicatorStyle.width
												? 1
												: 0,
									}}
								/>
								{/* Active indicator */}
								<div
									className="absolute top-0 rounded-md bg-input/50 border transition-all duration-200 ease-out z-0"
									style={{
										left: indicatorStyle.left,
										width: indicatorStyle.width,
										height: 36,
									}}
								/>
								<ul className="flex items-center gap-0.5 relative z-10">
									{tabs.map((tab, index) => (
										<li key={tab.name}>
											<Tooltip delayDuration={500}>
												<TooltipTrigger asChild>
													<Button
														size="icon"
														variant="ghost"
														asChild
														className="h-9 w-9"
														ref={(el) => {
															tabRefs.current[index] = el;
														}}
														onMouseEnter={() => {
															setHoverStyle({
																left: tabRefs.current[index]?.offsetLeft ?? 0,
																width: tabRefs.current[index]?.offsetWidth ?? 0,
															});
														}}
													>
														<Link
															href={tab.href}
															className={cn(
																"text-foreground transition-opacity duration-200",
																activeTab === tab.name
																	? "text-primary opacity-100"
																	: "opacity-35 hover:opacity-75",
															)}
														>
															{tab.icon}
														</Link>
													</Button>
												</TooltipTrigger>
												<TooltipContent className="bg-background text-foreground">
													<p>
														{tab.name.charAt(0).toUpperCase() +
															tab.name.slice(1)}
													</p>
												</TooltipContent>
											</Tooltip>
										</li>
									))}
									<Separator
										orientation="vertical"
										className="min-h-4! mx-0.5"
									/>
									<li>
										<Tooltip delayDuration={500}>
											<TooltipTrigger asChild>
												<Button
													size="icon"
													variant="ghost"
													asChild
													className="text-muted-foreground opacity-75 hover:opacity-100 h-9 w-9"
												>
													<Link href="mailto:me@pranavkarthik.com">
														<Mail />
													</Link>
												</Button>
											</TooltipTrigger>
											<TooltipContent className="bg-background text-foreground">
												<p>Email</p>
											</TooltipContent>
										</Tooltip>
									</li>
									<li>
										<Tooltip delayDuration={500}>
											<TooltipTrigger asChild>
												<Button
													size="icon"
													variant="ghost"
													asChild
													className="text-muted-foreground opacity-75 hover:opacity-100 h-9 w-9"
												>
													<Link
														href="https://www.github.com/pranavkarthik10"
														target="_blank"
													>
														<GitHubLogo className="h-5 w-5" />
													</Link>
												</Button>
											</TooltipTrigger>
											<TooltipContent className="bg-background text-foreground">
												<p>GitHub</p>
											</TooltipContent>
										</Tooltip>
									</li>
								</ul>
							</div>
						</div>
					</TooltipProvider>
				</nav>
			)}
		</>
	);
}
