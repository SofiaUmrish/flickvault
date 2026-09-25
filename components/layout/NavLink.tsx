"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
  };

export default function NavLink({ href, children, onClick }: NavLinkProps){

    const pathname = usePathname();
    const isActive = pathname===href;

    return(
        <Link
            href={href}
            className={`
                group flex items-center gap-1.5 hover:text-accent transition-colors duration-200

                ${isActive ? "md:border-b md:border-accent text-accent" : "text-muted"}
              `}
              onClick={onClick}
        >
            {children}
        </Link>
    )

}