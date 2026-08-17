export type SolarTermBoundary = {
  name: string;
  branch: string;
  dateTime: string;
};

export const solarTermBoundaries:
  Record<number, SolarTermBoundary[]> = {
  2026: [
    { name: "小寒", branch: "丑", dateTime: "2026-01-05T16:23:00+08:00" },
    { name: "立春", branch: "寅", dateTime: "2026-02-04T04:02:00+08:00" },
    { name: "惊蛰", branch: "卯", dateTime: "2026-03-05T21:59:00+08:00" },
    { name: "清明", branch: "辰", dateTime: "2026-04-05T02:40:00+08:00" },
    { name: "立夏", branch: "巳", dateTime: "2026-05-05T19:49:00+08:00" },
    { name: "芒种", branch: "午", dateTime: "2026-06-05T23:48:00+08:00" },
    { name: "小暑", branch: "未", dateTime: "2026-07-07T09:57:00+08:00" },
    { name: "立秋", branch: "申", dateTime: "2026-08-07T19:43:00+08:00" },
    { name: "白露", branch: "酉", dateTime: "2026-09-07T22:41:00+08:00" },
    { name: "寒露", branch: "戌", dateTime: "2026-10-08T14:29:00+08:00" },
    { name: "立冬", branch: "亥", dateTime: "2026-11-07T17:52:00+08:00" },
    { name: "大雪", branch: "子", dateTime: "2026-12-07T10:37:00+08:00" },
  ],
};

export function getBranchMonth(
  date: Date,
  year: number
) {
  const terms =
    solarTermBoundaries[year];

  if (!terms) return "";

  let branch = "子";

  for (const term of terms) {
    if (
      date.getTime() >=
      new Date(term.dateTime).getTime()
    ) {
      branch = term.branch;
    }
  }

  return `${branch}月`;
}
