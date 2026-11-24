"use client";

import {
  Expand,
  ExternalLink,
  Info,
  Loader2,
  Maximize2,
  Minimize2,
  MonitorPlay,
  Play,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getProviderMeta } from "@/lib/licenses";
import type { MovieDetailData, SourceLite } from "@/lib/types";
import { cn } from "@/lib/utils";

function sortSources(sources: SourceLite[]) {
  return [...sources].sort((a, b) => {
    if (a.isDefault !== b.isDefault) return a.isDefault ? -1 : 1;
    return a.sortOrder - b.sortOrder;
  });
}

export function MoviePlayer({ movie }: { movie: MovieDetailData }) {
  const sources = sortSources(movie.sources);
  const [activeId, setActiveId] = useState<number | null>(
    sources[0]?.id ?? null,
  );
  const [theater, setTheater] = useState(false);
  const [loading, setLoading] = useState(true);
  const frameRef = useRef<HTMLDivElement>(null);

  const active = sources.find((source) => source.id === activeId) ?? sources[0];

  useEffect(() => {
    if (!theater) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setTheater(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [theater]);

  useEffect(() => {
    setLoading(true);
  }, [active?.id]);

  async function goFullscreen() {
    const element = frameRef.current;
    if (!element) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await element.requestFullscreen();
      }
    } catch {
      setTheater(true);
    }
  }

  if (!sources.length) {
    return (
      <div className="surface grid place-items-center gap-4 px-6 py-20 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-amber-500/10 text-amber-400">
          <Info className="h-6 w-6" />
        </span>
        <div>
          <p className="text-lg font-bold text-white">
            Bu yapım için henüz oynatılabilir kaynak yok
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Bu yapım için oynatılabilir kaynak yakında eklenecek.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {theater && (
        <div
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm"
          aria-hidden
          onClick={() => setTheater(false)}
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
        {/* Kaynak sekmeleri */}
        <div
          className={cn(
            "flex flex-wrap items-center gap-1.5 border-b border-slate-800/80 bg-ink-950/60 p-2.5",
            theater && "rounded-xl border border-slate-800/60",
          )}
        >
          <span className="mr-1 hidden items-center gap-1.5 px-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 sm:flex">
            <LayersIcon /> Kaynak
          </span>

          <div className="no-scrollbar flex flex-1 items-center gap-1.5 overflow-x-auto">
            {sources.map((source) => {
              const provider = getProviderMeta(source.provider);
              const isActive = source.id === active?.id;
              return (
                <button
                  key={source.id}
                  type="button"
                  onClick={() => setActiveId(source.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "group flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-left transition-all duration-200",
                    isActive
                      ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-200 shadow-[0_0_20px_-8px_rgba(16,185,129,.8)]"
                      : "border-slate-800 bg-ink-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200",
                  )}
                >
                  <Play
                    className={cn(
                      "h-3.5 w-3.5 shrink-0",
                      isActive ? "fill-emerald-400 text-emerald-400" : "text-slate-500",
                    )}
                  />
                  <span className="flex flex-col leading-tight">
                    <span className="whitespace-nowrap text-xs font-bold">
                      {source.label}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1.5 whitespace-nowrap text-[10px] text-slate-500">
                      <span
                        className={cn(
                          "rounded border px-1 py-[1px] text-[9px] font-bold uppercase",
                          provider.badge,
                        )}
                      >
                        {source.quality}
                      </span>
                      {source.language}
                    </span>
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
                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            <button
              type="button"
              onClick={goFullscreen}
              title="Tam ekran"
              className="hidden h-9 w-9 place-items-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-emerald-500/40 hover:text-emerald-400 sm:grid"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setTheater((value) => !value)}
              title={theater ? "Sinema modundan çık" : "Sinema modu (ışıkları karart)"}
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
                <p className="text-xs font-medium text-slate-400">
                  {active?.label} yükleniyor…
                </p>
              </div>
            </div>
          )}

          {active && (
            <iframe
              key={active.id}
              src={active.url}
              title={`${movie.title} — ${active.label}`}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setLoading(false)}
            />
          )}

          {theater && (
            <button
              type="button"
              onClick={() => setTheater(false)}
              aria-label="Sinema modundan çık"
              className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/70 text-white ring-1 ring-white/20 transition-colors hover:bg-emerald-500 hover:text-ink-950"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Alt bilgi */}
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 bg-ink-950/50 px-3 py-2.5 text-[11px] text-slate-500",
            theater && "rounded-xl border border-slate-800/60",
          )}
        >
          <span className="inline-flex items-center gap-1.5">
            <Expand className="h-3.5 w-3.5 text-emerald-500" />
            Gömme oynatıcı · {getProviderMeta(active?.provider).label}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5" />
            İçerik kaynağından doğrudan yayınlanır. Reklamlar kaynak sağlayıcıya aittir.
          </span>
        </div>
      </div>
    </>
  );
}

function LayersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  );
}
