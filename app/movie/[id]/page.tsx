import { getMovieById } from "@/lib/tmdb/movies";
import getTmdbImageUrl from "@/utils/tmdb-image";

import MovieDetailsHero from "@/components/movie/movie-details/MovieDetailsHero";
import MovieAbout from "@/components/movie/movie-details/MovieAbout";
import MovieTrailer from "@/components/movie/movie-details/MovieTrailer";
import MovieInformation from "@/components/movie/movie-details/MovieInformation";


export default async function MovieDetailsPage(
    {params}: {params: Promise<{id:string}>}
) {

    const {id} = await params;
    const movie = await getMovieById(id);

    const backdropUrl = getTmdbImageUrl(movie.backdrop_path, 1280);
    const posterUrl = getTmdbImageUrl(movie.poster_path, 500);

    const originalLanguage = movie.spoken_languages
    .map(language => language.english_name)
    .join(", ");

    const productionCompanies = movie.production_companies
        .map(company => company.name)
        .join(", ");

    const productionCountries = movie.production_countries
        .map(country => country.name)
        .join(", ");

    const formattedReleaseDate = movie.release_date
        ? new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(new Date(movie.release_date))
        : "—";
        

    const trailer = movie.videos.results.find(video =>
        video.type==="Trailer"&&
        video.site === "YouTube"&&
        video.official)

    const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear()
    : null ;


    return (
        <div className="w-full min-h-screen bg-background pb-20">
    
            <MovieDetailsHero
                    movie={movie}
                    backdropUrl={backdropUrl}
                    posterUrl={posterUrl}
                    releaseYear={releaseYear}
                    hasTrailer={trailer!==undefined}
            />

            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-20">
    
                <div className="lg:col-span-2 flex flex-col gap-8">
    
                    <MovieAbout overview={movie.overview} />
    
                    {trailer && (
                        <MovieTrailer trailer={trailer} />
                    )}
    
                </div>
    
                <div className="lg:col-span-1">
    
                    <MovieInformation
                        movie={movie}
                        formattedReleaseDate={formattedReleaseDate}
                        originalLanguage={originalLanguage}
                        productionCountries={productionCountries}
                        productionCompanies={productionCompanies}
                    />
    
                </div>
    
            </div>
    
        </div>
    );
    
}