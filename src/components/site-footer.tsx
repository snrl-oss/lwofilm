import Link from "next/link";
import { Film, Github, Heart, ShieldCheck } from "lucide-react";
import { getLicenseMeta } from "@/lib/licenses";

const archiveLinks = [
  { label: "Tüm Arşiv", href: "/arsiv" },
  { label: "Diziler", href: "/diziler" },
  { label: "Sessiz Sinema", href: "/kategori/sessiz-sinema" },
  { label: "Bilim Kurgu", href: "/kategori/bilim-kurgu" },
  { label: "Film Noir", href: "/kategori/film-noir" },
];

const sourceLinks = [
  { label: "Internet Archive", href: "https://archive.org" },
  { label: "Wikimedia Commons", href: "https://commons.wikimedia.org" },
  { label: "Blender Open Movies", href: "https://studio.blender.org/films/" },
  { label: "Creative Commons", href: "https://creativecommons.org" },
];

export function SiteFooter() {
  const pd = getLicenseMeta("PUBLIC_DOMAIN");
  const cc = getLicenseMeta("CC_BY");

  return (
    <footer className="relative mt-20 border-t border-slate-800/80 bg-ink-950/70">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/40">
              <Film className="h-5 w-5 text-emerald-400" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-white">
              Lwo<span className="text-emerald-400">Film</span>
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-slate-400">
            Telif süresi dolmuş klasikler ile Creative Commons lisanslı bağımsız
            yapımların buluştuğu açık dijital sinema arşivi.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className={`chip ${pd.badge}`}>{pd.short}</span>
            <span className={`chip ${cc.badge}`}>{cc.short}</span>
            <span className="chip border-amber-500/40 bg-amber-500/10 text-amber-300">
              <ShieldCheck className="h-3 w-3" /> Yasal
            </span>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-300">
            Arşiv
          </h3>
          <ul className="space-y-2.5 text-sm">
            {archiveLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-400 transition-colors hover:text-emerald-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-300">
            Kaynaklar
          </h3>
          <ul className="space-y-2.5 text-sm">
            {sourceLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 transition-colors hover:text-emerald-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-300">
            Şeffaflık
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            Her film sayfasında lisans türü, kaynak kurum ve doğrulama bağlantısı
            yer alır. İçerik kaldırma talepleri için bizimle iletişime geçin.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-800/60">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} LwoFilm · Kar amacı gütmeyen açık arşiv
            denemesi.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Açık sinema için <Heart className="h-3.5 w-3.5 text-emerald-500" /> ile
            yapıldı
            <Github className="ml-2 h-3.5 w-3.5" />
          </p>
        </div>
      </div>
    </footer>
  );
}
