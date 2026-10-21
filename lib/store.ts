// Precio y stock de los vinos, leídos de la tienda (rutadebarricas.com).
//
// La tienda es WooCommerce y publica su catálogo en la "Store API", que es
// pública (no hace falta clave). Las páginas que usan esto se regeneran cada
// hora, así el precio y el "sin stock" del blog siguen a la tienda solos.
// Si la tienda no responde, se usan los datos de respaldo de lib/wines.ts.
import { wines, type Wine, type WineId } from "./wines";

const STORE_API =
  "https://rutadebarricas.com/wp-json/wc/store/v1/products?per_page=100";

// Cada cuánto se vuelve a consultar la tienda (en segundos).
export const STORE_REVALIDATE = 3600;

type StoreProduct = {
  id: number;
  permalink: string;
  is_in_stock: boolean;
  prices: { price: string; currency_minor_unit: number };
};

type StoreInfo = { price: string; inStock: boolean; url: string };

// "2800000" con 2 decimales → "$28.000"
function formatPrice(raw: string, minorUnit: number) {
  const value = Number(raw) / 10 ** minorUnit;
  return `$${value.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;
}

async function fetchStore(): Promise<Map<number, StoreInfo>> {
  const byId = new Map<number, StoreInfo>();
  try {
    const res = await fetch(STORE_API, {
      next: { revalidate: STORE_REVALIDATE },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return byId;
    const list = (await res.json()) as StoreProduct[];
    for (const p of list) {
      if (!p?.prices?.price) continue;
      byId.set(p.id, {
        price: formatPrice(p.prices.price, p.prices.currency_minor_unit ?? 2),
        inStock: Boolean(p.is_in_stock),
        url: p.permalink,
      });
    }
  } catch {
    // Sin conexión con la tienda: quedan los datos de respaldo.
  }
  return byId;
}

// El vino con precio, stock y enlace actualizados desde la tienda.
export async function liveWine(id?: WineId): Promise<Wine | undefined> {
  if (!id) return undefined;
  const base: Wine = wines[id];
  const info = (await fetchStore()).get(base.productId);
  if (!info) return base;
  return { ...base, price: info.price, inStock: info.inStock, url: info.url || base.url };
}
