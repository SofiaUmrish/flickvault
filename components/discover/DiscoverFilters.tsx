
"use client";

import type { Genre, GenreListResponse } from "@/lib/tmdb/types";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const SORT_OPTIONS = [
    { value: "popularity.desc", label: "Most popular" },
    { value: "vote_average.desc", label: "Highest rated" },
    { value: "primary_release_date.desc", label: "Newest releases" },
    { value: "revenue.desc", label: "Highest revenue" },
];

const FIRST_RELEASE_YEAR = 1888;

export default function DiscoverFilters() {
    async function fetchGenres(): Promise<Genre[]> {
        const response = await fetch("/api/genres");

        if (!response.ok) {
            throw new Error("Failed to fetch genres");
        }

        const data: GenreListResponse = await response.json();
        return data.genres;
    }

    const {
        data: genres,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["genres"],
        queryFn: fetchGenres,
    });

    
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedGenre = searchParams.get("genre") ?? "";
    const selectedYear = searchParams.get("year") ?? "";
    const selectedSortBy = searchParams.get("sortBy") ?? "popularity.desc";
    
    return (
        <section className="mb-10 space-y-7">

            <div className="space-y-5">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                        Genre
                    </h2>

                    <span className="text-xs text-muted">
                        {genres?.length ?? 0} genres
                    </span>
                </div>

                {isLoading ? (
                    <p className="animate-pulse py-3 text-sm text-muted">
                        Loading genres...
                    </p>
                ) : isError ? (
                    <div className="flex flex-wrap items-center gap-3 py-2">
                        <p className="text-sm text-red-400">
                            Failed to load genres.
                        </p>

                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="text-sm font-semibold text-accent transition-colors hover:brightness-125"
                        >
                            Try again
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-2">
                       
                        <button
                            type="button"
                            onClick={() => {
                                
                                const params = new URLSearchParams(searchParams.toString());
                                params.delete("genre");
                            
                                const query = params.toString();
                                router.push(query ? `/discover?${query}` : "/discover");

                            }}
                            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                selectedGenre === ""
                                    ? "border-accent bg-accent text-surface shadow-[0_0_12px] shadow-accent/20"
                                    : "border-border bg-surface text-muted hover:border-accent/60 hover:text-foreground"
                            }`}
                        >
                            All genres
                        </button>

                        {genres?.map((genre) => (
                            <button
                                key={genre.id}
                                type="button"
                                onClick={() => {

                                    const params = new URLSearchParams(searchParams.toString());
                                    params.set("genre", String(genre.id));
                                    
                                    router.push(`/discover?${params.toString()}`);
                                }}
                                aria-pressed={selectedGenre === String(genre.id)}
                                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                    selectedGenre === String(genre.id)
                                        ? "border-accent bg-accent text-surface shadow-[0_0_12px] shadow-accent/20"
                                        : "border-border bg-surface text-muted hover:border-accent/60 hover:text-foreground"
                                }`}
                            >
                                {genre.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="space-y-2">
                    <label
                        htmlFor="release-year"
                        className="block text-xs font-bold uppercase tracking-[0.2em] text-foreground"
                    
                    >
                        Release year
                    </label>

                    <div className="relative">
                        <select
                            id="release-year"
                            value={selectedYear}
                            onChange={(event) => {
                                const CurrentYear = event.target.value;
                                const params = new URLSearchParams(searchParams.toString());

                                if (CurrentYear) {
                                    params.set("year", CurrentYear);
                                } else {
                                    params.delete("year");
                                }
                                
                                router.push(`/discover?${params.toString()}`);

                            }}
                            className="w-full appearance-none rounded-xl border border-border bg-surface px-4 py-3 pr-10 text-sm text-foreground outline-none transition-colors hover:border-accent/50 focus:border-accent focus:ring-1 focus:ring-accent"
                        >
                            <option value="">Any year</option>

                            {Array.from(
                                { length: new Date().getFullYear() - FIRST_RELEASE_YEAR + 1 },
                                (_, index) => new Date().getFullYear() - index
                            ).map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>

                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="sort-by"
                        className="block text-xs font-bold uppercase tracking-[0.2em] text-foreground"
                    >
                        Sort by
                    </label>

                    <div className="relative">
                        <SlidersHorizontal
                            size={16}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-accent"
                        />

                        <select
                            id="sort-by"
                            value={selectedSortBy}
                            onChange={(event) => {

                                const currentSortBy = event.target.value;
                                const params = new URLSearchParams(searchParams.toString());

                                params.set("sortBy", currentSortBy);
                               
                                router.push(`/discover?${params.toString()}`);
                            }}
                            className="w-full appearance-none rounded-xl border border-border bg-surface py-3 pl-10 pr-10 text-sm text-foreground outline-none transition-colors hover:border-accent/50 focus:border-accent focus:ring-1 focus:ring-accent"
                        >
                            {SORT_OPTIONS.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
