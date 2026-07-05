"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";

type ColorPickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};

const ColorPicker = <T extends FieldValues>({
  control,
  name,
}: ColorPickerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex items-center gap-3 border rounded px-3 py-2 h-10">
          <input
            type="color"
            value={field.value || "#1677ff"}
            onChange={(e) => field.onChange(e.target.value)}
            className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
          />

          <span className="text-sm font-medium">
            {field.value || "#1677ff"}
          </span>
        </div>
      )}
    />
  );
};

export default ColorPicker;