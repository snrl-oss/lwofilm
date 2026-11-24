import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getNavCategories } from "@/lib/queries";

export const metadata: Metadata = {
  title: {
    default: "LwoFilm — Kamu Malı ve Creative Commons Sinema Arşivi",
    template: "%s · LwoFilm",
  },
  description:
    "Telif süresi dolmuş klasik filmler ve Creative Commons lisanslı bağımsız yapımlar için modern, ücretsiz ve yasal dijital sinema arşivi.",
  keywords: [
    "public domain filmler",
    "klasik sinema",
    "creative commons film",
    "ücretsiz film izle",
    "internet archive",
    "LwoFilm",
  ],
  openGraph: {
    title: "LwoFilm — Açık Sinema Arşivi",
    description:
      "Kamu malı klasikler ve Creative Commons yapımlar. Ücretsiz, yasal, reklamsız.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#090d16",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getNavCategories();

  return (
    <html lang="tr" className="dark">
      <body className="flex min-h-screen flex-col">
        <SiteHeader categories={categories} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
