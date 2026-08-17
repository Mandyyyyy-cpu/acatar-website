import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/session";
import BottomBar from "@/components/BottomBar";
import DailyPageClient from "@/components/DailyPageClient";


type DailyPageProps = {
  params: Promise<{
    account: string;
  }>;
};


export default async function DailyPage({
  params,
}: DailyPageProps) {

  const { account } = await params;

  const normalizedAccount =
    account.toUpperCase();


  const session =
    await getCurrentSession();

  const apiBase =
    process.env.ACATAR_API_BASE_URL;

  let todayImageUrl:
    string | null = null;

  if (apiBase) {
    const response =
      await fetch(
        `${apiBase}/daily-record/${normalizedAccount}`,
        { cache: "no-store" }
      );

    if (response.ok) {
      const data =
        await response.json();

      todayImageUrl =
        data.draw?.nft?.imageUrl ?? null;
    }
  }


  if (
    !session ||
    session.account !== normalizedAccount
  ) {

    redirect("/");

  }


  /*
   * =========================
   * 北京时间
   * =========================
   */

  const now = new Date();

  const beijingParts =
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone: "Asia/Shanghai",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }
    ).formatToParts(now);


  const getPart = (
    type: "year" | "month" | "day"
  ) =>
    Number(
      beijingParts.find(
        (part) => part.type === type
      )?.value
    );


  const year =
    getPart("year");

  const month =
    getPart("month");

  const today =
    getPart("day");


  /*
   * =========================
   * 生成本月日历
   * =========================
   */

  const daysInMonth =
    new Date(
      year,
      month,
      0
    ).getDate();


  const firstDay =
    new Date(
      year,
      month - 1,
      1
    ).getDay();


  const calendarCells:
    (number | null)[] = [];


  for (
    let i = 0;
    i < firstDay;
    i++
  ) {

    calendarCells.push(null);

  }


  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {

    calendarCells.push(day);

  }


  return (

    <main
      className="
        min-h-screen
        bg-white
        pb-28
        text-[#9A2325]
      "
    >


      <div
        className="
          mx-auto
          flex
          min-h-[calc(100vh-7rem)]
          w-full
          max-w-md
          flex-col
          px-5
          pt-8
        "
      >


        <DailyPageClient
          account={normalizedAccount}
          year={year}
          month={month}
          today={today}
          initialImageUrl={todayImageUrl}
        />


      </div>



      <BottomBar
        account={normalizedAccount}
        active="daily"
      />


    </main>

  );

}
