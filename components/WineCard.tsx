import type { Wine } from "@/lib/wines";

type Props = {
  wine: Wine;
  href: string;
  label: string;
  size?: "compact" | "full";
};

export default function WineCard({ wine, href, label, size = "full" }: Props) {
  const compact = size === "compact";
  return (
    <aside
      className={`my-10 bg-[#F7F1E3] rounded-2xl border border-orange-300 flex items-center gap-5 ${
        compact ? "p-4" : "p-6 flex-col sm:flex-row"
      }`}
    >
      <img
        src={wine.image}
        alt={wine.name}
        className={`${compact ? "w-16 h-28" : "w-28 h-44"} object-contain shrink-0 bg-white rounded-xl`}
      />
      <div className={compact ? "" : "text-center sm:text-left"}>
        <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest">{label}</p>
        <p className={`${compact ? "text-base" : "text-xl"} font-bold text-[#722F37] mt-1 leading-snug`}>
          {wine.name}
        </p>
        <p className="text-xs text-gray-500 mt-1">{wine.origin}</p>
        {wine.price && (
          <p className={`${compact ? "text-sm" : "text-lg"} font-semibold text-gray-800 mt-1`}>{wine.price}</p>
        )}
        {!compact && <p className="text-gray-700 mt-2 text-base">{wine.blurb}</p>}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block rounded-full bg-[#722F37] text-white font-medium hover:bg-[#5a252c] transition ${
            compact ? "mt-2 px-4 py-1.5 text-sm" : "mt-4 px-6 py-3"
          }`}
        >
          {compact ? "Ver en la tienda →" : "Ver en rutadebarricas.com →"}
        </a>
      </div>
    </aside>
  );
}
