import tmdbFetch from "@/lib/tmdb/client"
import { MovieListResponse, MovieDetails } from "@/lib/tmdb/types"

export async function getPopularMovies(){

    return tmdbFetch<MovieListResponse>("/movie/popular");
}

export async function getMovieById(id: string) {
    return tmdbFetch<MovieDetails>(`/movie/${id}?append_to_response=videos`);
}

export async function getMoviesByQuery(query: string, page = 1) {
    
    const encodedQuery  = encodeURIComponent(query);

    return tmdbFetch<MovieListResponse>(`/search/movie?query=${encodedQuery}&page=${page}`);
}

