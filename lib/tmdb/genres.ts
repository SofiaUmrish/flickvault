import tmdbFetch from "@/lib/tmdb/client"
import { GenreListResponse } from "@/lib/tmdb/types"



export async function getMovieGenres() {

    return tmdbFetch<GenreListResponse>(`/genre/movie/list`);
}