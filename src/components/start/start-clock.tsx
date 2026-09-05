"use client";

import { useEffect, useState } from "react";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function formatParts(date: Date) {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: "America/Vancouver",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hourCycle: "h23",
	}).formatToParts(date);

	const value = (type: Intl.DateTimeFormatPartTypes) =>
		parts.find((part) => part.type === type)?.value ?? "";

	const monthIndex = Number(value("month")) - 1;
	return `${value("day")}/${MONTHS[monthIndex] ?? "JAN"}/${value("year")}:${value("hour")}:${value("minute")}:${value("second")}`;
}

export default function StartClock() {
	const [now, setNow] = useState<Date | null>(null);

	useEffect(() => {
		setNow(new Date());
		const id = window.setInterval(() => setNow(new Date()), 1000);
		return () => window.clearInterval(id);
	}, []);

	return (
		<div className="start-clock" aria-hidden="true">
			<div className="start-clock-line">{now ? formatParts(now) : ""}</div>
			<div className="start-clock-line">VANCOUVER, BC</div>
		</div>
	);
}
