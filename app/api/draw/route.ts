import { NextResponse } from "next/server";

import { getCurrentSession } from "@/lib/session";

export async function POST() {

  const session =
    await getCurrentSession();

  if (!session) {
    return NextResponse.json(
      {
        ok: false,
        message: "未登录",
      },
      {
        status: 401,
      }
    );
  }

  const apiBase =
    process.env.SCF_API_BASE_URL;

  if (!apiBase) {
    return NextResponse.json(
      {
        ok: false,
        message: "SCF_API_BASE_URL 未配置",
      },
      {
        status: 500,
      }
    );
  }

  const response =
    await fetch(
      `${apiBase}/draw`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account: session.account,
        }),
        cache: "no-store",
      }
    );

  const data =
    await response.json();

  return NextResponse.json(
    data,
    {
      status: response.status,
    }
  );
}
