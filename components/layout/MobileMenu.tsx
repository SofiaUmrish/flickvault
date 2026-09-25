"use client"
import { useState } from "react";

import {Menu, House, Compass, Heart, Search,} from "lucide-react";
import NavLink from "@/components/layout/NavLink";


export default function MobileMenu(){

    const [isOpen, setIsOpen] = useState(false);

    return(
        <div>
            <button onClick={()=>setIsOpen(prev => !prev)}
                 className="p-2 rounded-full text-muted hover:bg-surface-hover hover:text-accent transition-colors duration-200 md:hidden"
            >
                <Menu size={25}/>
            </button>

            {isOpen &&
                    <nav className="absolute top-full left-0 right-0 bg-surface rounded-b-xl border border-border flex flex-col text-xl items-center gap-y-2 py-2 text-muted">
                    <NavLink 
                        href="/"
                        onClick={()=>setIsOpen(false)}
                    >
                        <span className="p-1.5 rounded-full transition-colors duration-200 group-hover:bg-surface-hover">
                            <House size={23} />
                        </span>
                        Home
                    </NavLink>

                    <NavLink 
                        href="/discover" 
                        onClick={()=>setIsOpen(false)}
                    >
                        <span className="p-1.5 rounded-full transition-colors duration-200 group-hover:bg-surface-hover">
                            <Compass size={23} />
                        </span>
                        Discover
                    </NavLink>

                    <NavLink 
                        href="/search" 
                        onClick={()=>setIsOpen(false)}
                    >
                        <span className="p-1.5 rounded-full transition-colors duration-200 group-hover:bg-surface-hover">
                            <Search size={23} />
                        </span>
                        Search
                    </NavLink>

                    <NavLink 
                        href="/watchlist" 
                       onClick={()=>setIsOpen(false)}
                    >
                        <span className="p-1.5 rounded-full transition-colors duration-200 group-hover:bg-surface-hover">
                            <Heart size={23} />
                        </span>
                        Watchlist
                    </NavLink>
                </nav>
            }

        </div>
    )


}