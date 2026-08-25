"use client";

import { useEffect, useState } from "react";

const TILES = 8;

function grainUrl({
	baseFrequency,
	numOctaves,
	strength,
	seed,
}: {
	baseFrequency: number;
	numOctaves: number;
	strength: number;
	seed: number;
}) {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320"><filter id="g" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${baseFrequency}" numOctaves="${numOctaves}" seed="${seed}" stitchTiles="stitch" result="n"/><feColorMatrix in="n" type="matrix" values="0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0 0 0 0 1" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 ${strength} 0 0 0 ${-strength / 2}" result="b"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${-strength} 0 0 0 ${strength / 2}" result="d"/><feComposite in="b" in2="d" operator="over"/></filter><rect width="100%" height="100%" filter="url(#g)"/></svg>`;
	return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

export default function GrainOverlay({
	opacity = 0.14,
	baseFrequency = 0.875,
	numOctaves = 3,
	strength = 3,
	fps = 24,
}: {
	opacity?: number;
	baseFrequency?: number;
	numOctaves?: number;
	strength?: number;
	fps?: number;
}) {
	const [image, setImage] = useState<string>();

	useEffect(() => {
		setImage(grainUrl({ baseFrequency, numOctaves, strength, seed: 1 }));
	}, [baseFrequency, numOctaves, strength]);

	if (!image) return null;

	return (
		<div className="start-grain" aria-hidden="true" style={{ opacity }}>
			<div
				className="start-grain-tile"
				style={{
					backgroundImage: image,
					animationDuration: `${(TILES / fps).toFixed(4)}s`,
				}}
			/>
		</div>
	);
}
