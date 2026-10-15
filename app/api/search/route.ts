
import { NextResponse, NextRequest } from "next/server";
import {getMoviesByQuery} from "@/lib/tmdb/movies"

export async function GET(request: NextRequest) {

    const query = request.nextUrl.searchParams.get("query");

    const pageParam = request.nextUrl.searchParams.get("page");

    const page = pageParam === null ? 1 : Number(pageParam);

    
        try{

            if(query!==null && query.trim()!=="" && page > 0 && Number.isInteger(page)){
                const movies = await getMoviesByQuery(query, page);
                return NextResponse.json(movies)
            }

        }catch(error){

            return NextResponse.json(
                { error: "Something went wrong during search" },
                { status: 500 }
            )
        }
        

    return NextResponse.json(
        { error: "Invalid query" },
        { status: 400 }
    );
}