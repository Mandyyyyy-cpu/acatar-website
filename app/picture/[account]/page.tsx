import BottomBar from "@/components/BottomBar";

import { redirect, notFound } from "next/navigation";

import { getCurrentSession } from "@/lib/session";

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



  const apiBaseUrl =
    process.env.SCF_API_BASE_URL;


  if (!apiBaseUrl) {

    throw new Error(
      "SCF_API_BASE_URL is missing"
    );

  }


  const response =
    await fetch(
      `${apiBaseUrl.replace(/\/$/, "")}/user/${encodeURIComponent(
        normalizedAccount
      )}`,
      {
        cache: "no-store",
      }
    );


  if (response.status === 404) {

    notFound();

  }


  if (!response.ok) {

    throw new Error(
      "Failed to load user NFT"
    );

  }


  const data =
    await response.json();


  const user =
    data.user;


  if (!user?.nft) {

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
          src={user.nft.imageUrl}
          alt={`${normalizedAccount} 的专属佛像`}
          className="
            max-h-[75vh]
            w-auto
            max-w-full
            object-contain
          "
        />



      </div>

    {/* 底部导航栏目 */}

    <BottomBar
     account={normalizedAccount} 
    />

    </main>

  );

}