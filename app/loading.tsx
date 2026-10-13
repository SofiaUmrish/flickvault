
import { Film } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 bg-background">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-border border-t-accent" />
        <Film size={26} className="text-accent" />
      </div>

      <div className="text-center">
        <p className="font-semibold tracking-[0.25em] text-foreground">
          FLICKVAULT
        </p>
        <p className="mt-2 text-sm text-muted">
          Preparing your cinematic experience...
        </p>
      </div>
    </div>
  );
}
