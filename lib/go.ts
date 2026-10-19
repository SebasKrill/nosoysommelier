// Enlaces a la tienda que pasan por /ir/<historia>/<lugar> antes de salir del blog.
// Así cada clic queda contado en Vercel Web Analytics como una visita a esa
// página (el plan gratuito no cuenta clics a otros sitios), y después el
// visitante sigue a rutadebarricas.com con las marcas UTM de siempre.
import { posts } from "./posts";
import { wines, type Wine } from "./wines";
import { STORE_URL, trackedUrl } from "./site";

// Lugares desde donde se puede ir a la tienda.
//   mitad / final      → dentro de cada historia
//   tarjeta-portada    → tarjeta de la historia en la portada
//   recomendacion      → recuadro de rutadebarricas en la portada (slug "portada")
const STORY_PLACES = ["mitad", "final", "tarjeta-portada"] as const;

export function goPath(slug: string, place: string) {
  return `/ir/${slug}/${place}`;
}

function storyWine(slug: string): Wine | undefined {
  const post = posts.find((p) => p.slug === slug);
  return post?.wine ? wines[post.wine] : undefined;
}

// Destino final del enlace, o undefined si la combinación no existe.
export function goTarget(slug: string, place: string): string | undefined {
  if (slug === "portada") {
    return place === "recomendacion"
      ? trackedUrl(STORE_URL, "portada", "recomendacion")
      : undefined;
  }
  if (!posts.some((p) => p.slug === slug)) return undefined;
  if (!(STORY_PLACES as readonly string[]).includes(place)) return undefined;

  const wine = storyWine(slug);
  if (place === "mitad" && !wine) return undefined;
  const useWine = wine && (place === "mitad" || place === "final");
  return trackedUrl(useWine ? wine.url : STORE_URL, slug, place);
}

// Todas las combinaciones válidas, para generar las páginas al publicar.
export function goParams() {
  const params = [{ slug: "portada", place: "recomendacion" }];
  for (const post of posts) {
    for (const place of STORY_PLACES) {
      if (goTarget(post.slug, place)) params.push({ slug: post.slug, place });
    }
  }
  return params;
}
