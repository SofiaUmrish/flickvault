"use client"
import {Movie} from "@/lib/tmdb/types"
import Image from "next/image"
import {Film, Star, Heart} from "lucide-react"
import getTmdbImageUrl from "@/utils/tmdb-image"
import Link from "next/link"

import {useWatchlistStore} from "@/store/watchlist"


export default function MovieCard({ movie }: {movie: Movie}){

    const posterUrl  =  getTmdbImageUrl(movie.poster_path, 500);
    const releaseYear = movie.release_date 
        ? new Date(movie.release_date).getFullYear()
        : null ;

    const {toggleMovie, isInWatchlist} = useWatchlistStore();


    return(

        <article className="flex flex-col rounded-xl bg-surface border border-border transition-all duration-300 hover:scale-105 hover:shadow-accent/70 hover:shadow-[0px_0px_30px]">
            <div className="group relative h-[350px] w-[250px] shrink-0 overflow-hidden rounded-t-xl border-b border-border">
                {posterUrl ? (
                    <Image
                        src={posterUrl}
                        alt={movie.title}
                        fill
                        sizes="250px"
                        className="object-cover"
                    />
                ):(
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-background to-surface">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/20 bg-accent/10">
                            <Film
                                size={30}
                                strokeWidth={1.3}
                                className="text-accent/80"
                            />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground/70">
                                No poster
                            </p>

                            <span className="h-0.5 w-8 rounded-full bg-accent/70" />
                        </div>
                    </div>
                )}

                <button
                    type="button"
                    className="
                        absolute top-2 right-2 z-20
                        flex items-center justify-center 
                        w-10 h-10 rounded-full 
                        bg-background/70 backdrop-blur-md border border-border/50
                        transition-all duration-300
                        hover:scale-110 hover:bg-background hover:border-accent
                        opacity-100 lg:opacity-0 lg:group-hover:opacity-100
                    "
                    aria-label={isInWatchlist(movie.id) ? "Remove from watchlist" : "Add to watchlist"}
                    onClick={(e) => {
                        e.preventDefault();
                        toggleMovie(movie);
                    }}
                >
                    <Heart 
                        size={20} 
                        className={`transition-colors ${
                            isInWatchlist(movie.id) 
                                ? "text-accent fill-accent" 
                                : "text-foreground hover:text-accent"
                        }`}
                    />
                </button>
            </div>

            <div className="my-4 w-[250px] flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-md text-center px-4 min-h-[4rem] flex items-center justify-center">{movie.title}</h3>

                <div className="mt-3 border-t border-border pt-5 px-6 flex justify-center gap-10 items-center text-md font-semibold text-accent">
                    
                    <span className="flex gap-1 font-semibold items-center">
                        <Star size={20} />
                        {movie.vote_average.toFixed(1)}
                    </span>

                    {releaseYear && (
                        <span>
                            {releaseYear}
                        </span>)
                    }

                    
                </div>
                <Link
                    href={`/movie/${movie.id}`}
                    className="inline-flex items-center justify-center gap-1 rounded-full text-md font-semibold text-accent ring ring-accent py-1 mx-6 mt-4 transition-all duration-300 hover:scale-105"
                >
                    Details ↗
                </Link>
                    
            </div>


        </article>
    )
}