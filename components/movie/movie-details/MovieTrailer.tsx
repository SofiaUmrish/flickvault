
import {MovieVideo} from "@/lib/tmdb/types"

interface MovieTrailerProps {
    trailer: MovieVideo
}
export default function MovieTrailer({ trailer }: MovieTrailerProps){


    return(
        trailer && (
            <section 
                id="trailer" 
                className="bg-surface/50 border border-border rounded-3xl p-6 md:p-8">

                <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-accent rounded-full shadow-[0_0_15px] shadow-accent/70"></span>
                    Official Trailer
                </h2>

                <div className="w-full rounded-2xl overflow-hidden border border-border/50 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_20px] hover:shadow-accent/50">

                    <iframe
                        className="w-full aspect-video"
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title={trailer.name}
                        allowFullScreen
                        allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe>

                </div>

            </section>
        )
    )
}