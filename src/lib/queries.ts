import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type {
  CategoryLite,
  EpisodeData,
  HeroMovieData,
  LicenseLite,
  MovieCardData,
  MovieDetailData,
  MovieKind,
  SourceLite,
} from "@/lib/types";

const licenseSelect = {
  type: true,
  sourceName: true,
  sourceUrl: true,
  attribution: true,
  verified: true,
} satisfies Prisma.LicenseInfoSelect;

const categorySelect = {
  id: true,
  name: true,
  slug: true,
} satisfies Prisma.CategorySelect;

const sourceSelect = {
  id: true,
  label: true,
  provider: true,
  url: true,
  language: true,
  quality: true,
  isDefault: true,
  sortOrder: true,
} satisfies Prisma.VideoSourceSelect;

export const movieCardInclude = {
  categories: { select: categorySelect },
  license: { select: licenseSelect },
  sources: {
    select: { quality: true, isDefault: true, sortOrder: true },
    orderBy: { sortOrder: "asc" as const },
  },
  _count: { select: { episodes: true } },
} satisfies Prisma.MovieInclude;

export const movieDetailInclude = {
  categories: { select: categorySelect },
  license: { select: licenseSelect },
  sources: { orderBy: [{ sortOrder: "asc" as const }, { id: "asc" as const }] },
  episodes: {
    orderBy: [{ season: "asc" as const }, { number: "asc" as const }],
    include: {
      sources: {
        orderBy: [{ sortOrder: "asc" as const }, { id: "asc" as const }],
      },
    },
  },
  _count: { select: { episodes: true } },
} satisfies Prisma.MovieInclude;

export type MovieWithCard = Prisma.MovieGetPayload<{
  include: typeof movieCardInclude;
}>;

export type MovieWithDetail = Prisma.MovieGetPayload<{
  include: typeof movieDetailInclude;
}>;

function pickQuality(
  sources: Array<{ quality: string; isDefault: boolean }>,
): string {
  if (!sources.length) return "Arşiv";
  return (sources.find((source) => source.isDefault) ?? sources[0]).quality;
}

function toSource(source: {
  id: number;
  label: string;
  provider: string;
  url: string;
  language: string;
  quality: string;
  isDefault: boolean;
  sortOrder: number;
}): SourceLite {
  return { ...source };
}

export function toMovieCard(movie: MovieWithCard): MovieCardData {
  return {
    id: movie.id,
    slug: movie.slug,
    title: movie.title,
    originalTitle: movie.originalTitle,
    year: movie.year,
    runtime: movie.runtime,
    rating: movie.rating,
    posterUrl: movie.posterUrl,
    featured: movie.featured,
    kind: movie.kind as MovieKind,
    episodeCount: movie._count.episodes,
    categories: movie.categories as CategoryLite[],
    license: movie.license as LicenseLite | null,
    quality: pickQuality(movie.sources),
  };
}

export function toMovieDetail(movie: MovieWithDetail): MovieDetailData {
  return {
    ...toMovieCard(movie),
    overview: movie.overview,
    tagline: movie.tagline,
    backdropUrl: movie.backdropUrl,
    trailerUrl: movie.trailerUrl,
    voteCount: movie.voteCount,
    sources: movie.sources.map(toSource),
    episodes: movie.episodes.map<EpisodeData>((episode) => ({
      id: episode.id,
      season: episode.season,
      number: episode.number,
      title: episode.title,
      overview: episode.overview,
      runtime: episode.runtime,
      stillUrl: episode.stillUrl,
      sources: episode.sources.map(toSource),
    })),
  };
}

export async function getNavCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });
}

export async function getHomeMovies(): Promise<MovieCardData[]> {
  const movies = await prisma.movie.findMany({
    include: movieCardInclude,
    orderBy: [{ featured: "desc" }, { year: "asc" }, { title: "asc" }],
  });
  return movies.map(toMovieCard);
}

export async function getFeaturedMovies(): Promise<HeroMovieData[]> {
  const movies = await prisma.movie.findMany({
    where: { featured: true },
    include: {
      categories: { select: categorySelect },
      license: { select: licenseSelect },
      sources: { orderBy: { sortOrder: "asc" } },
      _count: { select: { episodes: true } },
    },
    orderBy: { rating: "desc" },
  });

  return movies.map((movie) => ({
    id: movie.id,
    slug: movie.slug,
    title: movie.title,
    originalTitle: movie.originalTitle,
    tagline: movie.tagline,
    overview: movie.overview,
    year: movie.year,
    runtime: movie.runtime,
    rating: movie.rating,
    posterUrl: movie.posterUrl,
    backdropUrl: movie.backdropUrl,
    categories: movie.categories,
    license: movie.license,
    quality: pickQuality(movie.sources),
    kind: movie.kind as MovieKind,
    sourceCount: movie._count.episodes || movie.sources.length,
    sourceName: movie.sources[0]?.label,
  }));
}

export async function getMovieBySlug(
  slug: string,
): Promise<MovieDetailData | null> {
  const movie = await prisma.movie.findUnique({
    where: { slug },
    include: movieDetailInclude,
  });
  return movie ? toMovieDetail(movie) : null;
}

export async function getSimilarMovies(
  movie: MovieDetailData,
  limit = 6,
): Promise<MovieCardData[]> {
  const categoryIds = movie.categories.map((category) => category.id);

  const movies = await prisma.movie.findMany({
    where: {
      id: { not: movie.id },
      ...(categoryIds.length
        ? { categories: { some: { id: { in: categoryIds } } } }
        : {}),
    },
    include: movieCardInclude,
    orderBy: [{ rating: "desc" }, { year: "asc" }],
    take: limit,
  });

  if (movies.length >= 3 || !categoryIds.length) return movies.map(toMovieCard);

  const fill = await prisma.movie.findMany({
    where: { id: { notIn: [movie.id, ...movies.map((m) => m.id)] } },
    include: movieCardInclude,
    orderBy: { rating: "desc" },
    take: limit - movies.length,
  });

  return [...movies, ...fill].map(toMovieCard);
}
