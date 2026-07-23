"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");

    const accountRule = /^[A-Za-z0-9]{6}$/;

    if (!accountRule.test(account)) {
      setMessage("账号必须是5个数字或英文字母。");
      return;
    }

    if (!password) {
      setMessage("请输入密码。");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "账号或密码错误。");
        return;
      }

      router.push(`/picture/${account.toUpperCase()}`);
    } catch {
      setMessage("登录失败，请重新尝试。");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-dvh bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] items-center justify-center bg-gradient-to-b from-neutral-800 via-neutral-900 to-black px-6">
        <section className="w-full rounded-[28px] border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-xl">
          <p className="text-xs tracking-[0.3em] text-neutral-400">
            DIGITAL COLLECTION
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            登录
          </h1>

          <p className="mt-2 text-sm text-neutral-300">
            输入你的账号和密码，查看专属图片。
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="account"
                className="mb-2 block text-sm font-medium"
              >
                账号
              </label>

              <input
                type="text"
                value={account}
                onChange={(event) => {
                  const newValue = event.target.value
                    .replace(/[^A-Za-z0-9]/g, "")
                    .slice(0, 6);

                  setAccount(newValue);
                }}
                placeholder="6位数字或字母"
                maxLength={6}
                autoComplete="username"
                className="w-full rounded-2xl border border-white/20 bg-black/30 px-4 py-4 text-base text-white outline-none placeholder:text-neutral-500 focus:border-white"
              />

              <p className="mt-2 text-xs text-neutral-400">
                例如：A1234
              </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                密码
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="请输入密码"
                autoComplete="current-password"
                className="w-full rounded-2xl border border-white/20 bg-black/30 px-4 py-4 text-base text-white outline-none placeholder:text-neutral-500 focus:border-white"
              />
            </div>

            {message && (
              <p className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-200">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-white py-4 font-bold text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "正在登录……" : "登录"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}