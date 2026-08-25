"use client";

import { useCallback, useEffect, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import GrainOverlay from "@/components/start/grain-overlay";
import LinkCard from "@/components/start/link-card";
import StartClock from "@/components/start/start-clock";
import { findStartItem, START_CATEGORIES } from "@/components/start/start-links";
import XmbNav from "@/components/start/xmb-nav";
import XmbWaves from "@/components/start/xmb-waves";

function openDestination(href: string) {
	window.location.href = href;
}

function clampOrigin(x: number, y: number) {
	return {
		x: Math.min(70, Math.max(8, x)),
		y: Math.min(60, Math.max(10, y)),
	};
}

export default function StartPage() {
	const [query, setQuery] = useState("");
	const [muted, setMuted] = useState(false);
	const [ready, setReady] = useState(false);
	const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
	const [dragging, setDragging] = useState(false);

	useEffect(() => {
		try {
			const stored = window.localStorage.getItem("start-xmb-origin");
			if (stored) {
				const parsed = JSON.parse(stored) as { x?: number; y?: number };
				if (typeof parsed.x === "number" && typeof parsed.y === "number") {
					setOrigin(clampOrigin(parsed.x, parsed.y));
				}
			}
			setMuted(window.localStorage.getItem("start-xmb-muted") === "1");
		} catch {
			// ignore
		}
		setReady(true);
		document.documentElement.classList.add("start-page");
		return () => document.documentElement.classList.remove("start-page");
	}, []);

	useEffect(() => {
		if (!ready) return;
		document.documentElement.classList.toggle("start-muted", muted);
		try {
			window.localStorage.setItem("start-xmb-muted", muted ? "1" : "0");
		} catch {
			// ignore
		}
	}, [muted, ready]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.metaKey || event.ctrlKey || event.altKey) return;
			if (event.target instanceof HTMLElement) {
				const tag = event.target.tagName;
				if (tag === "INPUT" || tag === "TEXTAREA") return;
			}
			if (event.key === "Backspace") {
				if (!query) return;
				event.preventDefault();
				setQuery((value) => value.slice(0, -1));
				return;
			}
			if (event.key === "Escape") {
				if (!query) return;
				event.preventDefault();
				setQuery("");
				return;
			}
			if (event.key.toLowerCase() === "m" && event.shiftKey) {
				event.preventDefault();
				setMuted((value) => !value);
				return;
			}
			if (event.key.length === 1 && !event.repeat) {
				setQuery((value) => (value + event.key).slice(0, 80));
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [query]);

	const onSelect = useCallback(
		(categoryId: string, itemId: string) => {
			const item = findStartItem(categoryId, itemId);
			if (!item) return;
			const trimmed = query.trim();
			if (trimmed && item.search) {
				openDestination(item.search(trimmed));
				return;
			}
			openDestination(item.href);
		},
		[query],
	);

	const onOriginPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const target = event.currentTarget;
		target.setPointerCapture(event.pointerId);
		setDragging(true);
		const startX = event.clientX;
		const startY = event.clientY;
		const originX = origin?.x ?? 30;
		const originY = origin?.y ?? 26;
		if (!origin) setOrigin({ x: originX, y: originY });

		const onMove = (move: PointerEvent) => {
			setOrigin(
				clampOrigin(
					originX + ((move.clientX - startX) / window.innerWidth) * 100,
					originY + ((move.clientY - startY) / window.innerHeight) * 100,
				),
			);
		};
		const onUp = (up: PointerEvent) => {
			target.releasePointerCapture(up.pointerId);
			target.removeEventListener("pointermove", onMove);
			target.removeEventListener("pointerup", onUp);
			setDragging(false);
			setOrigin((current) => {
				if (current) {
					try {
						window.localStorage.setItem("start-xmb-origin", JSON.stringify(current));
					} catch {
						// ignore
					}
				}
				return current;
			});
		};
		target.addEventListener("pointermove", onMove);
		target.addEventListener("pointerup", onUp);
	};

	return (
		<div
			className="start-root"
			style={
				origin
					? ({
							"--xmb-focal-x": `${origin.x}vw`,
							"--cross-y": `${origin.y}dvh`,
						} as CSSProperties)
					: undefined
			}
		>
			<XmbWaves />
			<div className="start-vignette" />
			<div className="start-weave">
				<XmbNav
					categories={START_CATEGORIES}
					onSelect={onSelect}
					renderItem={(item, active, category) => (
						<LinkCard item={item} active={active} query={query} kind={category.icon} />
					)}
				/>
			</div>
			<StartClock />
			<button
				type="button"
				className={`start-move${dragging ? " is-dragging" : ""}`}
				aria-label="Drag to move the menu"
				onPointerDown={onOriginPointerDown}
			>
				move
			</button>
			{query ? (
				<div className="start-query" aria-live="polite">
					<span>search</span>
					<strong>{query}</strong>
				</div>
			) : (
				<div className="start-help" aria-hidden="true">
					<span>← → categories</span>
					<span>↑ ↓ items</span>
					<span>enter open</span>
					<span>type to search</span>
					<span>drag move</span>
				</div>
			)}
			<button
				type="button"
				className={`start-mute${muted ? " is-muted" : ""}`}
				onClick={() => setMuted((value) => !value)}
				aria-label={muted ? "Unmute navigation click" : "Mute navigation click"}
			>
				{muted ? "sound off" : "sound on"}
			</button>
			<GrainOverlay opacity={0.05} strength={2} fps={12} />
		</div>
	);
}
