import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "acatar_session";

export type SessionData = {
  account: string;
  imageUrl: string;
};


/**
 * 创建登录 token
 */
export function createSessionToken(
  session: SessionData,
) {
  return encodeURIComponent(
    JSON.stringify({
      account: session.account,
      imageUrl: session.imageUrl,
    }),
  );
}


/**
 * 设置登录 cookie
 */
export async function setSessionCookie(
  token: string,
) {
  const cookieStore = await cookies();

  cookieStore.set(
    SESSION_COOKIE_NAME,
    token,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    },
  );
}


/**
 * 获取当前登录用户
 */
export async function getCurrentSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    SESSION_COOKIE_NAME,
  )?.value;


  if (!token) {
    return null;
  }


  try {
    const session = JSON.parse(
      decodeURIComponent(token),
    ) as SessionData;


    if (
      !session.account ||
      !session.imageUrl
    ) {
      return null;
    }


    return {
      account: session.account,
      imageUrl: session.imageUrl,
    };

  } catch {
    return null;
  }
}


/**
 * 删除登录状态
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();

  cookieStore.delete(
    SESSION_COOKIE_NAME,
  );
}