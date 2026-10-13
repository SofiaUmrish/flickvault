import MovieCard from "@/components/movie/MovieCard"
import {Movie} from "@/lib/tmdb/types"

export default function MovieGrid({ movies }: {movies: Movie[]}){
    return(

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center max-w-7xl mx-auto">
              
            {movies.map(movie=>
                 <MovieCard key={movie.id} movie={movie} />
            )}
            
        </div>
    )

}
