"use client";

import { useState } from "react";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/\\{}[]<>*";

function getRandomChar() {
	return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
}

export default function NameAnimation({
	text = "Pranav Karthik",
	initialText,
}: {
	text?: string;
	initialText?: string;
}) {
	const [displayText, setDisplayText] = useState(initialText ?? text);
	const [charStyles, setCharStyles] = useState<string[]>([]);
	const [isAnimating, setIsAnimating] = useState(false);

	const shuffleText = () => {
		let iterations = 0;
		const maxIterations = text.length * 3 + 15;

		const interval = setInterval(() => {
			let newText = "";
			const newStyles: string[] = [];

			for (let i = 0; i < text.length; i++) {
				const isSettled = i < (iterations - 5) / 3;
				const isWarm = Math.random() < 0.18;

				if (isSettled) {
					newText += text[i];
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
				setDisplayText(text);
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

	const visibleCharacters = displayText.padEnd(text.length, " ").slice(0, text.length);

	return (
		<span className="relative inline-grid leading-none">
			<span className="invisible whitespace-nowrap" aria-hidden="true">
				{text}
			</span>
			<span
				className="group absolute inset-0 cursor-pointer whitespace-nowrap"
				onMouseEnter={handleMouseEnter}
				onFocus={handleMouseEnter}
				tabIndex={0}
				aria-label={text}
			>
				<span className="absolute -inset-x-1 bottom-1 h-2 origin-left scale-x-0 bg-[hsl(var(--accent)/0.18)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
				{visibleCharacters.split("").map((char, i) => (
					<span
						key={i}
						className={`relative inline-block transition-colors duration-150 ${
							charStyles[i] ?? ""
						}`}
					>
						<span className="invisible" aria-hidden="true">
							{text[i] === " " ? "\u00A0" : text[i]}
						</span>
						<span className="absolute inset-0 text-center">
							{char === " " ? "\u00A0" : char}
						</span>
					</span>
				))}
			</span>
		</span>
	);
}
