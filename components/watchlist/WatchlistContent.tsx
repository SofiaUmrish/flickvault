"use client";

import {useWatchlistStore} from "@/store/watchlist"
import MovieGrid from "@/components/movie/MovieGrid"
import { Heart, Film } from "lucide-react";
import Link from "next/link";

export default function WatchlistContent() {

    const{movies, hasHydrated} = useWatchlistStore();


    return (
        <section className="mx-auto min-h-[70vh] w-full max-w-7xl px-5 py-10 md:px-10 md:py-14">
            <div className="mb-10 flex gap-3 border-b border-border pb-6">
                <Heart size={28} className="text-accent" />
        
                <div>
                <h1 className="text-2xl font-bold uppercase tracking-widest md:text-3xl">
                    My Watchlist
                </h1>
                <p className="mt-1 text-sm text-muted">
                    {movies.length} {movies.length === 1 ? "movie" : "movies"} saved
                </p>
                </div>
            </div>
    
          {!hasHydrated ? (
            <div className="flex min-h-[35vh] flex-col items-center justify-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-accent" />
              <p className="text-sm text-muted">
                Restoring your watchlist...
              </p>
            </div>
          ) : movies.length > 0 ? (
            <MovieGrid movies={movies} />
          ) : (
            <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-border bg-surface/50 px-6 py-12 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <Film size={32} className="text-accent" />
              </div>
    
              <h2 className="text-xl font-bold">
                Your watchlist is empty
              </h2>
    
              <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                Save movies that catch your eye and keep them all in one place.
              </p>
    
              <Link
                href="/"
                className="mt-7 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-surface shadow-lg shadow-accent/10 transition-all duration-300 hover:scale-105 hover:shadow-accent/25"
              >
                <Film size={18} />
                Explore movies
              </Link>
            </div>
          )}
        </section>
      );
    }