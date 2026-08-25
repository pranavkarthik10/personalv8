"use client";

import type { JSX } from "react";

type IconKind = "search" | "daily" | "code" | "social" | "media" | "me";

function SearchMark() {
	return (
		<svg viewBox="0 0 144 144" className="start-cat-mark" aria-hidden="true">
			<circle cx="62" cy="62" r="28" fill="none" stroke="currentColor" strokeWidth="3" />
			<path d="M82 82 L108 108" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
			<circle className="start-cat-orbit" cx="62" cy="62" r="8" fill="currentColor" />
		</svg>
	);
}

function DailyMark() {
	return (
		<svg viewBox="0 0 144 144" className="start-cat-mark" aria-hidden="true">
			<rect x="38" y="44" width="68" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
			<path d="M38 60 H106" fill="none" stroke="currentColor" strokeWidth="3" />
			<path d="M54 44 V36 M90 44 V36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
			<rect className="start-cat-orbit" x="54" y="74" width="10" height="10" fill="currentColor" />
			<rect x="72" y="74" width="10" height="10" fill="currentColor" opacity="0.45" />
			<rect x="90" y="74" width="10" height="10" fill="currentColor" opacity="0.2" />
		</svg>
	);
}

function CodeMark() {
	return (
		<svg viewBox="0 0 144 144" className="start-cat-mark" aria-hidden="true">
			<path d="M54 44 L34 72 L54 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M90 44 L110 72 L90 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
			<path className="start-cat-orbit" d="M78 40 L66 104" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
		</svg>
	);
}

function SocialMark() {
	return (
		<svg viewBox="0 0 144 144" className="start-cat-mark" aria-hidden="true">
			<circle cx="72" cy="52" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
			<circle cx="48" cy="92" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
			<circle cx="96" cy="92" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
			<path d="M64 62 L54 82 M80 62 L90 82 M60 92 H84" fill="none" stroke="currentColor" strokeWidth="3" />
			<circle className="start-cat-orbit" cx="72" cy="52" r="4" fill="currentColor" />
		</svg>
	);
}

function MediaMark() {
	return (
		<svg viewBox="0 0 144 144" className="start-cat-mark" aria-hidden="true">
			<circle cx="72" cy="72" r="34" fill="none" stroke="currentColor" strokeWidth="3" />
			<path d="M62 54 L98 72 L62 90 Z" fill="currentColor" />
			<circle className="start-cat-orbit" cx="72" cy="72" r="42" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
		</svg>
	);
}

function MeMark() {
	return (
		<svg viewBox="0 0 144 144" className="start-cat-mark" aria-hidden="true">
			<circle cx="72" cy="58" r="16" fill="none" stroke="currentColor" strokeWidth="3" />
			<path d="M44 108 C48 84 96 84 100 108" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
			<circle className="start-cat-orbit" cx="72" cy="58" r="4" fill="currentColor" />
		</svg>
	);
}

const MARKS: Record<IconKind, () => JSX.Element> = {
	search: SearchMark,
	daily: DailyMark,
	code: CodeMark,
	social: SocialMark,
	media: MediaMark,
	me: MeMark,
};

export default function CategoryIcon({
	kind,
	selected,
}: {
	kind: IconKind;
	selected: boolean;
}) {
	const Mark = MARKS[kind];
	return (
		<span className={`start-cat-icon${selected ? " is-selected" : ""}`} aria-hidden="true">
			<span className="start-cat-icon-window">
				<Mark />
			</span>
		</span>
	);
}
