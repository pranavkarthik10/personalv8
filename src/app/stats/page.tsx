"use client";

import { useEffect, useMemo, useState } from "react";
import { Bar } from "@/components/dither-kit/bar";
import { BarChart } from "@/components/dither-kit/bar-chart";
import type { ChartConfig } from "@/components/dither-kit/chart-context";
import { Legend } from "@/components/dither-kit/legend";
import type { DitherColor } from "@/components/dither-kit/palette";
import { Pie } from "@/components/dither-kit/pie";
import { PieChart } from "@/components/dither-kit/pie-chart";
import { Tooltip } from "@/components/dither-kit/tooltip";
import { XAxis } from "@/components/dither-kit/x-axis";
import { YAxis } from "@/components/dither-kit/y-axis";
import { DitherContributionGraph } from "@/components/dither-contribution-graph";
import {
	consecutiveActiveDays,
	formatChartDate,
	formatShortDate,
	summarizeGitHubActivity,
	type ContributionDay,
	type GitHubActivityStats,
} from "@/lib/github-activity";

type Daily = {
	date: string;
	tokens: number;
	apiCalls: number;
	sessionDays: number;
	estimatedCostUsd: number;
};
type Breakdown = { name: string; calls?: number; turns?: number; cost?: number };
type Stats = {
	daily: Daily[];
	summary: Omit<Daily, "date">;
	models: Breakdown[];
	activities: Breakdown[];
};
type Period = "today" | "7d" | "30d" | "60d" | "all";
type SortKey = "name" | "cost" | "usage";

const endpoint = "https://agent-stats.pranavkarthik10.workers.dev/v3/dashboard";
const githubEndpoint = "https://github-contributions-api.jogruber.de/v4/pranavkarthik10";
const periods: Array<[Period, string]> = [
	["today", "Today"],
	["7d", "7 days"],
	["30d", "30 days"],
	["60d", "60 days"],
	["all", "All time"],
];
const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
const whole = new Intl.NumberFormat("en-US");
const currency = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0,
});
const PIE_COLORS: DitherColor[] = ["purple", "blue", "pink", "orange", "green", "red", "grey"];

function BreakdownTable({
	items,
	usageLabel,
	usage,
	sort,
	onSort,
}: {
	items: Breakdown[];
	usageLabel: string;
	usage: (item: Breakdown) => number;
	sort: { key: SortKey; direction: 1 | -1 };
	onSort: (key: SortKey) => void;
}) {
	const [expanded, setExpanded] = useState(false);
	const ordered = useMemo(
		() =>
			[...items].sort((a, b) => {
				const left = sort.key === "name" ? a.name : sort.key === "cost" ? Number(a.cost) : usage(a);
				const right = sort.key === "name" ? b.name : sort.key === "cost" ? Number(b.cost) : usage(b);
				return (
					(typeof left === "string"
						? left.localeCompare(String(right))
						: Number(left) - Number(right)) * sort.direction
				);
			}),
		[items, sort, usage],
	);
	const arrow = (key: SortKey) => (sort.key === key ? (sort.direction === 1 ? " ↑" : " ↓") : "");
	const visible = expanded ? ordered : ordered.slice(0, 10);
	return (
		<div className="stats-table-wrap">
			<table className="stats-table">
				<thead>
					<tr>
						<th>
							<button type="button" onClick={() => onSort("name")}>
								name{arrow("name")}
							</button>
						</th>
						<th>
							<button type="button" onClick={() => onSort("usage")}>
								{usageLabel}
								{arrow("usage")}
							</button>
						</th>
						<th>
							<button type="button" onClick={() => onSort("cost")}>
								spend{arrow("cost")}
							</button>
						</th>
					</tr>
				</thead>
				<tbody>
					{visible.map((item) => (
						<tr key={item.name}>
							<td>{item.name}</td>
							<td>{whole.format(usage(item))}</td>
							<td>{currency.format(Number(item.cost))}</td>
						</tr>
					))}
				</tbody>
			</table>
			{ordered.length > 10 && (
				<button
					type="button"
					className="stats-show-more"
					onClick={() => setExpanded((value) => !value)}
				>
					{expanded ? "show less" : `show ${ordered.length - 10} more`}
				</button>
			)}
		</div>
	);
}

function StatRows({ rows }: { rows: Array<[string, string]> }) {
	return (
		<dl className="stats-rows">
			{rows.map(([label, value]) => (
				<div key={label} className="stats-row">
					<dt>{label}</dt>
					<dd>{value}</dd>
				</div>
			))}
		</dl>
	);
}

export default function StatsPage() {
	const [period, setPeriod] = useState<Period>("all");
	const [stats, setStats] = useState<Stats | null>(null);
	const [loading, setLoading] = useState(true);
	const [github, setGithub] = useState<GitHubActivityStats | null>(null);
	const [modelSort, setModelSort] = useState({ key: "cost" as SortKey, direction: -1 as 1 | -1 });
	const [activitySort, setActivitySort] = useState({
		key: "usage" as SortKey,
		direction: -1 as 1 | -1,
	});

	useEffect(() => {
		let live = true;
		setLoading(true);
		fetch(`${endpoint}?period=${period}`)
			.then((response) => (response.ok ? response.json() : Promise.reject()))
			.then((data) => {
				if (live) {
					setStats({
						...data,
						models: data.models ?? [],
						activities: data.activities ?? [],
					});
				}
			})
			.catch(() => live && setStats(null))
			.finally(() => live && setLoading(false));
		return () => {
			live = false;
		};
	}, [period]);

	useEffect(() => {
		let live = true;
		fetch(githubEndpoint)
			.then((response) => (response.ok ? response.json() : Promise.reject()))
			.then((data: { contributions: ContributionDay[] }) => {
				if (live) setGithub(summarizeGitHubActivity(data.contributions ?? []));
			})
			.catch(() => live && setGithub(null));
		return () => {
			live = false;
		};
	}, []);

	const flip =
		(setter: typeof setModelSort) => (key: SortKey) =>
			setter((current) => ({
				key,
				direction:
					current.key === key
						? ((current.direction * -1) as 1 | -1)
						: key === "name"
							? 1
							: -1,
			}));

	const daily = stats?.daily ?? [];
	const recentLimit =
		period === "today" || period === "7d"
			? 14
			: period === "30d"
				? 30
				: period === "60d"
					? 56
					: daily.length;
	const recent = daily.slice(-recentLimit);
	const barData = recent.map((day) => ({
		date: day.date,
		label: formatChartDate(day.date),
		tokens: Number(day.tokens),
	}));
	const barConfig = { tokens: { label: "tokens", color: "purple" as const } } satisfies ChartConfig;

	const activeDays = stats?.daily.filter((day) => day.apiCalls > 0).length ?? 0;
	const aiStreaks = consecutiveActiveDays(
		(stats?.daily ?? []).map((day) => ({
			date: day.date,
			active: Number(day.apiCalls) > 0,
		})),
	);
	const topModel = [...(stats?.models ?? [])].sort(
		(a, b) => Number(b.calls) - Number(a.calls),
	)[0];

	const aiRows: Array<[string, string]> = stats
		? [
				["tokens", compact.format(stats.summary.tokens)],
				["api calls", whole.format(stats.summary.apiCalls)],
				["active days", whole.format(activeDays)],
				["longest streak", `${whole.format(aiStreaks.longest)}d`],
				["top model", topModel?.name?.toLowerCase() ?? "—"],
				["estimated spend", currency.format(stats.summary.estimatedCostUsd)],
			]
		: [];

	const githubRows: Array<[string, string]> = github
		? [
				["contributions", whole.format(github.contributions)],
				["active days", whole.format(github.activeDays)],
				["longest streak", `${whole.format(github.longestStreak)}d`],
				["current streak", `${whole.format(github.currentStreak)}d`],
				[
					"busiest day",
					github.busiest
						? `${whole.format(github.busiest.count)} · ${formatShortDate(github.busiest.date)}`
						: "—",
				],
			]
		: [];

	const modelSlices = useMemo(() => {
		const ranked = [...(stats?.models ?? [])]
			.filter((model) => Number(model.calls) > 0 && !model.name.startsWith("<"))
			.sort((a, b) => Number(b.calls) - Number(a.calls));
		const top = ranked.slice(0, 6);
		const rest = ranked.slice(6);
		const otherCalls = rest.reduce((sum, model) => sum + Number(model.calls), 0);
		const rows = top.map((model) => ({
			model: model.name,
			calls: Number(model.calls),
		}));
		if (otherCalls > 0) rows.push({ model: "other", calls: otherCalls });
		return rows;
	}, [stats?.models]);

	const pieConfig = useMemo(() => {
		const config: ChartConfig = {};
		modelSlices.forEach((slice, index) => {
			config[slice.model] = {
				label: slice.model,
				color: PIE_COLORS[index % PIE_COLORS.length]!,
			};
		});
		return config;
	}, [modelSlices]);

	const rangeLabel = (() => {
		if (barData.length === 0) return "—";
		const start = barData[0]!.date;
		const end = barData.at(-1)!.date;
		if (barData.length === 1) return formatChartDate(start);
		// All-time (and any multi-year window) needs years in the range label.
		if (start.slice(0, 4) !== end.slice(0, 4) || period === "all") {
			return `${formatShortDate(start)} – ${formatShortDate(end)}`;
		}
		return `${formatChartDate(start)} – ${formatChartDate(end)}`;
	})();

	return (
		<main className="page-frame stats-page">
			<section className="stats-intro">
				<div>
					<p className="page-kicker">Stats</p>
					<h1 className="page-title">Some fun little stats.</h1>
				</div>
				<p className="stats-updated">
					{loading ? (
						"refreshing"
					) : stats?.daily.at(-1)?.date ? (
						<>
							last synced <time dateTime={stats.daily.at(-1)?.date}>{stats.daily.at(-1)?.date}</time>
						</>
					) : (
						"syncing soon"
					)}
				</p>
			</section>

			<div className="stats-periods" role="tablist" aria-label="Stats time horizon">
				{periods.map(([value, label]) => (
					<button
						key={value}
						type="button"
						role="tab"
						aria-selected={period === value}
						className={period === value ? "is-active" : ""}
						onClick={() => setPeriod(value)}
					>
						{label}
					</button>
				))}
			</div>

			{!stats && !loading ? (
				<p className="page-description">The numbers are taking a breather. Please try again shortly.</p>
			) : (
				<>
					<section className="stats-block stats-block-first" aria-labelledby="ai-usage-title">
						<div className="stats-heading">
							<h2 id="ai-usage-title">ai usage</h2>
							<span>{rangeLabel}</span>
						</div>
						<StatRows rows={aiRows} />
						<div className="stats-chart stats-chart-bar">
							{barData.length > 0 ? (
								<BarChart
									data={barData}
									config={barConfig}
									bloom="aura"
									margins={{ top: 28, right: 8, bottom: 28, left: 44 }}
									className="h-56 w-full"
								>
									<XAxis dataKey="label" maxTicks={6} />
									<YAxis tickFormatter={(value) => compact.format(Number(value))} />
									<Tooltip
										labelKey="date"
										valueFormatter={(value) => `${whole.format(value)} tokens`}
									/>
									<Bar dataKey="tokens" variant="gradient" />
								</BarChart>
							) : (
								<div className="stats-chart-empty">waiting on token volume…</div>
							)}
						</div>
					</section>

					<section className="stats-block" aria-labelledby="models-title">
						<div className="stats-heading">
							<h2 id="models-title">models</h2>
							<span>by api calls</span>
						</div>
						<div className="stats-models-grid">
							<div className="stats-chart stats-chart-pie">
								{modelSlices.length > 0 ? (
									<PieChart
										data={modelSlices}
										config={pieConfig}
										dataKey="calls"
										nameKey="model"
										innerRadius={0.56}
										bloom="low"
										margins={{ top: 8, right: 20, bottom: 64, left: 20 }}
										className="h-full w-full"
									>
										<Legend isClickable align="center" />
										<Tooltip valueFormatter={(value) => `${whole.format(value)} calls`} />
										<Pie variant="gradient" />
									</PieChart>
								) : (
									<div className="stats-chart-empty">no model mix yet</div>
								)}
							</div>
							<div className="stats-models-table">
								<BreakdownTable
									items={stats?.models ?? []}
									usageLabel="calls"
									usage={(item) => Number(item.calls)}
									sort={modelSort}
									onSort={flip(setModelSort)}
								/>
							</div>
						</div>
					</section>

					<section className="stats-block" aria-labelledby="activity-title">
						<div className="stats-heading">
							<h2 id="activity-title">activity</h2>
						</div>
						<BreakdownTable
							items={stats?.activities ?? []}
							usageLabel="turns"
							usage={(item) => Number(item.turns)}
							sort={activitySort}
							onSort={flip(setActivitySort)}
						/>
					</section>
				</>
			)}

			<section className="stats-block" aria-labelledby="github-title">
				<div className="stats-heading">
					<h2 id="github-title">github activity</h2>
					<span>last 365 days</span>
				</div>
				{github ? (
					<>
						<StatRows rows={githubRows} />
						<div className="stats-chart stats-chart-github">
							<DitherContributionGraph days={github.days} />
						</div>
					</>
				) : (
					<div className="stats-chart-empty">loading contribution history…</div>
				)}
			</section>
		</main>
	);
}
