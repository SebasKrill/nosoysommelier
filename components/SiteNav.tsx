import Link from "next/link";

export default function SiteNav() {
  return (
    <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-center gap-8 text-sm text-gray-600">
      <Link href="/" className="hover:text-[#722F37]">Inicio</Link>
      <Link href="/#sobre-mi" className="hover:text-[#722F37]">Sobre mí</Link>
      <Link href="/#suscribite" className="hover:text-[#722F37]">Suscribite</Link>
    </nav>
  );
}
