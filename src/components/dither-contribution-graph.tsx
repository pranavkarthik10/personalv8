"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { BAYER, bloomLayerStyle, CELL, clamp01 } from "@/components/dither-kit/dither-paint";
import { PALETTE, rgb } from "@/components/dither-kit/palette";
import type { ContributionDay } from "@/lib/github-activity";

const WEEKDAYS = ["", "mon", "", "wed", "", "fri", ""];
const GREEN = PALETTE.green.fill;

type Props = {
	days: ContributionDay[];
	className?: string;
};

function levelDensity(level: number, maxLevel: number) {
	if (level <= 0) return 0;
	return clamp01(0.18 + (level / maxLevel) * 0.82);
}

function paintCell(
	ctx: CanvasRenderingContext2D,
	x0: number,
	y0: number,
	size: number,
	density: number,
) {
	if (density <= 0) {
		ctx.fillStyle = "rgba(120,120,128,0.18)";
		ctx.fillRect(x0, y0, size, size);
		return;
	}

	for (let y = 0; y < size; y += 1) {
		for (let x = 0; x < size; x += 1) {
			const threshold = BAYER[(y0 + y) & 3]![(x0 + x) & 3]!;
			const lit = density > threshold;
			const alpha = lit ? 0.28 + density * 0.72 : 0.12 + density * 0.18;
			ctx.fillStyle = rgb(GREEN, 1, alpha);
			ctx.fillRect(x0 + x, y0 + y, 1, 1);
		}
	}
}

export function DitherContributionGraph({ days, className }: Props) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const crispRef = useRef<HTMLCanvasElement>(null);
	const bloomRef = useRef<HTMLCanvasElement>(null);
	const [tip, setTip] = useState<{ label: string; x: number; y: number } | null>(null);

	const maxLevel = Math.max(1, ...days.map((day) => day.level));
	const first = days[0] ? new Date(`${days[0].date}T12:00:00`) : new Date();
	const padStart = first.getDay(); // Sunday=0
	const total = padStart + days.length;
	const weeks = Math.ceil(total / 7);

	useEffect(() => {
		const wrap = wrapRef.current;
		const crisp = crispRef.current;
		const bloom = bloomRef.current;
		if (!wrap || !crisp || !bloom || days.length === 0) return;

		const paint = () => {
			const cssWidth = wrap.clientWidth;
			if (cssWidth <= 0) return;

			const labelW = 28;
			const legendH = 18;
			const gap = 2;
			const available = Math.max(120, cssWidth - labelW);
			const cell = Math.max(CELL + 1, Math.floor((available - gap * (weeks - 1)) / weeks));
			const plotW = weeks * (cell + gap) - gap;
			const plotH = 7 * (cell + gap) - gap;
			const width = labelW + plotW;
			const height = plotH + legendH + 8;
			const dpr = Math.min(2, window.devicePixelRatio || 1);

			for (const canvas of [crisp, bloom]) {
				canvas.width = Math.round(width * dpr);
				canvas.height = Math.round(height * dpr);
				canvas.style.width = `${width}px`;
				canvas.style.height = `${height}px`;
				const ctx = canvas.getContext("2d");
				if (!ctx) continue;
				ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
				ctx.clearRect(0, 0, width, height);
			}

			const ctx = crisp.getContext("2d");
			const bctx = bloom.getContext("2d");
			if (!ctx || !bctx) return;

			ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
			ctx.fillStyle = "rgba(120,120,128,0.9)";
			WEEKDAYS.forEach((label, i) => {
				if (!label) return;
				ctx.fillText(label, 0, i * (cell + gap) + cell - 1);
			});

			days.forEach((day, index) => {
				const slot = padStart + index;
				const week = Math.floor(slot / 7);
				const weekday = slot % 7;
				const x = labelW + week * (cell + gap);
				const y = weekday * (cell + gap);
				paintCell(ctx, x, y, cell, levelDensity(day.level, maxLevel));
				paintCell(bctx, x, y, cell, levelDensity(day.level, maxLevel));
			});

			const legendY = plotH + 10;
			ctx.fillStyle = "rgba(120,120,128,0.9)";
			ctx.fillText("less", labelW, legendY + cell - 1);
			const levels = [0, 1, 2, 3, 4];
			levels.forEach((level, i) => {
				const x = labelW + 34 + i * (cell + gap);
				paintCell(ctx, x, legendY, cell, levelDensity(level, 4));
			});
			ctx.fillText("more", labelW + 34 + levels.length * (cell + gap) + 4, legendY + cell - 1);
		};

		paint();
		const observer = new ResizeObserver(paint);
		observer.observe(wrap);
		return () => observer.disconnect();
	}, [days, maxLevel, padStart, weeks]);

	const onMove = (event: MouseEvent<HTMLDivElement>) => {
		const wrap = wrapRef.current;
		if (!wrap || days.length === 0) return;
		const rect = wrap.getBoundingClientRect();
		const cssWidth = wrap.clientWidth;
		const labelW = 28;
		const gap = 2;
		const available = Math.max(120, cssWidth - labelW);
		const cell = Math.max(CELL + 1, Math.floor((available - gap * (weeks - 1)) / weeks));
		const x = event.clientX - rect.left - labelW;
		const y = event.clientY - rect.top;
		if (x < 0 || y < 0) {
			setTip(null);
			return;
		}
		const week = Math.floor(x / (cell + gap));
		const weekday = Math.floor(y / (cell + gap));
		if (week < 0 || week >= weeks || weekday < 0 || weekday > 6) {
			setTip(null);
			return;
		}
		const slot = week * 7 + weekday;
		const index = slot - padStart;
		const day = days[index];
		if (!day) {
			setTip(null);
			return;
		}
		setTip({
			label: `${day.count} contribution${day.count === 1 ? "" : "s"} · ${day.date}`,
			x: event.clientX - rect.left,
			y: event.clientY - rect.top,
		});
	};

	return (
		<div
			ref={wrapRef}
			className={className}
			onMouseLeave={() => setTip(null)}
			onMouseMove={onMove}
			role="img"
			aria-label="GitHub contribution heatmap"
			style={{ position: "relative", width: "100%" }}
		>
			<canvas
				ref={bloomRef}
				aria-hidden
				style={{
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					imageRendering: "auto",
					...(bloomLayerStyle("low", true) ?? {}),
				}}
			/>
			<canvas
				ref={crispRef}
				style={{ display: "block", width: "100%", height: "auto", imageRendering: "pixelated" }}
			/>
			{tip ? (
				<div
					className="stats-chart-tip"
					style={{ left: tip.x, top: tip.y }}
				>
					{tip.label}
				</div>
			) : null}
		</div>
	);
}
