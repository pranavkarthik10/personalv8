"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = ".:";

function randomGlyph() {
	return GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? ".";
}

export default function ScrambleText({
	text,
	active,
	duration = 300,
}: {
	text: string;
	active: boolean;
	duration?: number;
}) {
	const [display, setDisplay] = useState(text);
	const frame = useRef(0);

	useEffect(() => {
		setDisplay(text);
		if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		const order = Array.from({ length: text.length }, (_, index) => index);
		for (let i = order.length - 1; i > 0; i -= 1) {
			const j = Math.floor(Math.random() * (i + 1));
			const current = order[i];
			const swap = order[j];
			if (current === undefined || swap === undefined) continue;
			order[i] = swap;
			order[j] = current;
		}

		const rank = new Array<number>(order.length);
		order.forEach((charIndex, revealIndex) => {
			rank[charIndex] = revealIndex;
		});

		const started = performance.now();
		let ticks = 0;

		const tick = (now: number) => {
			const progress = Math.min((now - started) / duration, 1);
			if (progress >= 1) {
				setDisplay(text);
				return;
			}
			if (ticks % 2 === 0) {
				const revealed = Math.floor(progress * text.length);
				let next = "";
				for (let i = 0; i < text.length; i += 1) {
					const char = text[i] ?? "";
					next += (rank[i] ?? 0) < revealed || char === " " ? char : randomGlyph();
				}
				setDisplay(next);
			}
			ticks += 1;
			frame.current = requestAnimationFrame(tick);
		};

		frame.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame.current);
	}, [active, duration, text]);

	return (
		<span aria-label={text}>
			<span aria-hidden="true">{display}</span>
		</span>
	);
}
