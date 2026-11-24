import Image from "next/image";
import Link from "next/link";
import { Clock, Play } from "lucide-react";
import { LicenseBadge, RatingBadge } from "@/components/badges";
import type { MovieCardData } from "@/lib/types";
import { cn, formatRuntime } from "@/lib/utils";

export function MovieCard({
  movie,
  className,
  priority = false,
}: {
  movie: MovieCardData;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/film/${movie.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-ink-750/80 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-glow-emerald focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70",
        className,
      )}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-ink-950">
        <Image
          src={movie.posterUrl}
          alt={`${movie.title} afişi`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent opacity-80" />

        <div className="absolute left-2.5 top-2.5 flex flex-wrap items-center gap-1.5">
          <LicenseBadge type={movie.license?.type} />
          {movie.kind === "SERIES" ? (
            <span className="chip border-sky-500/40 bg-sky-500/15 text-sky-300 backdrop-blur-md">
              Dizi
            </span>
          ) : (
            <span className="chip border-white/15 bg-ink-950/80 text-slate-200 backdrop-blur-md">
              {movie.quality}
            </span>
          )}
        </div>

        <RatingBadge rating={movie.rating} className="absolute right-2.5 top-2.5" />

        <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/95 text-ink-950 shadow-[0_10px_40px_-8px_rgba(16,185,129,.9)] transition-transform duration-300 group-hover:scale-105">
            <Play className="ml-0.5 h-6 w-6 fill-ink-950" />
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center gap-2 px-3 pb-3 text-[11px] text-slate-300 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3 text-emerald-400" />
            {movie.kind === "SERIES"
              ? `${movie.episodeCount} bölüm`
              : formatRuntime(movie.runtime)}
          </div>          <span className="h-1 w-1 rounded-full bg-slate-600" />
          <span className="truncate">
            {movie.categories.map((category) => category.name).join(" · ")}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 px-3.5 pb-4 pt-3">
        <h3 className="line-clamp-1 text-sm font-bold text-slate-100 transition-colors group-hover:text-emerald-300">
          {movie.title}
        </h3>
        <p className="text-xs font-medium text-slate-500">
          {movie.year}
          {movie.kind === "SERIES"
            ? ` · ${movie.episodeCount} bölüm`
            : movie.originalTitle && movie.originalTitle !== movie.title
              ? ` · ${movie.originalTitle}`
              : ""}
        </p>
      </div>
    </Link>
  );
}
