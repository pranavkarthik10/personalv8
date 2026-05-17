import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import "highlight.js/styles/vs2015.min.css";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkSmartyPants from "remark-smartypants";

// Get now page content
async function getNowPage() {
    const filePath = path.join(process.cwd(), "content/now.mdx");

    try {
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data: metadata, content } = matter(fileContent);
        return { metadata, content };
    } catch (error) {
        return null;
    }
}

// Generate metadata for the page
export async function generateMetadata(): Promise<Metadata> {
    const page = await getNowPage();

    if (!page) {
        return {
            title: "Now - Pranav Karthik",
            description: "What I'm working on and using right now",
        };
    }

    const { metadata } = page;

    return {
        title: `${metadata.title} - Pranav Karthik`,
        description: metadata.description,
    };
}

export default async function NowPage() {
    const page = await getNowPage();

    if (!page) {
        return (
            <>
                <div className="px-4 pb-24">
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold mb-8">Now</h1>
                        <p>Content not found.</p>
                    </div>
                </div>
            </>
        );
    }

    const { metadata, content } = page;

    return (
        <main className="px-8 pt-4 pb-24">
            <article>
                <header className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">{metadata.title}</h1>
                    {metadata.description && (
                        <p className="text-lg text-muted-foreground mb-4">
                            {metadata.description}
                        </p>
                    )}
                </header>
                <div className="prose dark:prose-invert max-w-none">
                    <MDXRemote
                        source={content}
                        components={{
                            h1: ({ children }: { children: ReactNode }) => (
                                <h1
                                    id={children
                                        ?.toString()
                                        .toLowerCase()
                                        .replace(/[^a-z0-9]+/g, "-")}
                                >
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }: { children: ReactNode }) => (
                                <h2
                                    id={children
                                        ?.toString()
                                        .toLowerCase()
                                        .replace(/[^a-z0-9]+/g, "-")}
                                >
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }: { children: ReactNode }) => (
                                <h3
                                    id={children
                                        ?.toString()
                                        .toLowerCase()
                                        .replace(/[^a-z0-9]+/g, "-")}
                                >
                                    {children}
                                </h3>
                            ),
                        }}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkMath, remarkGfm, remarkSmartyPants],
                                rehypePlugins: [
                                    rehypeKatex,
                                    [rehypeHighlight, { detect: true }],
                                ],
                            },
                        }}
                    />
                    {metadata.lastUpdated && (
                        <p className="text-sm text-muted-foreground mt-12 border-t pt-6">
                            Last updated: {new Date(metadata.lastUpdated).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    )}
                </div>
            </article>
        </main>
    );
}
