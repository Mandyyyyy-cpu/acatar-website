import { NextResponse } from "next/server";

import {
  createSessionToken,
  setSessionCookie,
} from "@/lib/session";

import {
  findUserByAccount,
} from "@/lib/users";


type LoginRequestBody = {
  account?: string;
  password?: string;
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



    // 检查输入

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



    // 查找用户

    const user =
      findUserByAccount(account);



    // 验证账号密码

    if (
      !user ||
      user.password !== password
    ) {

      return NextResponse.json(
        {
          success: false,
          message: "账号或密码错误",
        },
        {
          status: 401,
        },
      );

    }



    // 创建登录 session

    const token =
      createSessionToken({

        account:
          user.account,

        imageUrl:
          user.imageUrl,

      });



    await setSessionCookie(token);



    // 登录成功

    return NextResponse.json({

      success: true,

      redirecTo:
        `/picture/${encodeURIComponent(
          user.account,
        )}`,

    });



  } catch (error) {


    console.error(
      "Login error:",
      error,
    );


    return NextResponse.json(
      {
        success:false,
        message:
          "登录失败，请重新尝试",
      },
      {
        status:500,
      },
    );

  }

}