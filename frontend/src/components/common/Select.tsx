import { forwardRef } from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  hint?: string;
  options: Array<{ value: string; label: string }>;
  containerClassName?: string;
};

/** Labeled native select — styled to match Input/Textarea. */
const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, options, containerClassName = "", className = "", id, ...rest },
  ref
) {
  const selectId = id ?? rest.name;

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <select
        ref={ref}
        id={selectId}
        className={[
          "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-colors",
          "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30",
          "dark:bg-slate-900 dark:text-slate-100",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-500/30 dark:border-red-500/60"
            : "border-slate-200 dark:border-slate-700",
          className,
        ].join(" ")}
        aria-invalid={error ? true : undefined}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
});

export default Select;
