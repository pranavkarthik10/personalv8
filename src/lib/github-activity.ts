export type ContributionDay = {
	date: string;
	count: number;
	level: number;
};

export type GitHubActivityStats = {
	contributions: number;
	activeDays: number;
	longestStreak: number;
	currentStreak: number;
	busiest: ContributionDay | null;
	days: ContributionDay[];
};

function parseDate(value: string) {
	return new Date(`${value}T12:00:00`);
}

/** Rolling last-365 contribution window with streak / busiest summaries. */
export function summarizeGitHubActivity(
	contributions: ContributionDay[],
	now = new Date(),
): GitHubActivityStats {
	const end = new Date(now);
	end.setHours(12, 0, 0, 0);
	const start = new Date(end);
	start.setDate(start.getDate() - 364);

	const byDate = new Map(contributions.map((day) => [day.date, day]));
	const days: ContributionDay[] = [];

	for (let cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
		const date = cursor.toISOString().slice(0, 10);
		const found = byDate.get(date);
		days.push(found ?? { date, count: 0, level: 0 });
	}

	const contributionsTotal = days.reduce((sum, day) => sum + day.count, 0);
	const activeDays = days.filter((day) => day.count > 0).length;
	const busiest = days.reduce<ContributionDay | null>((best, day) => {
		if (!best || day.count > best.count) return day;
		return best;
	}, null);

	let longestStreak = 0;
	let run = 0;
	for (const day of days) {
		if (day.count > 0) {
			run += 1;
			longestStreak = Math.max(longestStreak, run);
		} else {
			run = 0;
		}
	}

	let currentStreak = 0;
	for (let i = days.length - 1; i >= 0; i -= 1) {
		const day = days[i];
		if (!day) break;
		// Allow today to be empty without breaking the streak (GitHub behavior).
		if (day.count === 0 && i === days.length - 1) continue;
		if (day.count > 0) currentStreak += 1;
		else break;
	}

	return {
		contributions: contributionsTotal,
		activeDays,
		longestStreak,
		currentStreak,
		busiest: busiest && busiest.count > 0 ? busiest : null,
		days,
	};
}

export function formatShortDate(date: string) {
	return parseDate(date).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).toLowerCase();
}

export function formatChartDate(date: string) {
	return parseDate(date).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	}).toLowerCase();
}

export function consecutiveActiveDays(
	days: Array<{ date: string; active: boolean }>,
) {
	let longest = 0;
	let run = 0;
	for (const day of days) {
		if (day.active) {
			run += 1;
			longest = Math.max(longest, run);
		} else {
			run = 0;
		}
	}

	let current = 0;
	for (let i = days.length - 1; i >= 0; i -= 1) {
		const day = days[i];
		if (!day) break;
		if (!day.active && i === days.length - 1) continue;
		if (day.active) current += 1;
		else break;
	}

	return { longest, current };
}
