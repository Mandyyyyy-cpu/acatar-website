import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/session";


type DrawPageProps = {

  params: Promise<{
    account:string;
  }>;

};


export default async function DrawPage({

  params,

}:DrawPageProps){


  const {
    account
  } = await params;


  const normalizedAccount =
    account.toUpperCase();



  const session =
    await getCurrentSession();



  if(
    !session ||
    session.account !== normalizedAccount
  ){

    redirect("/");

  }



  return (

    <main
      className="
        min-h-screen
        bg-white
        text-[#9A2325]
        px-6
        py-16
      "
    >


      <div
        className="
          mx-auto
          max-w-md
          text-center
        "
      >


        <h1
          className="
            text-3xl
            font-bold
          "
        >

          今日佛缘

        </h1>



        <p
          className="
            mt-4
            text-neutral-500
          "
        >

          选择一张莲花卡

        </p>



        <div
          className="
            mt-16
            flex
            justify-center
            gap-4
          "
        >


          {[1,2,3].map((card)=>(

            <button

              key={card}

              className="
                h-40
                w-24
                rounded-xl
                border
                border-[#9A2325]
                bg-white
              "

            >

              🪷


            </button>


          ))}


        </div>



      </div>


    </main>

  );

}