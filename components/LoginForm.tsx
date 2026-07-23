"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginForm() {

  const router = useRouter();


  const [account, setAccount] = useState("");

  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);



  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    setErrorMessage("");

    setIsLoading(true);



    try {


      const response = await fetch(
        "/api/login",
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

        }
      );



      const result =
        await response.json();



      if (!response.ok) {


        setErrorMessage(
          result.message ??
          "登录失败。"
        );


        return;

      }



      /*
       * 登录成功
       *
       * API 返回:
       *
       * {
       *   redirectTo:
       *   "/picture/YLMGK2"
       * }
       *
       */


      router.replace(
        result.redirectTo
      );


      router.refresh();



    } catch {


      setErrorMessage(
        "网络连接失败，请稍后再试。"
      );


    } finally {


      setIsLoading(false);


    }


  }



  return (

    <form

      onSubmit={
        handleSubmit
      }

      className="
        mx-auto
        flex
        w-full
        max-w-sm
        flex-col
        gap-4
      "

    >


      <div>


        <label

          htmlFor="account"

          className="
            mb-2
            block
            text-sm
            text-neutral-300
          "

        >

          账号

        </label>



        <input

          id="account"

          name="account"

          type="text"


          value={
            account
          }


          onChange={
            (event)=>{

              setAccount(
                event.target
                .value
                .toUpperCase()
              );

            }
          }


          maxLength={6}


          autoComplete="username"


          placeholder="请输入账号"


          className="
            w-full
            rounded-2xl
            border
            border-neutral-700
            bg-neutral-900
            px-4
            py-4
            text-white
            outline-none
            focus:border-white
          "


          required


        />


      </div>




      <div>


        <label

          htmlFor="password"

          className="
            mb-2
            block
            text-sm
            text-neutral-300
          "

        >

          密码

        </label>




        <input


          id="password"


          name="password"


          type="password"



          value={
            password
          }



          onChange={
            (event)=>{

              setPassword(
                event.target.value
              );

            }
          }



          maxLength={6}



          autoComplete="current-password"



          placeholder="请输入密码"



          className="
            w-full
            rounded-2xl
            border
            border-neutral-700
            bg-neutral-900
            px-4
            py-4
            text-white
            outline-none
            focus:border-white
          "



          required



        />


      </div>





      {
        errorMessage ? (


          <p

            className="
              text-sm
              text-red-400
            "

          >

            {errorMessage}


          </p>


        ) : null
      }





      <button


        type="submit"


        disabled={
          isLoading
        }


        className="
          mt-2
          rounded-full
          bg-white
          px-5
          py-4
          font-medium
          text-black
          disabled:cursor-not-allowed
          disabled:opacity-50
        "


      >


        {
          isLoading
          ? "登录中..."
          : "登录"
        }


      </button>



    </form>

  );

}