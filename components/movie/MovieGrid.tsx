import MovieCard from "@/components/movie/MovieCard"
import {Movie} from "@/lib/tmdb/types"

export default function MovieGrid({ movies }: {movies: Movie[]}){
    return(

        <div className="grid grid-cols-2 gap-y-10 gap-x-5 md:grid-cols-3 lg:grid-cols-5 justify-items-center">
              
            {movies.map(movie=>
                 <MovieCard key={movie.id} movie={movie} />
            )}
            
        </div>
    )

}
