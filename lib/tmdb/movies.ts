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


export interface DiscoverMoviesParams {
    page?: number;
    genre?: number;
    year?: number;
    sortBy?: string;
}

export async function getDiscoveredMovies(params :DiscoverMoviesParams) {
    
    const searchParams = new URLSearchParams();

    if (params.page!== undefined) {
        searchParams.set("page", params.page.toString());
    }
    
    if (params.genre!== undefined) {
        searchParams.set("with_genres", params.genre.toString());
    }
    
    if (params.year!== undefined) {
        searchParams.set("primary_release_year", params.year.toString());
    }
    
    if (params.sortBy!== undefined) {
        searchParams.set("sort_by", params.sortBy);
    }

    const queryString = searchParams.toString();
    

    return tmdbFetch<MovieListResponse>(`/discover/movie${queryString ? `?${queryString}` : ""}`);
}