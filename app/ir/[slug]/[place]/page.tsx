import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { goParams, goTarget } from "@/lib/go";
import Redirect from "./Redirect";

export const dynamicParams = false;

export function generateStaticParams() {
  return goParams();
}

export const metadata: Metadata = {
  title: "Yendo a rutadebarricas.com",
  robots: { index: false, follow: false },
};

export default async function IrPage({ params }: PageProps<"/ir/[slug]/[place]">) {
  const { slug, place } = await params;
  const to = goTarget(slug, place);
  if (!to) notFound();
  return <Redirect to={to} />;
}
