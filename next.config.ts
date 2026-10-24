import type { NextConfig } from "next";

const SITE_URL = "https://nosoysommelier.com.ar";

const nextConfig: NextConfig = {
  async redirects() {
    // Solo en producción: las vistas previas de Vercel tienen que seguir
    // funcionando en su dirección .vercel.app (y Vercel ya las oculta de Google).
    if (process.env.VERCEL_ENV !== "production") return [];
    return [
      // Todo lo que llegue a la dirección .vercel.app va al dominio propio,
      // para que Google vea un solo sitio y no contenido duplicado.
      {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
      // www.nosoysommelier.com.ar → nosoysommelier.com.ar
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.nosoysommelier.com.ar" }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
