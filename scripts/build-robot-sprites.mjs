// Builds original minimal robot spritesheets under public/robots/.
// Run: node scripts/build-robot-sprites.mjs
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(
	require.resolve("sharp", {
		paths: [path.resolve(import.meta.dirname, "../node_modules/.pnpm/sharp@0.34.5/node_modules")],
	}),
);

const OUT_DIR = path.resolve(import.meta.dirname, "../public/robots");
const FRAME_W = 166;
const FRAME_H = 124;
const BASELINE = 104;

const ANIMS = {
	front: 12,
	back: 12,
	left: 12,
	right: 12,
	frontLeft: 12,
	frontRight: 12,
	backLeft: 12,
	backRight: 12,
	spawn: 21,
	dupe: 17,
	fall: 14,
	celebrateFront: 14,
	ponderingFront: 10,
	resting: 12,
	cursorHighFiveJump: 18,
	cursorHover: 1,
	cursorGrab: 13,
	exprFront: 7,
	exprFrontLeft: 7,
	exprFrontRight: 7,
	excitedFront: 24,
	eyesTriangleFront: 17,
};

const C = {
	edge: "#393939",
	body: "#777777",
	hi: "#cfcfcf",
	dark: "#0f0f0f",
	eye: "#f5f5f5",
	shadow: "rgba(0,0,0,.22)",
};

const rect = (x, y, w, h, fill) =>
	`<rect x="${Math.round(x)}" y="${Math.round(y)}" width="${Math.round(w)}" height="${Math.round(h)}" fill="${fill}"/>`;

function bodyGeometry(dir) {
	const side = dir === "left" || dir.includes("Left") ? -1 : dir === "right" || dir.includes("Right") ? 1 : 0;
	const back = dir.startsWith("back");
	const profile = dir === "left" || dir === "right";
	return {
		side,
		back,
		profile,
		w: profile ? 42 : 52,
		h: 42,
	};
}

function face(x, y, w, dir, mood = "normal", frame = 0) {
	const { side, back, profile } = bodyGeometry(dir);
	if (back) {
		return [
			rect(x + 11, y + 17, w - 22, 4, C.dark),
			rect(x + w / 2 - 10, y + 26, 4, 6, C.dark),
			rect(x + w / 2 - 2, y + 26, 4, 6, C.dark),
			rect(x + w / 2 + 6, y + 26, 4, 6, C.dark),
		].join("");
	}

	const panelX = x + (profile ? (side < 0 ? 7 : 12) : 8 + side * 3);
	const panelY = y + 10;
	const panelW = profile ? 24 : 36;
	const parts = [rect(panelX, panelY, panelW, 19, C.dark)];
	const eyeY = panelY + 7;
	const blink = mood === "tired" || frame % 24 === 13;
	const happy = mood === "happy";
	const worried = mood === "worried";
	const triangle = mood === "triangle";

	if (triangle) {
		parts.push(`<path d="M${panelX + panelW / 2 - 8} ${panelY + 15}h16l-8-12z" fill="${C.eye}"/>`);
		return parts.join("");
	}

	if (profile) {
		parts.push(rect(panelX + (side < 0 ? 8 : 9), eyeY, 6, blink ? 2 : 8, C.eye));
	} else {
		const dy = worried ? 2 : 0;
		parts.push(rect(panelX + 9, eyeY, 6, blink ? 2 : 8, C.eye));
		parts.push(rect(panelX + 22, eyeY + dy, 6, blink ? 2 : 8, C.eye));
	}
	if (happy) parts.push(rect(panelX + panelW / 2 - 7, panelY + 15, 14, 3, C.eye));
	return parts.join("");
}

function walkPhase(frame) {
	if (frame <= 0) return null;
	return (frame - 1) % 6;
}

function limbs(cx, baseline, dir, pose, frame) {
	const { side, profile, w, h } = bodyGeometry(dir);
	const phase = pose === "walk" ? walkPhase(frame) : null;
	const p = phase ?? 2;
	const stride = [-8, -5, 0, 8, 5, 0][p];
	const liftA = p === 1 ? -6 : p === 4 ? 3 : 0;
	const liftB = p === 4 ? -6 : p === 1 ? 3 : 0;
	const bodyBottom = baseline - 8;
	const bodyTop = bodyBottom - h;
	const armLift = pose === "celebrate" ? -22 : pose === "ponder" ? -8 : 0;
	const armSwing = pose === "walk" ? stride * 0.45 : 0;
	const sideBias = profile ? side * 4 : 0;

	return [
		rect(cx - w / 2 - 8 + sideBias, bodyTop + 14 + armLift - armSwing, 6, 22, C.edge),
		rect(cx + w / 2 + 2 + sideBias, bodyTop + 14 + armLift + armSwing, 6, 22, C.edge),
		rect(cx - 12 + stride * 0.35 + sideBias, bodyBottom - 1 + liftA, 5, 13 - liftA, C.edge),
		rect(cx + 7 - stride * 0.35 + sideBias, bodyBottom - 1 + liftB, 5, 13 - liftB, C.edge),
		rect(cx - 17 + stride + sideBias, baseline + liftA, 17, 4, C.hi),
		rect(cx + 1 - stride + sideBias, baseline + liftB, 17, 4, C.hi),
	].join("");
}

function robot({ dir = "front", frame = 0, pose = "idle", mood = "normal", scale = 1, rotate = 0, y = 0, alpha = 1 } = {}) {
	const { side, w, h } = bodyGeometry(dir);
	const cx = FRAME_W / 2;
	const baseline = BASELINE + y;
	const bodyBottom = baseline - 8;
	const bodyTop = bodyBottom - h;
	const bob = pose === "walk" && frame > 0 && frame % 6 < 3 ? -1 : 0;
	const xShift = side * (dir.includes("Right") || dir.includes("Left") ? 2 : 0);
	const x = cx - w / 2 + xShift;
	const top = bodyTop + bob;
	const shell = [
		rect(x - 4, top + 8, 4, h - 12, C.edge),
		rect(x + w, top + 8, 4, h - 12, C.edge),
		rect(x, top, w, h, C.edge),
		rect(x + 4, top + 5, w - 8, h - 9, C.body),
		rect(x + 7, top + 7, w - 14, 4, C.hi),
		face(x, top, w, dir, mood, frame),
	].join("");
	const thought =
		pose === "ponder"
			? [rect(cx + 28, top - 8, 4, 4, C.eye), rect(cx + 39, top - 18, 8, 8, C.eye)].join("")
			: "";
	const spawn =
		pose === "spawn"
			? `<rect x="${cx - 39}" y="${top - 12}" width="78" height="62" fill="none" stroke="${C.body}" stroke-width="4" opacity="${Math.max(0, 1 - frame / 18)}"/>`
			: "";

	return `
		<g opacity="${alpha}" transform="translate(${cx * (1 - scale)} ${baseline * (1 - scale)}) scale(${scale}) rotate(${rotate} ${cx} ${baseline - 28})">
			${pose === "fall" ? "" : `<ellipse cx="${cx}" cy="${baseline + 5}" rx="29" ry="5" fill="${C.shadow}"/>`}
			${limbs(cx + xShift, baseline, dir, pose, frame)}
			${shell}
			${thought}
			${spawn}
		</g>`;
}

function expression({ dir = "front", mood = "normal", frame = 0 } = {}) {
	const { w, h, side } = bodyGeometry(dir);
	const cx = FRAME_W / 2 + side * (dir.includes("Right") || dir.includes("Left") ? 2 : 0);
	const top = BASELINE - 8 - h;
	const x = cx - w / 2;
	return face(x, top, w, dir, mood, frame);
}

function hand(frame = 0, grab = false) {
	const pinch = grab ? Math.min(10, frame * 4) : 0;
	const move = grab && (frame === 3 || frame === 4) ? (frame === 3 ? -5 : 5) : 0;
	const x = 72 + move;
	const y = 35;
	return `
		<g>
			${rect(x + 2, y + 24, 34, 40, C.edge)}
			${rect(x + 8, y + 30, 22, 28, C.dark)}
			${rect(x - 12 + pinch, y + 8 + pinch, 8, 36 - pinch, C.hi)}
			${rect(x + 3, y + 0 + pinch, 8, 34 - pinch, C.hi)}
			${rect(x + 17, y + 5, 8, 28, C.hi)}
			${rect(x + 30, y + 13, 8, 24, C.hi)}
		</g>`;
}

function frameSvg(name, i, frames) {
	let art = "";
	if (name === "cursorHover") art = hand(0, false);
	else if (name === "cursorGrab") art = hand(i, true);
	else if (name === "exprFront") art = expression({ dir: "front", mood: ["normal", "worried", "normal", "happy", "happy", "worried", "tired"][i] ?? "normal", frame: i });
	else if (name === "exprFrontLeft") art = expression({ dir: "frontLeft", mood: ["normal", "worried", "normal", "happy", "happy", "worried", "tired"][i] ?? "normal", frame: i });
	else if (name === "exprFrontRight") art = expression({ dir: "frontRight", mood: ["normal", "worried", "normal", "happy", "happy", "worried", "tired"][i] ?? "normal", frame: i });
	else if (name === "excitedFront") art = expression({ dir: "front", mood: "happy", frame: i });
	else if (name === "eyesTriangleFront") art = expression({ dir: "front", mood: "triangle", frame: i });
	else if (name === "spawn") art = robot({ dir: "front", pose: "spawn", frame: i, scale: Math.min(1, 0.25 + i / 13), alpha: Math.min(1, i / 6) });
	else if (name === "dupe") {
		const split = Math.sin((i / frames) * Math.PI) * 18;
		art = `<g transform="translate(${-split} 0)">${robot({ dir: "front", frame: 0, alpha: 0.78, scale: 0.96 })}</g><g transform="translate(${split} 0)">${robot({ dir: "front", frame: 0, alpha: 0.78, scale: 0.96 })}</g>`;
	}
	else if (name === "fall") art = robot({ dir: "front", pose: "fall", mood: i > 5 ? "tired" : "worried", frame: i, rotate: -22 + i * 6, y: Math.min(16, i * 2) });
	else if (name === "celebrateFront" || name === "cursorHighFiveJump") art = robot({ dir: "front", pose: "celebrate", mood: "happy", frame: i, y: -Math.max(0, Math.sin((i / frames) * Math.PI)) * 12 });
	else if (name === "ponderingFront") art = robot({ dir: "front", pose: "ponder", frame: i });
	else if (name === "resting") art = robot({ dir: "front", pose: "idle", mood: "tired", frame: 0, y: i < 6 ? Math.min(9, i * 1.4) : Math.max(0, (12 - i) * 1.4), scale: 1 - (i < 6 ? Math.min(0.12, i * 0.018) : Math.max(0, (12 - i) * 0.018)) });
	else art = robot({ dir: name, pose: i === 0 ? "idle" : "walk", frame: i });

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${FRAME_W}" height="${FRAME_H}" viewBox="0 0 ${FRAME_W} ${FRAME_H}" shape-rendering="crispEdges">${art}</svg>`;
}

await mkdir(OUT_DIR, { recursive: true });
const manifest = {};

for (const [name, frames] of Object.entries(ANIMS)) {
	const buffers = await Promise.all(
		Array.from({ length: frames }, async (_, i) =>
			sharp(Buffer.from(frameSvg(name, i, frames))).png().toBuffer(),
		),
	);
	const strip = await sharp({
		create: {
			width: FRAME_W * frames,
			height: FRAME_H,
			channels: 4,
			background: { r: 0, g: 0, b: 0, alpha: 0 },
		},
	})
		.composite(buffers.map((input, i) => ({ input, left: i * FRAME_W, top: 0 })))
		.webp({ lossless: true })
		.toBuffer();
	await writeFile(path.join(OUT_DIR, `${name}.webp`), strip);
	manifest[name] = frames;
	console.log(`${name}: ${frames} frames, ${(strip.length / 1024).toFixed(0)}KB`);
}

await writeFile(
	path.join(OUT_DIR, "manifest.json"),
	JSON.stringify({ frameW: FRAME_W, frameH: FRAME_H, animations: manifest }, null, "\t"),
);
console.log("done ->", OUT_DIR);
