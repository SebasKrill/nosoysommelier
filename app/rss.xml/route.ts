// Feed RSS con las historias completas. Sirve para lectores de RSS y para que
// Buttondown mande cada historia nueva por mail (función "RSS-to-email").
import { posts, isoDate, type Post } from "@/lib/posts";
import { liveWine } from "@/lib/store";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  STORE_URL,
  trackedUrl,
} from "@/lib/site";

export const dynamic = "force-static";
// Se regenera cada hora para que el precio del vino siga a la tienda.
export const revalidate = 3600;

function escapeXml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// La historia completa en HTML, como la va a leer el suscriptor en el mail.
async function postHtml(post: Post) {
  const url = `${SITE_URL}/historias/${post.slug}`;
  const wine = await liveWine(post.wine);
  const image = post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`;

  const body = post.body
    .map((block) =>
      block.startsWith("## ")
        ? `<h2>${escapeXml(block.replace("## ", ""))}</h2>`
        : `<p>${escapeXml(block)}</p>`
    )
    .join("\n");

  const recommendation = wine
    ? `<p><strong>El vino para acompañar esta historia:</strong> ` +
      `<a href="${escapeXml(trackedUrl(wine.url, post.slug, "mail"))}">${escapeXml(wine.name)}</a>` +
      ` (${escapeXml(wine.origin)})${wine.inStock === false ? " · sin stock por ahora" : wine.price ? ` · ${escapeXml(wine.price)}` : ""}</p>`
    : `<p>Si querés comprar vinos, no te olvides de nuestros amigos de ` +
      `<a href="${escapeXml(trackedUrl(STORE_URL, post.slug, "mail"))}">rutadebarricas.com</a>.</p>`;

  return [
    `<p><img src="${escapeXml(image)}" alt="${escapeXml(post.title)}" /></p>`,
    post.series
      ? `<p><em>${escapeXml(post.series.name)} · Etapa ${post.series.part} de ${post.series.total}</em></p>`
      : "",
    body,
    "<hr />",
    recommendation,
    `<p><a href="${url}">Leer en el blog</a></p>`,
  ].join("\n");
}

export async function GET() {
  const htmls = await Promise.all(posts.map((post) => postHtml(post)));
  const items = posts
    .map((post, i) => {
      const url = `${SITE_URL}/historias/${post.slug}`;
      const pubDate = new Date(`${isoDate(post)}T09:00:00-03:00`).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>Mara Dern</dc:creator>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded><![CDATA[${htmls[i].replace(/]]>/g, "]]]]><![CDATA[>")}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>es-AR</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
