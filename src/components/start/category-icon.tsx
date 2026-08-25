"use client";

export type IconKind = "search" | "daily" | "code" | "social" | "media" | "me";

function Silhouette({ d }: { d: string }) {
	return (
		<svg viewBox="0 0 64 64" className="start-cat-mark" aria-hidden="true">
			<path fill="currentColor" d={d} />
		</svg>
	);
}

const MARKS: Record<IconKind, string> = {
	search:
		"M28 8a18 18 0 1 0 11.4 32.1l9.3 9.3a3.2 3.2 0 0 0 4.5-4.5l-9.3-9.3A18 18 0 0 0 28 8zm0 7a11 11 0 1 1 0 22 11 11 0 0 1 0-22z",
	daily:
		"M20 6.5a2.5 2.5 0 0 1 2.5 2.5v2h19V9a2.5 2.5 0 1 1 5 0v2H50a6 6 0 0 1 6 6v33a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6V17a6 6 0 0 1 6-6h3.5V9A2.5 2.5 0 0 1 20 6.5zM14 26h36v24a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V26zm6 6v8h8v-8h-8zm12 0v8h8v-8h-8z",
	code: "M22 14 7 32l15 18 5.2-4.4L16.6 32 27.2 18.4 22 14zm20 0-5.2 4.4L41.4 32 30.8 45.6 36 50l15-18-15-18zM35.4 13.2l-7.6 37.6h-5.4l7.6-37.6h5.4z",
	social:
		"M24.5 14a9.5 9.5 0 1 1 0 19 9.5 9.5 0 0 1 0-19zM41 18.5a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM8 50.5c.8-10.6 9.3-16.5 16.6-16.5 7.4 0 15.7 5.9 16.5 16.5H8zm27.2-14.2c5.6.9 11.8 5.6 12.8 14.2H56C55.3 40.4 49.4 35 43.4 35c-1.5 0-3 .3-4.4.8a18 18 0 0 1-3.8.5z",
	media:
		"M10 12h6v5H10v-5zm0 9h6v5H10v-5zm0 9h6v5H10v-5zm0 9h6v5H10v-5zm38-27h6v5h-6v-5zm0 9h6v5h-6v-5zm0 9h6v5h-6v-5zm0 9h6v5h-6v-5zM18 10h28a4 4 0 0 1 4 4v36a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4zm8 13.5v17l15-8.5-15-8.5z",
	me: "M32 10a11 11 0 1 1 0 22 11 11 0 0 1 0-22zM12 54c1.2-12.4 10.6-19 20-19s18.8 6.6 20 19H12z",
};

export default function CategoryIcon({
	kind,
	selected,
}: {
	kind: IconKind;
	selected: boolean;
}) {
	return (
		<span className={`start-cat-icon start-cat-icon-${kind}${selected ? " is-selected" : ""}`} aria-hidden="true">
			<Silhouette d={MARKS[kind]} />
		</span>
	);
}
