"use client";

import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type SelectInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  options: Option[];
  register?: UseFormRegister<T>;
  error?: FieldError;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

const SelectInput = <T extends FieldValues>({
  label,
  name,
  options,
  register,
  error,
  value,
  onChange,
  required = false,
  disabled = false,
  className = "",
}: SelectInputProps<T>) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <select
        id={name}
        disabled={disabled}
        className={`px-4 py-2 border rounded text-sm outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...(register
          ? register(name, {
              required: required ? `${label} is required` : false,
            })
          : {
              name,
              value,
              onChange,
            })}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default SelectInput;