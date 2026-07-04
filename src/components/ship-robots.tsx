"use client";

import { useEffect, useRef } from "react";

// Pixel robots inspired by the Vercel Ship '26 hero (vercel.com/ship/nyc).
// Sprites + behavior constants were pulled from the site's public assets/chunks;
// this is a small canvas reimplementation of their state machine, with robots
// confined to the gutters beside the main content column.

const FRAME_W = 166;
const FRAME_H = 124;
const SCALE = 1.2;

const ANIM_FRAMES: Record<string, number> = {
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

// physics/behavior constants from the Ship chunks (world units == css px here)
const WALK_SPEED = 64;
const WALK_FPS = 14;
const WALK_FRAME_START = 1;
const WALK_FRAME_END = 11;
const IDLE_MIN = 0.5;
const IDLE_MAX = 8;
const EXPRESSION_RATE = 0.4;
const REST_PROBABILITY = 0.05;
const REST_COOLDOWN_MS = 60_000;
const GRAVITY = 900;
const DROP_DIST = (3 / 18) * 166;
const THROW_FACTOR = 18;
const HIT_HALF_W = 16.6 * SCALE;
const HIT_HALF_H = 16.12 * SCALE;
const SPRITE_OFF_Y = (4.2 / 18) * 166; // sprite center sits this far above the anchor
const HAND_OFF_X = (0.3 / 18) * 166;
const HAND_OFF_Y = (1.747 / 18) * 166;
const MIN_GUTTER = 120;
const MAX_ROBOTS = 16;
const ROBOTS_PER_SIDE = 3;

type Behavior =
	| "spawn"
	| "idle"
	| "walk"
	| "rest"
	| "pondering"
	| "celebrate"
	| "interactive"
	| "dupe"
	| "grabbed"
	| "falling"
	| "cursorHighFive";

type Robot = {
	id: number;
	x: number;
	y: number;
	vx: number;
	vy: number;
	targetX: number;
	targetY: number;
	anim: string;
	frameIndex: number;
	frameTimer: number;
	stateTimer: number;
	behavior: Behavior;
	spawnDelay: number;
	dropTargetY: number;
	interactiveT: number;
	exprAnim: string | null;
	exprFrame: number;
	exprTimer: number;
	exprFrameTimer: number;
	restPhase: "in" | "idle" | "out";
	lastRestAt: number;
};

type GrabPhase = "idle" | "catching" | "holding" | "stopmoving" | "cursorHighFive";

type Rect = { minX: number; maxX: number; minY: number; maxY: number };

const FORWARD = ["front", "frontLeft", "frontRight"] as const;

function pickForward() {
	return FORWARD[Math.floor(Math.random() * FORWARD.length)];
}

function angleToAnim(vx: number, vyScreen: number): string {
	// classify using y-up angle like the original
	const deg = (Math.atan2(-vyScreen, vx) * 180) / Math.PI;
	if (deg >= -22.5 && deg < 22.5) return "right";
	if (deg >= 22.5 && deg < 67.5) return "backRight";
	if (deg >= 67.5 && deg < 112.5) return "back";
	if (deg >= 112.5 && deg < 157.5) return "backLeft";
	if (deg >= -67.5 && deg < -22.5) return "frontRight";
	if (deg >= -112.5 && deg < -67.5) return "front";
	if (deg >= -157.5 && deg < -112.5) return "frontLeft";
	return "left";
}

function snapToForward(anim: string): string {
	if (anim.includes("Left") || anim === "left") return "frontLeft";
	if (anim.includes("Right") || anim === "right") return "frontRight";
	return "front";
}

function exprForAnim(anim: string): string | null {
	if (anim === "front") return "exprFront";
	if (anim === "frontLeft") return "exprFrontLeft";
	if (anim === "frontRight") return "exprFrontRight";
	return null;
}

function clearExpr(r: Robot) {
	r.exprAnim = null;
	r.exprFrame = 0;
	r.exprTimer = 0;
	r.exprFrameTimer = 0;
}

export default function ShipRobots() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let disposed = false;
		let raf = 0;
		let nextId = 0;
		const robots: Robot[] = [];
		const debug = { ticks: 0, started: false };
		if (process.env.NODE_ENV === "development") {
			const w = window as unknown as { __shipRobots?: Robot[]; __shipDebug?: typeof debug };
			w.__shipRobots = robots;
			w.__shipDebug = debug;
		}
		const images = new Map<string, HTMLImageElement>();

		// ---- grab/cursor state (mirrors the Ship useGrabStore) ----
		const grab = {
			phase: "idle" as GrabPhase,
			robot: null as Robot | null,
			handX: 0,
			handY: 0,
			frameIndex: 0,
			frameTimer: 0,
			catchFramesDone: 0,
			stopFramesDone: 0,
			wasMoving: false,
			hovering: false,
			prevX: 0,
			prevY: 0,
			vxHist: [0, 0, 0],
			vyHist: [0, 0, 0],
			skew: 0,
			highFiveRobot: null as Robot | null,
			highFiveElapsed: 0,
		};

		let gutters: Rect[] = [];
		let viewW = 0;
		let viewH = 0;

		function measure() {
			viewW = window.innerWidth;
			viewH = window.innerHeight;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas!.width = Math.round(viewW * dpr);
			canvas!.height = Math.round(viewH * dpr);
			canvas!.style.width = `${viewW}px`;
			canvas!.style.height = `${viewH}px`;
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx!.imageSmoothingEnabled = false;

			const main = document.querySelector("main");
			const rect = main?.getBoundingClientRect();
			const pad = 24;
			const top = 90;
			const bottom = viewH - 60;
			gutters = [];
			if (rect) {
				if (rect.left - pad * 2 >= MIN_GUTTER) {
					gutters.push({ minX: pad, maxX: rect.left - pad, minY: top, maxY: bottom });
				}
				if (viewW - rect.right - pad * 2 >= MIN_GUTTER) {
					gutters.push({ minX: rect.right + pad, maxX: viewW - pad, minY: top, maxY: bottom });
				}
			}
		}

		function randomPointIn(rect: Rect) {
			return {
				x: rect.minX + Math.random() * (rect.maxX - rect.minX),
				y: rect.minY + Math.random() * (rect.maxY - rect.minY),
			};
		}

		function nearestGutter(x: number): Rect | null {
			if (gutters.length === 0) return null;
			let best = gutters[0];
			let bestDist = Number.POSITIVE_INFINITY;
			for (const g of gutters) {
				const cx = (g.minX + g.maxX) / 2;
				const d = Math.abs(cx - x);
				if (d < bestDist) {
					bestDist = d;
					best = g;
				}
			}
			return best;
		}

		function makeRobot(x: number, y: number, behavior: Behavior, spawnDelay = 0): Robot {
			return {
				id: nextId++,
				x,
				y,
				vx: 0,
				vy: 0,
				targetX: x,
				targetY: y,
				anim: behavior === "spawn" ? "spawn" : "front",
				frameIndex: 0,
				frameTimer: 0,
				stateTimer: IDLE_MIN + Math.random() * (IDLE_MAX - IDLE_MIN),
				behavior,
				spawnDelay,
				dropTargetY: 0,
				interactiveT: 0,
				exprAnim: null,
				exprFrame: 0,
				exprTimer: 0,
				exprFrameTimer: 0,
				restPhase: "in",
				lastRestAt: Number.NEGATIVE_INFINITY,
			};
		}

		function enter(r: Robot, next: Behavior, params?: { anim?: string; dropTargetY?: number }) {
			r.behavior = next;
			r.frameTimer = 0;
			clearExpr(r);
			switch (next) {
				case "spawn":
					r.anim = "spawn";
					r.frameIndex = 0;
					break;
				case "idle": {
					const a = params?.anim;
					r.anim = a === "front" || a === "frontLeft" || a === "frontRight" ? a : pickForward();
					r.frameIndex = 0;
					r.stateTimer = IDLE_MIN + Math.random() * (IDLE_MAX - IDLE_MIN);
					r.vx = 0;
					r.vy = 0;
					break;
				}
				case "walk": {
					const dx = r.targetX - r.x;
					const dy = r.targetY - r.y;
					const d = Math.hypot(dx, dy) || 1;
					r.vx = (dx / d) * WALK_SPEED;
					r.vy = (dy / d) * WALK_SPEED;
					r.anim = angleToAnim(r.vx, r.vy);
					r.frameIndex = WALK_FRAME_START;
					break;
				}
				case "rest":
					r.anim = "resting";
					r.frameIndex = 0;
					r.restPhase = "in";
					r.stateTimer = 0;
					break;
				case "pondering":
					r.anim = "ponderingFront";
					r.frameIndex = 0;
					r.stateTimer = 0;
					r.vx = 0;
					r.vy = 0;
					break;
				case "celebrate":
					r.anim = "celebrateFront";
					r.frameIndex = 0;
					r.stateTimer = 0;
					r.vx = 0;
					r.vy = 0;
					break;
				case "interactive":
					r.anim = "front";
					r.frameIndex = 0;
					r.stateTimer = 0;
					r.vx = 0;
					r.vy = 0;
					r.exprAnim = "excitedFront";
					break;
				case "dupe":
					r.anim = "dupe";
					r.frameIndex = 0;
					r.stateTimer = 0;
					r.vx = 0;
					r.vy = 0;
					break;
				case "grabbed":
					r.vx = 0;
					r.vy = 0;
					break;
				case "falling":
					r.anim = "fall";
					r.frameIndex = 0;
					if (params?.dropTargetY !== undefined) r.dropTargetY = params.dropTargetY;
					break;
				case "cursorHighFive":
					r.anim = "cursorHighFiveJump";
					r.frameIndex = 0;
					r.stateTimer = 0;
					r.vx = 0;
					r.vy = 0;
					break;
			}
		}

		function exitToIdle(r: Robot, anim?: string) {
			enter(r, "idle", { anim: anim ?? snapToForward(r.anim) });
		}

		function advanceFrame(r: Robot, fps: number, dt: number) {
			r.frameTimer += dt;
			const step = 1 / fps;
			while (r.frameTimer >= step) {
				r.frameTimer -= step;
				r.frameIndex = Math.min(r.frameIndex + 1, ANIM_FRAMES[r.anim] - 1);
			}
		}

		function startWalk(r: Robot) {
			const g = nearestGutter(r.x);
			if (!g) return false;
			const p = randomPointIn(g);
			r.targetX = p.x;
			r.targetY = p.y;
			enter(r, "walk");
			return true;
		}

		function tickRobot(r: Robot, dt: number, count: number) {
			switch (r.behavior) {
				case "spawn": {
					if (r.spawnDelay > 0) {
						r.spawnDelay = Math.max(0, r.spawnDelay - dt);
						return;
					}
					advanceFrame(r, 10, dt);
					if (r.frameIndex >= ANIM_FRAMES.spawn - 1) exitToIdle(r, "front");
					break;
				}
				case "idle": {
					if (count < MAX_ROBOTS && Math.random() < 0.09 * dt) {
						enter(r, "interactive");
						return;
					}
					// expression overlay lifecycle
					if (r.exprAnim) {
						if (r.exprAnim === "excitedFront" || r.exprAnim === "eyesTriangleFront") {
							r.exprFrameTimer += dt;
							const total = ANIM_FRAMES[r.exprAnim] / 10;
							if (r.exprFrameTimer >= total) clearExpr(r);
							else r.exprFrame = Math.floor(r.exprFrameTimer * 10) % ANIM_FRAMES[r.exprAnim];
						} else if (r.exprTimer > 0) {
							r.exprTimer -= dt;
							if (r.exprTimer <= 0) clearExpr(r);
						}
					}
					r.stateTimer -= dt;
					if (r.stateTimer <= 0) {
						clearExpr(r);
						const now = performance.now();
						if (now - r.lastRestAt >= REST_COOLDOWN_MS && Math.random() < REST_PROBABILITY) {
							r.lastRestAt = now;
							enter(r, "rest");
							return;
						}
						if (startWalk(r)) return;
						r.stateTimer = 0.5 + Math.random();
						return;
					}
					if (!r.exprAnim && Math.random() < EXPRESSION_RATE * dt) {
						const expr = exprForAnim(r.anim);
						if (expr) {
							r.exprAnim = expr;
							r.exprFrame = Math.floor(Math.random() * ANIM_FRAMES[expr]);
							r.exprTimer = 1.5 + Math.random() * 2;
							r.exprFrameTimer = 0;
						}
					}
					if (!r.exprAnim && r.anim === "front" && Math.random() < 0.02 * dt) {
						r.exprAnim = "eyesTriangleFront";
						r.exprFrame = 0;
						r.exprFrameTimer = 0;
						r.exprTimer = 0;
					}
					const forward = r.anim === "front" || r.anim === "frontLeft" || r.anim === "frontRight";
					if (!r.exprAnim && forward && Math.random() < 0.02 * dt) {
						enter(r, "pondering");
						return;
					}
					if (!r.exprAnim && forward && Math.random() < 0.005 * dt) {
						enter(r, "celebrate");
						return;
					}
					break;
				}
				case "walk": {
					r.x += r.vx * dt;
					r.y += r.vy * dt;
					r.frameTimer += dt;
					if (r.frameTimer >= 1 / WALK_FPS) {
						r.frameTimer -= 1 / WALK_FPS;
						r.frameIndex = r.frameIndex >= WALK_FRAME_END ? WALK_FRAME_START : r.frameIndex + 1;
					}
					const dx = r.targetX - r.x;
					const dy = r.targetY - r.y;
					if (dx * dx + dy * dy < 4) exitToIdle(r);
					break;
				}
				case "rest": {
					if (r.restPhase === "in") {
						advanceFrame(r, 10, dt);
						if (r.frameIndex >= 4) {
							r.restPhase = "idle";
							r.stateTimer = 2 + Math.random() * 3;
							r.frameIndex = 5;
						}
					} else if (r.restPhase === "idle") {
						r.frameIndex = 5;
						r.stateTimer -= dt;
						if (r.stateTimer <= 0) {
							r.restPhase = "out";
							r.frameIndex = 6;
							r.frameTimer = 0;
						}
					} else {
						advanceFrame(r, 10, dt);
						if (r.frameIndex >= 11) exitToIdle(r, "front");
					}
					break;
				}
				case "pondering": {
					r.stateTimer += dt;
					advanceFrame(r, 10, dt);
					if (r.frameIndex >= ANIM_FRAMES.ponderingFront - 1)
						r.frameIndex = ANIM_FRAMES.ponderingFront - 1;
					if (r.stateTimer >= 1) exitToIdle(r, "front");
					break;
				}
				case "celebrate": {
					r.stateTimer += dt;
					advanceFrame(r, 10, dt);
					if (r.stateTimer >= 1.4) exitToIdle(r, "front");
					break;
				}
				case "interactive": {
					r.stateTimer += dt;
					r.frameIndex = 0;
					r.interactiveT = 0.5 + 0.5 * Math.sin(r.stateTimer * Math.PI * 4);
					if (r.exprAnim) {
						r.exprFrameTimer += dt;
						const total = ANIM_FRAMES.excitedFront / 10;
						if (r.exprFrameTimer >= total) clearExpr(r);
						else r.exprFrame = Math.floor(r.exprFrameTimer * 10) % ANIM_FRAMES.excitedFront;
					}
					if (r.stateTimer >= 4) {
						r.interactiveT = 0;
						exitToIdle(r, "front");
					}
					break;
				}
				case "dupe": {
					r.stateTimer += dt;
					r.frameIndex = Math.min(ANIM_FRAMES.dupe - 1, Math.floor(10 * r.stateTimer));
					if (r.stateTimer >= ANIM_FRAMES.dupe / 10) {
						const originX = r.x;
						if (robots.length < MAX_ROBOTS) {
							const twin = makeRobot(originX + 25.5, r.y, "idle");
							enter(twin, "idle", { anim: "front" });
							robots.push(twin);
							r.x = originX - 25.5;
						}
						if (Math.random() < 0.4) enter(r, "celebrate");
						else exitToIdle(r, "front");
					}
					break;
				}
				case "grabbed":
					break;
				case "falling": {
					advanceFrame(r, 24, dt);
					const thrown = r.vx !== 0 || r.vy !== 0;
					if (r.y < r.dropTargetY) {
						if (r.frameIndex > 2) r.frameIndex = 2;
						if (thrown) {
							r.vy += GRAVITY * dt;
							r.x += r.vx * dt;
							r.y += r.vy * dt;
							r.vx *= Math.pow(0.2, dt);
							const wall = 48;
							if (r.x > viewW - wall) {
								r.x = viewW - wall;
								r.vx = -0.4 * r.vx;
							} else if (r.x < wall) {
								r.x = wall;
								r.vx = -0.4 * r.vx;
							}
						} else {
							r.y += 320 * dt;
						}
						if (r.y >= r.dropTargetY) {
							r.y = r.dropTargetY;
							r.vx = 0;
							r.vy = 0;
							r.frameIndex = 3;
							r.frameTimer = 0;
						}
					} else if (r.frameIndex >= ANIM_FRAMES.fall - 1) {
						exitToIdle(r, pickForward());
					}
					break;
				}
				case "cursorHighFive": {
					r.stateTimer += dt;
					advanceFrame(r, 10, dt);
					if (r.frameIndex >= ANIM_FRAMES.cursorHighFiveJump - 1)
						r.frameIndex = ANIM_FRAMES.cursorHighFiveJump - 1;
					if (r.stateTimer >= 1.8) exitToIdle(r, "front");
					break;
				}
			}
		}

		// ---- pointer interaction ----
		const GRABBABLE: Behavior[] = ["idle", "walk", "rest", "pondering", "celebrate"];

		function robotAt(x: number, y: number, behaviors?: Behavior[]) {
			for (const r of robots) {
				if (r.spawnDelay > 0 || r.behavior === "spawn") continue;
				if (behaviors && !behaviors.includes(r.behavior) && r.behavior !== "interactive") continue;
				if (Math.abs(x - r.x) < HIT_HALF_W && Math.abs(y - r.y - HIT_HALF_H) < HIT_HALF_H * 1.6) {
					return r;
				}
			}
			return null;
		}

		function avg(a: number[]) {
			return (a[0] + a[1] + a[2]) / 3;
		}

		function onMouseMove(e: MouseEvent) {
			const x = e.clientX;
			const y = e.clientY;
			const dx = x - grab.prevX;
			const dy = y - grab.prevY;
			grab.vxHist = [dx, grab.vxHist[0], grab.vxHist[1]];
			grab.vyHist = [dy, grab.vyHist[0], grab.vyHist[1]];
			grab.prevX = x;
			grab.prevY = y;

			if (grab.phase === "idle") {
				const hit = robotAt(x, y, GRABBABLE);
				grab.hovering = !!hit;
				if (hit) {
					grab.handX = x;
					grab.handY = y;
				}
			} else if (grab.phase === "holding" || grab.phase === "catching" || grab.phase === "stopmoving") {
				const v = avg(grab.vxHist);
				if (grab.phase === "holding") {
					if (Math.abs(v) > 72) {
						grab.wasMoving = true;
						grab.frameIndex = v > 0 ? 4 : 3;
					} else if (grab.wasMoving) {
						grab.phase = "stopmoving";
						grab.stopFramesDone = 0;
						grab.frameTimer = 0;
						grab.frameIndex = 5;
						grab.wasMoving = false;
					} else {
						grab.frameIndex = 2;
					}
				}
				grab.handX = x;
				grab.handY = y;
				if (grab.robot) {
					grab.robot.x = x;
					grab.robot.y = y;
				}
			}
			updateCursor();
		}

		function onMouseDown(e: MouseEvent) {
			if (grab.phase !== "idle" || e.button !== 0) return;
			const hit = robotAt(e.clientX, e.clientY, GRABBABLE);
			if (!hit) return;
			if (hit.behavior === "interactive") {
				if (Math.random() < 0.5 && robots.length < MAX_ROBOTS) {
					enter(hit, "dupe");
				} else {
					enter(hit, "cursorHighFive");
					grab.phase = "cursorHighFive";
					grab.highFiveRobot = hit;
					grab.highFiveElapsed = 0;
				}
				grab.hovering = false;
				updateCursor();
				return;
			}
			e.preventDefault();
			e.stopPropagation();
			document.body.style.userSelect = "none";
			enter(hit, "grabbed");
			grab.phase = "catching";
			grab.robot = hit;
			grab.handX = e.clientX;
			grab.handY = e.clientY;
			grab.frameIndex = 0;
			grab.frameTimer = 0;
			grab.catchFramesDone = 0;
			grab.hovering = false;
			hit.x = e.clientX;
			hit.y = e.clientY;
			updateCursor();
		}

		function onMouseUp() {
			document.body.style.userSelect = "";
			if (grab.phase === "catching" || grab.phase === "holding" || grab.phase === "stopmoving") {
				const r = grab.robot;
				if (r) {
					r.x = grab.handX;
					r.y = grab.handY;
					enter(r, "falling", { dropTargetY: grab.handY + DROP_DIST });
					r.vx = THROW_FACTOR * avg(grab.vxHist);
					r.vy = THROW_FACTOR * avg(grab.vyHist);
				}
				grab.phase = "idle";
				grab.robot = null;
				updateCursor();
			}
		}

		function onClickCapture(e: MouseEvent) {
			if (grab.phase !== "idle") {
				e.preventDefault();
				e.stopPropagation();
			}
		}

		function updateCursor() {
			const hide = grab.phase !== "idle" || grab.hovering;
			document.body.style.cursor = hide ? "none" : "";
		}

		// ---- render loop ----
		let last = performance.now();

		function schedule() {
			if (process.env.NODE_ENV === "development" && document.hidden) {
				// rAF is suspended in hidden tabs; keep dev previews ticking
				setTimeout(() => frame(performance.now()), 33);
			} else {
				raf = requestAnimationFrame(frame);
			}
		}

		function frame(now: number) {
			if (disposed) return;
			debug.ticks += 1;
			schedule();
			const dt = Math.min((now - last) / 1000, 1 / 8);
			last = now;

			// grab-phase frame stepping (catch + stopmoving at 12fps)
			if (grab.phase === "catching") {
				grab.frameTimer += dt;
				if (grab.frameTimer >= 1 / 12) {
					grab.frameTimer -= 1 / 12;
					grab.catchFramesDone += 1;
					if (grab.catchFramesDone === 1) grab.frameIndex = 1;
					else {
						grab.frameIndex = 2;
						grab.phase = "holding";
					}
				}
			} else if (grab.phase === "stopmoving") {
				grab.frameTimer += dt;
				if (grab.frameTimer >= 1 / 12) {
					grab.frameTimer -= 1 / 12;
					grab.stopFramesDone += 1;
					if (grab.stopFramesDone >= 5) {
						grab.frameIndex = 2;
						grab.phase = "holding";
					} else {
						grab.frameIndex = 5 + Math.min(grab.stopFramesDone, 4);
					}
				}
			} else if (grab.phase === "cursorHighFive") {
				grab.highFiveElapsed += dt;
				if (grab.highFiveElapsed >= 1.8) {
					grab.phase = "idle";
					grab.highFiveRobot = null;
					updateCursor();
				}
			}

			// hand skew (bottom of the sprite lags behind fast movement)
			const held =
				grab.phase === "catching" || grab.phase === "holding" || grab.phase === "stopmoving";
			const skewTarget = held ? Math.max(-30, Math.min(30, -5 * avg(grab.vxHist))) : 0;
			grab.skew += (skewTarget - grab.skew) * (1 - Math.pow(0.8, 60 * dt));
			if (held) {
				grab.vxHist = [grab.vxHist[0] * 0.7, grab.vxHist[1] * 0.7, grab.vxHist[2] * 0.7];
			}

			const count = robots.length;
			for (const r of robots) tickRobot(r, dt, count);

			ctx!.clearRect(0, 0, viewW, viewH);
			const sorted = [...robots].sort((a, b) => a.y - b.y);
			for (const r of sorted) {
				if (r.spawnDelay > 0 || r.behavior === "grabbed") continue;
				drawSprite(r);
			}
			drawHand();
		}

		function drawFrame(name: string, frame: number, cx: number, cy: number, skew = 0) {
			const img = images.get(name);
			if (!img || !img.complete) return;
			const w = FRAME_W * SCALE;
			const h = FRAME_H * SCALE;
			const dx = Math.round(cx - w / 2);
			const dy = Math.round(cy - h / 2);
			if (skew !== 0) {
				ctx!.save();
				ctx!.translate(dx, dy);
				ctx!.transform(1, 0, (skew * SCALE) / h, 1, 0, 0);
				ctx!.drawImage(img, frame * FRAME_W, 0, FRAME_W, FRAME_H, 0, 0, w, h);
				ctx!.restore();
			} else {
				ctx!.drawImage(img, frame * FRAME_W, 0, FRAME_W, FRAME_H, dx, dy, w, h);
			}
		}

		function drawSprite(r: Robot) {
			const hop = r.interactiveT * 10 * SCALE;
			const animOff = r.anim === "cursorHighFiveJump" ? 16 * SCALE : 0;
			const cy = r.y - SPRITE_OFF_Y * SCALE - hop + animOff;
			drawFrame(r.anim, r.frameIndex, r.x, cy);
			if (r.exprAnim) drawFrame(r.exprAnim, r.exprFrame, r.x, cy);
		}

		function drawHand() {
			const hover = grab.phase === "idle" && grab.hovering;
			const held =
				grab.phase === "catching" || grab.phase === "holding" || grab.phase === "stopmoving";
			if (!hover && !held) return;
			const name = hover ? "cursorHover" : "cursorGrab";
			const frame = hover ? 0 : Math.min(grab.frameIndex, ANIM_FRAMES.cursorGrab - 1);
			const cx = grab.handX + HAND_OFF_X * SCALE;
			const cy = grab.handY - HAND_OFF_Y * SCALE;
			drawFrame(name, frame, cx, cy, held ? grab.skew : 0);
		}

		// ---- boot ----
		measure();
		if (gutters.length === 0) {
			// nothing to do on narrow viewports; re-check on resize
			const onResize = () => {
				measure();
				if (gutters.length > 0) {
					window.removeEventListener("resize", onResize);
					boot();
				}
			};
			window.addEventListener("resize", onResize);
			return () => {
				window.removeEventListener("resize", onResize);
			};
		}

		function boot() {
			const names = Object.keys(ANIM_FRAMES);
			let loaded = 0;
			const done = () => {
				loaded += 1;
				if (loaded === names.length && !disposed) start();
			};
			for (const name of names) {
				const img = new Image();
				img.onload = done;
				img.onerror = done;
				img.src = `/robots/${name}.webp`;
				images.set(name, img);
				if (img.complete && img.naturalWidth > 0) {
					// memory-cached images may never fire load
					img.onload = null;
					done();
				}
			}
		}

		function start() {
			debug.started = true;
			let i = 0;
			for (const g of gutters) {
				for (let k = 0; k < ROBOTS_PER_SIDE; k++) {
					const p = randomPointIn(g);
					robots.push(makeRobot(p.x, p.y, "spawn", i * 0.2));
					i += 1;
				}
			}
			window.addEventListener("mousemove", onMouseMove);
			window.addEventListener("mousedown", onMouseDown, { capture: true });
			window.addEventListener("click", onClickCapture, { capture: true });
			window.addEventListener("mouseup", onMouseUp);
			window.addEventListener("blur", onMouseUp);
			window.addEventListener("resize", measure);
			last = performance.now();
			schedule();
		}

		boot();

		return () => {
			disposed = true;
			cancelAnimationFrame(raf);
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mousedown", onMouseDown, { capture: true });
			window.removeEventListener("click", onClickCapture, { capture: true });
			window.removeEventListener("mouseup", onMouseUp);
			window.removeEventListener("blur", onMouseUp);
			window.removeEventListener("resize", measure);
			document.body.style.cursor = "";
			document.body.style.userSelect = "";
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden
			className="pointer-events-none fixed inset-0 z-40 hidden lg:block"
		/>
	);
}
