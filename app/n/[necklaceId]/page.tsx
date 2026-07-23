import Image from "next/image";
import {
  notFound,
  redirect,
} from "next/navigation";

import { getCurrentSession } from "@/lib/session";
import { findUserByAccount } from "@/lib/users";


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



  const owner =
    findUserByAccount(
      normalizedAccount
    );



  if (!owner) {

    notFound();

  }



  const session =
    await getCurrentSession();



  /*
   * 检查是否已经登录
   *
   * 登录账号必须匹配当前图片账号
   */

  if (
    !session ||
    session.account.toUpperCase()
      !== normalizedAccount
  ) {

    redirect(
      `/login`
    );

  }



  return (

    <main
      className="
        min-h-dvh
        bg-black
        text-white
      "
    >


      <div
        className="
          mx-auto
          flex
          min-h-dvh
          w-full
          max-w-[430px]
          flex-col
        "
      >


        <header
          className="
            flex
            items-center
            justify-between
            px-5
            py-5
          "
        >


          <p
            className="
              text-sm
              tracking-[0.2em]
              text-neutral-400
            "
          >

            {normalizedAccount}

          </p>



          <form
            action="/api/logout"
            method="post"
          >

            <button

              type="submit"

              className="
                text-sm
                text-neutral-400
              "

            >

              退出

            </button>


          </form>


        </header>





        <section
          className="
            flex
            flex-1
            items-center
            px-5
            pb-10
          "
        >


          <div
            className="
              relative
              aspect-[9/16]
              w-full
              overflow-hidden
              rounded-[28px]
              bg-neutral-900
            "
          >


            <Image

              src={
                owner.imageUrl
              }


              alt={
                `${owner.account} 对应的藏品图片`
              }


              fill


              priority


              sizes="
                (max-width:430px) 100vw,
                430px
              "


              className="
                object-cover
              "

            />


          </div>


        </section>


      </div>


    </main>

  );

}