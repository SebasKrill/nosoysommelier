import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import SubscribeForm from "@/components/SubscribeForm";
import { posts } from "@/lib/posts";
import JsonLd from "@/components/JsonLd";
import { goPath } from "@/lib/go";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, AUTHOR, ORGANIZATION, ORGANIZATION_ID } from "@/lib/site";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F1E3]">
      <JsonLd data={{ "@context": "https://schema.org", ...ORGANIZATION }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          publisher: { "@id": ORGANIZATION_ID },
          name: SITE_NAME,
          alternateName: ["NoSoySommelier", "No soy sommelier blog"],
          url: SITE_URL,
          description: SITE_DESCRIPTION,
          inLanguage: "es-AR",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: SITE_NAME,
          url: SITE_URL,
          description: SITE_DESCRIPTION,
          inLanguage: "es-AR",
          author: AUTHOR,
          publisher: { "@id": ORGANIZATION_ID },
        }}
      />
      <SiteNav />

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <img
            src="/images/mara-nueva.jpg"
            alt="Mara Dern sosteniendo una copa de vino tinto"
            className="w-[322px] h-[322px] xl:w-[414px] xl:h-[414px] object-contain shrink-0 rounded-2xl"
          />
          <div className="text-center shrink-0 -translate-x-[42px]">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold whitespace-nowrap bg-gradient-to-r from-orange-400 to-[#722F37] bg-clip-text text-transparent">
              No soy Sommelier
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-700">
              Historias del vino y vinos con historias
            </p>
          </div>
          <img
            src="/images/sebastian-krill.jpg"
            alt="Sebastián Krill sosteniendo una copa de vino blanco"
            className="w-[222px] h-[222px] xl:w-[286px] xl:h-[286px] object-contain shrink-0 rounded-2xl"
          />
        </div>

        <section id="sobre-mi" className="mt-10 max-w-2xl">
          <p className="text-2xl font-semibold text-[#722F37] leading-snug">
            ¿Le comprarías vino a alguien que hace apenas un año no sabía distinguir un Malbec de un Cabernet? Yo tampoco te lo recomendaría. Por suerte no estoy sola.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Soy Mara Dern. No soy sommelier, no tengo el diploma, no hice el curso. Lo que tengo es una obsesión reciente con el vino y la costumbre de escribir todo lo que voy aprendiendo, un posteo por vez.
          </p>
          <p className="mt-6 text-gray-700 leading-relaxed">
            Mi compañero de viaje es Sebastián Krill, un viajero impenitente que se pasó la vida moviéndose entre viñedos del mundo y que, a diferencia mía, sabe exactamente de qué habla. Él pone el conocimiento; yo pongo las preguntas que vos también te harías. Entre los dos hacemos este blog, que no se toma en serio a sí mismo. Pero al vino sí.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Si buscás tecnicismos, este no es tu lugar. Si querés entender el vino como te lo explicarían dos amigos que no siempre están de acuerdo, quedate.
          </p>
        </section>

        <section className="mt-10 bg-white rounded-3xl border-2 border-orange-400 p-8 max-w-2xl flex flex-col sm:flex-row items-center gap-6">
          <p className="text-gray-700 leading-relaxed flex-1">
            Si vas a comprar vino te recomiendo a mis amigos de <span className="font-semibold text-[#722F37]">rutadebarricas.com</span>, tienen grandes vinos, buenos precios y entrega gratis.
          </p>
          <a href={goPath("portada", "recomendacion")} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-full bg-[#722F37] text-white px-6 py-3 font-medium hover:bg-[#5a252c] transition whitespace-nowrap">Ir a rutadebarricas.com</a>
        </section>

        <div className="mt-16 grid md:grid-cols-[1fr_260px] gap-10 items-start">
          <section className="grid sm:grid-cols-2 gap-6 text-left">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="relative bg-white rounded-3xl p-6 border-2 border-orange-400 transition hover:shadow-lg hover:-translate-y-0.5"
              >
                <Link href={`/historias/${post.slug}`} className="block">
                  <p className="text-xs text-gray-400 uppercase tracking-wide text-center">{post.date}</p>
                  <h2 className="text-lg font-semibold text-[#722F37] mt-1 text-center">{post.title}</h2>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-32 h-32 object-contain mx-auto mt-3"
                  />
                  <p className="text-gray-600 mt-2 text-sm text-center">{post.excerpt}</p>
                  <p className="mt-3 text-center text-sm font-semibold text-[#722F37]">Leer la historia →</p>
                </Link>
                <a
                  href={goPath(post.slug, "tarjeta-portada")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-center text-sm font-medium text-orange-500 hover:text-[#722F37]"
                >
                  Si querés comprar vinos, no te olvides de nuestros amigos de rutadebarricas.com
                </a>
              </article>
            ))}
          </section>

          <aside className="bg-white/60 rounded-2xl border border-orange-200 p-5 sticky top-6">
            <h3 className="text-sm font-semibold text-[#722F37] uppercase tracking-wide mb-3">
              Publicaciones
            </h3>
            <ul className="space-y-3">
              {posts.map((post) => (
                <li key={post.slug} className="border-b border-orange-100 pb-2 last:border-0">
                  <Link
                    href={`/historias/${post.slug}`}
                    className="text-sm text-gray-700 hover:text-[#722F37] leading-snug block text-left"
                  >
                    {post.title}
                  </Link>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <section
          id="suscribite"
          className="mt-20 bg-white rounded-3xl border-2 border-orange-400 p-10 text-center max-w-xl mx-auto"
        >
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
            Membresía No soy Sommelier
          </p>
          <h3 className="mt-2 text-3xl font-bold text-[#722F37]">
            Es gratis.
          </h3>
          <p className="mt-3 text-gray-600">
            Todos los días te mando una historia nueva directo al mail. Sin trucos, sin letra chica, sin que en algún momento te empiece a cobrar. Date de baja cuando quieras, con un clic.
          </p>
          <SubscribeForm />
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
