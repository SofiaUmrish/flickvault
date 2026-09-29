import {Movie} from "@/lib/tmdb/types"
import Image from "next/image"
import getTmdbImageUrl from "@/utils/tmdb-image"
import {Star} from "lucide-react"
import Button from "../ui/Button"


export default function MovieHero({ movie }: {movie: Movie}){

    const backdropUrl  =  getTmdbImageUrl(movie.backdrop_path, 1280);
    const releaseYear = movie.release_date 
        ? new Date(movie.release_date).getFullYear()
        : null ;

    
    return(

        <div className="relative h-[400px] md:h-[600px] flex items-center ">
           {backdropUrl ? ( 
                    <Image 
                    className="absolute inset-0 w-full h-full object-cover"
                    src={backdropUrl} 
                    alt={movie.title} 
                    fill
                    />
                ):(
                    <div className="absolute inset-0 w-full h-full object-cover bg-muted/60">
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />

                
                <div className="relative z-10 flex flex-col gap-6 p-5 max-w-5xl md:pl-15 md:gap-15">
                   <div className="flex flex-col gap-4 md:gap-7">
                        <h1 className="font-bold text-3xl md:text-5xl">{movie.title}</h1>
                        <div className="flex gap-8 font-semibold text-accent">
                            <span className="flex gap-2 font-semibold rounded-2xl bg-muted/20 px-3 py-1 items-center">

                                <Star size={20} />
                                {movie.vote_average.toFixed(1)}
                            </span>

                            {releaseYear && (
                                <span className="rounded-2xl bg-muted/20 px-3 py-1">
                                    {releaseYear}
                            </span>)}
                        </div>
                    </div>
                    <p className="md:text-xl">{movie.overview}</p>

                    <div className="flex gap-10">

                         <Button variant="primary">
                            View details
                        </Button>
                        <Button variant="secondary">
                            + Watchlist
                        </Button>
                    </div>
                </div>
              
            
        </div>
    )

}
