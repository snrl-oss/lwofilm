import Link from "next/link";
import { Film } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
      <div className="max-w-md">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30">
          <Film className="h-7 w-7" />
        </span>
        <h1 className="mt-6 text-3xl font-black text-white">Kare bulunamadı</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Aradığınız film arşivde yok ya da bağlantı taşınmış olabilir. Kataloğa
          dönüp yeniden keşfedin.
        </p>
        <Link href="/arsiv" className="btn-primary mt-6">
          Arşive dön
        </Link>
      </div>
    </div>
  );
}
