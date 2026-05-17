"use client";

import { useEffect, useState } from "react";

function formatVancouverTime(date: Date) {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: "America/Vancouver",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: true,
	})
		.formatToParts(date)
		.reduce<Record<string, string>>((acc, part) => {
			acc[part.type] = part.value;
			return acc;
		}, {});

	return {
		clock: `${parts.hour}:${parts.minute}:${parts.second}`,
		meridiem: parts.dayPeriod ?? "",
	};
}

export default function FooterTime() {
	const [time, setTime] = useState(() => formatVancouverTime(new Date()));

	useEffect(() => {
		const interval = window.setInterval(() => {
			setTime(formatVancouverTime(new Date()));
		}, 1000);

		return () => window.clearInterval(interval);
	}, []);

	return (
		<div className="time-pill" aria-label={`Vancouver time ${time.clock} ${time.meridiem}`}>
			<span className="time-dot" />
			<span className="text-muted-foreground">vancouver</span>
			<span className="font-mono text-sm text-foreground tabular-nums">{time.clock}</span>
			<span className="text-muted-foreground">{time.meridiem}</span>
		</div>
	);
}
