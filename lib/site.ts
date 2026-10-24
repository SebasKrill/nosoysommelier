// Dirección pública del blog. Cuando tengas dominio propio, cambiala acá.
export const SITE_URL = "https://nosoysommelier.com.ar";

export const SITE_NAME = "No soy Sommelier";
export const SITE_DESCRIPTION = "Historias del vino y vinos con historias";
// Redes del blog: Google las usa para unir el sitio con sus perfiles.
export const SOCIAL_PROFILES = [
  "https://www.instagram.com/nosoysommellier/",
  "https://www.facebook.com/profile.php?id=61595318170843",
];

// En los datos estructurados el autor y el editor es la marca del blog.
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const ORGANIZATION = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  sameAs: SOCIAL_PROFILES,
};
export const AUTHOR = { "@id": ORGANIZATION_ID };

// Pasa una ruta de imagen ("/images/x.png") a dirección completa.
export function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

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
