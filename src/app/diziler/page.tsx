import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ListVideo } from "lucide-react";
import { MovieCard } from "@/components/movie-card";
import { getHomeMovies } from "@/lib/queries";
import { formatRuntime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Diziler",
  description:
    "Kamu malı bölümleriyle yayınlanan klasik diziler: The Beverly Hillbillies, The Lone Ranger, Dragnet ve daha fazlası.",
};

export default async function SeriesPage() {
  const movies = await getHomeMovies();
  const series = movies.filter((movie) => movie.kind === "SERIES");
  const episodes = series.reduce((total, item) => total + item.episodeCount, 0);

  return (
    <div className="pb-10 pt-10">
      <div className="container-page">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-emerald-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Ana sayfa
        </Link>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="kicker">Bölüm Bölüm Klasikler</span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Dizi <span className="text-emerald-400">Arşivi</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
              Kamu malı bölümleriyle yayınlanan klasik diziler. Her bölüm kendi
              kaynağıyla açılır; sezon ve bölüm listesinden seçim yapabilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="chip border-slate-700/80 bg-slate-800/60 text-slate-300">
              <ListVideo className="h-3 w-3" /> {series.length} dizi
            </span>
            <span className="chip border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
              {episodes} bölüm
            </span>
          </div>
        </div>
      </div>

      <div className="container-page mt-8">
        {series.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {series.map((item, index) => (
              <MovieCard key={item.id} movie={item} priority={index < 5} />
            ))}
          </div>
        ) : (
          <div className="surface grid place-items-center gap-3 px-6 py-16 text-center">
            <ListVideo className="h-8 w-8 text-emerald-400" />
            <p className="text-sm text-slate-300">Henüz dizi eklenmemiş.</p>
          </div>
        )}

        <p className="mt-8 text-xs text-slate-500">
          Toplam süre:{" "}
          {formatRuntime(
            series.reduce((total, item) => total + (item.runtime ?? 0), 0),
          )}{" "}
          (bölüm başına ortalama süre üzerinden)
        </p>
      </div>
    </div>
  );
}
