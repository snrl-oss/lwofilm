"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Info,
  Play,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { getLicenseMeta } from "@/lib/licenses";
import type { HeroMovieData } from "@/lib/types";
import { formatRuntime } from "@/lib/utils";

const ROTATE_MS = 9000;

export function HeroSlider({ movies }: { movies: HeroMovieData[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = movies.length;

  const go = useCallback(
    (direction: 1 | -1) => {
      setIndex((current) => (current + direction + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1 || paused) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [count, paused]);

  if (!count) return null;

  const movie = movies[index];
  const license = getLicenseMeta(movie.license?.type);
  const backdrop = movie.backdropUrl ?? movie.posterUrl;

  return (
    <section
      className="relative isolate w-full overflow-hidden border-b border-slate-800/60"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Öne çıkan filmler"
    >
      {/* Arka plan */}
      <div className="absolute inset-0 -z-10">
        <Image
          key={`bg-${movie.id}`}
          src={backdrop}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="animate-slow-zoom object-cover object-center opacity-30 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/92 to-ink-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/70" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_15%_40%,rgba(16,185,129,.05),transparent_70%)]" />
      </div>

      <div className="container-page relative">
        <div className="grid min-h-[560px] items-center gap-10 py-14 md:min-h-[620px] md:py-20 lg:grid-cols-[1.15fr_.85fr]">
          <div key={movie.id} className="max-w-2xl animate-fade-up">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className={`chip ${license.badge}`}>
                <ShieldCheck className="h-3 w-3" />
                {license.label}
              </span>
              <span className="chip border-slate-700/80 bg-slate-800/60 text-slate-300">
                Ücretsiz İzle
              </span>
              {movie.kind === "SERIES" && (
                <span className="chip border-sky-500/40 bg-sky-500/15 text-sky-300">
                  Dizi · {movie.sourceCount} bölüm
                </span>
              )}
              {movie.rating !== null && (
                <span className="chip border-amber-500/40 bg-amber-500/10 text-amber-300">
                  <Star className="h-3 w-3 fill-amber-400" />
                  {movie.rating.toFixed(1)}
                </span>
              )}
              <span className="chip border-slate-700/80 bg-slate-800/60 text-slate-300">
                {movie.quality}
              </span>
            </div>

            <h1 className="text-balance text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="mt-3 text-base font-medium italic text-emerald-300/80">
                {movie.tagline}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <span className="font-semibold text-slate-200">{movie.year}</span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-emerald-500" />
                {movie.kind === "SERIES"
                  ? `${movie.sourceCount} bölüm`
                  : formatRuntime(movie.runtime)}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span>{movie.categories.map((category) => category.name).join(" · ")}</span>
            </div>

            <p className="mt-5 line-clamp-3 max-w-xl text-sm leading-relaxed text-slate-300/90 sm:text-[15px]">
              {movie.overview}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={`/film/${movie.slug}`} className="btn-primary px-6 py-3 text-base">
                <Play className="h-5 w-5 fill-ink-950" />
                Hemen İzle
              </Link>
              <Link href={`/film/${movie.slug}#detay`} className="btn-ghost px-6 py-3 text-base">
                <Info className="h-5 w-5" />
                Detaylar
              </Link>
              <span className="ml-1 hidden text-xs text-slate-500 sm:inline">
                {movie.kind === "SERIES"
                  ? `${movie.sourceCount} bölüm · Internet Archive`
                  : `${movie.sourceCount} kaynak · ${movie.sourceName}`}
              </span>
            </div>
          </div>

          {/* Poster kartı */}
          <div className="relative hidden justify-center lg:flex">
            <div className="absolute -inset-8 rounded-[2rem] bg-emerald-500/5 blur-3xl" />
            <Link
              href={`/film/${movie.slug}`}
              key={`poster-${movie.id}`}
              className="group relative w-[290px] animate-fade-in overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,.95)] transition-transform duration-500 hover:-translate-y-1.5 hover:border-emerald-400/40"
            >
              <div className="relative aspect-[2/3]">
                <Image
                  src={movie.posterUrl}
                  alt={`${movie.title} afişi`}
                  fill
                  priority
                  sizes="290px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="flex items-center justify-between">
                    <span className={`chip ${license.badge}`}>{license.short}</span>
                    {movie.rating !== null && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-500 px-2 py-1 text-xs font-bold text-ink-950">
                        <Star className="h-3 w-3 fill-ink-950" />
                        {movie.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Kontroller */}
      <div className="container-page flex items-center justify-between pb-8">
        <div className="flex items-center gap-2">
          {movies.map((item, dotIndex) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`${item.title} filmini göster`}
              aria-current={dotIndex === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIndex === index
                  ? "w-10 bg-emerald-400/90"
                  : "w-4 bg-slate-700 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>

        {count > 1 && (
          <div className="flex items-center gap-2">
            <span className="mr-2 text-xs tabular-nums text-slate-500">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Önceki film"
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-800 bg-ink-950/60 text-slate-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Sonraki film"
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-800 bg-ink-950/60 text-slate-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
