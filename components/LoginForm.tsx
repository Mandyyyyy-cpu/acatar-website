"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isComposing =
    useRef(false);

  const accountLength = 6;


  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");

    const normalizedAccount =
      account.trim().toUpperCase();


    // NFC账号：6位数字+字母
    const accountRule =
      /^[A-Z0-9]{6}$/;


    if (!accountRule.test(normalizedAccount)) {
      setMessage(
        "账号必须是6位数字或英文字母。"
      );
      return;
    }


    if (!password) {
      setMessage(
        "请输入密码。"
      );
      return;
    }


    try {

      setLoading(true);


      const response = await fetch(
        "/api/login",
        {
          method: "POST",
          headers:{
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            account:
              normalizedAccount,
            password,
          }),
        }
      );


      const data =
  await response.json();


console.log(
  "LOGIN RESPONSE:",
  data
);


if (!response.ok) {

  setMessage(
    data.message ||
    "账号或密码错误。"
  );

  return;

}


// 登陆成功
console.log(
  "LOGIN SUCCESS",
  data
);

//重新进入首页，让app/page.tsx 读取cookie

window.location.href =
  data.redirectTo ||
  `/picture/${encodeURIComponent(normalizedAccount)}`;

return;

    } catch(error){

      console.error(error);

      setMessage(
        "服务器连接失败。"
      );


    } finally {

      setLoading(false);

    }
  }



  return (
  <main
    className="
      min-h-screen
      w-full
      bg-cover
      bg-center
      flex
      justify-center
    "
    style={{
      backgroundImage:
        "url('/background.PNG')",
    }}
  >

    <div
      className="
        w-full
        max-w-[430px]
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        px-8
      "
    >


      {/* Logo */}

      <div
        className="
          flex
          justify-center
          mb-4
        "
      >

        <Image
          src="/logo.svg"
          width={1000}
          height={1000}
          alt="Buddha Energy"
          className="
            object-contain
          "
        />

      </div>



      <form
        onSubmit={handleSubmit}
        className="
          w-full
          flex
          flex-col
          items-center
          gap-4
        "
      >



        {/* Account */}

        <div
className="
flex
gap-3
justify-center
"
>

{
Array.from(
  { length: accountLength }
).map((_, index)=>(
  
  <input

    key={index}

    value={
      account[index] || ""
    }


    maxLength={1}
    autoCapitalize="characters"
    autoCorrect="off"
    spellCheck={false}

    onCompositionStart={() => {
      isComposing.current = true;
    }}

    onCompositionEnd={() => {
      isComposing.current = false;
    }}


    onChange={(e)=>{

      const value =
        e.target.value
        .toUpperCase()
        .replace(
          /[^A-Z0-9]/g,
          ""
        );


      const chars =
        account.split("");


      chars[index] =
        value;


      setAccount(
        chars.join("")
      );


      // 自动跳下一格

      if(
        value &&
        !isComposing.current &&
        e.target.nextSibling
      ){
        (
          e.target
          .nextSibling as HTMLInputElement
        ).focus();
      }


    }}

    onKeyDown={(e)=>{

  if (e.nativeEvent.isComposing) {
    return;
  }

  if (e.key === "Backspace") {

    e.preventDefault();

    const chars =
      account.split("");

    if (chars[index]) {

      chars[index] = "";

      setAccount(
        chars.join("")
      );

      return;
    }

    if (index > 0) {

      chars[index - 1] = "";

      setAccount(
        chars.join("")
      );

      const previousInput =
        e.currentTarget
          .previousElementSibling;

      if (
        previousInput instanceof
        HTMLInputElement
      ) {
        previousInput.focus();
      }

    }

  }

}}

    className="
    w-10
    h-12
    bg-transparent
    border-b-2
    border-[#B40020]
    text-center
    text-xl
    text-[#B40020]
    outline-none
    "

  />

))
}

</div>



        {/* Password */}

        <input

          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}

          value={password}

          onChange={(e)=>
            setPassword(e.target.value)
          }


          placeholder="请输入密码"

          className="
          w-[260px]
          h-[56px]
          rounded-[18px]
          bg-[#B40020]
          px-6
          text-center
          text-white
          text-lg
          paceholder:text-white/70
          outline-none
          shadow-[0_3px_0_rgba(120,0,20,0.15)]
          focus:ring-2
          focus:ring-[#B40020]/30
          "

        />



        {
          message &&
          (
            <p
              className="
                text-red-700
                text-sm
              "
            >
              {message}
            </p>
          )
        }



        <button
        
          type="submit"  

          disabled={loading}

          className="
            mt-2
            bg-[#B40020]
            text-white
            px-16
            py-4
            text-lg
            font-bold
            rounded-none
          "

        >

          {
            loading
            ?
            "进入中..."
            :
            "进入收藏"
          }


        </button>


      </form>


    </div>


  </main>
  );

} 