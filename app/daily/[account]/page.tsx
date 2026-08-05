import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/session";

import BottomBar from "@/components/BottomBar";

import Link from "next/link";

type DailyPageProps = {
  params: Promise<{
    account: string;
  }>;
};


export default async function DailyPage({
  params,
}: DailyPageProps) {


  const {
    account,
  } = await params;


  const normalizedAccount =
    account.toUpperCase();


  const session =
    await getCurrentSession();


  /*
   * 没有登录
   * 或访问其他账号页面
   * 返回首页
   */
  if (
    !session ||
    session.account !== normalizedAccount
  ) {

    redirect("/");

  }


  return (

    <main
      className="
        min-h-screen
        bg-white
        text-[#9A2325]
        pb-24
      "
    >


      <div
        className="
          mx-auto
          max-w-md
          px-6
          pt-16
          text-center
        "
      >


        <h1
          className="
            text-3xl
            font-bold
          "
        >
          每日佛像
        </h1>


        <div
          className="
            mt-16
            rounded-3xl
            border
            border-neutral-200
            p-10
          "
        >

          <p
            className="
              text-lg
            "
          >
            今日佛像
          </p>


          <Link
           href={`/daily/${normalizedAccount}/draw`}
           className="
            mt-6
            block
           "
          >
            点击抽取今日佛缘
            
          </Link>


        </div>


      </div>


      <BottomBar
        account={normalizedAccount}
        active="daily"
      />


    </main>

  );

}