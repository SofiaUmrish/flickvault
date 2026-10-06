"use client"

import Image from "next/image";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {MovieDetails} from "@/lib/tmdb/types"
import { Play, Film, Star } from "lucide-react";

interface MovieDetailsHeroProps {
    movie: MovieDetails;
    backdropUrl: string | null;
    posterUrl: string | null;
    releaseYear: number | null;
    hasTrailer: boolean;
}


export default function MovieDetailsHero({ movie,
    backdropUrl,
    posterUrl,
    releaseYear,
    hasTrailer }: MovieDetailsHeroProps){


    return(
        <div className="relative w-full min-h-[70vh] flex items-center justify-center pt-24 pb-12 px-6 md:px-12">
    
        <div className="absolute inset-0 z-0">
            {backdropUrl ? (
                <Image
                    className="object-cover"
                    src={backdropUrl}
                    alt={movie.title}
                    fill
                    priority
                />
            ) : (
                <div className="w-full h-full bg-surface"></div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-10 items-center md:items-start z-10">

            <div className="w-3/5 sm:w-1/3 md:w-1/4 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-muted/30 transition-transform duration-300 hover:scale-105">
                {posterUrl ? (
                    <Image
                        className="w-full h-full object-cover aspect-[2/3]"
                        src={posterUrl}
                        alt={movie.title}
                        width={300}
                        height={450}
                    />
                ) : (
                    <div className="w-full aspect-[2/3] flex flex-col justify-center items-center text-muted bg-surface-hover">
                        <Film size={40} />
                        <p>No poster</p>
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col gap-6 justify-center items-center md:items-start text-center md:text-left mt-4 md:mt-0">

                <h1 className="text-4xl md:text-6xl font-black drop-shadow-xl">
                    {movie.title}
                </h1>

                {movie.tagline && (
                    <p className="text-xl text-muted italic font-medium">
                        "{movie.tagline}"
                    </p>
                )}

                <div className="flex flex-wrap justify-center md:justify-start gap-4">

                    <Badge>
                        <Star size={18} className="fill-current" />
                        {movie.vote_average.toFixed(1)}
                    </Badge>

                    {releaseYear && (
                        <Badge>
                            {releaseYear}
                        </Badge>
                    )}

                    {movie.runtime && movie.runtime > 0 && (
                        <Badge>
                            {movie.runtime} min
                        </Badge>
                    )}

                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {movie.genres.map(genre => (
                        <Badge
                            key={genre.id}
                            className="bg-transparent border-muted/30 text-foreground"
                        >
                            {genre.name}
                        </Badge>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 mt-2 justify-center md:justify-start">

                    <Button 
                        variant="primary" 
                        disabled={!hasTrailer}
                        onClick={() => {
                            document.getElementById("trailer")?.scrollIntoView({
                                behavior: "smooth",
                            });
                        }}
                    >
                        <Play fill="currentColor" size={20} />
                        Play Trailer
                    </Button>

                    <Button variant="secondary">
                        + Watchlist
                    </Button>

                </div>

            </div>
        </div>
    </div>
    )
}