import { forwardRef, useId } from 'react'

export const TextField = forwardRef(function TextField(
  { label, error, type = 'text', ...inputProps },
  ref,
) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-slate-400">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="mt-1 text-xs text-rose-400">
          {error}
        </p>
      )}
    </div>
  )
})
