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
  return Buffer.from(
    JSON.stringify({
      account: session.account,
      imageUrl: session.imageUrl,
    }),
    "utf8",
  ).toString("base64url");
}

/**
 * 解析登录 token。
 * 同时兼容新 base64url token 和以前的 URL 编码 token。
 */
function parseSessionToken(
  token: string,
): SessionData | null {
  const decoders = [
    () =>
      Buffer.from(
        token,
        "base64url",
      ).toString("utf8"),

    () =>
      decodeURIComponent(token),

    () =>
      decodeURIComponent(
        decodeURIComponent(token),
      ),
  ];

  for (const decode of decoders) {
    try {
      const parsed = JSON.parse(
        decode(),
      ) as Partial<SessionData>;

      if (
        typeof parsed.account === "string" &&
        typeof parsed.imageUrl === "string"
      ) {
        return {
          account: parsed.account,
          imageUrl: parsed.imageUrl,
        };
      }
    } catch {
      // 尝试下一种旧格式
    }
  }

  return null;
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
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    },
  );
}

/**
 * 读取当前登录状态
 */
export async function getCurrentSession():
Promise<SessionData | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    SESSION_COOKIE_NAME,
  )?.value;

  if (!token) {
    return null;
  }

  return parseSessionToken(token);
}

/**
 * 删除登录 cookie
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();

  cookieStore.delete(
    SESSION_COOKIE_NAME,
  );
}
