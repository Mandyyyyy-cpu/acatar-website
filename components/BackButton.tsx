"use client";

import Image from "next/image";


export default function BackButton(){

  async function logout(){

    await fetch(
      "/api/logout",
      {
        method:"POST",
      }
    );

    window.location.href = "/";
  }


  return (
    <button
      onClick={logout}
      className="
        absolute
        left-5
        top-6
        z-50
      "
    >

      <Image
        src="/back-icon.png"
        alt="返回"
        width={48}
        height={48}
        className="
          object-contain
        "
      />

    </button>
  );
}