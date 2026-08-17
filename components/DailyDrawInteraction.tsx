"use client";


import { useState } from "react";



type DailyDrawInteractionProps = {
  account: string;
  todayImageUrl?: string | null;
  onDrawComplete?: (
    imageUrl: string
  ) => void;
};

export default function DailyDrawInteraction({
  account,
  todayImageUrl,
  onDrawComplete,
}: DailyDrawInteractionProps) {

  const normalizedAccount =
    account.toUpperCase();



  const [selectedCard, setSelectedCard] =
    useState<number | null>(null);



  const [revealing, setRevealing] =
    useState(false);

  const [drawnImageUrl, setDrawnImageUrl] =
    useState<string | null>(
      todayImageUrl ?? null
    );






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


  async function handleCardClick(card:number){

    if(finished) return;

    setFinished(true);
    setSelectedCard(card);

    try {

      const response =
        await fetch("/api/draw", {
          method: "POST",
        });

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.draw?.nft?.imageUrl
      ) {
        throw new Error(
          data.message || "抽取失败"
        );
      }

      setDrawnImageUrl(
        data.draw.nft.imageUrl
      );

      onDrawComplete?.(
        data.draw.nft.imageUrl
      );

      setTimeout(() => {
        setRevealing(true);
      }, 300);

    } catch (error) {

      console.error(
        "draw failed:",
        error
      );

      setFinished(false);
      setSelectedCard(null);

    }

  }



  return (

    <section
      className="
        bg-white
        text-[#9A2325]
        px-6
        py-6
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

          择莲启缘

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
                shrink-0
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

      src={drawnImageUrl ?? ""}

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
              src={drawnImageUrl ?? ""}
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


    </section>

  );

}