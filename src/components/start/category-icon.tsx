"use client";

import type { JSX } from "react";

export type IconKind = "search" | "daily" | "code" | "social" | "media" | "me";

function SearchMark() {
	return (
		<svg viewBox="0 0 144 144" className="start-cat-mark" aria-hidden="true">
			<defs>
				<radialGradient id="search-lens" cx="38%" cy="32%" r="70%">
					<stop offset="0%" stopColor="#f4fbff" />
					<stop offset="55%" stopColor="#8ec4ff" />
					<stop offset="100%" stopColor="#1d4f9c" />
				</radialGradient>
				<linearGradient id="search-handle" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#f2f7ff" />
					<stop offset="50%" stopColor="#9bb6d8" />
					<stop offset="100%" stopColor="#3a4d6a" />
				</linearGradient>
			</defs>
			<ellipse cx="72" cy="118" rx="34" ry="8" fill="rgba(0,0,0,0.28)" />
			<rect x="86" y="82" width="18" height="42" rx="9" transform="rotate(-42 95 103)" fill="url(#search-handle)" />
			<circle cx="62" cy="60" r="28" fill="url(#search-lens)" />
			<circle cx="62" cy="60" r="18" fill="rgba(12, 28, 58, 0.35)" />
			<ellipse cx="54" cy="50" rx="10" ry="6" fill="rgba(255,255,255,0.55)" />
		</svg>
	);
}

function DailyMark() {
	return (
		<svg viewBox="0 0 144 144" className="start-cat-mark" aria-hidden="true">
			<defs>
				<linearGradient id="daily-body" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="#ffe3b0" />
					<stop offset="45%" stopColor="#ff9d3d" />
					<stop offset="100%" stopColor="#c45a12" />
				</linearGradient>
				<linearGradient id="daily-top" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="#fff3dd" />
					<stop offset="100%" stopColor="#ffbe6a" />
				</linearGradient>
			</defs>
			<ellipse cx="72" cy="120" rx="36" ry="8" fill="rgba(0,0,0,0.28)" />
			<rect x="38" y="44" width="68" height="62" rx="10" fill="url(#daily-body)" />
			<rect x="38" y="44" width="68" height="20" rx="10" fill="url(#daily-top)" />
			<rect x="38" y="54" width="68" height="10" fill="url(#daily-top)" />
			<circle cx="56" cy="48" r="4" fill="#fff" />
			<circle cx="88" cy="48" r="4" fill="#fff" />
			<rect x="50" y="76" width="12" height="12" rx="2" fill="rgba(255,255,255,0.9)" />
			<rect x="66" y="76" width="12" height="12" rx="2" fill="rgba(255,255,255,0.55)" />
			<rect x="82" y="76" width="12" height="12" rx="2" fill="rgba(255,255,255,0.32)" />
		</svg>
	);
}

function CodeMark() {
	return (
		<svg viewBox="0 0 144 144" className="start-cat-mark" aria-hidden="true">
			<defs>
				<linearGradient id="code-cube" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#d9ffc2" />
					<stop offset="45%" stopColor="#5adf6a" />
					<stop offset="100%" stopColor="#1b7a38" />
				</linearGradient>
			</defs>
			<ellipse cx="72" cy="120" rx="34" ry="8" fill="rgba(0,0,0,0.28)" />
			<path d="M72 30 L112 52 L112 96 L72 118 L32 96 L32 52 Z" fill="url(#code-cube)" />
			<path d="M72 30 L112 52 L72 74 L32 52 Z" fill="rgba(255,255,255,0.28)" />
			<path d="M72 74 L112 52 L112 96 L72 118 Z" fill="rgba(0,0,0,0.12)" />
			<path d="M58 64 L46 74 L58 84" fill="none" stroke="#f4fff0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M86 64 L98 74 L86 84" fill="none" stroke="#f4fff0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function SocialMark() {
	return (
		<svg viewBox="0 0 144 144" className="start-cat-mark" aria-hidden="true">
			<defs>
				<radialGradient id="social-a" cx="35%" cy="30%" r="70%">
					<stop offset="0%" stopColor="#ffe1f6" />
					<stop offset="100%" stopColor="#d13d9b" />
				</radialGradient>
				<radialGradient id="social-b" cx="35%" cy="30%" r="70%">
					<stop offset="0%" stopColor="#ffd0ea" />
					<stop offset="100%" stopColor="#a81f78" />
				</radialGradient>
			</defs>
			<ellipse cx="72" cy="120" rx="38" ry="8" fill="rgba(0,0,0,0.28)" />
			<circle cx="50" cy="86" r="18" fill="url(#social-b)" />
			<circle cx="94" cy="86" r="18" fill="url(#social-b)" />
			<circle cx="72" cy="58" r="22" fill="url(#social-a)" />
			<ellipse cx="64" cy="50" rx="7" ry="4" fill="rgba(255,255,255,0.5)" />
		</svg>
	);
}

function MediaMark() {
	return (
		<svg viewBox="0 0 144 144" className="start-cat-mark" aria-hidden="true">
			<defs>
				<radialGradient id="media-disc" cx="32%" cy="28%" r="75%">
					<stop offset="0%" stopColor="#d9ecff" />
					<stop offset="55%" stopColor="#3b8dff" />
					<stop offset="100%" stopColor="#123a8a" />
				</radialGradient>
			</defs>
			<ellipse cx="72" cy="120" rx="36" ry="8" fill="rgba(0,0,0,0.28)" />
			<circle cx="72" cy="72" r="38" fill="url(#media-disc)" />
			<circle cx="72" cy="72" r="12" fill="rgba(8, 18, 48, 0.45)" />
			<path d="M66 56 L96 72 L66 88 Z" fill="#f4f8ff" />
		</svg>
	);
}

function MeMark() {
	return (
		<svg viewBox="0 0 144 144" className="start-cat-mark" aria-hidden="true">
			<defs>
				<radialGradient id="me-head" cx="35%" cy="30%" r="70%">
					<stop offset="0%" stopColor="#e7fbff" />
					<stop offset="100%" stopColor="#1ea0c4" />
				</radialGradient>
				<linearGradient id="me-body" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="#b8f3ff" />
					<stop offset="100%" stopColor="#0b6f8a" />
				</linearGradient>
			</defs>
			<ellipse cx="72" cy="122" rx="36" ry="8" fill="rgba(0,0,0,0.28)" />
			<path d="M36 118 C40 84 104 84 108 118 Z" fill="url(#me-body)" />
			<circle cx="72" cy="56" r="22" fill="url(#me-head)" />
			<ellipse cx="64" cy="48" rx="7" ry="4" fill="rgba(255,255,255,0.5)" />
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
	return (
		<span className={`start-cat-icon start-cat-icon-${kind}${selected ? " is-selected" : ""}`} aria-hidden="true">
			<span className="start-orb" />
			<span className="start-cat-icon-window">
				{MARKS[kind]()}
			</span>
		</span>
	);
}
