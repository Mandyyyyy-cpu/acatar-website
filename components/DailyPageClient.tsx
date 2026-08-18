"use client";

import { useEffect, useState } from "react";

import DailyDrawInteraction from "@/components/DailyDrawInteraction";
import DailyCalendar from "@/components/DailyCalendar";

type DailyRecord = {
  drawDate: string;
  imageUrl: string;
};

type DailyPageClientProps = {
  account: string;
  year: number;
  month: number;
  today: number;
};

export default function DailyPageClient({
  account,
  year,
  month,
  today,
}: DailyPageClientProps) {

  const [todayImageUrl, setTodayImageUrl] =
    useState<string | null>(null);

  const [records, setRecords] =
    useState<DailyRecord[]>([]);

  const [recordsLoaded, setRecordsLoaded] =
    useState(false);

  useEffect(() => {
    async function loadRecords() {
      try {
        const response = await fetch(
          `/api/daily/records?year=${year}&month=${month}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "读取每日记录失败"
          );
        }

        const mappedRecords: DailyRecord[] =
          (data.records ?? []).map(
            (record: {
              drawDate: string;
              nft?: {
                imageUrl?: string;
              };
            }) => ({
              drawDate: record.drawDate,
              imageUrl:
                record.nft?.imageUrl ?? "",
            })
          )
          .filter(
            (record: DailyRecord) =>
              Boolean(record.imageUrl)
          );

        setRecords(mappedRecords);

        const todayDate =
          `${year}-${String(month).padStart(2, "0")}-${String(today).padStart(2, "0")}`;

        const todayRecord =
          mappedRecords.find(
            (record) =>
              record.drawDate === todayDate
          );

        setTodayImageUrl(
          todayRecord?.imageUrl ?? null
        );

        setRecordsLoaded(true);
      } catch (error) {
        console.error(
          "load daily records failed:",
          error
        );

        setRecordsLoaded(true);
      }
    }

    loadRecords();
  }, [year, month]);

  return (
    <>
      {!recordsLoaded ? (
        <div className="h-[360px]" />
      ) : (
      <DailyDrawInteraction
        account={account}
        todayImageUrl={todayImageUrl}
        onDrawComplete={(imageUrl) => {
          setTodayImageUrl(imageUrl);

          const monthText =
            String(month).padStart(2, "0");

          const dayText =
            String(today).padStart(2, "0");

          const drawDate =
            `${year}-${monthText}-${dayText}`;

          setRecords((current) => {
            const withoutToday =
              current.filter(
                (record) =>
                  record.drawDate !== drawDate
              );

            return [
              ...withoutToday,
              {
                drawDate,
                imageUrl,
              },
            ];
          });
        }}
      />
      )}

      <DailyCalendar
        year={year}
        month={month}
        today={today}
        records={records}
      />
    </>
  );
}
