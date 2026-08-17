"use client";

import { useState } from "react";
import {
  getBranchMonth,
  solarTermBoundaries,
} from "@/lib/solarTerms";

type DailyCalendarProps = {
  year: number;
  month: number;
  today: number;
  todayImageUrl?: string | null;
};

export default function DailyCalendar({
  year,
  month,
  today,
  todayImageUrl,
}: DailyCalendarProps) {

  const [view, setView] =
    useState<"month" | "year">("month");

  const [activeMonth, setActiveMonth] =
    useState(month);

  const [zoomMonth, setZoomMonth] =
    useState<number | null>(null);

  const [enlargedDay, setEnlargedDay] =
    useState<number | null>(null);

  const currentBranchMonth =
    getBranchMonth(
      new Date(year, activeMonth - 1, 15, 12),
      year
    );

  function getGanzhiYear(
    date: Date,
    y: number
  ) {
    const stems =
      ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];

    const branches =
      ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];

    const lichun =
      solarTermBoundaries[y]?.find(
        (term) => term.name === "立春"
      );

    const ganzhiYear =
      lichun &&
      date.getTime() <
      new Date(lichun.dateTime).getTime()
        ? y - 1
        : y;

    const stem =
      stems[(ganzhiYear - 4) % 10];

    const branch =
      branches[(ganzhiYear - 4) % 12];

    return `${stem}${branch}年`;
  }

  function getMonthCells(m: number) {
    const firstDay =
      new Date(year, m - 1, 1).getDay();

    const days =
      new Date(year, m, 0).getDate();

    return [
      ...Array(firstDay).fill(null),
      ...Array.from(
        { length: days },
        (_, i) => i + 1
      ),
    ];
  }

  return (
    <div
      className="
        transition-all
        duration-500
        ease-out
      "
    >
      {view === "month" ? (
        <div className="animate-[calendarMonthIn_420ms_ease-out]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setView("year")}
            className="text-2xl text-[#9A2325]"
          >
            ‹
          </button>

          <span className="text-xl font-medium text-[#9A2325]">
            {getGanzhiYear(
              new Date(year, activeMonth - 1, 15, 12),
              year
            )} · {currentBranchMonth}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-7 text-center text-sm text-neutral-400">
          {["日","一","二","三","四","五","六"].map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-7 gap-y-2 text-center">
          {getMonthCells(activeMonth).map((day, index) => (
            <div
              key={index}
              className="
                flex
                min-h-[68px]
                flex-col
                items-center
                justify-start
              "
            >
              {day && (
                <span
                  className={
                    day === today && activeMonth === month
                      ? "flex h-8 w-8 items-center justify-center rounded-full bg-[#9A2325] text-white"
                      : "flex h-8 w-8 items-center justify-center text-neutral-700"
                  }
                >
                  {day}
                </span>
              )}

              {day && (
                <div
                  className="
                    mt-1.5
                    h-[24px]
                    w-[24px]
                  "
                >
                  {day === today &&
                    activeMonth === month &&
                    todayImageUrl && (
                      <img
                        src={todayImageUrl}
                        alt="今日佛像"
                        onClick={() =>
                          setEnlargedDay(day)
                        }
                        className="
                          h-full
                          w-full
                          cursor-pointer
                          rounded-sm
                          object-cover
                        "
                      />
                    )}
                </div>
              )}
            </div>
          ))}
        </div>
        </div>

      ) : (
        <div
          className="
            grid
            grid-cols-3
            gap-x-5
            gap-y-8
            animate-[calendarYearIn_420ms_ease-out]
          "
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map(
            (m) => (
              <button
                key={m}
                type="button"
                className={`
                  transition-all
                  duration-200
                  ease-out
                  ${
                    zoomMonth === null
                      ? "scale-100 opacity-100"
                      : zoomMonth === m
                        ? "scale-110 opacity-100"
                        : "scale-95 opacity-25"
                  }
                `}
                onClick={() => {
                  setZoomMonth(m);
                  setActiveMonth(m);

                  setTimeout(() => {
                    setView("month");
                  }, 180);
                }}
              >
                <div
                  className={`
                    mb-2
                    text-left
                    text-sm
                    font-medium
                    ${
                      m === month
                        ? "text-[#7F181B]"
                        : "text-[#9A2325]"
                    }
                  `}
                >
                  {m}月

                  {m === month && (
                    <div className="mt-1 h-px w-5 bg-[#9A2325]/60" />
                  )}
                </div>

                <div className="mb-1 grid grid-cols-7 text-center text-[7px] text-neutral-300">
                  {["日","一","二","三","四","五","六"].map((w) => (
                    <span key={w}>{w}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-y-1 text-center text-[8px] leading-none text-neutral-500">
                  {getMonthCells(m).map((day, index) => (
                    <span key={index}>
                      {day ?? ""}
                    </span>
                  ))}
                </div>
              </button>
            )
          )}
        </div>
      )}
      {enlargedDay !== null && todayImageUrl && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-white/80
          "
          onClick={() => setEnlargedDay(null)}
        >
          <img
            src={todayImageUrl}
            alt="放大的每日佛像"
            className="
              max-h-[82vh]
              max-w-[88vw]
              object-contain
            "
          />
        </div>
      )}


    </div>
  );
}
