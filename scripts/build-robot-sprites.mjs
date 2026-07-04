// Downloads the Vercel Ship '26 robot sprite frames and packs them into
// horizontal spritesheet strips under public/robots/.
// Frame source layout was reverse-engineered from vercel.com/ship/nyc chunks.
// Run: node scripts/build-robot-sprites.mjs
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
// sharp is a transitive dep (via next) and not hoisted by pnpm
const sharp = require(
	require.resolve("sharp", {
		paths: [path.resolve(import.meta.dirname, "../node_modules/.pnpm/sharp@0.34.5/node_modules")],
	}),
);

const SPRITE_BASE = "https://vercel.com/vc-ap-ship-2026/assets/hero/sprites/Isometric";
const OUT_DIR = path.resolve(import.meta.dirname, "../public/robots");
const FRAME_W = 166;
const FRAME_H = 124;

const range = (prefix, n) => Array.from({ length: n }, (_, i) => `${prefix}${i + 1}.png`);
const dirCycle = (dir) => [`Isometric_${dir}_Idle.png`, ...range(`Isometric_${dir}_Walk`, 11)];

/** name -> { folder, frames } */
const ANIMS = {
	front: { folder: "Front", frames: dirCycle("Front") },
	back: { folder: "Back", frames: dirCycle("Back") },
	left: { folder: "Left", frames: dirCycle("Left") },
	right: { folder: "Right", frames: dirCycle("Right") },
	frontLeft: { folder: "Front_Left", frames: dirCycle("FrontLeft") },
	frontRight: { folder: "Front_Right", frames: dirCycle("FrontRight") },
	backLeft: { folder: "Back_Left", frames: dirCycle("BackLeft") },
	backRight: { folder: "Back_Right", frames: dirCycle("BackRight") },
	spawn: { folder: "Agent_Spawn", frames: range("Isometric_Front_AgentSpawn", 21) },
	dupe: { folder: "Duplication", frames: range("Duplication", 17) },
	fall: {
		folder: "CursorHand",
		frames: [
			"CursorHand_PinchState_Drop_Fall1.png",
			"CursorHand_PinchState_Drop_Fall2.png",
			"CursorHand_PinchState_Drop_Fall_Idle.png",
			...range("CursorHand_PinchState_Drop_Fall_touchdown", 11),
		],
	},
	celebrateFront: { folder: "Front", frames: range("Isometric_Front_Celebrate", 14) },
	ponderingFront: { folder: "Front", frames: range("Isometric_Front_Thinking", 10) },
	resting: {
		folder: "RestingStates",
		frames: [
			...range("Isometric_Front_Transitionintoaresting", 5),
			"Isometric_Front_Transitionintoaresting_Idle.png",
			...range("Isometric_Front_wakeup", 6),
		],
	},
	cursorHighFiveJump: { folder: "CursorHand", frames: range("CursorHand_Front_HighFive", 18) },
	cursorHover: { folder: "CursorHand", frames: ["CursorHand1.png"] },
	cursorGrab: {
		folder: "CursorHand",
		frames: [
			"CursorHand_PinchState_catch1.png",
			"CursorHand_PinchState_catch2.png",
			"CursorHand_PinchState_catch_Idle.png",
			"CursorHand_PinchState_catch_MoveLeft.png",
			"CursorHand_PinchState_catch_MoveRight.png",
			...range("CursorHand_PinchState_catch_stopmoving", 5),
			"CursorHand_PinchState_Drop_Fall1.png",
			"CursorHand_PinchState_Drop_Fall2.png",
			"CursorHand_PinchState_Drop_Fall_Idle.png",
		],
	},
	// expression overlays (composited on top of body frames)
	exprFront: {
		folder: "expressions",
		frames: [
			"Expresions_Front1_Normal.png",
			"Expresions_Front2_Confused.png",
			"Expresions_Front3_Thinking.png",
			"Expresions_Front4_Excited.png",
			"Expresions_Front5_Happy.png",
			"Expresions_Front6_Concerned.png",
			"Expresions_Front7_Tired.png",
		],
	},
	exprFrontLeft: {
		folder: "expressions",
		frames: [
			"Expresions_FrontLeft1_Normal.png",
			"Expresions_FrontLeft2_Confused.png",
			"Expresions_FrontLeft3_Thinking.png",
			"Expresions_FrontLeft4_Excited.png",
			"Expresions_FrontLeft5_Happy.png",
			"Expresions_FrontLeft6_Concerned.png",
			"Expresions_FrontLeft7_Tired.png",
		],
	},
	exprFrontRight: {
		folder: "expressions",
		frames: [
			"Expresions_FrontRight1_Normal.png",
			"Expresions_FrontRight2_Confused.png",
			"Expresions_FrontRight3_Thinking.png",
			"Expresions_FrontRight4_Excited.png",
			"Expresions_FrontRight5_Happy.png",
			"Expresions_FrontRight6_Concerned.png",
			"Expresions_FrontRight7_Tired.png",
		],
	},
	excitedFront: { folder: "expressions", frames: range("Expresions_Front_Excited", 24) },
	eyesTriangleFront: { folder: "EyesTriangle", frames: range("Isometric_Front_EyesTriangle", 17) },
};

const cache = new Map();
async function fetchFrame(folder, file) {
	const key = `${folder}/${file}`;
	if (cache.has(key)) return cache.get(key);
	const res = await fetch(`${SPRITE_BASE}/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`);
	if (!res.ok) throw new Error(`${res.status} for ${key}`);
	const buf = Buffer.from(await res.arrayBuffer());
	cache.set(key, buf);
	return buf;
}

async function pool(items, worker, size = 12) {
	const queue = [...items];
	await Promise.all(
		Array.from({ length: size }, async () => {
			while (queue.length) await worker(queue.shift());
		}),
	);
}

await mkdir(OUT_DIR, { recursive: true });
const manifest = {};

for (const [name, { folder, frames }] of Object.entries(ANIMS)) {
	const buffers = new Array(frames.length);
	await pool(
		frames.map((f, i) => [f, i]),
		async ([file, i]) => {
			buffers[i] = await fetchFrame(folder, file);
		},
	);
	const strip = await sharp({
		create: { width: FRAME_W * frames.length, height: FRAME_H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
	})
		.composite(buffers.map((input, i) => ({ input, left: i * FRAME_W, top: 0 })))
		.webp({ lossless: true })
		.toBuffer();
	await writeFile(path.join(OUT_DIR, `${name}.webp`), strip);
	manifest[name] = frames.length;
	console.log(`${name}: ${frames.length} frames, ${(strip.length / 1024).toFixed(0)}KB`);
}

await writeFile(
	path.join(OUT_DIR, "manifest.json"),
	JSON.stringify({ frameW: FRAME_W, frameH: FRAME_H, animations: manifest }, null, "\t"),
);
console.log("done →", OUT_DIR);
