import { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    className?: string; 
}

export default function Badge({ children, className = "" }: BadgeProps) {
    return (
        <span 
            className={`flex items-center gap-1.5 font-semibold rounded-2xl border border-accent/80 bg-surface/90 px-3 py-1 text-sm text-accent ${className}`}
        >
            {children}
        </span>
    );
}