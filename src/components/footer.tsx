import Link from "next/link";
import { Button } from "./ui/button";
import { GitHubLogo } from "@/components/github-logo";

export default function Footer() {
	return (
		<footer className="border-t pb-20 mt-8 px-8 py-6 text-sm flex justify-between items-center border-dashed">
			<p>
				Pranav Karthik,{" "}
				<Link
					href="https://x.com/pranavkarthik__"
					className="text-muted-foreground hover:text-foreground underline underline-offset-4 transition"
				>
					@pranavkarthik__
				</Link>
			</p>
			<Button variant="ghost" size="sm" asChild>
				<Link href="https://github.com/pranavkarthik10/personalv6">
					<GitHubLogo className="h-5 w-5" />
					Source
				</Link>
			</Button>
		</footer>
	);
}
