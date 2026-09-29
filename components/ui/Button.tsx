

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "disabled";
    onClick?: () => void;
    disabled?: boolean;
  }

export default function Button({ children, variant="primary", onClick, disabled }: ButtonProps){
    

    const variants = {
        primary: "bg-accent text-surface hover:brightness-120",
        secondary: "bg-foreground border border-border text-surface hover:bg-foreground/90",
        ghost: "text-foreground hover:bg-surface-hover",
        disabled:"cursor-not-allowed disabled:opacity-50"
    };



    return(

        <button
            type="button" 
            className={`rounded-3xl px-5 py-2.5 font-semibold transition-all duration-200 ${variants[variant]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}