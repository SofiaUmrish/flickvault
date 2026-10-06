

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    onClick?: () => void;
    disabled?: boolean;
  }

export default function Button({ children, variant="primary", onClick, disabled }: ButtonProps){
    

    const variants = {
        primary: "bg-accent text-surface shadow-[0_0_10px] shadow-accent/50 hover:shadow-[0_0_15px] hover:shadow-accent/80 hover:brightness-110",
        secondary: "bg-foreground shadow-[0_0_10px] shadow-muted text-surface hover:shadow-[0_0_15px] hover:bg-foreground/90",
        ghost: "text-foreground hover:bg-surface-hover"
    };



    return(

        <button
            type="button" 
            className={`flex shrink-0 whitespace-nowrap justify-center items-center gap-2 rounded-3xl px-5 py-2 md:px-10 md:py-3 font-semibold md:font-bold transition-all duration-300 hover:scale-105 ${variants[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}