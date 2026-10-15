// Vinos de rutadebarricas.com que se recomiendan desde las historias.
// Para sumar un vino: agregá una entrada acá y usá su clave en el campo
// `wine` de la historia en lib/posts.ts.

export type Wine = {
  name: string;
  origin: string;
  blurb: string;
  image: string;
  url: string;
  price?: string;
};

export const wines = {
  "gran-tinto-del-palmar": {
    name: "Gran Tinto del Palmar 2024",
    origin: "Altos del Palmar · Colón, Entre Ríos",
    blurb:
      "Blend de tintas con 12 meses de barrica: el vino de guarda de la bodega, para las mesas largas.",
    image: "/images/gran-tinto-del-palmar.jpg",
    url: "https://rutadebarricas.com/tienda/",
    price: "$28.000",
  },
  "palo-a-pique-ampv": {
    name: "Palo a Pique Ancellotta, Marselan y Petit Verdot",
    origin: "Altos del Palmar · Colón, Entre Ríos",
    blurb:
      "El blend cofermentado de tres cepas que solo es posible en las terrazas del río Uruguay.",
    image:
      "https://rutadebarricas.com/wp-content/uploads/2026/02/2-palo-a-pique-ANCELTOTTA-MARSELLAN-PETIT-VERDOT.png",
    url: "https://rutadebarricas.com/producto/palo-a-pique-anceltotta-marsellan-petit-verdot/",
  },
  "palo-a-pique-tannat-marselan": {
    name: "Palo a Pique Tannat-Marselan",
    origin: "Altos del Palmar · Colón, Entre Ríos",
    blurb:
      "La estructura del Tannat y la fruta del Marselan, criados a orillas del río Uruguay.",
    image:
      "https://rutadebarricas.com/wp-content/uploads/2026/06/Palo-a-Pique-Tannat-Marselan.png",
    url: "https://rutadebarricas.com/producto/palo-a-pique/",
  },
  "palo-a-pique-tannat": {
    name: "Palo a Pique Tannat",
    origin: "Altos del Palmar · Colón, Entre Ríos",
    blurb:
      "El Tannat de Entre Ríos, la cuna sudamericana de la cepa que la historia casi borra.",
    image:
      "https://rutadebarricas.com/wp-content/uploads/2026/06/Tannat-Altos-del-Palmar-Palo-a-Pique.png",
    url: "https://rutadebarricas.com/producto/palo-a-pique-2/",
  },
  "palo-a-pique-cabernet-franc": {
    name: "Palo a Pique Cabernet Franc",
    origin: "Altos del Palmar · Colón, Entre Ríos",
    blurb:
      "Un Cabernet Franc del litoral, de los que se sirven sin apuro y se comparten.",
    image:
      "https://rutadebarricas.com/wp-content/uploads/2026/06/Cabernet-Franc-Altos-del-Palmar-Palo-a-Pique.webp",
    url: "https://rutadebarricas.com/producto/vino-entre-rios-palo-a-pique-cabernet-franc/",
  },
  "adentro-torrontes": {
    name: "Adentro Torrontés",
    origin: "Finca Río Las Arcas · Cachi Adentro, Salta",
    blurb:
      "El torrontés de altura extrema, regado con el deshielo del Nevado de Cachi.",
    image:
      "https://rutadebarricas.com/wp-content/uploads/2026/06/adentro_torrontes_finca-rio-las-arcas-e1781726170163.webp",
    url: "https://rutadebarricas.com/producto/vino-salta-adentro-torrontes/",
  },
  "famiglia-bianchi-extra-brut": {
    name: "Famiglia Bianchi Extra Brut",
    origin: "Mendoza",
    blurb:
      "Para brindar como en el mirador de Garibaldi: burbujas finas y sin ruido.",
    image:
      "https://rutadebarricas.com/wp-content/uploads/2026/06/famiglia-bianchi-extra-brut-e1781737762409.webp",
    url: "https://rutadebarricas.com/producto/famiglia-bianchi-extra-brut/",
  },
  "yellow-moustache-merlot-malbec": {
    name: "Yellow Moustache Merlot-Malbec",
    origin: "Mendoza",
    blurb:
      "Para comprobar, como en el Vale dos Vinhedos, que el Merlot no tiene nada de aburrido.",
    image:
      "https://rutadebarricas.com/wp-content/uploads/2026/06/Malbec-Entrevero-Yellow-Moustache.webp",
    url: "https://rutadebarricas.com/producto/vino-mendoza-yellow-moustache-merlot-malbec/",
  },
} satisfies Record<string, Wine>;

export type WineId = keyof typeof wines;
