import { NextResponse } from "next/server";

import {
  createSessionToken,
  setSessionCookie,
} from "@/lib/session";


type LoginRequestBody = {
  account?: string;
  password?: string;
};


type ScfLoginResponse = {
  ok: boolean;

  message?: string;

  user?: {
    id: string;
    account: string;

    nft: {
      id: string;
      name: string | null;
      imageUrl: string;
      type: string;
    } | null;
  };
};


export async function POST(request: Request) {

  try {

    const body =
      (await request.json()) as LoginRequestBody;


    const account =
      body.account
        ?.trim()
        .toUpperCase();


    const password =
      body.password
        ?.trim();


    if (!account || !password) {

      return NextResponse.json(
        {
          success: false,
          message: "请输入账号和密码",
        },
        {
          status: 400,
        },
      );

    }


    const apiBaseUrl =
      process.env.ACATAR_API_BASE_URL;


    if (!apiBaseUrl) {

      throw new Error(
        "ACATAR_API_BASE_URL is missing",
      );

    }


    const scfResponse =
      await fetch(
        `${apiBaseUrl.replace(/\/$/, "")}/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            account,
            password,
          }),

          cache: "no-store",
        },
      );


    const data =
      (await scfResponse.json()) as ScfLoginResponse;


    if (
      !scfResponse.ok ||
      !data.ok ||
      !data.user
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            data.message ||
            "账号或密码错误",
        },
        {
          status:
            scfResponse.status,
        },
      );

    }


    if (!data.user.nft) {

      return NextResponse.json(
        {
          success: false,
          message:
            "该账号没有绑定初始佛像",
        },
        {
          status: 500,
        },
      );

    }


    const token =
      createSessionToken({

        account:
          data.user.account,

        imageUrl:
          data.user.nft.imageUrl,

      });


    await setSessionCookie(token);


    return NextResponse.json({

      success: true,

      redirectTo:
        `/picture/${encodeURIComponent(
          data.user.account,
        )}`,

    });


  } catch (error) {

    console.error(
      "Login error:",
      error,
    );


    return NextResponse.json(
      {
        success: false,
        message:
          "登录失败，请重新尝试",
      },
      {
        status: 500,
      },
    );

  }

}
