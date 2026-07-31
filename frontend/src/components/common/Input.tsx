import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
  /** Optional element rendered inside the field on the right (e.g. toggle). */
  rightSlot?: React.ReactNode;
  containerClassName?: string;
};

/**
 * Labeled text/email input with inline error text.
 *
 * Forwards its ref so it works directly with react-hook-form's `register()`:
 *
 *   const { register } = useForm();
 *   <Input label="Email" error={errors.email?.message} {...register("email")} />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, rightSlot, containerClassName = "", className = "", id, ...rest },
  ref
) {
  const inputId = id ?? rest.name;

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          className={[
            "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-colors",
            "placeholder:text-slate-400",
            "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30",
            "dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/30 dark:border-red-500/60"
              : "border-slate-200 dark:border-slate-700",
            rightSlot ? "pr-11" : "",
            className,
          ].join(" ")}
          aria-invalid={error ? true : undefined}
          {...rest}
        />
        {rightSlot && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">{rightSlot}</div>
        )}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
});

export default Input;
