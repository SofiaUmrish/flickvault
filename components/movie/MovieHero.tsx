import {Movie} from "@/lib/tmdb/types"
import Image from "next/image"
import getTmdbImageUrl from "@/utils/tmdb-image"
import {Star} from "lucide-react"
import Button from "../ui/Button"
import Badge from "@/components/ui/Badge";
import Link from "next/link"


export default function MovieHero({ movie }: {movie: Movie}){

    const backdropUrl  =  getTmdbImageUrl(movie.backdrop_path, 1280);
    const releaseYear = movie.release_date 
        ? new Date(movie.release_date).getFullYear()
        : null ;

    
    return(

        <section className="h-full flex items-center">
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
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/60 to-background" />

                
                <div className="relative z-10 top-10 flex flex-col gap-6 p-5 max-w-5xl md:pl-15 md:gap-15">
                   <div className="flex flex-col gap-4 md:gap-7">
                        <h1 className="font-bold text-3xl md:text-5xl">{movie.title}</h1>
                        <div className="flex gap-8 font-semibold text-accent">
                            <Badge>
                                <Star size={20} />
                                {movie.vote_average.toFixed(1)}
                            </Badge>

                            {releaseYear && (
                                <Badge>
                                    {releaseYear}
                                </Badge>)
                            }
                        </div>
                    </div>
                    <p className="md:text-xl">{movie.overview}</p>

                    <div className="flex gap-10">

                        <Link
                            className="bg-accent text-surface rounded-3xl px-5 py-2 font-semibold md:font-bold md:px-10 md:py-3 flex items-center ring-2 ring-accent/50 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-accent/20"
                            href={`/movie/${movie.id}`}>
                                View details
                        </Link>
                        <Button variant="secondary">
                            + Watchlist
                        </Button>
                    </div>
                </div>
              
            
        </section>
    )

}
