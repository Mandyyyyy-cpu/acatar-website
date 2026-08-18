"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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

function TouchLotusGlow() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        z-0
        h-[90px]
        w-[90px]
        -translate-x-1/2
        -translate-y-1/2
        scale-50
        opacity-0
        transition-all
        duration-300
        group-active:scale-110
        group-active:opacity-100
      "
    >
      <div
        className="
          absolute
          inset-0
          rounded-full
          bg-[#B52328]/16
          blur-[10px]
        "
      />
    </div>
  );
}

export default function BottomBar({
  account,
  active = "picture",
}: BottomBarProps) {

  const router = useRouter();

  useEffect(() => {
    router.prefetch(`/picture/${account}`);
    router.prefetch(`/daily/${account}`);
  }, [account, router]);

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
          group
          flex
          flex-col
          items-center
          justify-center
          transition-transform
          duration-150
          active:scale-90
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

          <TouchLotusGlow />

          <div
            className="
              relative
              z-10
              transition-transform
              duration-150
            "
          >
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
          group
          flex
          flex-col
          items-center
          justify-center
          transition-transform
          duration-150
          active:scale-90
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

          <TouchLotusGlow />

          <div
            className="
              relative
              z-10
              transition-transform
              duration-150
            "
          >
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
