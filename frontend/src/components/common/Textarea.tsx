import { forwardRef } from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
};

/**
 * Labeled textarea with inline error text. Mirrors the Input primitive so the
 * auth/profile forms share a single visual language.
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, containerClassName = "", className = "", id, ...rest },
  ref
) {
  const textareaId = id ?? rest.name;

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        className={[
          "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-colors",
          "placeholder:text-slate-400",
          "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30",
          "dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-500/30 dark:border-red-500/60"
            : "border-slate-200 dark:border-slate-700",
          className,
        ].join(" ")}
        aria-invalid={error ? true : undefined}
        {...rest}
      />

      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
});

export default Textarea;
