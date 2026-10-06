
interface MovieAboutProps {
    overview: string;
}

export default function MovieAbout({ overview }: MovieAboutProps){


    return(
        <section className="bg-surface/50 border border-border rounded-3xl p-6 md:p-8">
            
            <h2 className="text-xl font-bold uppercase tracking-widest mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-accent rounded-full shadow-[0_0_15px] shadow-accent/70"></span>
                About the Movie
            </h2>

            <p className="text-lg text-muted leading-relaxed">
                {overview || "No overview available."}
            </p>

        </section>

    )
}