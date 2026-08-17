"use client";

import { useState } from "react";

import DailyDrawInteraction from "@/components/DailyDrawInteraction";
import DailyCalendar from "@/components/DailyCalendar";

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

  return (
    <>
      <DailyDrawInteraction
        account={account}
        todayImageUrl={todayImageUrl}
        onDrawComplete={setTodayImageUrl}
      />

      <DailyCalendar
        year={year}
        month={month}
        today={today}
        todayImageUrl={todayImageUrl}
      />
    </>
  );
}
