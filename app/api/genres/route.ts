
import { NextResponse } from "next/server";
import {getMovieGenres} from "@/lib/tmdb/genres"

export async function GET() {

    try {

        const genres = await getMovieGenres();
        return NextResponse.json(genres);

    } catch {

        return NextResponse.json(
          
            { error: "Failed to fetch movie genres" },
            { status: 500 }

        );
    }
            
}