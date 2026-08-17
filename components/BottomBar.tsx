"use client";

import Link from "next/link";
import Image from "next/image";

type BottomBarProps = {
  account: string;
  active?: "picture" | "daily";
};

function LotusGlow() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        z-0
        h-[82px]
        w-[82px]
        -translate-x-1/2
        -translate-y-1/2
      "
    >
      {/* 中心莲瓣 */}
      <div
        className="
          absolute
          left-1/2
          top-[18px]
          h-[34px]
          w-[24px]
          -translate-x-1/2
          rounded-full
          bg-[#B52328]/22
          blur-[6px]
        "
      />

      {/* 左上莲瓣 */}
      <div
        className="
          absolute
          left-[18px]
          top-[28px]
          h-[26px]
          w-[20px]
          rotate-[-28deg]
          rounded-full
          bg-[#B52328]/18
          blur-[6px]
        "
      />

      {/* 右上莲瓣 */}
      <div
        className="
          absolute
          right-[18px]
          top-[28px]
          h-[26px]
          w-[20px]
          rotate-[28deg]
          rounded-full
          bg-[#B52328]/18
          blur-[6px]
        "
      />

      {/* 左下莲瓣 */}
      <div
        className="
          absolute
          left-[24px]
          top-[42px]
          h-[22px]
          w-[18px]
          rotate-[-18deg]
          rounded-full
          bg-[#B52328]/14
          blur-[6px]
        "
      />

      {/* 右下莲瓣 */}
      <div
        className="
          absolute
          right-[24px]
          top-[42px]
          h-[22px]
          w-[18px]
          rotate-[18deg]
          rounded-full
          bg-[#B52328]/14
          blur-[6px]
        "
      />
    </div>
  );
}

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
          NFT图片页
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
          className="
            relative
            flex
            h-16
            w-16
            items-center
            justify-center
          "
        >
          {active === "picture" && <LotusGlow />}

          <div className="relative z-10">
            <Image
              src="/icon-buddha.png"
              alt=""
              width={56}
              height={56}
            />
          </div>
        </div>
      </Link>

      {/* =====================
          每日佛像 / 日历页
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
          className="
            relative
            flex
            h-16
            w-16
            items-center
            justify-center
          "
        >
          {active === "daily" && <LotusGlow />}

          <div className="relative z-10">
            <Image
              src="/icon-daily.png"
              alt=""
              width={56}
              height={56}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
