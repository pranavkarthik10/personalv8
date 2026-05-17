"use client";

import { useState } from "react";

const FINAL_TEXT = "Pranav Karthik";
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/\\{}[]<>*";

function getRandomChar() {
	return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
}

export default function NameAnimation() {
	const [displayText, setDisplayText] = useState(FINAL_TEXT);
	const [charStyles, setCharStyles] = useState<string[]>([]);
	const [isAnimating, setIsAnimating] = useState(false);

	const shuffleText = () => {
		let iterations = 0;
		const maxIterations = FINAL_TEXT.length * 3 + 15;

		const interval = setInterval(() => {
			let newText = "";
			const newStyles: string[] = [];

			for (let i = 0; i < FINAL_TEXT.length; i++) {
				const isSettled = i < (iterations - 5) / 3;
				const isWarm = Math.random() < 0.18;

				if (isSettled) {
					newText += FINAL_TEXT[i];
					newStyles.push("");
				} else {
					newText += getRandomChar();
					newStyles.push(isWarm ? "text-[hsl(var(--accent))]" : "text-muted-foreground");
				}
			}

			setDisplayText(newText);
			setCharStyles(newStyles);
			iterations++;

			if (iterations > maxIterations) {
				clearInterval(interval);
				setDisplayText(FINAL_TEXT);
				setCharStyles([]);
				setIsAnimating(false);
			}
		}, 40);
	};

	const handleMouseEnter = () => {
		if (!isAnimating) {
			setIsAnimating(true);
			shuffleText();
		}
	};

	return (
		<span className="inline-block leading-none">
			<span
				className="group relative inline-block cursor-pointer whitespace-nowrap"
				onMouseEnter={handleMouseEnter}
				onFocus={handleMouseEnter}
				tabIndex={0}
				aria-label={FINAL_TEXT}
			>
				<span className="absolute -inset-x-1 bottom-1 h-2 origin-left scale-x-0 bg-[hsl(var(--accent)/0.18)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
				{displayText.split("").map((char, i) => (
					<span
						key={i}
						className={`relative inline-block transition-colors duration-150 ${
							char === " " ? "w-[0.28em]" : ""
						} ${charStyles[i] ?? ""}`}
					>
						{char === " " ? "\u00A0" : char}
					</span>
				))}
			</span>
		</span>
	);
}
