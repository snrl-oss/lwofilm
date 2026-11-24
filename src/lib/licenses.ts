export type LicenseMeta = {
  value: string;
  label: string;
  short: string;
  description: string;
  badge: string;
  dot: string;
  group: "pd" | "cc" | "free" | "unknown";
};

export const LICENSE_TYPES: LicenseMeta[] = [
  {
    value: "PUBLIC_DOMAIN",
    label: "Public Domain",
    short: "PD",
    description:
      "Telif süresi dolmuş, herkesin özgürce izleyip paylaşabileceği yapıt.",
    badge: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
    dot: "bg-emerald-400",
    group: "pd",
  },
  {
    value: "CC0",
    label: "CC0",
    short: "CC0",
    description:
      "Yapıt sahibi tüm haklarından feragat etmiş; kısıtlama olmadan kullanılabilir.",
    badge: "border-sky-500/40 bg-sky-500/15 text-sky-300",
    dot: "bg-sky-400",
    group: "cc",
  },
  {
    value: "CC_BY",
    label: "CC BY",
    short: "CC BY",
    description:
      "Creative Commons Atıf: kaynak belirtmek koşuluyla izlenebilir ve paylaşılabilir.",
    badge: "border-sky-500/40 bg-sky-500/15 text-sky-300",
    dot: "bg-sky-400",
    group: "cc",
  },
  {
    value: "CC_BY_SA",
    label: "CC BY-SA",
    short: "CC BY-SA",
    description:
      "Atıf ve aynı lisansla paylaşım koşuluyla kullanılabilen Creative Commons lisansı.",
    badge: "border-cyan-500/40 bg-cyan-500/15 text-cyan-300",
    dot: "bg-cyan-400",
    group: "cc",
  },
  {
    value: "CC_BY_NC",
    label: "CC BY-NC",
    short: "CC BY-NC",
    description:
      "Yalnızca ticari olmayan kullanıma izin veren Creative Commons lisansı.",
    badge: "border-indigo-500/40 bg-indigo-500/15 text-indigo-300",
    dot: "bg-indigo-400",
    group: "cc",
  },
  {
    value: "OFFICIAL_FREE",
    label: "Resmî Ücretsiz",
    short: "FREE",
    description:
      "Yapımcı veya hak sahibi tarafından resmî olarak ücretsiz yayınlanmış içerik.",
    badge: "border-violet-500/40 bg-violet-500/15 text-violet-300",
    dot: "bg-violet-400",
    group: "free",
  },
  {
    value: "UNKNOWN",
    label: "Doğrulanmadı",
    short: "?",
    description:
      "Lisans bilgisi henüz doğrulanmadı. Yayına almadan önce kaynak kontrol edilmeli.",
    badge: "border-slate-600/60 bg-slate-700/30 text-slate-300",
    dot: "bg-slate-400",
    group: "unknown",
  },
];

const fallback = LICENSE_TYPES[LICENSE_TYPES.length - 1];

export function getLicenseMeta(type?: string | null): LicenseMeta {
  return LICENSE_TYPES.find((item) => item.value === type) ?? fallback;
}

export function isCreativeCommons(type?: string | null): boolean {
  return getLicenseMeta(type).group === "cc";
}

export type ProviderMeta = {
  value: string;
  label: string;
  description: string;
  badge: string;
};

export const PROVIDERS: ProviderMeta[] = [
  {
    value: "archive",
    label: "Internet Archive",
    description: "archive.org üzerindeki kamu malı / açık erişim kopyası",
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  },
  {
    value: "youtube",
    label: "YouTube",
    description: "Resmî veya hak sahibi kanalın embed yayını",
    badge: "border-red-500/30 bg-red-500/10 text-red-300",
  },
  {
    value: "wikimedia",
    label: "Wikimedia Commons",
    description: "Wikimedia Commons'taki özgür lisanslı video dosyası",
    badge: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  },
  {
    value: "mp4",
    label: "Doğrudan Dosya",
    description: "Kendi sunucunuzda barındırılan MP4 / HLS akışı",
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  },
];

export function getProviderMeta(value?: string | null): ProviderMeta {
  return PROVIDERS.find((p) => p.value === value) ?? PROVIDERS[0];
}

/** Yıl seçenekleri: 1900'lar → günümüz */
export const DECADES = [
  { label: "1900'ler", from: 1900, to: 1909 },
  { label: "1910'lar", from: 1910, to: 1919 },
  { label: "1920'ler", from: 1920, to: 1929 },
  { label: "1930'lar", from: 1930, to: 1939 },
  { label: "1940'lar", from: 1940, to: 1949 },
  { label: "1950'ler", from: 1950, to: 1959 },
  { label: "1960'lar", from: 1960, to: 1969 },
  { label: "1970'ler", from: 1970, to: 1979 },
  { label: "1980'ler", from: 1980, to: 1989 },
  { label: "1990'lar", from: 1990, to: 1999 },
  { label: "2000'ler", from: 2000, to: 2009 },
  { label: "2010'lar", from: 2010, to: 2019 },
  { label: "2020'ler", from: 2020, to: 2029 },
];
