import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import SubscribeForm from "@/components/SubscribeForm";
import WineCard from "@/components/WineCard";
import JsonLd from "@/components/JsonLd";
import { goPath } from "@/lib/go";
import {
  posts,
  getPost,
  readingMinutes,
  seriesNeighbors,
  dateNeighbors,
  isoDate,
  type Post,
} from "@/lib/posts";
import { liveWine } from "@/lib/store";
import { SITE_URL, SITE_NAME, AUTHOR } from "@/lib/site";

export const dynamicParams = false;

// Se regenera cada hora para que el precio y el stock del vino sigan a la tienda.
export const revalidate = 3600;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/historias/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | No soy Sommelier`,
    description: post.excerpt,
    alternates: { canonical: `/historias/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/historias/${post.slug}`,
      type: "article",
      locale: "es_AR",
      siteName: "No soy Sommelier",
      images: [post.image],
    },
  };
}

// Posición del texto donde va la recomendación de mitad de artículo:
// antes del subtítulo más cercano a la mitad, para no cortar un párrafo.
function midpoint(body: string[]) {
  const middle = Math.floor(body.length / 2);
  const headings = body
    .map((block, i) => (block.startsWith("## ") ? i : -1))
    .filter((i) => i > 2);
  if (headings.length === 0) return middle;
  return headings.reduce((best, i) =>
    Math.abs(i - middle) < Math.abs(best - middle) ? i : best
  );
}

function NavCard({ post, label }: { post: Post; label: string }) {
  return (
    <Link
      href={`/historias/${post.slug}`}
      className="block bg-white rounded-2xl border-2 border-orange-400 p-5 hover:shadow-lg hover:-translate-y-0.5 transition"
    >
      <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest">{label}</p>
      <p className="text-lg font-semibold text-[#722F37] mt-1 leading-snug">{post.title}</p>
    </Link>
  );
}

export default async function HistoriaPage({ params }: PageProps<"/historias/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const wine = await liveWine(post.wine);
  const mid = midpoint(post.body);
  const minutes = readingMinutes(post);
  const pageUrl = `${SITE_URL}/historias/${post.slug}`;
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${post.title} — ${pageUrl}`)}`;

  const series = seriesNeighbors(post);
  const byDate = dateNeighbors(post);

  return (
    <div className="min-h-screen bg-[#F7F1E3]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: `${SITE_URL}${post.image}`,
          datePublished: isoDate(post),
          inLanguage: "es-AR",
          author: AUTHOR,
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          mainEntityOfPage: pageUrl,
          ...(post.series && { isPartOf: { "@type": "CreativeWorkSeries", name: post.series.name } }),
        }}
      />
      <SiteNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <article className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-orange-400 p-6 sm:p-10">
          <Link href="/" className="text-sm text-orange-500 hover:text-[#722F37]">
            ← Todas las historias
          </Link>

          {post.series && (
            <p className="mt-6 text-xs font-semibold text-orange-500 uppercase tracking-widest">
              {post.series.name} · Etapa {post.series.part} de {post.series.total}
            </p>
          )}
          <p className={`${post.series ? "mt-2" : "mt-6"} text-xs text-gray-400 uppercase tracking-wide`}>
            {post.date}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#722F37] mt-2 leading-tight">
            {post.title}
          </h1>

          <div className="mt-5 flex items-center gap-3">
            <img
              src="/images/mara-nueva.jpg"
              alt="Mara Dern"
              className="w-11 h-11 rounded-full object-cover bg-[#F7F1E3]"
            />
            <p className="text-sm text-gray-600">
              Por <span className="font-semibold text-gray-800">Mara Dern</span> · {minutes} min de lectura
            </p>
          </div>

          <img
            src={post.image}
            alt={post.title}
            className="w-full max-h-56 sm:max-h-80 object-cover rounded-2xl mt-6"
          />

          <div className="mt-8 text-[17px] sm:text-lg text-gray-800 leading-relaxed space-y-5">
            {post.body.map((block, i) => (
              <div key={i}>
                {wine && i === mid && (
                  <WineCard
                    wine={wine}
                    size="compact"
                    label="Si te gusta esta historia, probá"
                    href={goPath(post.slug, "mitad")}
                  />
                )}
                {block.startsWith("## ") ? (
                  <h2 className="text-xl sm:text-2xl font-semibold text-[#722F37] mt-10">
                    {block.replace("## ", "")}
                  </h2>
                ) : (
                  <p>{block}</p>
                )}
              </div>
            ))}
          </div>

          {wine ? (
            <WineCard
              wine={wine}
              label="El vino para acompañar esta historia"
              href={goPath(post.slug, "final")}
            />
          ) : (
            <aside className="my-10 bg-[#F7F1E3] rounded-2xl border border-orange-300 p-6 text-center">
              <p className="text-gray-700">
                Si querés comprar vinos, no te olvides de nuestros amigos de{" "}
                <span className="font-semibold text-[#722F37]">rutadebarricas.com</span>
              </p>
              <a
                href={goPath(post.slug, "final")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full bg-[#722F37] text-white px-6 py-3 font-medium hover:bg-[#5a252c] transition"
              >
                Ir a rutadebarricas.com →
              </a>
            </aside>
          )}

          <div className="flex justify-center">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#25D366] text-[#128C7E] px-6 py-3 font-medium hover:bg-[#25D366] hover:text-white transition"
            >
              Compartir por WhatsApp
            </a>
          </div>
        </article>

        <section className="mt-10 max-w-2xl mx-auto bg-white rounded-3xl border-2 border-orange-400 p-8 sm:p-10 text-center">
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
            Membresía No soy Sommelier
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#722F37]">
            ¿Te gustó? Mañana te llega otra historia.
          </h2>
          <p className="mt-3 text-gray-600">
            Una historia por día, directo a tu mail. Es gratis y te das de baja con un clic.
          </p>
          <SubscribeForm />
        </section>

        <nav className="mt-10 max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
          {post.series ? (
            <>
              {series.prev && <NavCard post={series.prev} label="← Etapa anterior" />}
              {series.next ? (
                <NavCard post={series.next} label="Siguiente etapa →" />
              ) : (
                byDate.older && <NavCard post={byDate.older} label="Seguí leyendo →" />
              )}
            </>
          ) : (
            <>
              {byDate.newer && <NavCard post={byDate.newer} label="← Historia más reciente" />}
              {byDate.older && <NavCard post={byDate.older} label="Historia anterior →" />}
            </>
          )}
        </nav>

        <SiteFooter />
      </main>
    </div>
  );
}
