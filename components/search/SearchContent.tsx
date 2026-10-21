"use client";

import useDebounce from "@/hooks/useDebounce";
import { Search, SearchX, AlertCircle } from "lucide-react";
import { useState } from "react";
import MovieGrid from "@/components/movie/MovieGrid";
import { useQuery } from "@tanstack/react-query";

export default function SearchContent() {
  
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);

    const { data, isLoading, error } = useQuery({
        queryKey: ["search", debouncedQuery],
        queryFn: async () => {
        const res = await fetch(
            `/api/search?query=${encodeURIComponent(debouncedQuery)}&page=1`
        );

        if (!res.ok) {
            throw new Error("Failed to fetch movies");
        }

        return res.json();
        },
        enabled: Boolean(debouncedQuery.trim()),
    });

    const movies = data?.results ?? [];
    const isWaitingForDebounce = query.trim() !== debouncedQuery.trim();
    const isSearching = isWaitingForDebounce || isLoading;

  return (

    <section className="mx-auto min-h-[70vh] w-full max-w-7xl px-5 py-10 md:px-10 md:py-14">
       
        <div className="mb-10 flex flex-col gap-5 border-b border-border pb-6 md:flex-row md:items-center md:gap-8">
            <div className="flex shrink-0 items-center gap-3">
                <Search size={28} className="text-accent" />

                <h1 className="text-2xl font-bold uppercase tracking-widest md:text-3xl">
                    Search
                </h1>
            </div>

            <input
                className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                type="text"
                placeholder="Search movies by title..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search movies by title"
            />
        </div>

        {!query.trim() ? (

            <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-border bg-surface/50 px-6 py-12 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <Search size={32} className="text-accent" />
                </div>

                <h2 className="text-xl font-bold">Find your next favorite movie</h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                    Enter a movie title above to discover movies you might love.
                </p>
            </div>

        ) : isSearching ? (
            <div className="flex min-h-[35vh] flex-col items-center justify-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-accent"></div>
                <p className="text-sm text-muted">Searching for movies...</p>
            </div>

        ) : error ? (
            <div className="flex min-h-[35vh] flex-col items-center justify-center rounded-2xl border border-border bg-surface/50 px-6 py-12 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <AlertCircle size={32} className="text-accent" />
                </div>

                <h2 className="text-xl font-bold">Something went wrong</h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                    We couldn&apos;t load the search results. Please try again.
                </p>
            </div>

        ) : movies.length > 0 ? (

            <div>
                <p className="mb-6 text-sm text-muted">
                    Search results for{" "}
                    <span className="font-semibold text-foreground">
                    &quot;{debouncedQuery}&quot;
                    </span>
                </p>

                <MovieGrid movies={movies} />
            </div>

        ) : (
            <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-border bg-surface/50 px-6 py-12 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <SearchX size={32} className="text-accent" />
                </div>

                <h2 className="text-xl font-bold">No movies found</h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                    We couldn&apos;t find any movies matching &quot;{debouncedQuery}
                    &quot;. Try a different title.
                </p>
            </div>
        )}

    </section>
  );
}