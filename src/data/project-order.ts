export const projectOrder = [
	"grokhunt",
	"interconnected",
	"vercel-ts",
	"lazycal",
	"trackr",
	"sim-grab",
	"discord-swiftui",
	"google-workspace-marketplace",
];

export function sortProjectsByOrder<T extends { slug: string }>(projects: T[]): T[] {
	return [...projects].sort((a, b) => {
		const aIndex = projectOrder.indexOf(a.slug);
		const bIndex = projectOrder.indexOf(b.slug);
		return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
	});
}
