export default function Loading() {
  return (
    <main
      className="
        min-h-dvh
        w-full
        bg-white
        flex
        items-center
        justify-center
        text-[#9A2325]
      "
    >
      <div
        className="
          h-8
          w-8
          rounded-full
          border-2
          border-[#9A2325]/20
          border-t-[#9A2325]
          animate-spin
        "
      />
    </main>
  );
}
