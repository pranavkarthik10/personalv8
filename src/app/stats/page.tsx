"use client";

import { useEffect, useMemo, useState } from "react";

type Daily = { date: string; tokens: number; apiCalls: number; sessionDays: number; estimatedCostUsd: number };
type Breakdown = { name: string; calls?: number; turns?: number; cost?: number };
type Stats = { daily: Daily[]; summary: Omit<Daily, "date">; models: Breakdown[]; activities: Breakdown[] };
type Period = "today" | "7d" | "30d" | "60d" | "all";
type SortKey = "name" | "cost" | "usage";

const endpoint = "https://agent-stats.pranavkarthik10.workers.dev/v3/dashboard";
const periods: Array<[Period, string]> = [["today", "Today"], ["7d", "7 days"], ["30d", "30 days"], ["60d", "60 days"], ["all", "All time"]];
const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
const whole = new Intl.NumberFormat("en-US");
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function BreakdownTable({ items, usageLabel, usage, sort, onSort }: { items: Breakdown[]; usageLabel: string; usage: (item: Breakdown) => number; sort: { key: SortKey; direction: 1 | -1 }; onSort: (key: SortKey) => void }) {
	const [expanded, setExpanded] = useState(false);
	const ordered = useMemo(() => [...items].sort((a, b) => {
		const left = sort.key === "name" ? a.name : sort.key === "cost" ? Number(a.cost) : usage(a);
		const right = sort.key === "name" ? b.name : sort.key === "cost" ? Number(b.cost) : usage(b);
		return (typeof left === "string" ? left.localeCompare(String(right)) : Number(left) - Number(right)) * sort.direction;
	}), [items, sort, usage]);
	const arrow = (key: SortKey) => sort.key === key ? (sort.direction === 1 ? " ↑" : " ↓") : "";
	const visible = expanded ? ordered : ordered.slice(0, 10);
	return <div className="stats-table-wrap"><table className="stats-table"><thead><tr><th><button onClick={() => onSort("name")}>name{arrow("name")}</button></th><th><button onClick={() => onSort("usage")}>{usageLabel}{arrow("usage")}</button></th><th><button onClick={() => onSort("cost")}>spend{arrow("cost")}</button></th></tr></thead><tbody>{visible.map((item) => <tr key={item.name}><td>{item.name}</td><td>{whole.format(usage(item))}</td><td>{currency.format(Number(item.cost))}</td></tr>)}</tbody></table>{ordered.length > 10 && <button className="stats-show-more" onClick={() => setExpanded((value) => !value)}>{expanded ? "show less" : `show ${ordered.length - 10} more`}</button>}</div>;
}

export default function StatsPage() {
	const [period, setPeriod] = useState<Period>("all");
	const [stats, setStats] = useState<Stats | null>(null);
	const [loading, setLoading] = useState(true);
	const [modelSort, setModelSort] = useState({ key: "cost" as SortKey, direction: -1 as 1 | -1 });
	const [activitySort, setActivitySort] = useState({ key: "usage" as SortKey, direction: -1 as 1 | -1 });

	useEffect(() => {
		let live = true;
		setLoading(true);
		fetch(`${endpoint}?period=${period}`).then((response) => response.ok ? response.json() : Promise.reject()).then((data) => {
			if (live) setStats({ ...data, models: data.models ?? [], activities: data.activities ?? [] });
		}).catch(() => live && setStats(null)).finally(() => live && setLoading(false));
		return () => { live = false; };
	}, [period]);

	const flip = (setter: typeof setModelSort) => (key: SortKey) => setter((current) => ({ key, direction: current.key === key ? (current.direction * -1) as 1 | -1 : key === "name" ? 1 : -1 }));
	const recent = stats?.daily.slice(-56) ?? [];
	const maxTokens = Math.max(1, ...recent.map((day) => Number(day.tokens)));
	const activeDays = stats?.daily.filter((day) => day.apiCalls > 0).length ?? 0;
	const cards = stats ? [["tokens processed", compact.format(stats.summary.tokens)], ["API calls", whole.format(stats.summary.apiCalls)], ["active days", whole.format(activeDays)], ["estimated spend", currency.format(stats.summary.estimatedCostUsd)]] : [];

	return <main className="page-frame stats-page">
		<section className="stats-intro"><div><p className="page-kicker">Stats</p><h1 className="page-title">Some fun little stats.</h1></div><p className="stats-updated">{loading ? "refreshing" : stats?.daily.at(-1)?.date ? <>last synced <time dateTime={stats.daily.at(-1)?.date}>{stats.daily.at(-1)?.date}</time></> : "syncing soon"}</p></section>
		<div className="stats-periods" role="tablist" aria-label="Stats time horizon">{periods.map(([value, label]) => <button key={value} role="tab" aria-selected={period === value} className={period === value ? "is-active" : ""} onClick={() => setPeriod(value)}>{label}</button>)}</div>
		{!stats && !loading ? <p className="page-description">The numbers are taking a breather. Please try again shortly.</p> : <>
			<section className="stats-summary" aria-label="AI usage for selected period">{cards.map(([label, value]) => <div className="stats-stat" key={label}><p>{label}</p><strong>{value}</strong></div>)}</section>
			<section className="stats-section stats-activity" aria-labelledby="activity-title"><div className="stats-heading"><h2 id="activity-title">Trends</h2><span>{compact.format(Math.max(...recent.map((day) => day.tokens), 0))} peak</span></div><div className="stats-bars" role="img" aria-label="Daily token volume"><>{recent.map((day) => <div className="stats-bar" key={day.date} title={`${day.date}: ${whole.format(day.tokens)} tokens`}><span style={{ height: `${Math.max(2, (Number(day.tokens) / maxTokens) * 100)}%` }} /></div>)}</></div><div className="stats-chart-note"><span>older</span><span>now</span></div></section>
			<section className="stats-breakdowns"><div className="stats-section"><div className="stats-heading"><h2>Models</h2></div><BreakdownTable items={stats?.models ?? []} usageLabel="calls" usage={(item) => Number(item.calls)} sort={modelSort} onSort={flip(setModelSort)} /></div><div className="stats-section"><div className="stats-heading"><h2>Activity</h2></div><BreakdownTable items={stats?.activities ?? []} usageLabel="turns" usage={(item) => Number(item.turns)} sort={activitySort} onSort={flip(setActivitySort)} /></div></section>
		</>}
	</main>;
}
