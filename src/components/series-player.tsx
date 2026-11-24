"use client";

import {
  Check,
  ChevronDown,
  ExternalLink,
  Info,
  ListVideo,
  Loader2,
  Maximize2,
  Minimize2,
  MonitorPlay,
  Play,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { getProviderMeta } from "@/lib/licenses";
import type { MovieDetailData } from "@/lib/types";
import { cn, formatRuntime } from "@/lib/utils";

export function SeriesPlayer({ movie }: { movie: MovieDetailData }) {
  const episodes = movie.episodes;
  const [episodeId, setEpisodeId] = useState<number | null>(
    episodes[0]?.id ?? null,
  );
  const [sourceId, setSourceId] = useState<number | null>(
    episodes[0]?.sources.find((s) => s.isDefault)?.id ??
      episodes[0]?.sources[0]?.id ??
      null,
  );
  const [theater, setTheater] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listOpen, setListOpen] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const episode = useMemo(
    () => episodes.find((item) => item.id === episodeId) ?? episodes[0],
    [episodes, episodeId],
  );
  const active =
    episode?.sources.find((source) => source.id === sourceId) ??
    episode?.sources.find((source) => source.isDefault) ??
    episode?.sources[0];

  useEffect(() => {
    if (!theater) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTheater(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [theater]);

  useEffect(() => setLoading(true), [episode?.id, active?.id]);

  function selectEpisode(next: MovieDetailData["episodes"][number]) {
    setEpisodeId(next.id);
    const preferred =
      next.sources.find((source) => source.isDefault) ?? next.sources[0];
    setSourceId(preferred?.id ?? null);
    setListOpen(false);
  }

  async function goFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await frameRef.current?.requestFullscreen();
    } catch {
      setTheater(true);
    }
  }

  if (!episodes.length) {
    return (
      <div className="surface grid place-items-center gap-3 px-6 py-16 text-center">
        <ListVideo className="h-8 w-8 text-emerald-400" />
        <p className="text-sm text-slate-300">Bu dizi için bölüm eklenmemiş.</p>
      </div>
    );
  }

  return (
    <>
      {theater && (
        <div
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm"
          onClick={() => setTheater(false)}
          aria-hidden
        />
      )}

      <div
        className={cn(
          "relative z-[95] w-full",
          theater
            ? "fixed inset-0 z-[100] flex flex-col gap-2 bg-ink-950 p-2 sm:p-4"
            : "surface overflow-hidden",
        )}
      >
        {/* Üst bar: bölüm + kaynak */}
        <div
          className={cn(
            "flex flex-wrap items-center gap-2 border-b border-slate-800/80 bg-ink-950/60 p-2.5",
            theater && "rounded-xl border border-slate-800/60",
          )}
        >
          <div className="relative">
            <button
              type="button"
              onClick={() => setListOpen((value) => !value)}
              className="flex items-center gap-2 rounded-lg border border-slate-800 bg-ink-900/70 px-3 py-2 text-xs font-bold text-slate-200 transition-colors hover:border-emerald-500/50"
            >
              <ListVideo className="h-4 w-4 text-emerald-400" />
              S{episode?.season} B{episode?.number}
              <span className="max-w-[140px] truncate font-medium text-slate-400 sm:max-w-none">
                {episode?.title}
              </span>
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform", listOpen && "rotate-180")}
              />
            </button>

            {listOpen && (
              <div className="absolute left-0 top-12 z-30 max-h-80 w-72 overflow-y-auto rounded-xl border border-slate-800 bg-ink-850/98 p-1.5 shadow-2xl backdrop-blur-xl">
                {episodes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectEpisode(item)}
                    className={cn(
                      "flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left transition-colors",
                      item.id === episode?.id
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "text-slate-300 hover:bg-white/5",
                    )}
                  >
                    <span className="mt-0.5 w-10 shrink-0 text-[11px] font-bold tabular-nums text-slate-500">
                      S{item.season} B{item.number}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-semibold">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {formatRuntime(item.runtime)}
                      </span>
                    </span>
                    {item.id === episode?.id && (
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="no-scrollbar flex flex-1 items-center gap-1.5 overflow-x-auto">
            {episode?.sources.map((source) => {
              const provider = getProviderMeta(source.provider);
              const isActive = source.id === active?.id;
              return (
                <button
                  key={source.id}
                  type="button"
                  onClick={() => setSourceId(source.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all",
                    isActive
                      ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-200"
                      : "border-slate-800 bg-ink-900/60 text-slate-400 hover:text-slate-200",
                  )}
                >
                  <Play
                    className={cn(
                      "h-3 w-3",
                      isActive ? "fill-emerald-400 text-emerald-400" : "text-slate-500",
                    )}
                  />
                  {source.label}
                  <span
                    className={cn(
                      "rounded border px-1 text-[9px] font-bold uppercase",
                      provider.badge,
                    )}
                  >
                    {source.quality}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            {active && (
              <a
                href={active.url}
                target="_blank"
                rel="noreferrer"
                title="Kaynağı yeni sekmede aç"
                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-800 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-400"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            <button
              type="button"
              onClick={goFullscreen}
              title="Tam ekran"
              className="hidden h-9 w-9 place-items-center rounded-lg border border-slate-800 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-400 sm:grid"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setTheater((value) => !value)}
              className={cn(
                "flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-semibold transition-colors",
                theater
                  ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                  : "border-slate-800 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-400",
              )}
            >
              {theater ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <MonitorPlay className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {theater ? "Sinemadan Çık" : "Sinema Modu"}
              </span>
            </button>
          </div>
        </div>

        {/* Oynatıcı */}
        <div
          ref={frameRef}
          className={cn(
            "relative w-full bg-black",
            theater ? "flex-1 overflow-hidden rounded-xl" : "aspect-video",
          )}
        >
          {loading && (
            <div className="absolute inset-0 z-10 grid place-items-center bg-ink-950">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-7 w-7 animate-spin text-emerald-400" />
                <p className="text-xs text-slate-400">
                  {episode?.title} yükleniyor…
                </p>
              </div>
            </div>
          )}
          {active ? (
            <iframe
              key={active.id}
              src={active.url}
              title={`${movie.title} — S${episode?.season} B${episode?.number}`}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setLoading(false)}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-sm text-slate-400">
              Bu bölüm için kaynak bulunamadı.
            </div>
          )}
          {theater && (
            <button
              type="button"
              onClick={() => setTheater(false)}
              aria-label="Sinema modundan çık"
              className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/70 text-white ring-1 ring-white/20 hover:bg-emerald-500 hover:text-ink-950"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 bg-ink-950/50 px-3 py-2.5 text-[11px] text-slate-500",
            theater && "rounded-xl border border-slate-800/60",
          )}
        >
          <span className="inline-flex items-center gap-1.5">
            <ListVideo className="h-3.5 w-3.5 text-emerald-500" />
            {episode?.title} · S{episode?.season} B{episode?.number}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5" />
            Bölümler Internet Archive arşivinden gömülü olarak yayınlanır.
          </span>
        </div>
      </div>

      {/* Bölüm listesi */}
      <div className="surface mt-4 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Bölümler
          </h2>
          <span className="chip border-slate-700/80 bg-slate-800/60 text-slate-300">
            {episodes.length} bölüm
          </span>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {episodes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectEpisode(item)}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 hover:-translate-y-0.5",
                item.id === episode?.id
                  ? "border-emerald-500/50 bg-emerald-500/[0.08]"
                  : "border-slate-800/80 bg-ink-950/40 hover:border-emerald-500/40",
              )}
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-bold",
                  item.id === episode?.id
                    ? "bg-emerald-500 text-ink-950"
                    : "bg-slate-800 text-slate-300",
                )}
              >
                {item.season}x{String(item.number).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-slate-100">
                  {item.title}
                </span>
                <span className="text-[11px] text-slate-500">
                  {formatRuntime(item.runtime)} · {item.sources.length} kaynak
                </span>
              </span>
              <Play className="h-4 w-4 shrink-0 text-slate-500" />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
