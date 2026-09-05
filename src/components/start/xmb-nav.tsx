"use client";

import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	type CSSProperties,
	type ReactNode,
} from "react";
import CategoryIcon from "@/components/start/category-icon";
import { navigateFeedback, preloadClick } from "@/components/start/click-sound";
import ScrambleText from "@/components/start/scramble-text";
import type { StartCategory } from "@/components/start/start-links";

type Layer = "menu" | "items";
type Direction = "up" | "down" | "left" | "right" | "enter";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const DURATION_MS = 160;
const KEY_MAP: Record<string, Direction> = {
	ArrowUp: "up",
	ArrowDown: "down",
	ArrowLeft: "left",
	ArrowRight: "right",
	Enter: "enter",
};

function distanceOpacity(distance: number) {
	if (distance <= 0) return 1;
	if (distance === 1) return 0.55;
	if (distance === 2) return 0.3;
	return 0.15;
}

function distanceBlur(distance: number) {
	if (distance <= 0) return 0;
	if (distance === 1) return 4;
	if (distance === 2) return 8;
	return 12;
}

function SwipeHint() {
	const [phase, setPhase] = useState<"hidden" | "in" | "out">("hidden");

	useEffect(() => {
		if (!window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
		try {
			if (window.localStorage.getItem("xmb-hint-seen") === "1") return;
		} catch {
			return;
		}

		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const show = requestAnimationFrame(() => {
			try {
				window.localStorage.setItem("xmb-hint-seen", "1");
			} catch {
				// ignore
			}
			setPhase("in");
		});

		let hideTimer: number | null = null;
		let dismissed = false;
		const dismiss = () => {
			if (dismissed) return;
			dismissed = true;
			cleanup();
			if (reduce) {
				setPhase("hidden");
			} else {
				setPhase("out");
				hideTimer = window.setTimeout(() => setPhase("hidden"), 400);
			}
		};
		const timeout = window.setTimeout(dismiss, 5000);
		const cleanup = () => {
			window.clearTimeout(timeout);
			window.removeEventListener("pointerdown", dismiss);
			window.removeEventListener("keydown", dismiss);
			window.removeEventListener("wheel", dismiss);
		};
		window.addEventListener("pointerdown", dismiss);
		window.addEventListener("keydown", dismiss);
		window.addEventListener("wheel", dismiss);
		return () => {
			cancelAnimationFrame(show);
			cleanup();
			if (hideTimer) window.clearTimeout(hideTimer);
		};
	}, []);

	if (phase === "hidden") return null;
	const visible = phase === "in";

	return (
		<>
			<div className={`start-hint${visible ? " is-visible" : ""}`} aria-hidden="true">
				<span className="start-hint-chevron is-left">›</span>
				<span className="start-hint-chevron is-right">›</span>
				<span className="start-hint-chevron is-up">›</span>
				<span className="start-hint-chevron is-down">›</span>
			</div>
			<div className={`start-hint-caption${visible ? " is-visible" : ""}`} aria-hidden="true">
				swipe to explore
			</div>
		</>
	);
}

export default function XmbNav({
	categories,
	renderItem,
	onSelect,
	defaultLayer = "items",
}: {
	categories: StartCategory[];
	renderItem: (item: StartCategory["items"][number], active: boolean, category: StartCategory) => ReactNode;
	onSelect: (categoryId: string, itemId: string) => void;
	defaultLayer?: Layer;
}) {
	const rootRef = useRef<HTMLDivElement>(null);
	const categoryEls = useRef<Array<HTMLLIElement | null>>([]);
	const categoriesRef = useRef(categories);
	categoriesRef.current = categories;

	const [categoryIndex, setCategoryIndex] = useState(0);
	const [layer, setLayer] = useState<Layer>(defaultLayer);
	const [itemIndexByCategory, setItemIndexByCategory] = useState<Record<string, number>>(() => {
		const initial: Record<string, number> = {};
		for (const category of categories) initial[category.id] = 0;
		return initial;
	});
	const [trackX, setTrackX] = useState(0);

	const categoryIndexRef = useRef(categoryIndex);
	categoryIndexRef.current = categoryIndex;
	const layerRef = useRef(layer);
	layerRef.current = layer;
	const itemIndexRef = useRef(itemIndexByCategory);
	itemIndexRef.current = itemIndexByCategory;
	const onSelectRef = useRef(onSelect);
	onSelectRef.current = onSelect;
	const setItemIndexRef = useRef<(categoryId: string, next: number | ((current: number) => number)) => void>(
		() => undefined,
	);
	const dispatchRef = useRef<(direction: Direction) => (() => void) | null>(() => null);
	const previousOffsets = useRef<Record<string, Record<string, number>>>({});
	const skipTransition = useRef(false);
	const previousCategory = useRef(categoryIndex);

	const setItemIndex = useCallback((categoryId: string, next: number | ((current: number) => number)) => {
		setItemIndexByCategory((current) => {
			const category = categoriesRef.current.find((entry) => entry.id === categoryId);
			if (!category || category.items.length === 0) return current;
			const previous = current[categoryId] ?? 0;
			const resolved = typeof next === "function" ? next(previous) : next;
			const clamped = Math.max(0, Math.min(category.items.length - 1, resolved));
			if (clamped === previous) return current;
			return { ...current, [categoryId]: clamped };
		});
	}, []);
	setItemIndexRef.current = setItemIndex;

	useLayoutEffect(() => {
		rootRef.current?.focus();
	}, []);

	useEffect(() => {
		preloadClick();
	}, []);

	useLayoutEffect(() => {
		const el = categoryEls.current[categoryIndex];
		if (el) setTrackX(-el.offsetLeft);
	}, [categoryIndex, categories]);

	useLayoutEffect(() => {
		const category = categoriesRef.current[categoryIndex];
		if (!category) return;
		if (previousCategory.current !== categoryIndex) {
			previousCategory.current = categoryIndex;
			setLayer("menu");
			setItemIndexByCategory((current) => {
				if ((current[category.id] ?? 0) === 0) return current;
				skipTransition.current = true;
				return { ...current, [category.id]: 0 };
			});
		}
		previousOffsets.current[category.id] = {};
	}, [categoryIndex]);

	useEffect(() => {
		if (!skipTransition.current) return;
		requestAnimationFrame(() => {
			skipTransition.current = false;
		});
	});

	useEffect(() => {
		const moveItems = (delta: number) => {
			const category = categoriesRef.current[categoryIndexRef.current];
			if (!category || category.items.length === 0) return;
			if (layerRef.current === "menu") {
				if (delta > 0) {
					navigateFeedback();
					setLayer("items");
				}
				return;
			}
			const current = itemIndexRef.current[category.id] ?? 0;
			if (delta < 0 && current === 0) {
				navigateFeedback();
				setLayer("menu");
				return;
			}
			const next = Math.max(0, Math.min(category.items.length - 1, current + delta));
			if (next !== current) navigateFeedback();
			setItemIndexRef.current(category.id, current + delta);
		};

		const dispatch = (direction: Direction): (() => void) | null => {
			const list = categoriesRef.current;
			const category = list[categoryIndexRef.current];
			if (!category) return null;

			if (direction === "left") {
				if (categoryIndexRef.current > 0) navigateFeedback();
				setCategoryIndex((index) => Math.max(0, index - 1));
				return null;
			}
			if (direction === "right") {
				if (categoryIndexRef.current < list.length - 1) navigateFeedback();
				setCategoryIndex((index) => Math.min(list.length - 1, index + 1));
				return null;
			}
			if (direction === "enter") {
				if (category.items.length === 0) return null;
				if (layerRef.current === "menu") {
					navigateFeedback();
					setLayer("items");
					return null;
				}
				const index = itemIndexRef.current[category.id] ?? 0;
				const item = category.items[index];
				if (item) onSelectRef.current(category.id, item.id);
				return null;
			}

			const delta = direction === "down" ? 1 : -1;
			const repeat = () => moveItems(delta);
			repeat();
			return repeat;
		};
		dispatchRef.current = dispatch;

		let holdTimer: number | null = null;
		let heldKey: string | null = null;
		let holdDelay = 110;
		const stopHold = () => {
			if (holdTimer !== null) {
				window.clearTimeout(holdTimer);
				holdTimer = null;
			}
			heldKey = null;
			holdDelay = 110;
		};
		const startHold = (key: string, action: () => void) => {
			stopHold();
			heldKey = key;
			holdDelay = 110;
			const loop = () => {
				holdTimer = window.setTimeout(() => {
					action();
					holdDelay = Math.max(50, holdDelay - 8);
					loop();
				}, holdDelay);
			};
			holdTimer = window.setTimeout(() => loop(), 160);
		};

		const onKeyDown = (event: KeyboardEvent) => {
			if (!categoriesRef.current.length) return;
			const direction = KEY_MAP[event.key];
			if (!direction) return;
			event.preventDefault();
			if (event.repeat) return;
			const repeat = dispatch(direction);
			if (repeat) startHold(event.key, repeat);
		};
		const onKeyUp = (event: KeyboardEvent) => {
			if (event.key === heldKey) stopHold();
		};

		let lastWheel = 0;
		const onWheel = (event: WheelEvent) => {
			if (event.target instanceof Element && event.target.closest("[data-xmb-native-scroll]")) {
				return;
			}
			const absX = Math.abs(event.deltaX);
			const absY = Math.abs(event.deltaY);
			if (absX < 3 && absY < 3) return;
			event.preventDefault();
			const now = performance.now();
			if (now - lastWheel < 100) return;
			lastWheel = now;
			if (absX > absY) {
				const list = categoriesRef.current;
				const current = categoryIndexRef.current;
				const next = Math.max(0, Math.min(list.length - 1, current + (event.deltaX > 0 ? 1 : -1)));
				if (next !== current) navigateFeedback();
				setCategoryIndex(next);
			} else {
				moveItems(event.deltaY > 0 ? 1 : -1);
			}
		};

		const step = 56;
		const mobileStep = 38;
		const deadzone = 10;
		const flickSpeed = 0.7;
		const maxFlick = 3;
		let pointerId: number | null = null;
		let startX = 0;
		let startY = 0;
		let startTime = 0;
		let axis: "x" | "y" | null = null;
		let consumed = 0;
		let unit = step;

		const applyAxis = (which: "x" | "y", sign: number) => {
			const direction: Direction = which === "x" ? (sign < 0 ? "right" : "left") : sign < 0 ? "down" : "up";
			dispatch(direction);
		};

		const onPointerDown = (event: PointerEvent) => {
			if (!event.isPrimary || pointerId !== null) return;
			if (event.pointerType !== "mouse") {
				if (event.target instanceof Element && event.target.closest("[data-xmb-native-scroll]")) {
					return;
				}
			}
			pointerId = event.pointerId;
			startX = event.clientX;
			startY = event.clientY;
			startTime = performance.now();
			axis = null;
			consumed = 0;
			unit = window.innerWidth <= 768 ? mobileStep : step;
		};

		const onPointerMove = (event: PointerEvent) => {
			if (event.pointerId !== pointerId) return;
			const dx = event.clientX - startX;
			const dy = event.clientY - startY;
			if (!axis) {
				if (Math.abs(dx) < deadzone && Math.abs(dy) < deadzone) return;
				axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
				rootRef.current?.setPointerCapture(event.pointerId);
			}
			const delta = axis === "x" ? dx : dy;
			while (Math.abs(delta - consumed) >= unit) {
				const sign = Math.sign(delta - consumed);
				applyAxis(axis, sign);
				consumed += sign * unit;
			}
		};

		const endPointer = (event: PointerEvent, flick: boolean) => {
			if (event.pointerId !== pointerId) return;
			if (flick && axis) {
				const traveled = axis === "x" ? event.clientX - startX : event.clientY - startY;
				const elapsed = Math.max(1, performance.now() - startTime);
				const speed = Math.abs(traveled) / elapsed;
				if (speed > flickSpeed) {
					const sign = Math.sign(traveled);
					const steps = Math.min(maxFlick, Math.round(speed));
					for (let i = 0; i < steps; i += 1) applyAxis(axis, sign);
				}
			}
			pointerId = null;
			axis = null;
		};

		const onPointerUp = (event: PointerEvent) => endPointer(event, true);
		const onPointerCancel = (event: PointerEvent) => endPointer(event, false);
		const root = rootRef.current;
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("keyup", onKeyUp);
		window.addEventListener("blur", stopHold);
		root?.addEventListener("wheel", onWheel, { passive: false });
		root?.addEventListener("pointerdown", onPointerDown);
		root?.addEventListener("pointermove", onPointerMove);
		root?.addEventListener("pointerup", onPointerUp);
		root?.addEventListener("pointercancel", onPointerCancel);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("keyup", onKeyUp);
			window.removeEventListener("blur", stopHold);
			root?.removeEventListener("wheel", onWheel);
			root?.removeEventListener("pointerdown", onPointerDown);
			root?.removeEventListener("pointermove", onPointerMove);
			root?.removeEventListener("pointerup", onPointerUp);
			root?.removeEventListener("pointercancel", onPointerCancel);
			stopHold();
		};
	}, []);

	const activeCategory = categories[categoryIndex] ?? categories[0];
	if (!activeCategory) return null;

	const itemHeight = activeCategory.itemHeight;
	const activeItemIndex = itemIndexByCategory[activeCategory.id] ?? 0;
	const positioned = activeCategory.items.map((item, index) => ({
		item,
		index,
		offset: index - activeItemIndex,
	}));

	const lastOffsets = previousOffsets.current[activeCategory.id] ?? {};
	const teleporting = new Set<string>();
	for (const { item, offset } of positioned) {
		const previous = lastOffsets[item.id];
		if (previous !== undefined && Math.abs(offset - previous) > 1) {
			teleporting.add(item.id);
		}
	}
	const nextOffsets: Record<string, number> = {};
	for (const { item, offset } of positioned) nextOffsets[item.id] = offset;
	previousOffsets.current[activeCategory.id] = nextOffsets;

	return (
		<div
			ref={rootRef}
			className="start-xmb"
			tabIndex={0}
			role="application"
			aria-label="site navigation — left and right change category, up and down change item"
		>
			<span className="start-cursor" aria-hidden="true" />
			<SwipeHint />
			<div
				className={`start-categories${layer === "items" ? " is-lifted" : ""}`}
				style={{ "--row-push": `${activeItemIndex * itemHeight}px` } as CSSProperties}
			>
				<ol
					className="start-categories-track"
					role="tablist"
					style={{
						transform: `translateX(${trackX}px)`,
						transition: `transform ${DURATION_MS}ms ${EASE}`,
					}}
				>
					{categories.map((category, index) => {
						const selected = index === categoryIndex;
						const distance = Math.abs(index - categoryIndex);
						return (
							<li
								key={category.id}
								ref={(node) => {
									categoryEls.current[index] = node;
								}}
								role="tab"
								aria-selected={selected}
								className={`start-category${selected ? " is-active" : ""}${selected && layer === "menu" ? " is-selected" : ""}`}
								style={{
									opacity: distanceOpacity(distance),
									transition: `opacity ${DURATION_MS}ms ${EASE}, color ${DURATION_MS}ms ${EASE}`,
								}}
								onClick={() => {
									if (index !== categoryIndex) {
										navigateFeedback();
										setCategoryIndex(index);
										return;
									}
									if (layer !== "menu") {
										navigateFeedback();
										setLayer("menu");
									}
								}}
							>
								<CategoryIcon kind={category.icon} selected={selected} />
								<span className="start-category-label">
									<ScrambleText text={category.label} active={selected} />
								</span>
							</li>
						);
					})}
				</ol>
			</div>
			<div
				className={`start-items${layer === "items" ? " is-lifted" : ""}`}
				role="list"
				aria-label={`${activeCategory.label} entries`}
				style={{ "--item-h": `${itemHeight}px` } as CSSProperties}
			>
				{positioned.map(({ item, index, offset }) => {
					const active = offset === 0 && layer === "items";
					const distance = Math.abs(offset) + (layer === "menu" ? 1 : 0);
					const visible = distance <= 2;
					const opacity = visible ? distanceOpacity(distance) : 0;
					const jumping = teleporting.has(item.id);
					const blur = jumping ? distanceBlur(distance) + 12 : distanceBlur(distance);
					return (
						<div
							key={item.id}
							role="listitem"
							aria-current={active ? "true" : undefined}
							aria-label={item.label}
							aria-hidden={!visible}
							className={`start-item${active ? " is-active" : ""}${jumping ? " is-teleporting" : ""}`}
							style={{
								height: itemHeight,
								opacity,
								transform: `translateY(${offset * itemHeight}px)`,
								transition:
									jumping || skipTransition.current
										? "none"
										: `transform ${DURATION_MS}ms ${EASE}, opacity ${DURATION_MS}ms ${EASE}`,
								pointerEvents: opacity === 0 ? "none" : undefined,
								"--xmb-item-blur": `${blur}px`,
							} as CSSProperties}
							onClickCapture={(event) => {
								if (active) {
									if (event.target instanceof Element && event.target.closest("a, button")) {
										return;
									}
									event.preventDefault();
									event.stopPropagation();
									dispatchRef.current("enter");
									return;
								}
								event.preventDefault();
								event.stopPropagation();
								navigateFeedback();
								setLayer("items");
								setItemIndex(activeCategory.id, index);
							}}
						>
							{renderItem(item, active, activeCategory)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

