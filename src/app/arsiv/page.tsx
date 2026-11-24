import type { Metadata } from "next";
import { MovieExplorer } from "@/components/movie-explorer";
import { getHomeMovies, getNavCategories } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Arşiv / Klasikler",
  description:
    "Kamu malı klasikler ve Creative Commons lisanslı bağımsız yapımların tam listesi. Tür, yıl ve lisansa göre filtreleyin.",
};

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const [movies, categories] = await Promise.all([
    getHomeMovies(),
    getNavCategories(),
  ]);

  return (
    <div className="pb-10 pt-10">
      <div className="container-page">
        <span className="kicker">Açık Sinema Kataloğu</span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
          Arşiv <span className="text-emerald-400">/ Klasikler</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
          Telif süresi dolmuş sinema tarihi başyapıtları ve Creative Commons lisanslı
          bağımsız yapımlar. Tüm içerikler yasal, ücretsiz ve kaynak doğrulamalıdır.
        </p>
      </div>

      <MovieExplorer
        movies={movies}
        categories={categories}
        initialQuery={q ?? ""}
        heading="Katalog"
        subheading="Sonuçlar anlık olarak filtrelenir; arama çubuğu tüm başlık, tür ve yıllarda çalışır."
        compact
      />
    </div>
  );
}
