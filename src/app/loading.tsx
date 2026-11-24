import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center">
      <div className="flex flex-col items-center gap-3 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
        <p className="text-sm">Arşiv hazırlanıyor…</p>
      </div>
    </div>
  );
}
