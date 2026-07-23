import { redirect, notFound } from "next/navigation";

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

  const normalizedAccount = account
    .trim()
    .toUpperCase();

  const user = findUserByAccount(normalizedAccount);

  if (!user) {
    notFound();
  }

  const session = await getCurrentSession();

  /*
   * 没有登录，或者当前登录账号与页面账号不一致，
   * 就返回登录页面。
   */
  if (
    !session ||
    session.account.toUpperCase() !== normalizedAccount
  ) {
    redirect("/login");
  }

  return (
    <main
      className="
        min-h-dvh
        w-full
        bg-cover
        bg-center
        bg-no-repeat
        px-6
        py-10
        text-[#B52328]
      "
      style={{
        backgroundImage:
          "url('/background.PNG')",
      }}
    >
      <div
        className="
          mx-auto
          flex
          min-h-[calc(100dvh-5rem)]
          w-full
          max-w-[430px]
          flex-col
          items-center
          justify-center
        "
      >
        <section
          className="
            flex
            w-full
            flex-col
            items-center
          "
        >
          {/* 品牌标识 */}
          <img
            src="/logo.png"
            alt="Buddha & Energy"
            className="
              mb-8
              block
              h-auto
              w-[78%]
              max-w-[320px]
              object-contain
            "
          />

          {/* NFT 图片 */}
          <div
            className="
              w-full
              overflow-hidden
              rounded-[24px]
              border
              border-[#B52328]/25
              bg-white/30
              p-3
              shadow-[0_10px_30px_rgba(120,20,20,0.12)]
              backdrop-blur-[1px]
            "
          >
            <img
              src={user.imageUrl}
              alt={`${normalizedAccount} 的专属佛像`}
              className="
                block
                h-auto
                w-full
                rounded-[16px]
                object-contain
              "
            />
          </div>

          {/* 账号编号 */}
          <p
            className="
              mt-6
              text-xs
              tracking-[0.3em]
              text-[#B52328]/65
            "
          >
            COLLECTION ID
          </p>

          <h1
            className="
              mt-2
              text-xl
              font-medium
              tracking-[0.18em]
              text-[#B52328]
            "
          >
            {normalizedAccount}
          </h1>

          <p
            className="
              mt-3
              text-center
              text-sm
              leading-6
              text-[#B52328]/65
            "
          >
            长按图片可保存到手机相册
          </p>

          {/* 保存图片 */}
          <a
            href={user.imageUrl}
            download
            className="
              mt-7
              block
              w-full
              max-w-[310px]
              rounded-[18px]
              bg-[#B52328]
              px-6
              py-4
              text-center
              text-base
              font-semibold
              text-white
              shadow-[0_5px_0_rgba(115,15,20,0.16)]
              transition
              active:translate-y-[2px]
              active:shadow-[0_2px_0_rgba(115,15,20,0.16)]
            "
          >
            保存图片
          </a>

          {/* 返回登录 */}
          <a
            href="/login"
            className="
              mt-4
              block
              w-full
              max-w-[310px]
              rounded-[18px]
              border
              border-[#B52328]/45
              bg-white/20
              px-6
              py-4
              text-center
              text-base
              font-medium
              text-[#B52328]
              backdrop-blur-[1px]
              transition
              active:bg-[#B52328]/10
            "
          >
            返回登录页面
          </a>
        </section>
      </div>
    </main>
  );
}