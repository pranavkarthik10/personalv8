let context: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;

function getContext() {
	if (typeof window === "undefined") return null;
	context ??= new AudioContext();
	return context;
}

function buildNoise(ctx: AudioContext) {
	if (noiseBuffer) return noiseBuffer;
	const duration = 0.05;
	const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < data.length; i += 1) {
		const envelope = (1 - i / data.length) ** 3;
		data[i] = (Math.random() * 2 - 1) * envelope;
	}
	noiseBuffer = buffer;
	return buffer;
}

export function preloadClick() {
	const ctx = getContext();
	if (!ctx) return;
	buildNoise(ctx);
}

export function playClick() {
	if (typeof document !== "undefined" && document.documentElement.classList.contains("start-muted")) {
		return;
	}
	const ctx = getContext();
	if (!ctx) return;
	if (ctx.state === "suspended") {
		void ctx.resume();
	}

	const now = ctx.currentTime;
	const source = ctx.createBufferSource();
	source.buffer = buildNoise(ctx);
	source.playbackRate.value = 0.82;

	const highpass = ctx.createBiquadFilter();
	highpass.type = "highpass";
	highpass.frequency.value = 2800;
	highpass.Q.value = 0.7;

	const lowpass = ctx.createBiquadFilter();
	lowpass.type = "lowpass";
	lowpass.frequency.value = 8000;
	lowpass.Q.value = 0.7;

	const gain = ctx.createGain();
	gain.gain.setValueAtTime(0.28, now);
	gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

	source.connect(highpass);
	highpass.connect(lowpass);
	lowpass.connect(gain);
	gain.connect(ctx.destination);
	source.start(now);
}

export function haptic(ms = 10) {
	if (typeof document !== "undefined" && document.documentElement.classList.contains("start-muted")) {
		return;
	}
	if (typeof navigator === "undefined") return;
	if (typeof navigator.vibrate === "function") {
		navigator.vibrate(ms);
	}
}

export function navigateFeedback() {
	playClick();
	haptic();
}
