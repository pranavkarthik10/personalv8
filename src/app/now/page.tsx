import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkSmartyPants from "remark-smartypants";
import "katex/dist/katex.min.css";
import "highlight.js/styles/vs2015.min.css";

async function getNowPage() {
	try {
		const filePath = path.join(process.cwd(), "content/now.mdx");
		const fileContent = fs.readFileSync(filePath, "utf8");
		const { data: metadata, content } = matter(fileContent);
		return { metadata, content };
	} catch {
		return null;
	}
}

async function MdxContent({ source }: { source: string }) {
	const { default: Content } = await evaluate(source, {
		...runtime,
		development: false,
		remarkPlugins: [remarkMath, remarkGfm, remarkSmartyPants],
		rehypePlugins: [rehypeKatex, [rehypeHighlight, { detect: true }]],
	});

	return <Content />;
}

export async function generateMetadata(): Promise<Metadata> {
	const page = await getNowPage();

	if (!page) {
		return {
			title: "Now | Pranav Karthik",
			description: "What I'm working on and using right now",
		};
	}

	return {
		title: `${page.metadata.title} | Pranav Karthik`,
		description: page.metadata.description,
	};
}

export default async function NowPage() {
	const page = await getNowPage();

	if (!page) {
		return (
			<main className="page-frame">
				<p className="page-kicker">Now</p>
				<h1 className="page-title">Now</h1>
				<p className="page-description">Content not found.</p>
			</main>
		);
	}

	const { metadata, content } = page;

	return (
		<main className="page-frame">
			<header className="mb-10">
				<p className="page-kicker">Now</p>
				<h1 className="page-title">{metadata.title}</h1>
				{metadata.description ? (
					<p className="page-description">{metadata.description}</p>
				) : null}
			</header>

			<div className="article-prose">
				<MdxContent source={content} />
			</div>

			{metadata.lastUpdated ? (
				<p className="mt-10 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
					Last updated:{" "}
					{new Date(metadata.lastUpdated).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</p>
			) : null}
		</main>
	);
}
