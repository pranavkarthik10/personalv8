"use client";

import { useEffect, useState } from "react";

function formatPaloAltoTime(date: Date) {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: "America/Los_Angeles",
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
	const [time, setTime] = useState({ clock: "--:--:--", meridiem: "AM" });

	useEffect(() => {
		setTime(formatPaloAltoTime(new Date()));
		const interval = window.setInterval(() => {
			setTime(formatPaloAltoTime(new Date()));
		}, 1000);

		return () => window.clearInterval(interval);
	}, []);

	return (
		<div className="time-pill" aria-label={`Palo Alto time ${time.clock} ${time.meridiem}`}>
			<span className="time-dot" />
			<span className="text-muted-foreground">palo alto</span>
			<span className="font-mono text-sm text-foreground tabular-nums">{time.clock}</span>
			<span className="text-muted-foreground">{time.meridiem}</span>
		</div>
	);
}
