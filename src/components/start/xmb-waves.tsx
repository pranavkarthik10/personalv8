"use client";

import { useEffect, useRef } from "react";

type Wave = {
	amplitude: number;
	wavelength: number;
	speed: number;
	offset: number;
	height: number;
	fill: string;
};

const WAVES: Wave[] = [
	{ amplitude: 42, wavelength: 0.0038, speed: 0.00032, offset: 0, height: 0.52, fill: "rgba(70, 160, 255, 0.16)" },
	{ amplitude: 54, wavelength: 0.0026, speed: 0.00022, offset: 1.2, height: 0.58, fill: "rgba(120, 90, 255, 0.12)" },
	{ amplitude: 28, wavelength: 0.0054, speed: 0.00046, offset: 2.4, height: 0.63, fill: "rgba(80, 220, 255, 0.10)" },
];

export default function XmbWaves() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const context = canvas.getContext("2d");
		if (!context) return;

		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let frame = 0;
		let running = true;

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const width = window.innerWidth;
			const height = window.innerHeight;
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			context.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		const draw = (time: number) => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			context.clearRect(0, 0, width, height);

			for (const wave of WAVES) {
				const baseY = height * wave.height;
				context.beginPath();
				context.moveTo(0, height);
				context.lineTo(0, baseY);
				for (let x = 0; x <= width; x += 4) {
					const y =
						baseY +
						Math.sin(x * wave.wavelength + time * wave.speed + wave.offset) * wave.amplitude +
						Math.sin(x * wave.wavelength * 0.45 + time * wave.speed * 0.7) * (wave.amplitude * 0.35);
					context.lineTo(x, y);
				}
				context.lineTo(width, height);
				context.closePath();
				context.fillStyle = wave.fill;
				context.fill();
			}
		};

		resize();
		draw(0);

		const onResize = () => {
			resize();
			if (reduce) draw(0);
		};
		window.addEventListener("resize", onResize);

		if (!reduce) {
			const tick = (time: number) => {
				if (!running) return;
				draw(time);
				frame = requestAnimationFrame(tick);
			};
			frame = requestAnimationFrame(tick);
		}

		return () => {
			running = false;
			cancelAnimationFrame(frame);
			window.removeEventListener("resize", onResize);
		};
	}, []);

	return <canvas className="start-waves" aria-hidden="true" ref={canvasRef} />;
}
