import {Movie} from "@/lib/tmdb/types" 
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface WatchlistState {
    movies: Movie[];
    hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
    addMovie: (movie: Movie) => void;
    removeMovie: (id: number) => void;
    toggleMovie: (movie: Movie) => void;
    isInWatchlist: (id: number) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
    persist(
       
        (set, get)=>({

            movies: [],
            hasHydrated: false,

            addMovie: (newMovie) => {

                if (get().isInWatchlist(newMovie.id)) return;

                set((state) => ({
                    movies: [...state.movies, newMovie],
                }));

            },
            
            removeMovie: (id) => {

                set((state) => ({

                    movies: state.movies.filter((movie)=>movie.id!==id)

                }));
                
            },
            
            toggleMovie: (newMovie) => {

                get().isInWatchlist(newMovie.id) ?  get().removeMovie(newMovie.id) : get().addMovie(newMovie)
            
            },
            
            isInWatchlist: (id) => {

                return get().movies.some((movie) => movie.id === id)
            },
            
            setHasHydrated: (hasHydrated) => {
                set({ hasHydrated });
            }

        }),
        
        {
            name: 'watchlist-storage',
            
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
