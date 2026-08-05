import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/session";


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
   */
  if (
    !session ||
    session.account !== normalizedAccount
  ) {

    redirect("/");

  }



  /*
   * 每日佛像入口
   *
   * 后续这里会加入：
   * 1. 检查今天是否已经抽过
   * 2. 没抽 -> draw页面
   * 3. 已抽 -> 今日佛像结果页面
   *
   * 目前直接进入抽卡页面
   */

  redirect(
    `/daily/${normalizedAccount}/draw`
  );


}