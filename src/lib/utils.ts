const TR_MAP: Record<string, string> = {
  ç: "c",
  Ç: "c",
  ğ: "g",
  Ğ: "g",
  ı: "i",
  İ: "i",
  ö: "o",
  Ö: "o",
  ş: "s",
  Ş: "s",
  ü: "u",
  Ü: "u",
  â: "a",
  î: "i",
  û: "u",
};

export function slugify(input: string): string {
  return input
    .split("")
    .map((char) => TR_MAP[char] ?? char)
    .join("")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 80);
}

export function formatRuntime(minutes?: number | null): string {
  if (!minutes) return "—";
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest}dk`;
  return `${hours}s ${rest}dk`;
}

export function formatRating(rating?: number | null): string {
  if (rating === null || rating === undefined) return "—";
  return rating.toFixed(1);
}

export function formatCount(count?: number | null): string {
  if (!count) return "0";
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${Math.round(count / 1_000)}B`;
  return String(count);
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
