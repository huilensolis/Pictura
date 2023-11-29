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
}: InputProps) {
  const inputProps: any = {
    type: type,
    id: id,
    disabled: disabled,
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
      <label htmlFor={id} className="dark:text-neutral-50">
        {label}
      </label>
      <input
        {...inputProps}
        className={`${
          error
            ? "bg-red-400"
            : "bg-neutral-100 focus:bg-neutral-200 dark:bg-neutral-800"
        } rounded-xl focus:text-neutral-900 text-neutral-600 p-3 dark:focus:text-neutral-50 dark:text-neutral-400 dark:placeholder:text-neutral-500`}
      />
      {error && <span>{error}</span>}
    </div>
  );
}
