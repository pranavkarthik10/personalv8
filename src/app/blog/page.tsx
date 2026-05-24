import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

type PostMetadata = {
	title: string;
	publishedAt: string;
	summary: string;
	slug: string;
};

function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

function getBlogPosts(): PostMetadata[] {
	const blogDirectory = path.join(process.cwd(), "content/blog");
	const filenames = fs.readdirSync(blogDirectory);

	return filenames
		.filter((filename) => filename.endsWith(".mdx"))
		.map((filename) => {
			const filePath = path.join(blogDirectory, filename);
			const fileContent = fs.readFileSync(filePath, "utf8");
			const { data } = matter(fileContent);
			if (data.private || data.published === false) return null;
			return {
				title: data.title,
				publishedAt: data.publishedAt,
				summary: data.summary,
				slug: filename.replace(/\.mdx$/, ""),
			};
		})
		.filter((post): post is PostMetadata => Boolean(post))
		.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
		);
}

export default function BlogPage() {
	const posts = getBlogPosts();

	return (
		<main className="page-frame">
			<section>
				<p className="page-kicker">Writing</p>
				<h1 className="page-title">Notes on software and interfaces.</h1>
				<p className="page-description">
					Short essays and unfinished thoughts on agents, product craft, and the
					tools I keep thinking about.
				</p>
			</section>

			<section className="mt-10 divide-y divide-border">
				{posts.map((post) => (
					<Link
						key={post.slug}
						href={`/blog/${post.slug}`}
						className="group block py-5"
					>
						<div className="flex items-baseline justify-between gap-6">
							<h2 className="text-lg font-medium leading-snug tracking-[-0.025em] transition-colors group-hover:text-foreground">
								{post.title}
							</h2>
							<time
								dateTime={post.publishedAt}
								className="shrink-0 font-mono text-xs text-muted-foreground"
							>
								{formatDate(post.publishedAt)}
							</time>
						</div>
						<p className="mt-2 text-sm leading-6 text-muted-foreground">
							{post.summary}
						</p>
					</Link>
				))}
			</section>
		</main>
	);
}
