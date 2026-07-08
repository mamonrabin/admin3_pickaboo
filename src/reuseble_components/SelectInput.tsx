/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type SelectInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  options?: Option[];
  control: Control<T>;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputstyle?: string;
  placeholderColor?: string;
};

const SelectInput = <T extends FieldValues>({
  label,
  name,
  options = [],
  control,
  error,
  required = false,
  disabled = false,
  onValueChange,
  placeholder,
  className = "",
  inputstyle = "",
  placeholderColor = "",
}: SelectInputProps<T>) => {
  return (
    <div className={`flex w-full flex-col gap-1 ${className}`}>
      <label className="text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        defaultValue={"" as any}
        rules={{
          required: required ? `${label} is required` : false,
        }}
        render={({ field }) => (
          <Select
            value={field.value ?? ""}
            disabled={disabled}
            onValueChange={(value) => {
              field.onChange(value); // Update React Hook Form
              onValueChange?.(value); // Notify parent
            }}
          >
            <SelectTrigger
              className={`${inputstyle} ${
                error ? "border-red-500" : "border-gray-300"
              } data-[placeholder]:text-gray-500 ${placeholderColor}`}
            >
              <SelectValue placeholder={placeholder ?? `Select ${label}`} />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default SelectInput;
