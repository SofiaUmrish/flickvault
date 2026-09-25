import Link from "next/link";
import { Film, House, Compass, Heart, Search, Moon, Sun} from "lucide-react";
import MobileMenu from "@/components/layout/MobileMenu";
import NavLink from "@/components/layout/NavLink";

export default function Header(){

    return(
        <header className="w-full sticky top-0 z-50 bg-surface border-b border-border py-4 md:py-5 px-4">

            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <Link href="/" className="flex flex-row items-center text-foreground transition-colors duration-200 hover:text-accent">

                    <Film size={28} className="text-accent" />
                    <span className=" text-foreground font-semibold text-xl tracking-tighter">FLICKVAULT</span>
                </Link>

                <nav className=" text-lg items-center justify-evenly text-muted hidden md:flex md:w-3/4">
                    <NavLink 
                        href="/"
                    >
                            Home
                            <span className="p-1.5 rounded-full transition-colors duration-200 group-hover:bg-surface-hover">
                            <House size={23} />
                        </span>
                    </NavLink>

                    <NavLink 
                        href="/discover" 
                    >
                        Discover
                        <span className="p-1.5 rounded-full transition-colors duration-200 group-hover:bg-surface-hover">
                            <Compass size={23} />
                        </span>
                    </NavLink>

                    <NavLink 
                        href="/search" 
                    >
                        Search
                        <span className="p-1.5 rounded-full transition-colors duration-200 group-hover:bg-surface-hover">
                            <Search size={23} />
                        </span>
                    </NavLink>

                    <NavLink 
                        href="/watchlist" 
                    >
                        Watchlist
                        <span className="p-1.5 rounded-full transition-colors duration-200 group-hover:bg-surface-hover">
                            <Heart size={23} />
                        </span>
                    </NavLink>
                </nav>

                <div className="flex gap-4">
                    <button className="p-2 rounded-full text-muted hover:bg-surface-hover hover:text-accent transition-colors duration-200">
                            <Moon size={25} />
                    </button>

                    <MobileMenu />
                </div>
            </div>
        </header>
    )
}