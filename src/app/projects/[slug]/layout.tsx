import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProjectLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<div className="detail-back !max-w-full">
				<Button asChild variant="ghost" size="sm" className="-ml-3">
					<Link href="/projects">
						<ChevronLeft />
						Back to all projects
					</Link>
				</Button>
			</div>
			{children}
		</div>
	);
}
