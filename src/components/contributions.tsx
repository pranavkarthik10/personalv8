"use client";

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  type Activity,
} from "@/components/ui/kibo-ui/contribution-graph";
import { parseISO, isAfter, isBefore, isEqual, subYears, subDays, compareAsc, formatISO } from "date-fns";

interface ContributionsProps {
  data: Activity[];
}

export function Contributions({ data }: ContributionsProps) {
  const today = new Date();
  const start = subYears(today, 1);
  const end = subDays(today, 1);

  const filtered = data
    .filter((a) => {
      const d = parseISO(a.date);
      return (isAfter(d, start) || isEqual(d, start)) && (isBefore(d, end) || isEqual(d, end));
    })
    .sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)));

  // Ensure the range explicitly spans start → end so the graph pads holes up to yesterday
  const startIso = formatISO(start, { representation: "date" });
  const endIso = formatISO(end, { representation: "date" });
  const hasStart = filtered.some((a) => a.date === startIso);
  const hasEnd = filtered.some((a) => a.date === endIso);

  const augmented = [
    ...(!hasStart ? [{ date: startIso, count: 0, level: 0 }] : []),
    ...filtered,
    ...(!hasEnd ? [{ date: endIso, count: 0, level: 0 }] : []),
  ].sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)));

  return (
    <div className="w-full">
      <ContributionGraph data={augmented} className="mx-auto">
        <ContributionGraphCalendar>
          {({ activity, dayIndex, weekIndex }) => (
            <ContributionGraphBlock
              key={`${weekIndex}-${dayIndex}`}
              activity={activity}
              dayIndex={dayIndex}
              weekIndex={weekIndex}
              className="
                contrib-block
                data-[level='0']:fill-muted
                data-[level='1']:fill-green-200
                data-[level='2']:fill-green-300
                data-[level='3']:fill-green-400
                data-[level='4']:fill-green-500
                hover:ring-2 hover:ring-green-500/50 transition-all duration-200
              "
            />
          )}
        </ContributionGraphCalendar>
        <ContributionGraphFooter>
          <ContributionGraphTotalCount>
            {({ totalCount }) => (
              <>{`${totalCount} activities in ${new Date().getFullYear()}`}</>
            )}
          </ContributionGraphTotalCount>
          <ContributionGraphLegend>
            {({ level }) => (
              <svg height={12} width={12}>
                <rect
                  height={12}
                  width={12}
                  rx={2}
                  ry={2}
                  className={
                    level === 0
                      ? "fill-muted stroke-[1px] stroke-border"
                      : level === 1
                      ? "fill-green-200"
                      : level === 2
                      ? "fill-green-300"
                      : level === 3
                      ? "fill-green-400"
                      : "fill-green-500"
                  }
                />
              </svg>
            )}
          </ContributionGraphLegend>
        </ContributionGraphFooter>
      </ContributionGraph>
    </div>
  );
}
