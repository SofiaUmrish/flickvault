import tmdbFetch from "@/lib/tmdb/client"
import {MovieListResponse} from "@/lib/tmdb/types"

export async function getPopularMovies(){

    return tmdbFetch<MovieListResponse>("/movie/popular");
}