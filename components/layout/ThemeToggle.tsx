"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle(){

    const [isDark, setIsDark]=useState(false);

    

    return(
        <button 
            className="p-2 rounded-full text-muted hover:bg-surface-hover hover:text-accent transition-colors duration-200"
            onClick={() => setIsDark(prev=>{
                
                document.documentElement.classList.toggle("dark", !prev)
              
                return !prev
            })}
        >
            {isDark? <Sun size={25} /> : <Moon size={25}/>}
        </button>
    )
}