"use client";

import { useEffect } from "react";

// Espera a que se registre la visita en las estadísticas y después sigue a la tienda.
export default function Redirect({ to }: { to: string }) {
  useEffect(() => {
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      window.location.replace(to);
    };
    const afterLoad = () => setTimeout(go, 400);
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });
    const fallback = setTimeout(go, 2500);
    return () => {
      clearTimeout(fallback);
      window.removeEventListener("load", afterLoad);
    };
  }, [to]);

  return (
    <main className="min-h-screen bg-[#F7F1E3] flex items-center justify-center px-6">
      <p className="text-gray-700 text-center">
        Te llevamos a{" "}
        <a href={to} className="font-semibold text-[#722F37] underline">
          rutadebarricas.com
        </a>
        …
      </p>
    </main>
  );
}
