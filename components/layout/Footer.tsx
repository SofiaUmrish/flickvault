
import Link from "next/link";
import { Film } from "lucide-react";
import NavLink from "@/components/layout/NavLink";

export default function Footer(){
    return(
        <footer className="w-full bg-surface border-t border-border py-4 md:py-5">
           
            <div className="flex flex-col gap-6 md:flex-row md:justify-evenly">

                <div className="flex flex-col items-center gap-3">
                    <Link href="/" className="flex flex-row items-center text-foreground transition-colors duration-200 hover:text-accent">
                        <Film size={28} className="text-accent"/>
                        <span className="text-foreground font-semibold text-xl tracking-tighter">FLICKVAULT</span>
                    </Link>
                    <p className="text-muted text-center">Discover your next <br/>favorite movie.</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-foreground font-semibold text-xl tracking-tighter">EXPLORE</p>

                        <NavLink 
                           href="/"
                        >
                            Home
                        </NavLink>

                        <NavLink 
                           href="/discover"
                        >
                            Discover
                        </NavLink>

                        <NavLink 
                            href="/search" 
                        >
                            Search
                        </NavLink>

                        <NavLink 
                            href="/watchlist" 
                        >
                            Watchlist
                        </NavLink>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-foreground font-semibold text-xl tracking-tighter">INFORMATION</p>

                    <a 
                        href="https://www.themoviedb.org/" 
                        target="_blank"
                        className="text-muted transition-colors duration-200 hover:text-accent"
                    >
                        TMDB
                    </a>

                    <a 
                        href="https://github.com/SofiaUmrish/flickvault" 
                        target="_blank"
                        className="text-muted transition-colors duration-200 hover:text-accent"
                    >
                        GitHub
                    </a>


                </div>
            </div>

            <hr className="border-border mt-4"/>
            <div className="flex flex-col gap-1 justify-evenly mt-4 text-muted text-center text-md">
                <p>&copy; 2026 FlickVault</p>
                <p>Built with Next.js & TMDB</p>
            </div>
        </footer>
    )
}