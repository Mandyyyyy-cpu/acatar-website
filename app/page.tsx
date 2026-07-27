import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/session";
import LoginForm from "@/components/LoginForm";


export default async function HomePage() {

  const session =
    await getCurrentSession();


  // 已经登录过
  // 直接进入自己的图片页面
  if (session) {

    redirect(
      `/picture/${session.account}`
    );

  }


  // 第一次访问，没有登录记录
  return (
    <LoginForm />
  );

}