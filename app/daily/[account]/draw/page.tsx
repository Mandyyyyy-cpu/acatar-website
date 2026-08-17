"use client";


import { useState } from "react";
import { useRouter, useParams } from "next/navigation";



export default function DrawPage() {


  const router = useRouter();


  const params =
    useParams();


  const account =
    params.account as string;



  const normalizedAccount =
    account.toUpperCase();



  const [selectedCard, setSelectedCard] =
    useState<number | null>(null);



  const [revealing, setRevealing] =
    useState(false);






  const [finished, setFinished] =
    useState(false);


  // 佛像是否放大到屏幕中央
  const [enlarged, setEnlarged] =
    useState(false);




  function handleStatueClick(){

    setEnlarged(
      (prev) => !prev
    );

  }


  function handleCardClick(card:number){


    if(finished) return;


    setFinished(true);


    setSelectedCard(card);



    // 等待佛像出现

    setTimeout(()=>{

      setRevealing(true);

    },300);









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

              onClick={()=>{

                handleCardClick(card);

              }}

              className="
                relative
                h-56
                w-36
                rounded-xl
                bg-white
                overflow-hidden
              "

            >



              {/* 原始莲花卡 */}

              <img

                src="/cards/lotus-card.png"

                alt="莲花卡"

                className={`
                  h-full
                  w-full
                  object-cover
                  rounded-xl

                  transition-opacity
                  duration-700


                  ${
                    selectedCard === card &&
                    revealing

                    ? "opacity-0"

                    : "opacity-100"
                  }

                `}

              />




           {/* 被选中的佛像 */}

{
  selectedCard === card && (

    <img

      src="/statue/today.png"

      alt="今日佛像"

      onClick={(e) => {
        e.stopPropagation();
        handleStatueClick();
      }}


      className={`
        absolute
        left-1/2
        top-1/2

        -translate-x-1/2
        -translate-y-1/2

        rounded-xl

        transition-all
        duration-[1800ms]
        ease-out


        ${
          revealing
          ?
          `
          h-[85vh]
          w-[85vw]

          object-contain

          scale-100

          opacity-100
          `
          :
          `
          h-0
          w-0

          scale-0

          opacity-0
          `
        }

      `}

    />

  )
}


            </button>


          ))}


        </div>



      </div>




      {/* 放大的佛像 */}
      {
        enlarged && (

          <div
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-white/80
              backdrop-blur-[2px]
            "
          >

            <img
              src="/statue/today.png"
              alt="放大的今日佛像"

              onClick={(e) => {
                e.stopPropagation();
                handleStatueClick();
              }}

              className="
                max-h-[82vh]
                max-w-[88vw]
                cursor-pointer
                object-contain
              "
            />

          </div>

        )
      }


    </main>

  );

}