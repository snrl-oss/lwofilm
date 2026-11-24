import Link from "next/link";
import {
  ArrowRight,
  Clapperboard,
  Languages,
  Layers,
  ListVideo,
  MonitorPlay,
  ShieldCheck,
} from "lucide-react";
import { HeroSlider } from "@/components/hero-slider";
import { MovieCard } from "@/components/movie-card";
import { MovieExplorer } from "@/components/movie-explorer";
import { getFeaturedMovies, getHomeMovies, getNavCategories } from "@/lib/queries";
import { getLicenseMeta } from "@/lib/licenses";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featured, movies, categories] = await Promise.all([
    getFeaturedMovies(),
    getHomeMovies(),
    getNavCategories(),
  ]);

  const pdCount = movies.filter(
    (movie) => getLicenseMeta(movie.license?.type).group === "pd",
  ).length;
  const ccCount = movies.filter(
    (movie) => getLicenseMeta(movie.license?.type).group === "cc",
  ).length;
  const series = movies.filter((movie) => movie.kind === "SERIES");
  const filmCount = movies.length - series.length;
  const episodeCount = series.reduce(
    (total, item) => total + item.episodeCount,
    0,
  );

  const stats = [
    { value: filmCount, label: "Film", icon: Clapperboard },
    { value: series.length, label: "Dizi", icon: ListVideo },
    { value: episodeCount, label: "Bölüm", icon: MonitorPlay },
    { value: pdCount + ccCount, label: "Açık Lisans", icon: ShieldCheck },
  ];

  return (
    <div className="pb-4">
      <HeroSlider movies={featured} />

      {/* İstatistik bandı */}
      <div className="container-page -mt-6 relative z-10">
        <div className="surface grid grid-cols-2 divide-slate-800/70 overflow-hidden p-1 sm:grid-cols-4 sm:divide-x">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 px-5 py-4 sm:justify-center"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                <stat.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xl font-black tabular-nums text-white">
                  {stat.value.toLocaleString("tr-TR")}
                </p>
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MovieExplorer
        movies={movies}
        categories={categories}
        heading="Arşivden Öne Çıkanlar"
        subheading="Kamu malı klasikler, Creative Commons yapımlar ve bölüm bölüm klasik diziler; tür, yıl ve lisansa göre filtreleyin."
      />

      {/* Diziler şeridi */}
      {series.length > 0 && (
        <section className="container-page mt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="kicker">Bölüm Bölüm</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                Klasik Diziler
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-400">
                Kamu malı bölümleriyle yayınlanan diziler; sezon ve bölüm listesinden
                istediğiniz yeri açın.
              </p>
            </div>
            <Link
              href="/diziler"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Tüm diziler <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {series.slice(0, 5).map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>
        </section>
      )}

      {/* Lisans / özellik bölümü */}
      <section className="container-page mt-20">
        <div className="surface relative overflow-hidden p-6 sm:p-10">
          <div className="absolute inset-0 bg-emerald-fade" />
          <div className="relative grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <span className="kicker">Neden LwoFilm?</span>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                Yasal, açık ve <span className="text-emerald-400">reklamsız</span> bir
                sinema arşivi
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-400">
                Telif süresi dolmuş klasikler ve Creative Commons lisanslı bağımsız
                yapımlar tek yerde. Her film için lisans türü, kaynak kurum ve
                doğrulama bağlantısı açıkça belirtilir.
              </p>
              <Link href="/arsiv" className="btn-primary mt-6">
                Arşivi Keşfet
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: ShieldCheck,
                  title: "Doğrulanmış lisans",
                  text: "Her kayıt; Public Domain ya da CC türü, kaynak adresi ve atıf bilgisiyle birlikte saklanır.",
                },
                {
                  icon: Layers,
                  title: "Çoklu kaynak",
                  text: "Orijinal dil, restore edilmiş 1080p veya altyazılı sürümler arasında tek tıkla geçiş yapın.",
                },
                {
                  icon: Languages,
                  title: "Erişilebilir oynatıcı",
                  text: "Sinema modu, tam ekran ve sayfa yenilenmeden kaynak değiştirme desteği.",
                },
                {
                  icon: MonitorPlay,
                  title: "Açık arşiv zihniyeti",
                  text: "Archive.org, Wikimedia ve resmî açık film stüdyolarından yasal gömme oynatma.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-xl border border-slate-800/80 bg-ink-950/40 p-4 transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/[0.04]"
                >
                  <feature.icon className="h-5 w-5 text-emerald-400" />
                  <h3 className="mt-3 text-sm font-bold text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
