import {Movie} from "@/lib/tmdb/types"
import Image from "next/image"
import {Film, Star, Heart} from "lucide-react"
import getTmdbImageUrl from "@/utils/tmdb-image"


export default function MovieCard({ movie }: {movie: Movie}){

    const posterUrl  =  getTmdbImageUrl(movie.poster_path, 500);
    const releaseYear = movie.release_date 
        ? new Date(movie.release_date).getFullYear()
        : null ;


    return(

        <article className="flex flex-col rounded-xl bg-surface border border-border transition-all duration-300 shadow-2xl hover:scale-105 hover:shadow-accent">
            <div className="group relative w-[200px] h-[300px] shrink-0 overflow-hidden rounded-t-xl">
                {posterUrl ? ( 
                    <Image 
                    className="w-full h-full object-cover"
                    src={posterUrl} 
                    alt={movie.title} 
                    width={200}
                    height={300}
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
                    aria-label="Add to watchlist"
                >
                    <Heart className="text-accent" size={50}/>
                </button>

            </div>

            <div className="my-3 w-[200px] flex-1 flex flex-col justify-between">
                <h3 className="font-semibold text-center px-4 min-h-[3rem] flex items-center justify-center">{movie.title}</h3>

                <div className="mt-2 border-t border-border pt-3 px-6 flex justify-between items-center text-sm font-semibold text-accent">
                    
                    <span className="flex gap-1 font-semibold items-center">
                        <Star size={20} />
                        {movie.vote_average.toFixed(1)}
                    </span>

                    {releaseYear && (
                        <span>
                            {releaseYear}
                        </span>)}
                </div>
            </div>


        </article>
    )
}