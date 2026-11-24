export type CategoryLite = {
  id: number;
  name: string;
  slug: string;
};

export type LicenseLite = {
  type: string;
  sourceName: string;
  sourceUrl: string | null;
  attribution: string | null;
  verified: boolean;
};

export type SourceLite = {
  id: number;
  label: string;
  provider: string;
  url: string;
  language: string;
  quality: string;
  isDefault: boolean;
  sortOrder: number;
};

export type MovieKind = "FILM" | "SERIES";

export type MovieCardData = {
  id: number;
  slug: string;
  title: string;
  originalTitle: string | null;
  year: number;
  runtime: number | null;
  rating: number | null;
  posterUrl: string;
  featured: boolean;
  kind: MovieKind;
  episodeCount: number;
  categories: CategoryLite[];
  license: LicenseLite | null;
  quality: string;
};

export type EpisodeData = {
  id: number;
  season: number;
  number: number;
  title: string;
  overview: string | null;
  runtime: number | null;
  stillUrl: string | null;
  sources: SourceLite[];
};

export type MovieDetailData = MovieCardData & {
  overview: string;
  tagline: string | null;
  backdropUrl: string | null;
  trailerUrl: string | null;
  voteCount: number | null;
  sources: SourceLite[];
  episodes: EpisodeData[];
};

export type HeroMovieData = Pick<
  MovieDetailData,
  | "id"
  | "slug"
  | "title"
  | "originalTitle"
  | "tagline"
  | "overview"
  | "year"
  | "runtime"
  | "rating"
  | "posterUrl"
  | "backdropUrl"
  | "categories"
  | "license"
  | "quality"
  | "kind"
> & {
  sourceCount: number;
  sourceName?: string;
};
