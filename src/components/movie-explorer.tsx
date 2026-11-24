"use client";

import { Filter, RotateCcw, Search, ShieldCheck, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { MovieCard } from "@/components/movie-card";
import { DECADES, getLicenseMeta } from "@/lib/licenses";
import type { CategoryLite, MovieCardData } from "@/lib/types";
import { cn } from "@/lib/utils";

type LicenseGroup = "all" | "pd" | "cc";
type KindFilter = "all" | "FILM" | "SERIES";
type SortKey = "curated" | "rating" | "newest" | "oldest" | "title";

const licenseTabs: { value: LicenseGroup; label: string }[] = [
  { value: "all", label: "Tüm Lisanslar" },
  { value: "pd", label: "Kamu Malı" },
  { value: "cc", label: "Creative Commons" },
];

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "curated", label: "Editör Seçkisi" },
  { value: "rating", label: "En Yüksek Puan" },
  { value: "newest", label: "En Yeni" },
  { value: "oldest", label: "En Eski" },
  { value: "title", label: "A – Z" },
];

export function MovieExplorer({
  movies,
  categories,
  initialQuery = "",
  heading = "Tüm Arşiv",
  subheading,
  compact = false,
}: {
  movies: MovieCardData[];
  categories: CategoryLite[];
  initialQuery?: string;
  heading?: string;
  subheading?: string;
  compact?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("all");
  const [decade, setDecade] = useState("all");
  const [licenseGroup, setLicenseGroup] = useState<LicenseGroup>("all");
  const [kind, setKind] = useState<KindFilter>("all");
  const [sort, setSort] = useState<SortKey>("curated");

  const activeFilterCount =
    (category !== "all" ? 1 : 0) +
    (decade !== "all" ? 1 : 0) +
    (licenseGroup !== "all" ? 1 : 0) +
    (kind !== "all" ? 1 : 0) +
    (query.trim() ? 1 : 0);

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("tr");

    const list = movies.filter((movie) => {
      if (category !== "all") {
        const hasCategory = movie.categories.some((item) => item.slug === category);
        if (!hasCategory) return false;
      }

      if (decade !== "all") {
        const range = DECADES.find((item) => item.label === decade);
        if (range && (movie.year < range.from || movie.year > range.to)) return false;
      }

      if (licenseGroup !== "all") {
        if (getLicenseMeta(movie.license?.type).group !== licenseGroup) return false;
      }

      if (kind !== "all" && movie.kind !== kind) return false;

      if (needle) {
        const haystack = [
          movie.title,
          movie.originalTitle ?? "",
          String(movie.year),
          ...movie.categories.map((item) => item.name),
        ]
          .join(" ")
          .toLocaleLowerCase("tr");
        if (!haystack.includes(needle)) return false;
      }

      return true;
    });

    const sorted = [...list];
    switch (sort) {
      case "rating":
        sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "newest":
        sorted.sort((a, b) => b.year - a.year);
        break;
      case "oldest":
        sorted.sort((a, b) => a.year - b.year);
        break;
      case "title":
        sorted.sort((a, b) => a.title.localeCompare(b.title, "tr"));
        break;
      default:
        sorted.sort(
          (a, b) =>
            Number(b.featured) - Number(a.featured) ||
            a.year - b.year ||
            a.title.localeCompare(b.title, "tr"),
        );
    }
    return sorted;
  }, [movies, query, category, decade, licenseGroup, kind, sort]);

  function reset() {
    setQuery("");
    setCategory("all");
    setDecade("all");
    setLicenseGroup("all");
    setKind("all");
    setSort("curated");
  }

  return (
    <section className={cn("container-page", compact ? "mt-10" : "mt-16")}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="kicker">Keşfet</span>
            <span className="h-px w-10 bg-emerald-500/50" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-2 max-w-2xl text-sm text-slate-400">{subheading}</p>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Filter className="h-4 w-4 text-emerald-500" />
          <span className="font-semibold text-slate-300">{filtered.length}</span>
          yapım listeleniyor
        </div>
      </div>

      {/* Filtre paneli */}
      <div className="surface sticky top-[68px] z-30 mb-8 overflow-hidden p-3 sm:p-4">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="mr-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Tür
          </span>
          {(
            [
              { value: "all", label: "Tümü" },
              { value: "FILM", label: "Filmler" },
              { value: "SERIES", label: "Diziler" },
            ] as { value: KindFilter; label: string }[]
          ).map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setKind(item.value)}
              className={cn(
                "rounded-lg border px-3 py-1 text-xs font-semibold transition-colors",
                kind === item.value
                  ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                  : "border-slate-800 text-slate-400 hover:text-slate-200",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="no-scrollbar -mx-1 flex items-center gap-1.5 overflow-x-auto px-1 pb-1">
          <FilterTab
            active={category === "all"}
            onClick={() => setCategory("all")}
          >
            Tümü
          </FilterTab>
          {categories.map((item) => (
            <FilterTab
              key={item.slug}
              active={category === item.slug}
              onClick={() =>
                setCategory((current) => (current === item.slug ? "all" : item.slug))
              }
            >
              {item.name}
            </FilterTab>
          ))}
        </div>

        <div className="mt-3 grid gap-2 border-t border-slate-800/70 pt-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Arşiv içinde filtrele…"
              className="h-10 w-full rounded-lg border border-slate-800 bg-ink-950/70 pl-9 pr-8 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500/60 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Aramayı temizle"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <select
            value={decade}
            onChange={(event) => setDecade(event.target.value)}
            aria-label="Yıla göre filtrele"
            className="h-10 rounded-lg border border-slate-800 bg-ink-950/70 px-3 text-sm text-slate-200 focus:border-emerald-500/60 focus:outline-none"
          >
            <option value="all">Tüm Yıllar</option>
            {DECADES.map((item) => (
              <option key={item.label} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            value={licenseGroup}
            onChange={(event) => setLicenseGroup(event.target.value as LicenseGroup)}
            aria-label="Lisans türüne göre filtrele"
            className="h-10 rounded-lg border border-slate-800 bg-ink-950/70 px-3 text-sm text-slate-200 focus:border-emerald-500/60 focus:outline-none"
          >
            {licenseTabs.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            aria-label="Sıralama"
            className="h-10 rounded-lg border border-slate-800 bg-ink-950/70 px-3 text-sm text-slate-200 focus:border-emerald-500/60 focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {activeFilterCount > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              <Sparkles className="h-3 w-3 text-emerald-500" /> Aktif
            </span>
            {query.trim() && (
              <ActiveChip label={`“${query.trim()}”`} onClear={() => setQuery("")} />
            )}
            {category !== "all" && (
              <ActiveChip
                label={categories.find((item) => item.slug === category)?.name ?? category}
                onClear={() => setCategory("all")}
              />
            )}
            {decade !== "all" && (
              <ActiveChip label={decade} onClear={() => setDecade("all")} />
            )}
            {licenseGroup !== "all" && (
              <ActiveChip
                label={licenseTabs.find((item) => item.value === licenseGroup)?.label ?? ""}
                onClear={() => setLicenseGroup("all")}
              />
            )}
            {kind !== "all" && (
              <ActiveChip
                label={kind === "SERIES" ? "Diziler" : "Filmler"}
                onClear={() => setKind("all")}
              />
            )}
            <button
              type="button"
              onClick={reset}
              className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Tümünü temizle
            </button>
          </div>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              priority={index < 5}
              className="animate-fade-up"
            />
          ))}
        </div>
      ) : (
        <div className="surface grid place-items-center gap-4 px-6 py-20 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-400">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div>
            <p className="text-lg font-bold text-white">Eşleşen yapım bulunamadı</p>
            <p className="mt-1 text-sm text-slate-400">
              Filtreleri gevşetmeyi veya farklı bir arama yapmayı deneyin.
            </p>
          </div>
          <button type="button" onClick={reset} className="btn-primary">
            <RotateCcw className="h-4 w-4" />
            Filtreleri sıfırla
          </button>
        </div>
      )}
    </section>
  );
}

function FilterTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200",
        active
          ? "bg-emerald-500 text-ink-950 shadow-[0_6px_20px_-8px_rgba(16,185,129,.9)]"
          : "text-slate-400 hover:bg-white/5 hover:text-slate-100",
      )}
    >
      {children}
    </button>
  );
}

function ActiveChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
      {label}
      <button type="button" onClick={onClear} aria-label={`${label} filtresini kaldır`}>
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}
