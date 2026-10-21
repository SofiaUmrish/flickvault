
import { NextResponse, NextRequest } from "next/server";
import {getDiscoveredMovies, type DiscoverMoviesParams} from "@/lib/tmdb/movies"

const ALLOWED_SORT_OPTIONS = [
    "popularity.desc",
    "vote_average.desc",
    "primary_release_date.desc",
    "revenue.desc",
] as const;

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams;

    const pageParam = searchParams.get("page");
    const genreParam = searchParams.get("genre");
    const yearParam = searchParams.get("year");
    const sortByParam = searchParams.get("sortBy");

    let page = 1;
    if (pageParam !== null) {
        const parsedPage = Number(pageParam);
        if (!Number.isInteger(parsedPage) || parsedPage < 1) {
            return NextResponse.json(
                { error: "Invalid page parameter. Must be an integer >= 1." },
                { status: 400 }
            );
        }
        page = parsedPage;
    }

    if (sortByParam !== null) {

        const isValidSort = ALLOWED_SORT_OPTIONS.some(
            (option) => option === sortByParam
          );
        
        if (!isValidSort) {
            return NextResponse.json(
                { error: "Invalid sortBy parameter." },
                { status: 400 }
            );
        }
    }

    let genre: number | undefined = undefined;
    if (genreParam !== null) {

        const parsedGenre = Number(genreParam);

        if (!Number.isInteger(parsedGenre) || parsedGenre < 1) {
            return NextResponse.json(
                { error: "Invalid genre parameter. Must be a positive integer." },
                { status: 400 }
            );
        }

        genre = parsedGenre;
    }

    let year: number | undefined = undefined;
    if (yearParam !== null) {

        const parsedYear = Number(yearParam);
        const currentYear =new Date().getFullYear();

        if (!Number.isInteger(parsedYear) || parsedYear < 1888 || parsedYear > currentYear) {
            return NextResponse.json(
                { error: "Invalid year parameter." },
                { status: 400 }
            );
        }
        
        year = parsedYear;
    }


    const params: DiscoverMoviesParams = {
        page,
        genre,
        year,
        sortBy: sortByParam || undefined,
    };

    try{

        const movies = await getDiscoveredMovies(params);
        return NextResponse.json(movies)
            

    }catch{

        return NextResponse.json(
            { error: "Failed to fetch discovered movies" },
            { status: 500 }
        )
    }
        
}