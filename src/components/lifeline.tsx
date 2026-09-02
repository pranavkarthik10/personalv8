"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SpaceXAILogo } from "@/components/spacexai-logo";
import { BIRTH_YEAR, TIMELINE, type TimelineMarker } from "@/data/timeline";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const smoothstep = (t: number) => t * t * (3 - 2 * t);

/** Width reserved for the sticky AGE / YEARS labels on the left. */
const LABELS_WIDTH = 132;
/** Empty leading room so the first year clears the left edge fade at rest. */
const LEADING_GUTTER = 200;
/** Distance from the top of the track to the dashed baseline.
 *  = age row (h-5=20) + gap (mb-9=36) + year row (h-8=32) + breathing gap (28). */
const RAIL_TOP = 116;

/** Brand marks keyed by company name (falls back to a text label otherwise). */
const COMPANY_LOGOS: Record<string, React.ReactNode> = {
	Apple: (
		<svg viewBox="0 0 24 24" className="h-[17px] w-auto" fill="currentColor" aria-label="Apple">
			<path d="M17.56 12.02c-.03-2.78 2.27-4.12 2.37-4.18-1.29-1.89-3.3-2.15-4.01-2.18-1.71-.17-3.34 1.01-4.2 1.01-.87 0-2.21-.99-3.63-.96-1.87.03-3.59 1.09-4.55 2.77-1.94 3.36-.5 8.34 1.39 11.07.92 1.33 2.02 2.83 3.46 2.77 1.39-.06 1.91-.9 3.59-.9 1.68 0 2.15.9 3.62.87 1.49-.03 2.44-1.36 3.35-2.7 1.06-1.55 1.49-3.05 1.52-3.13-.03-.01-2.88-1.1-2.91-4.44ZM14.8 3.86c.76-.92 1.27-2.2 1.13-3.47-1.09.04-2.42.73-3.2 1.64-.7.81-1.31 2.11-1.15 3.35 1.22.09 2.46-.62 3.22-1.52Z" />
		</svg>
	),
	Google: (
		<svg viewBox="0 0 24 24" className="h-[16px] w-auto" aria-label="Google">
			<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
			<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
			<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
			<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
		</svg>
	),
	Vercel: (
		<svg viewBox="0 0 74 64" className="h-[13px] w-auto" fill="currentColor" aria-label="Vercel">
			<path d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z" />
		</svg>
	),
	DYNE: <img src="/dyne.png" alt="DYNE" className="h-[18px] w-auto object-contain" />,
	UBC: <img src="/ubc-logo.png" alt="UBC" className="h-5 w-5 rounded-[5px] object-cover" />,
	SpaceXAI: <SpaceXAILogo variant="wordmark" className="h-[13px] w-auto" />,
};

/** Parse inline [label](url) links into renderable nodes. */
function renderEventText(text: string) {
	const parts: React.ReactNode[] = [];
	const re = /\[([^\]]+)\]\(([^)]+)\)/g;
	let last = 0;
	let match: RegExpExecArray | null;
	let key = 0;
	while ((match = re.exec(text)) !== null) {
		if (match.index > last) parts.push(text.slice(last, match.index));
		const [, label, href] = match;
		const internal = href.startsWith("/");
		parts.push(
			<Link
				key={key++}
				href={href}
				target={internal ? undefined : "_blank"}
				rel={internal ? undefined : "noreferrer"}
				className="text-zinc-200 underline decoration-zinc-600 decoration-1 underline-offset-[3px] transition-colors hover:decoration-zinc-300"
			>
				{label}
			</Link>,
		);
		last = match.index + match[0].length;
	}
	if (last < text.length) parts.push(text.slice(last));
	return parts;
}

/** Per-column width: compact for empty years, content-driven otherwise. */
function markerWidth(marker: TimelineMarker) {
	const events = marker.events ?? [];
	if (events.length === 0 && !(marker.companies && marker.companies.length)) return 184;
	let w = 150;
	if (marker.companies?.length) w += 24;
	w += events.reduce((sum, e) => sum + 60 + Math.min(40, Math.floor(e.length / 6)), 0);
	return clamp(w, 300, 440);
}

export default function Lifeline() {
	const markers = TIMELINE;
	const viewportRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const labelsRef = useRef<HTMLDivElement>(null);
	const markerRefs = useRef<(HTMLLIElement | null)[]>([]);
	const yearRefs = useRef<(HTMLSpanElement | null)[]>([]);

	// Scroll engine state.
	const pos = useRef(0);
	const maxScroll = useRef(0);
	const velocity = useRef(0);
	const rafMomentum = useRef(0);
	const dragging = useRef(false);
	const pointerId = useRef<number | null>(null);
	const dragStart = useRef({ x: 0, translate: 0 });
	const lastMove = useRef({ x: 0, t: 0 });

	const [ready, setReady] = useState(false);
	const [intro, setIntro] = useState(false);

	const widths = useMemo(() => markers.map((m) => markerWidth(m)), [markers]);

	const apply = useCallback((next: number) => {
		const t = clamp(next, 0, maxScroll.current);
		pos.current = t;
		const track = trackRef.current;
		if (track) track.style.transform = `translate3d(${-t}px, 0, 0)`;

		// Sticky labels: counter-translate so they stay pinned at the left edge.
		const labels = labelsRef.current;
		if (labels) {
			if (t > 0) {
				labels.style.transform = `translate3d(${t}px, 0, 0)`;
				labels.classList.add("is-pinned");
			} else {
				labels.style.transform = "";
				labels.classList.remove("is-pinned");
			}
		}

		// Edge fade: ease whole columns out as they approach either edge.
		// Also highlight the year nearest the viewport center.
		const vw = window.innerWidth;
		const mid = vw / 2;
		const leftFull = 340; // fully visible at/after this x
		const leftEdge = 60; // fully faded at/before this x
		const rightBand = 240;
		let activeIdx = -1;
		let activeDist = Infinity;
		for (let i = 0; i < markerRefs.current.length; i++) {
			const el = markerRefs.current[i];
			if (!el) continue;
			const r = el.getBoundingClientRect();
			const center = r.left + r.width / 2;
			let o = clamp((r.left - leftEdge) / (leftFull - leftEdge), 0, 1);
			if (center > vw - rightBand) o = Math.min(o, (vw - center) / rightBand);
			el.style.opacity = String(smoothstep(clamp(o, 0, 1)));
			// Track the year-marker (its left edge, where the number sits) closest to center.
			const dist = Math.abs(r.left - mid);
			if (o > 0.6 && dist < activeDist) {
				activeDist = dist;
				activeIdx = i;
			}
		}
		for (let i = 0; i < yearRefs.current.length; i++) {
			const span = yearRefs.current[i];
			if (span) span.style.color = i === activeIdx ? "#fafafa" : "";
		}
	}, []);

	const measure = useCallback(() => {
		const track = trackRef.current;
		const viewport = viewportRef.current;
		if (!track || !viewport) return;
		maxScroll.current = Math.max(0, track.scrollWidth - viewport.clientWidth);
		apply(pos.current);
	}, [apply]);

	// Lock page scroll while the lifeline is mounted.
	useEffect(() => {
		const html = document.documentElement;
		const body = document.body;
		html.classList.add("lifeline-scroll");
		const prevHtml = html.style.overflow;
		const prevBody = body.style.overflow;
		html.style.overflow = "hidden";
		body.style.overflow = "hidden";
		window.scrollTo(0, 0);
		return () => {
			html.classList.remove("lifeline-scroll");
			html.style.overflow = prevHtml;
			body.style.overflow = prevBody;
		};
	}, []);

	useLayoutEffect(() => {
		measure();
		setReady(true);
		const id = requestAnimationFrame(() => {
			setIntro(true);
			measure();
		});
		const ro = new ResizeObserver(measure);
		if (trackRef.current) ro.observe(trackRef.current);
		window.addEventListener("resize", measure);
		return () => {
			cancelAnimationFrame(id);
			ro.disconnect();
			window.removeEventListener("resize", measure);
		};
	}, [measure]);

	// Wheel / drag / keyboard engine.
	useEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport) return;

		const stopMomentum = () => {
			cancelAnimationFrame(rafMomentum.current);
			rafMomentum.current = 0;
		};

		const runMomentum = () => {
			if (Math.abs(velocity.current) < 0.08) return;
			stopMomentum();
			let prev = performance.now();
			const step = (now: number) => {
				const dt = Math.min(now - prev, 32);
				prev = now;
				const v = velocity.current;
				if (Math.abs(v) < 0.025) {
					velocity.current = 0;
					rafMomentum.current = 0;
					return;
				}
				const next = clamp(pos.current + v * dt, 0, maxScroll.current);
				if (next !== pos.current) apply(next);
				if (next <= 0 || next >= maxScroll.current) {
					velocity.current = 0;
					rafMomentum.current = 0;
					return;
				}
				velocity.current = v * Math.pow(0.94, dt / 16.67);
				rafMomentum.current = requestAnimationFrame(step);
			};
			rafMomentum.current = requestAnimationFrame(step);
		};

		const onWheel = (e: WheelEvent) => {
			if (maxScroll.current <= 0) return;
			e.preventDefault();
			let delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
			if (e.deltaMode === 1) delta *= 16;
			else if (e.deltaMode === 2) delta *= window.innerHeight;
			// Inverted to match the reference: gesture drags the timeline, not the viewport.
			const move = -1.4 * delta;
			apply(pos.current + move);
			velocity.current = 0.35 * velocity.current + (move / 16.67) * 0.2275;
			if (rafMomentum.current === 0) runMomentum();
		};

		const onPointerDown = (e: PointerEvent) => {
			if (maxScroll.current <= 0) return;
			if (e.target instanceof Element && e.target.closest("a, button")) return;
			stopMomentum();
			velocity.current = 0;
			dragging.current = true;
			pointerId.current = e.pointerId;
			dragStart.current = { x: e.clientX, translate: pos.current };
			lastMove.current = { x: e.clientX, t: performance.now() };
			viewport.setPointerCapture?.(e.pointerId);
			viewport.style.cursor = "grabbing";
		};

		const onPointerMove = (e: PointerEvent) => {
			if (!dragging.current || e.pointerId !== pointerId.current) return;
			const now = performance.now();
			const last = lastMove.current;
			const dt = now - last.t;
			if (dt > 0 && dt < 80) {
				const v = -(e.clientX - last.x) / dt;
				velocity.current = 0.65 * v + 0.35 * velocity.current;
			}
			lastMove.current = { x: e.clientX, t: now };
			apply(dragStart.current.translate - (e.clientX - dragStart.current.x));
		};

		const onPointerUp = (e: PointerEvent) => {
			if (e.pointerId !== pointerId.current) return;
			const wasDragging = dragging.current;
			dragging.current = false;
			pointerId.current = null;
			if (viewport.hasPointerCapture?.(e.pointerId)) viewport.releasePointerCapture(e.pointerId);
			viewport.style.cursor = "";
			if (wasDragging) runMomentum();
		};

		const onKey = (e: KeyboardEvent) => {
			if (maxScroll.current <= 0) return;
			const stepSize = 0.18 * window.innerWidth;
			const jump = (to: number) => {
				e.preventDefault();
				stopMomentum();
				velocity.current = 0;
				apply(to);
			};
			if (e.key === "ArrowLeft" || e.key === "ArrowUp") jump(pos.current - stepSize);
			else if (e.key === "ArrowRight" || e.key === "ArrowDown") jump(pos.current + stepSize);
			else if (e.key === "Home") jump(0);
			else if (e.key === "End") jump(maxScroll.current);
		};

		window.addEventListener("wheel", onWheel, { passive: false });
		viewport.addEventListener("pointerdown", onPointerDown);
		viewport.addEventListener("pointermove", onPointerMove, { passive: false });
		viewport.addEventListener("pointerup", onPointerUp);
		viewport.addEventListener("pointercancel", onPointerUp);
		window.addEventListener("keydown", onKey);
		return () => {
			stopMomentum();
			window.removeEventListener("wheel", onWheel);
			viewport.removeEventListener("pointerdown", onPointerDown);
			viewport.removeEventListener("pointermove", onPointerMove);
			viewport.removeEventListener("pointerup", onPointerUp);
			viewport.removeEventListener("pointercancel", onPointerUp);
			window.removeEventListener("keydown", onKey);
		};
	}, [apply]);

	return (
		<div
			ref={viewportRef}
			aria-label="Life timeline"
			className={`relative flex h-full cursor-grab items-center overflow-hidden select-none ${
				ready ? "" : "invisible"
			}`}
		>
			<div className="relative w-full">
				{/* Full-bleed dashed baseline, aligned to every year row */}
				<div
					aria-hidden
					className="pointer-events-none absolute inset-x-0 overflow-hidden"
					style={{ top: RAIL_TOP }}
				>
					<div
						className={`h-px w-full border-t border-dashed border-zinc-800 ${
							intro ? "lifeline-rail-intro" : ""
						}`}
					/>
				</div>

				{/* Scrolling track */}
				<div ref={trackRef} className="flex w-max items-start will-change-transform">
					{/* Sticky AGE / YEARS labels */}
					<div
						ref={labelsRef}
						className="lifeline-labels relative z-10 shrink-0 will-change-transform"
						style={{ width: LABELS_WIDTH }}
					>
						<div className={`pl-6 sm:pl-8 ${intro ? "lifeline-labels-intro" : "opacity-0"}`}>
							<div className="mb-9 flex h-5 items-end">
								<span className="text-[12px] font-medium uppercase leading-none tracking-[0.14em] text-zinc-600">
									Age
								</span>
							</div>
							<div className="flex h-8 items-end">
								<span className="text-[12px] font-medium uppercase leading-none tracking-[0.14em] text-zinc-600">
									Years
								</span>
							</div>
						</div>
					</div>

					{/* Leading gutter so the first year clears the edge fade */}
					<div aria-hidden className="shrink-0" style={{ width: LEADING_GUTTER }} />

					{/* Year columns */}
					<ul className="relative flex items-start">
						{markers.map((marker, i) => {
							const age = marker.year - BIRTH_YEAR;
							const events = marker.events ?? [];
							const companies = marker.companies ?? [];
							return (
								<li
									key={marker.year}
									ref={(el) => {
										markerRefs.current[i] = el;
									}}
									aria-label={String(marker.year)}
									className="relative pb-10"
									style={{ minWidth: widths[i] }}
								>
									{/* Tick on the baseline */}
									<span
										aria-hidden
										className="absolute left-0 w-px bg-zinc-700"
										style={{ top: RAIL_TOP - 3, height: 7 }}
									/>

									<div
										className={intro ? "lifeline-marker-intro" : "opacity-0"}
										style={{ animationDelay: intro ? `${100 + i * 45}ms` : undefined }}
									>
										{/* Age row */}
										<div className="mb-9 flex h-5 items-end">
											<span className="text-[12px] font-medium leading-none tabular-nums text-zinc-600">
												{age >= 0 ? age : ""}
											</span>
										</div>
										{/* Years row */}
										<div className="flex h-8 items-end">
											<span
												ref={(el) => {
													yearRefs.current[i] = el;
												}}
												className="text-[22px] font-medium leading-none tabular-nums text-zinc-500 transition-colors duration-200"
											>
												{marker.year}
											</span>
										</div>

										{(events.length > 0 || companies.length > 0) && (
											<div className="mt-14 min-w-0 text-zinc-400">
												{companies.length > 0 && (
													<div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
														{companies.map((c) => {
															const logo = COMPANY_LOGOS[c.name];
															const inner = logo ?? (
																<span className="text-[11px] font-medium uppercase tracking-[0.1em]">
																	{c.name}
																</span>
															);
															const className =
																"inline-flex items-center text-zinc-300 opacity-90 transition-opacity hover:opacity-100";
															return c.href ? (
																<Link
																	key={c.name}
																	href={c.href}
																	target="_blank"
																	rel="noreferrer"
																	aria-label={c.name}
																	className={className}
																>
																	{inner}
																</Link>
															) : (
																<span key={c.name} className={className}>
																	{inner}
																</span>
															);
														})}
													</div>
												)}
												{events.length > 0 && (
													<div className="space-y-4">
														{events.map((text, j) => (
															<p
																key={j}
																className="max-w-[17rem] text-left text-[14px] leading-[1.55] tracking-[-0.01em]"
															>
																{renderEventText(text)}
															</p>
														))}
													</div>
												)}
											</div>
										)}
									</div>
								</li>
							);
						})}
						{/* Trailing room so the final year settles near center, clear of the right edge */}
						<li aria-hidden className="shrink-0" style={{ width: "30vw" }} />
					</ul>
				</div>
			</div>
		</div>
	);
}
