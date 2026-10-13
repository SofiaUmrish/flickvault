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
            <div className="group relative w-[250px] h-[350px] shrink-0 overflow-hidden rounded-t-xl">
                {posterUrl ? ( 
                    <Image 
                    className="w-full h-full object-cover"
                    src={posterUrl} 
                    alt={movie.title} 
                    width={250}
                    height={350}
                    />
                ):(
                    <div>
                        <Film size={25} />
                        <p>No poster</p>
                    </div>
                )}

                <div 
                    className="absolute inset-0 transition-colors group-hover:bg-background/60">
                </div>

                <button
                    className="absolute flex items-center justify-center inset-0 transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
                    aria-label= {isInWatchlist(movie.id) ? "Remove from watchlist": "Add to watchlist" }
                    onClick={()=>toggleMovie(movie)}
                >
                    <Heart 
                        className={isInWatchlist(movie.id) ? "text-accent fill-accent" : "text-accent"}
                        size={50}
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