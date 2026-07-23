export default function AvatarPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <a href="/" className="text-neutral-400">
          ← 返回首页
        </a>

        <h1 className="mt-8 text-4xl font-bold">
          我的头像
        </h1>

        <div className="mt-10 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900">
          <div className="flex aspect-square items-center justify-center bg-neutral-800">
            <p className="text-neutral-500">
              头像图片放在这里
            </p>
          </div>

          <div className="p-8">
            <p className="text-sm text-neutral-400">
              专属头像
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Avatar #001
            </h2>

            <div className="mt-6 space-y-2 text-neutral-300">
              <p>收藏编号：COLLECTION-0001</p>
              <p>NFC 状态：已经绑定</p>
            </div>

            <button className="mt-8 rounded-full bg-white px-7 py-3 font-bold text-black">
              下载高清图片
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}