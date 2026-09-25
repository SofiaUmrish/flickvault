"use client";

import { useState } from "react";
import {Movie, MovieListResponse} from "@/lib/tmdb/types"

export default function Home() {

  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async () => {

    try {

      const response = await fetch("/api/movies/popular");

      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: MovieListResponse = await response.json();
      setMovies(data.results);

    } catch (error) {

      console.error("Failed to load movies:", error);

    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <button className="text-accent" onClick={fetchMovies}>Get movies</button>
       
        {movies.map((movie)=>{
              return <p className="text-white" key={movie.id}>
              {movie.title}
            </p>
          })}
         
          
        </div>
    </div>
  );
}
