
import { redirect, notFound } from "next/navigation";

import { getCurrentSession } from "@/lib/session";
import { findUserByAccount } from "@/lib/users";

import BackButton from "@/components/BackButton";

type PicturePageProps = {
  params: Promise<{
    account: string;
  }>;
};


export default async function PicturePage({
  params,
}: PicturePageProps) {


  const { account } = await params;


  const normalizedAccount =
    account
      .trim()
      .toUpperCase();



  const user =
    findUserByAccount(
      normalizedAccount
    );


  if (!user) {

    notFound();

  }



  const session =
    await getCurrentSession();



  /*
   * 没有登录，
   * 或当前账号和访问账号不一致
   * 返回登录页面
   */

  if (
    !session ||
    session.account.toUpperCase()
      !== normalizedAccount
  ) {

    redirect("/");

  }



  return (

    <main
      className="
        min-h-dvh
        w-full
        bg-white
        flex
        justify-center
      "
    >


      <div
        className="
          relative
          flex
          min-h-dvh
          w-full
          max-w-[430px]
          items-center
          justify-center
          px-5
        "
      >



        {/* 左上角返回按钮 */}

        <BackButton />




        {/* NFT 图片 */}

        <img
          src={user.imageUrl}
          alt={`${normalizedAccount} 的专属佛像`}
          className="
            max-h-[85vh]
            w-auto
            max-w-full
            object-contain
          "
        />



      </div>


    </main>

  );

}