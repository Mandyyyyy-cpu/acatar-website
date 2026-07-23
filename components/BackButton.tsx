"use client";

export default function BackButton(){

  async function logout(){

    await fetch(
      "/api/logout",
      {
        method:"POST",
      }
    );

    window.location.href="/";

  }


  return (
    <button
      onClick={logout}
      className="
        absolute
        left-5
        top-6
        text-3xl
        font-medium
        text-[#B52328]
      "
    >
      ←
    </button>
  );
}