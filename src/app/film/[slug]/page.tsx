import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Film,
  Layers,
  Play,
  ShieldAlert,
  ShieldCheck,
  Star,
  Tag,
} from "lucide-react";
import { RatingBadge } from "@/components/badges";
import { MovieCard } from "@/components/movie-card";
import { MoviePlayer } from "@/components/movie-player";
import { SeriesPlayer } from "@/components/series-player";
import { getLicenseMeta, getProviderMeta } from "@/lib/licenses";
import {
  getMovieBySlug,
  getSimilarMovies,
} from "@/lib/queries";
import { formatCount, formatRating, formatRuntime } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const movie = await getMovieBySlug(slug);

  if (!movie) return { title: "Film bulunamadı" };

  return {
    title: `${movie.title} (${movie.year})`,
    description: movie.overview.slice(0, 155),
    openGraph: {
      title: `${movie.title} (${movie.year}) · LwoFilm`,
      description: movie.overview.slice(0, 155),
      images: movie.backdropUrl ? [movie.backdropUrl] : [movie.posterUrl],
      type: "video.movie",
    },
  };
}

export default async function MoviePage({ params }: Params) {
  const { slug } = await params;
  const movie = await getMovieBySlug(slug);

  if (!movie) notFound();

  const similar = await getSimilarMovies(movie);
  const license = getLicenseMeta(movie.license?.type);
  const licenseVerifiedAt = movie.license?.verified
    ? new Date().toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": movie.kind === "SERIES" ? "TVSeries" : "Movie",
    name: movie.title,
    description: movie.overview,
    image: movie.posterUrl,
    datePublished: String(movie.year),
    genre: movie.categories.map((category) => category.name),
    aggregateRating:
      movie.rating !== null
        ? {
            "@type": "AggregateRating",
            ratingValue: movie.rating,
            bestRating: 10,
            ratingCount: movie.voteCount ?? 1,
          }
        : undefined,
  };

  return (
    <article className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Üst atmosfer */}
      <div className="relative">
        <div className="absolute inset-0 -z-10 h-[420px] overflow-hidden">
          <Image
            src={movie.backdropUrl ?? movie.posterUrl}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20 blur-md"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-ink-900/85 to-ink-900" />
        </div>

        <div className="container-page pt-6">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <Link
              href="/"
              className="inline-flex items-center gap-1 transition-colors hover:text-emerald-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Ana Sayfa
            </Link>
            <span>/</span>
            <Link href="/arsiv" className="transition-colors hover:text-emerald-400">
              Arşiv
            </Link>
            {movie.categories[0] && (
              <>
                <span>/</span>
                <Link
                  href={`/kategori/${movie.categories[0].slug}`}
                  className="transition-colors hover:text-emerald-400"
                >
                  {movie.categories[0].name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="truncate text-slate-400">{movie.title}</span>
          </nav>

          <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className={`chip ${license.badge}`}>
                  <ShieldCheck className="h-3 w-3" />
                  {license.label}
                </span>
                <span className="chip border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                  <Play className="h-3 w-3" /> Ücretsiz
                </span>
                <span className="chip border-slate-700/80 bg-slate-800/60 text-slate-300">
                  {movie.kind === "SERIES" ? "Dizi" : movie.quality}
                </span>
                {movie.rating !== null && (
                  <span className="chip border-amber-500/40 bg-amber-500/10 text-amber-300">
                    <Star className="h-3 w-3 fill-amber-400" />
                    {formatRating(movie.rating)} / 10
                  </span>
                )}
              </div>

              <h1 className="text-balance text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {movie.title}
              </h1>

              {movie.originalTitle && movie.originalTitle !== movie.title && (
                <p className="mt-1.5 text-sm italic text-slate-400">
                  {movie.originalTitle}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-emerald-500" />
                  {movie.year}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-emerald-500" />
                  {movie.kind === "SERIES"
                    ? `${movie.episodes.length} bölüm`
                    : formatRuntime(movie.runtime)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-emerald-500" />
                  {movie.kind === "SERIES"
                    ? `${movie.episodes.reduce((total, episode) => total + episode.sources.length, 0)} kaynak`
                    : `${movie.sources.length} kaynak`}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Film className="h-4 w-4 text-emerald-500" />
                  {movie.categories.map((category) => category.name).join(" · ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Oynatıcı */}
      <div className="container-page mt-8">
        {movie.kind === "SERIES" ? (
          <SeriesPlayer movie={movie} />
        ) : (
          <MoviePlayer movie={movie} />
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* Afiş + künye */}
          <aside className="space-y-4">
            <div className="surface overflow-hidden">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={movie.posterUrl}
                  alt={`${movie.title} afişi`}
                  fill
                  sizes="(max-width: 1024px) 60vw, 300px"
                  className="object-cover"
                />
                <RatingBadge
                  rating={movie.rating}
                  className="absolute right-3 top-3 px-2 py-1 text-xs"
                />
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Puan</span>
                  <span className="inline-flex items-center gap-1 font-bold text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    {formatRating(movie.rating)}
                    <span className="font-normal text-slate-500">
                      ({formatCount(movie.voteCount)} oy)
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Yapım yılı</span>
                  <span className="font-semibold text-slate-200">{movie.year}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    {movie.kind === "SERIES" ? "Bölüm" : "Süre"}
                  </span>
                  <span className="font-semibold text-slate-200">
                    {movie.kind === "SERIES"
                      ? `${movie.episodes.length} bölüm`
                      : formatRuntime(movie.runtime)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Lisans</span>
                  <span className={`chip ${license.badge}`}>{license.short}</span>
                </div>
              </div>
            </div>

            {/* Lisans doğrulama */}
            <div className="surface space-y-4 p-4">
              <div className="flex items-center gap-2">
                {movie.license?.verified ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : (
                  <ShieldAlert className="h-5 w-5 text-amber-400" />
                )}
                <h2 className="text-sm font-bold text-white">
                  Lisans Doğrulama
                </h2>
              </div>

              <p className="text-xs leading-relaxed text-slate-400">
                {license.description}
              </p>

              <dl className="space-y-2.5 border-t border-slate-800/80 pt-3 text-xs">
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-slate-500">Tür</dt>
                  <dd className={`chip ${license.badge}`}>{license.label}</dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-slate-500">Kaynak</dt>
                  <dd className="text-right font-medium text-slate-200">
                    {movie.license?.sourceName ?? "—"}
                  </dd>
                </div>
                {licenseVerifiedAt && (
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-slate-500">Doğrulama</dt>
                    <dd className="text-right font-medium text-emerald-400">
                      {licenseVerifiedAt}
                    </dd>
                  </div>
                )}
              </dl>

              {movie.license?.attribution && (
                <p className="rounded-lg border border-slate-800/80 bg-ink-950/60 p-3 text-[11px] leading-relaxed text-slate-400">
                  {movie.license.attribution}
                </p>
              )}

              {movie.license?.sourceUrl && (
                <a
                  href={movie.license.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost w-full py-2 text-xs"
                >
                  Kaynağı doğrula
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </aside>

          {/* Detay içerik */}
          <div id="detay" className="min-w-0 space-y-6">
            <div className="surface p-5 sm:p-7">
              <span className="kicker">Konu</span>
              <h2 className="mt-2 text-xl font-black text-white">Film Hakkında</h2>
              {movie.tagline && (
                <p className="mt-2 text-sm font-medium italic text-emerald-300/80">
                  “{movie.tagline}”
                </p>
              )}
              <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-slate-300/90">
                {movie.overview}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {movie.categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/kategori/${category.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-ink-950/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-300"
                  >
                    <Tag className="h-3 w-3 text-emerald-500" />
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="surface p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="kicker">Kaynaklar</span>
                  <h2 className="mt-2 text-xl font-black text-white">
                    {movie.kind === "SERIES" ? "Bölüm Rehberi" : "İzleme Seçenekleri"}
                  </h2>
                </div>
                <span className="chip border-slate-700/80 bg-slate-800/60 text-slate-300">
                  {movie.kind === "SERIES"
                    ? `${movie.episodes.length} bölüm`
                    : `${movie.sources.length} kaynak`}
                </span>
              </div>

              {movie.kind === "SERIES" ? (
                <div className="mt-5 space-y-2">
                  {movie.episodes.map((episode) => (
                    <div
                      key={episode.id}
                      className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-ink-950/40 p-3.5"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-300">
                        {episode.season}x{String(episode.number).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-100">
                          {episode.title}
                        </p>
                        {episode.overview && (
                          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-400">
                            {episode.overview}
                          </p>
                        )}
                        <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                          {formatRuntime(episode.runtime)} ·{" "}
                          {episode.sources[0]
                            ? getProviderMeta(episode.sources[0].provider).label
                            : "Kaynak yok"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {movie.sources.map((source) => {
                  const provider = getProviderMeta(source.provider);
                  return (
                    <a
                      key={source.id}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-3 rounded-xl border border-slate-800/80 bg-ink-950/40 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-emerald-500/[0.04]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-500/10 text-emerald-400">
                          <Play className="h-4 w-4 fill-emerald-400" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-slate-100">
                            {source.label}
                          </span>
                          <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-500">
                            <span
                              className={`rounded border px-1 py-[1px] text-[9px] font-bold uppercase ${provider.badge}`}
                            >
                              {provider.label}
                            </span>
                            {source.quality} · {source.language}
                          </span>
                        </span>
                      </span>
                      <ExternalLink className="h-4 w-4 shrink-0 text-slate-600 transition-colors group-hover:text-emerald-400" />
                    </a>
                  );
                })}
              </div>
              )}

              <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
                Oynatma, hak sahibi arşivlerin resmî gömme bağlantıları üzerinden
                yapılır. LwoFilm hiçbir video dosyasını kendi sunucusunda barındırmaz.
              </p>
            </div>
          </div>
        </div>

        {/* Benzer filmler */}
        {similar.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <span className="kicker">Devamı</span>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                  Benzer Filmler
                </h2>
              </div>
              <Link
                href="/arsiv"
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Tüm arşiv →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {similar.map((item) => (
                <MovieCard key={item.id} movie={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
