import Link from "next/link";
import type { ReactNode } from "react";

const titleClass =
  "bg-gradient-to-t from-blue-800 via-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-700 dark:via-cyan-500 dark:to-cyan-300";

const primaryClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-blue-500/25 dark:bg-blue-500 dark:text-slate-950 dark:hover:bg-blue-600";

const secondaryClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-transparent font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-1 hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400";

interface NotFoundStateAction {
  href: string;
  label: string;
}

interface NotFoundStateProps {
  /** Small mono label above the heading  */
  eyebrow?: string;
  /** Render the standard giant gradient "404" display above the heading */
  show404?: boolean;
  /** Main Tillana heading, rendered with the site's blue gradient */
  title: ReactNode;
  description: ReactNode;
  primary?: NotFoundStateAction;
  secondary?: NotFoundStateAction;
  /** Compact inline variant for section-level empty states */
  compact?: boolean;
}

export default function NotFoundState({
  eyebrow,
  show404 = false,
  title,
  description,
  primary,
  secondary,
  compact = false,
}: NotFoundStateProps) {
  if (compact) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 py-14 text-center dark:border-slate-800 dark:bg-slate-900/20">
        {eyebrow && (
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
            {eyebrow}
          </p>
        )}
        <h3 className={`mt-3 font-tillana text-2xl font-black tracking-tight md:text-3xl ${titleClass}`}>
          {title}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>
        {(primary || secondary) && (
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            {primary && (
              <Link href={primary.href} className={`${primaryClass} px-6 py-2.5 text-sm`}>
                {primary.label}
              </Link>
            )}
            {secondary && (
              <Link href={secondary.href} className={`${secondaryClass} px-6 py-2.5 text-sm`}>
                {secondary.label}
              </Link>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {show404 && (
        <p className="mt-6 font-tillana text-8xl font-black leading-none tracking-tight md:text-9xl">
          <span className="bg-linear-to-t from-blue-800 via-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-700 dark:via-cyan-500 dark:to-cyan-300">
            4
          </span>
          <span className="bg-linear-to-t from-slate-900 to-slate-500 bg-clip-text text-transparent dark:from-slate-500 dark:to-white">
            0
          </span>
          <span className="bg-linear-to-t from-blue-800 via-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-700 dark:via-cyan-500 dark:to-cyan-300">
            4
          </span>
        </p>
      )}

      <h1
        className={`font-tillana font-black leading-tight tracking-tight ${
          show404 ? "mt-8 text-3xl md:text-4xl" : "mt-6 text-4xl md:text-5xl"
        } ${titleClass}`}
      >
        {title}
      </h1>

      <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
        {description}
      </p>

      {(primary || secondary) && (
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          {primary && (
            <Link href={primary.href} className={`${primaryClass} px-8 py-4 text-base`}>
              {primary.label}
            </Link>
          )}
          {secondary && (
            <Link href={secondary.href} className={`${secondaryClass} px-8 py-4 text-base`}>
              {secondary.label}
            </Link>
          )}
        </div>
      )}

    </div>
  );
}
