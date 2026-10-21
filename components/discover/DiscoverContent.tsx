"use client";

import DiscoverFilters from "./DiscoverFilters";
import MoviesGrid from "../movie/MovieGrid";
import { Compass } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import type { MovieListResponse } from "@/lib/tmdb/types";
import Button from "@/components/ui/Button";

export default function DiscoverContent() {
    const searchParams = useSearchParams();

    const genre = searchParams.get("genre") ?? "";
    const year = searchParams.get("year") ?? "";
    const sortBy = searchParams.get("sortBy") ?? "popularity.desc";

    const {
        data,
        isLoading,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["discovered-movies", genre, year, sortBy],
        initialPageParam: 1,
        queryFn: async ({ pageParam }): Promise<MovieListResponse> => {
            const params = new URLSearchParams({
                page: String(pageParam),
                sortBy,
            });

            if (genre) params.set("genre", genre);
            if (year) params.set("year", year);
            
            const response = await fetch(`/api/discover?${params.toString()}`);

            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }

            return response.json();
        },
        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.total_pages
                ? lastPage.page + 1
                : undefined,
    });

    const movies = Array.from(
        new Map(
            (data?.pages.flatMap((page) => page.results) ?? []).map(
                (movie) => [movie.id, movie]
            )
        ).values()
    );
    const totalResults = data?.pages[0]?.total_results ?? 0;

    return (
        <section className="mx-auto min-h-[70vh] w-full max-w-7xl px-5 py-10 md:px-10 md:py-14">
            <div className="mb-10 flex shrink-0 items-center gap-3 border-b border-border pb-6">
                <Compass size={28} className="text-accent" />
                <h1 className="text-2xl font-bold uppercase tracking-widest md:text-3xl">
                    Discover Movies
                </h1>
            </div>

            <DiscoverFilters />

            <div className="mt-10">
                {isLoading ? (
                    <p className="animate-pulse py-10 text-center text-sm text-muted">
                        Discovering movies...
                    </p>
                ) : isError ? (
                    <div className="flex flex-col items-center gap-3 py-10 text-center">
                        <p className="text-sm text-red-400">
                            Failed to load movies. Please try again.
                        </p>
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="text-sm font-semibold text-accent transition-colors hover:brightness-125"
                        >
                            Try again
                        </button>
                    </div>
                ) : movies.length > 0 ? (
                    <>
                        <div className="mb-6 flex items-center justify-between gap-3">
                            <h2 className="text-sm font-semibold text-foreground">
                                Explore results
                            </h2>
                            <span className="text-xs text-muted">
                                {totalResults.toLocaleString()} movies
                            </span>
                        </div>

                        <MoviesGrid movies={movies} />

                        {hasNextPage && (
                            <div className="mt-10 flex justify-center">
                                <Button
                                    variant="primary"
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                >
                                    {isFetchingNextPage ? "Loading..." : "Load More"}
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-3 py-16 text-center">
                        <Compass size={36} className="text-muted" />
                        <h2 className="text-lg font-semibold text-foreground">
                            No movies found
                        </h2>
                        <p className="max-w-sm text-sm text-muted">
                            Try changing your filters to discover more movies.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}