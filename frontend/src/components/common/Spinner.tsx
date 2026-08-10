import { Loader2 } from "lucide-react";

type SpinnerProps = {
  className?: string;
  "aria-label"?: string;
};

/** Small inline spinner used inside buttons / loading states. */
export default function Spinner({ className = "h-4 w-4", "aria-label": ariaLabel = "Loading" }: SpinnerProps) {
  return <Loader2 className={`animate-spin ${className}`} aria-label={ariaLabel} role="status" />;
}
