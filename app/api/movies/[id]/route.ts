import { NextResponse } from "next/server";
import {getMovieById} from "@/lib/tmdb/movies"

export async function GET( request: Request, {params}: {params: Promise<{id: string}>}) {
    
    const { id } = await params;
    const movie = await getMovieById(id);
   
    return NextResponse.json(movie); 
}