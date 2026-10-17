"use client";

export default function SubscribeForm() {
  return (
    <form
      action="https://buttondown.com/api/emails/embed-subscribe/nosoysommelier"
      method="post"
      target="popupwindow"
      onSubmit={() => {
        window.open("https://buttondown.com/nosoysommelier", "popupwindow");
      }}
      className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
    >
      <input
        type="email"
        name="email"
        placeholder="tu@email.com"
        required
        className="rounded-full border border-orange-300 px-5 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 flex-1"
      />
      <input type="hidden" value="1" name="embed" />
      <button
        type="submit"
        className="rounded-full bg-[#722F37] text-white px-6 py-3 font-medium hover:bg-[#5a252c] transition"
      >
        Quiero unirme, gratis
      </button>
    </form>
  );
}
