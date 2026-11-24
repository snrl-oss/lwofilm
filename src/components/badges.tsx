import { ShieldCheck, Star } from "lucide-react";
import { getLicenseMeta } from "@/lib/licenses";
import { cn } from "@/lib/utils";

export function LicenseBadge({
  type,
  className,
  showIcon = true,
}: {
  type?: string | null;
  className?: string;
  showIcon?: boolean;
}) {
  const meta = getLicenseMeta(type);

  return (
    <span
      className={cn("chip backdrop-blur-md", meta.badge, className)}
      title={meta.description}
    >
      {showIcon && <ShieldCheck className="h-3 w-3" />}
      {meta.short}
    </span>
  );
}

export function RatingBadge({
  rating,
  className,
}: {
  rating?: number | null;
  className?: string;
}) {
  if (rating === null || rating === undefined) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-ink-950/85 px-1.5 py-1 text-[11px] font-bold text-amber-400 backdrop-blur-md",
        className,
      )}
      title={`IMDb / TMDB puanı: ${rating.toFixed(1)}`}
    >
      <Star className="h-3 w-3 fill-amber-400" />
      {rating.toFixed(1)}
    </span>
  );
}
