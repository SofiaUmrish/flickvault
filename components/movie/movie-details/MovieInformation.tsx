import {MovieDetails} from "@/lib/tmdb/types"

interface MovieInformationProps {
    movie: MovieDetails;
    formattedReleaseDate: string;
    originalLanguage: string;
    productionCountries: string;
    productionCompanies: string;
}

export default function MovieInformation({ movie,
    formattedReleaseDate,
    originalLanguage,
    productionCountries,
    productionCompanies }: MovieInformationProps){


    return(
        <section className="bg-surface/50 border border-border rounded-3xl p-6 md:p-8 lg:sticky lg:top-24">
    
        <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-accent rounded-full shadow-[0_0_15px] shadow-accent/70"></span>
            Movie Information
        </h2>

        <div className="flex flex-col gap-5">

            <div className="flex flex-col gap-1">
                <span className="text-sm text-accent font-semibold uppercase tracking-wider">
                    Original Title
                </span>
                <span className="font-medium">
                    {movie.original_title || "—"}
                </span>
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-sm text-accent font-semibold uppercase tracking-wider">
                    Release Date
                </span>
                <span className="font-medium">
                    {formattedReleaseDate}
                </span>
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-sm text-accent font-semibold uppercase tracking-wider">
                    Runtime
                </span>
                <span className="font-medium">
                    {movie.runtime ? `${movie.runtime} min` : "—"}
                </span>
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-sm text-accent font-semibold uppercase tracking-wider">
                    Status
                </span>
                <span className="font-medium">
                    {movie.status || "—"}
                </span>
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-sm text-accent font-semibold uppercase tracking-wider">
                    Original Language
                </span>
                <span className="font-medium">
                    {originalLanguage || "—"}
                </span>
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-sm text-accent font-semibold uppercase tracking-wider">
                    Production Countries
                </span>
                <span className="font-medium leading-snug">
                    {productionCountries || "—"}
                </span>
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-sm text-accent font-semibold uppercase tracking-wider">
                    Production
                </span>
                <span className="font-medium leading-snug">
                    {productionCompanies || "—"}
                </span>
            </div>

        </div>

        {movie.imdb_id && (
            <a
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex justify-center items-center w-full py-3 rounded-xl border border-border hover:border-accent hover:text-accent transition-color duration-300 font-bold"
            >
                View on IMDb ↗
            </a>
        )}

    </section>

    )
}