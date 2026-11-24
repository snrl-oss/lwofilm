import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").trim();

  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const movies = await prisma.movie.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { originalTitle: { contains: query } },
        { categories: { some: { name: { contains: query } } } },
      ],
    },
    select: {
      slug: true,
      title: true,
      year: true,
      posterUrl: true,
      rating: true,
      license: { select: { type: true } },
    },
    orderBy: [{ rating: "desc" }, { year: "asc" }],
    take: 7,
  });

  return NextResponse.json({
    results: movies.map((movie) => ({
      slug: movie.slug,
      title: movie.title,
      year: movie.year,
      posterUrl: movie.posterUrl,
      rating: movie.rating,
      licenseType: movie.license?.type ?? null,
    })),
  });
}
