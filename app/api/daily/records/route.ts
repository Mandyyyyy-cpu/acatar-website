import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/session";

export async function GET(request: Request) {
  const session = await getCurrentSession();

  if (!session) {
    return NextResponse.json(
      { ok: false, message: "未登录" },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  if (!year || !month) {
    return NextResponse.json(
      { ok: false, message: "缺少 year 或 month" },
      { status: 400 },
    );
  }

  const apiBase = process.env.SCF_API_BASE_URL;

  if (!apiBase) {
    return NextResponse.json(
      { ok: false, message: "SCF_API_BASE_URL 未配置" },
      { status: 500 },
    );
  }

  const response = await fetch(
    `${apiBase}/daily/records/${session.account}?year=${year}&month=${month}`,
    { cache: "no-store" },
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
