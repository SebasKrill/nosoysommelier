// Dirección pública del blog. Cuando tengas dominio propio, cambiala acá.
export const SITE_URL = "https://nosoysommelier.com.ar";

export const SITE_NAME = "No soy Sommelier";
export const SITE_DESCRIPTION = "Historias del vino y vinos con historias";
export const AUTHOR = { "@type": "Person", name: "Mara Dern" };

export const STORE_URL = "https://rutadebarricas.com";

// Agrega parámetros UTM a los enlaces hacia la tienda, para poder medir
// desde qué historia y desde qué lugar de la página llega cada visita.
export function trackedUrl(url: string, campaign: string, content: string) {
  const u = new URL(url);
  u.searchParams.set("utm_source", "nosoysommelier");
  u.searchParams.set("utm_medium", "blog");
  u.searchParams.set("utm_campaign", campaign);
  u.searchParams.set("utm_content", content);
  return u.toString();
}
