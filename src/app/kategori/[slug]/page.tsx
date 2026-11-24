import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MovieExplorer } from "@/components/movie-explorer";
import { prisma } from "@/lib/prisma";
import { getNavCategories, movieCardInclude, toMovieCard } from "@/lib/queries";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Kategori bulunamadı" };
  return {
    title: `${category.name} Filmleri`,
    description: `${category.name} türündeki kamu malı ve Creative Commons lisanslı filmler.`,
  };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      movies: {
        include: movieCardInclude,
        orderBy: [{ featured: "desc" }, { rating: "desc" }],
      },
    },
  });

  if (!category) notFound();

  const [categories] = await Promise.all([getNavCategories()]);

  return (
    <div className="pb-10 pt-10">
      <div className="container-page">
        <span className="kicker">Kategori</span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
          {category.name} <span className="text-emerald-400">Filmleri</span>
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          {category.movies.length} yapım bu kategoride listeleniyor.
        </p>
      </div>

      <MovieExplorer
        key={category.slug}
        movies={category.movies.map(toMovieCard)}
        categories={categories}
        heading={category.name}
        compact
      />
    </div>
  );
}
