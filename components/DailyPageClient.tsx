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
  initialImageUrl?: string | null;
};

export default function DailyPageClient({
  account,
  year,
  month,
  today,
  initialImageUrl,
}: DailyPageClientProps) {

  const [todayImageUrl, setTodayImageUrl] =
    useState<string | null>(
      initialImageUrl ?? null
    );

  const [records, setRecords] =
    useState<DailyRecord[]>([]);

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
      } catch (error) {
        console.error(
          "load daily records failed:",
          error
        );
      }
    }

    loadRecords();
  }, [year, month]);

  return (
    <>
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

      <DailyCalendar
        year={year}
        month={month}
        today={today}
        records={records}
      />
    </>
  );
}
