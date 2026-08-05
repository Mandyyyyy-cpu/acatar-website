"use client";

import Link from "next/link";
import Image from "next/image";


type BottomBarProps = {

  account: string;

  active?: "picture" | "daily";

};


export default function BottomBar({
  account,
  active = "picture",

}: BottomBarProps) {


  return (

    <div
      className="
        fixed
        bottom-0
        left-0
        z-50
        flex
        h-24
        w-full
        items-center
        justify-between
        bg-white
        px-10
      "
    >


      {/* =====================
          当前NFT图片页面
      ====================== */}

      <Link
        href={`/picture/${account}`}
        className="
          flex
          flex-col
          items-center
          justify-center
        "
      >

        <div
          className={`
            flex
            items-center
            justify-center

            ${
              active === "daily"
              ?
              `
              drop-shadow-[0_0_22px_rgba(181,35,40,0.45)]
              `
              :
              ""
            }
          `}
        >

          <Image
            src="/icon-buddha.png"
            alt=""
            width={56}
            height={56}
          />

        </div>


      </Link>



      {/* =====================
          每日佛像
      ====================== */}

      <Link
        href={`/daily/${account}`}
        className="
          flex
          flex-col
          items-center
          justify-center
        "
      >


        <div
          className={`
            flex
            items-center
            justify-center

            ${
              active === "picture"
              ?
              `
              drop-shadow-[0_0_22px_rgba(181,35,40,0.45)]
              `
              :
              ""
            }
          `}
        >

          <Image
            src="/icon-daily.png"
            alt=""
            width={56}
            height={56}
          />


        </div>


      </Link>


    </div>

  );

}