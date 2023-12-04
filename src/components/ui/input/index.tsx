"use client";

import { InputProps } from "./props.model";

export function Input({
  error = null,
  type,
  label,
  id,
  onChange,
  value,
  disabled = false,
  placeholder = "",
  readOnly = false,
  register,
  validationScheme,
  ...extraPropsForInput
}: InputProps) {
  const inputProps: any = {
    type: type,
    id: id,
    disabled: disabled,
    "aria-disabled": { disabled },
    placeholder: placeholder,
    readOnly: readOnly,
  };

  if (onChange) {
    inputProps.onChange = onChange;
  }
  if (value) {
    inputProps.value = value;
  }
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="dark:text-neutral-50"
        aria-disabled={disabled}
      >
        {label}
      </label>
      <input
        {...inputProps}
        {...extraPropsForInput}
        className={`${
          error
            ? "bg-red-200 border border-red-300 dark:border-red-600 dark:bg-neutral-800 focus:outline-none focus-visible:outline-none focus:border-[3px] focus:dark:border-red-600"
            : "bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600"
        } rounded-lg focus:text-neutral-900 text-neutral-600 py-2 px-3 dark:focus:text-neutral-50 dark:text-neutral-400 dark:placeholder:text-neutral-500`}
        {...register(id, validationScheme)}
      />
      {error?.message && (
        <span className="text-red-600 dark:text-red-500">{error.message}</span>
      )}
    </div>
  );
}
