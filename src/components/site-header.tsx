"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Film,
  Loader2,
  Menu,
  Search,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CategoryLite } from "@/lib/types";
import { formatRating } from "@/lib/utils";

type SearchResult = {
  slug: string;
  title: string;
  year: number;
  posterUrl: string;
  rating: number | null;
  licenseType: string | null;
};

export function SiteHeader({ categories }: { categories: CategoryLite[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const trimmed = query.trim();
  const showResults = searchOpen && trimmed.length >= 2;

  useEffect(() => {
    if (trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal },
        );
        const data = (await response.json()) as { results: SearchResult[] };
        setResults(data.results ?? []);
      } catch {
        /* iptal edilen istekler sessizce yutulur */
      } finally {
        setLoading(false);
      }
    }, 220);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [trimmed]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (catRef.current && !catRef.current.contains(event.target as Node)) {
        setCatOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setCatOpen(false);
        setMenuOpen(false);
      }
      if (
        event.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(
          (event.target as HTMLElement)?.tagName ?? "",
        )
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const highlighted = useMemo(() => {
    if (!trimmed) return categories.slice(0, 6);
    return categories
      .filter((category) =>
        category.name.toLocaleLowerCase("tr").includes(trimmed.toLocaleLowerCase("tr")),
      )
      .slice(0, 6);
  }, [categories, trimmed]);

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    if (!trimmed) return;
    setSearchOpen(false);
    setMobileSearch(false);
    router.push(`/arsiv?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-ink-900/85 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center gap-3 lg:gap-5">
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/40 transition-all duration-300 group-hover:bg-emerald-500/25 group-hover:ring-emerald-400/60">
            <Film className="h-5 w-5 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-white">
            Lwo<span className="text-emerald-400">Film</span>
          </span>
        </Link>

        {/* MasaÃ¼stÃ¼ arama */}
        <div ref={searchRef} className="relative hidden flex-1 md:block">
          <form onSubmit={submitSearch} className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Film, tÃ¼r veya yÄ±l araâ€¦  ( / )"
              aria-label="ArÅŸivde ara"
              className="h-10 w-full rounded-xl border border-slate-800/90 bg-ink-950/60 pl-10 pr-20 text-sm text-slate-100 placeholder:text-slate-500 transition-all focus:border-emerald-500/60 focus:bg-ink-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/15"
            />
            <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 text-[10px] font-medium text-slate-500 lg:flex">
              <kbd className="rounded border border-slate-700 bg-slate-800/60 px-1.5 py-0.5">
                Enter
              </kbd>
            </span>
          </form>

          {showResults && (
            <div className="absolute left-0 right-0 top-12 overflow-hidden rounded-2xl border border-slate-800 bg-ink-850/98 shadow-2xl backdrop-blur-xl">
              {loading && (
                <div className="flex items-center gap-2 px-4 py-4 text-sm text-slate-400">
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                  ArÅŸiv taranÄ±yorâ€¦
                </div>
              )}

              {!loading && results.length === 0 && (
                <div className="px-4 py-5 text-sm text-slate-400">
                  <p className="font-medium text-slate-200">
                    â€œ{trimmed}â€ iÃ§in film bulunamadÄ±.
                  </p>
                  <p className="mt-1 text-xs">
                    FarklÄ± bir baÅŸlÄ±k deneyin veya tÃ¼r seÃ§in.
                  </p>
                </div>
              )}

              {!loading &&
                results.map((result) => (
                  <Link
                    key={result.slug}
                    href={`/film/${result.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 border-b border-slate-800/60 px-3 py-2.5 transition-colors last:border-0 hover:bg-emerald-500/[0.07]"
                  >
                    <span className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md bg-slate-800">
                      {result.posterUrl && (
                        <Image
                          src={result.posterUrl}
                          alt={result.title}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-100">
                        {result.title}
                      </span>
                      <span className="text-xs text-slate-500">
                        {result.year}
                        {result.licenseType ? ` Â· ${result.licenseType}` : ""}
                      </span>
                    </span>
                    {result.rating !== null && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400">
                        <Star className="h-3 w-3 fill-amber-400" />
                        {formatRating(result.rating)}
                      </span>
                    )}
                  </Link>
                ))}

              {!loading && trimmed && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    router.push(`/arsiv?q=${encodeURIComponent(trimmed)}`);
                  }}
                  className="flex w-full items-center justify-between bg-ink-950/60 px-4 py-3 text-xs font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/10"
                >
                  <span>TÃ¼m sonuÃ§larÄ± gÃ¶r</span>
                  <span>â†’</span>
                </button>
              )}
            </div>
          )}
        </div>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          <Link
            href="/arsiv"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            ArÅŸiv / Klasikler
          </Link>
          <Link
            href="/diziler"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            Diziler
          </Link>

          <div ref={catRef} className="relative">
            <button
              type="button"
              onClick={() => setCatOpen((value) => !value)}
              aria-expanded={catOpen}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              Kategoriler
              <ChevronDown
                className={`h-4 w-4 transition-transform ${catOpen ? "rotate-180" : ""}`}
              />
            </button>

            {catOpen && (
              <div className="absolute right-0 top-12 w-64 overflow-hidden rounded-2xl border border-slate-800 bg-ink-850/98 p-2 shadow-2xl backdrop-blur-xl">
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  TÃ¼rler
                </p>
                <div className="grid grid-cols-1">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/kategori/${category.slug}`}
                      onClick={() => setCatOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-emerald-500/10 hover:text-emerald-300"
                    >
                      <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

        </nav>

        {/* Mobil kontroller */}
        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <button
            type="button"
            aria-label="Ara"
            onClick={() => {
              setMobileSearch((value) => !value);
              setTimeout(() => inputRef.current?.focus(), 60);
            }}
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-300 hover:bg-white/5"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="MenÃ¼"
            onClick={() => setMenuOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-300 hover:bg-white/5"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileSearch && (
        <div className="container-page pb-3 md:hidden">
          <form onSubmit={submitSearch} className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Film araâ€¦"
              className="h-10 w-full rounded-xl border border-slate-800 bg-ink-950/70 pl-10 pr-4 text-sm"
            />
          </form>
          {trimmed.length >= 2 && results.length > 0 && (
            <div className="mt-2 overflow-hidden rounded-xl border border-slate-800 bg-ink-850">
              {results.slice(0, 4).map((result) => (
                <Link
                  key={result.slug}
                  href={`/film/${result.slug}`}
                  onClick={() => setMobileSearch(false)}
                  className="flex items-center justify-between border-b border-slate-800/60 px-3 py-2.5 text-sm last:border-0"
                >
                  <span className="truncate">{result.title}</span>
                  <span className="text-xs text-slate-500">{result.year}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {menuOpen && (
        <div className="border-t border-slate-800/70 bg-ink-900/98 lg:hidden">
          <div className="container-page grid gap-1 py-4">
            <Link
              href="/arsiv"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
            >
              ArÅŸiv / Klasikler
            </Link>
            <Link
              href="/diziler"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
            >
              Diziler
            </Link>
            <div className="mt-2 border-t border-slate-800/70 pt-2">
              <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Kategoriler
              </p>
              <div className="grid grid-cols-2 gap-1">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/kategori/${category.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-300"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            {highlighted.length > 0 && trimmed && (
              <p className="px-3 pt-2 text-[11px] text-slate-500">
                <Sparkles className="mr-1 inline h-3 w-3 text-emerald-500" />
                {highlighted.length} eÅŸleÅŸen kategori
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
