
import MovieGrid from "@/components/movie/MovieGrid"
import MovieHero from "@/components/movie/MovieHero"
import {getPopularMovies} from "@/lib/tmdb/movies"


export default async function Home() {
  const popularMovies = await getPopularMovies();
  const movies = popularMovies.results;

  return (
    <div className="w-full">
      
      <MovieHero movie={movies[0]}/>

        <div className=" w-full max-w-7xl mx-auto flex flex-1 justify-center px-10 py-6">
          <section className="w-full">
            <h2 className="text-center lg:text-left text-foreground font-bold text-2xl border-b border-border pb-1 mb-8">POPULAR MOVIES</h2>
            <MovieGrid movies={movies} />
          </section>
        </div>
      </div>
  );
}
