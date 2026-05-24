import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<div className="detail-back">
				<Button asChild variant="ghost" size="sm" className="-ml-3">
					<Link href="/blog">
						<ChevronLeft />
						Back to all posts
					</Link>
				</Button>
			</div>
			{children}
		</div>
	);
}
