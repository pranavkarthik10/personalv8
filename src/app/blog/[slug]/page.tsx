import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { evaluate } from "@mdx-js/mdx";
import Image from "next/image";
import type { ReactNode } from "react";
import * as runtime from "react/jsx-runtime";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkSmartyPants from "remark-smartypants";
import "katex/dist/katex.min.css";
import "highlight.js/styles/vs2015.css";
import { notFound } from "next/navigation";
import { Callout, CalloutDescription, CalloutTitle } from "@/components/callout";

type BlogPost = {
	metadata: {
		title: string;
		publishedAt: string;
		summary?: string;
		excerpt?: string;
		coverImage?: string;
		author?: string;
		readingTime?: number;
		tags?: string[];
	};
	content: string;
};

const components = {
	Callout,
	CalloutTitle,
	CalloutDescription,
	img: ({ src, alt, ...props }: { src?: string; alt?: string }) => {
		const imageSrc = src?.startsWith("/") ? src : `/${src}`;
		return (
			<figure>
				<Image
					src={imageSrc}
					alt={alt || ""}
					width={960}
					height={600}
					className="rounded-lg border border-border"
					sizes="(max-width: 768px) 100vw, 768px"
					{...props}
				/>
				{alt ? <figcaption>{alt}</figcaption> : null}
			</figure>
		);
	},
	h2: ({ children }: { children: ReactNode }) => (
		<h2 id={children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
			{children}
		</h2>
	),
	h3: ({ children }: { children: ReactNode }) => (
		<h3 id={children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
			{children}
		</h3>
	),
};

async function MdxContent({ source }: { source: string }) {
	const { default: Content } = await evaluate(source, {
		...runtime,
		development: false,
		remarkPlugins: [remarkMath, remarkGfm, remarkSmartyPants],
		rehypePlugins: [rehypeKatex, [rehypeHighlight, { detect: true }]],
	});

	return <Content components={components} />;
}

function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
	try {
		const filePath = path.join(process.cwd(), `content/blog/${slug}.mdx`);
		const fileContent = fs.readFileSync(filePath, "utf8");
		const { data: metadata, content } = matter(fileContent);
		if (metadata.private || metadata.published === false) return null;
		return { metadata: metadata as BlogPost["metadata"], content };
	} catch {
		return null;
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const post = await getBlogPost(slug);

	if (!post) return { title: "Post Not Found" };

	const { metadata } = post;
	const description = metadata.excerpt || metadata.summary || "";

	return {
		title: `${metadata.title} | Pranav Karthik`,
		description,
		authors: [{ name: metadata.author || "Pranav Karthik" }],
		openGraph: {
			title: metadata.title,
			description,
			type: "article",
			publishedTime: metadata.publishedAt,
			url: `https://pranavkarthik.com/blog/${slug}`,
			images: metadata.coverImage ? [{ url: metadata.coverImage }] : undefined,
		},
	};
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = await getBlogPost(slug);

	if (!post) notFound();

	const { metadata, content } = post;

	return (
		<main className="page-frame">
			<article>
				<header className="mb-10">
					<p className="page-kicker">Writing</p>
					<h1 className="page-title">{metadata.title}</h1>
					{metadata.summary || metadata.excerpt ? (
						<p className="page-description">{metadata.excerpt || metadata.summary}</p>
					) : null}
					<div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
						<time dateTime={metadata.publishedAt}>
							{formatDate(metadata.publishedAt)}
						</time>
						{metadata.readingTime ? <span>{metadata.readingTime} min read</span> : null}
					</div>
				</header>

				{metadata.coverImage ? (
					<Image
						src={metadata.coverImage}
						alt={`Cover image for ${metadata.title}`}
						width={960}
						height={540}
						className="mb-10 rounded-lg border border-border"
						priority
					/>
				) : null}

				<div className="article-prose">
					<MdxContent source={content} />
				</div>
			</article>
		</main>
	);
}

export async function generateStaticParams() {
	const blogDirectory = path.join(process.cwd(), "content/blog");
	const filenames = fs.readdirSync(blogDirectory);

	return filenames
		.filter((filename) => filename.endsWith(".mdx"))
		.map((filename) => {
			const filePath = path.join(blogDirectory, filename);
			const fileContent = fs.readFileSync(filePath, "utf8");
			const { data } = matter(fileContent);
			if (data.private || data.published === false) return null;
			return { slug: filename.replace(/\.mdx$/, "") };
		})
		.filter((params): params is { slug: string } => Boolean(params));
}

export const dynamicParams = false;
