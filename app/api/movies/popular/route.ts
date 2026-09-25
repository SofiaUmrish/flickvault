import { NextResponse } from "next/server";
import {getPopularMovies} from "@/lib/tmdb/movies"

export async function GET() {
    const popularMovies = await getPopularMovies();
    return NextResponse.json(popularMovies);
    
}