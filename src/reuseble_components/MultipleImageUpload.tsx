"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type MultipleImageUploadProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  required?: boolean;
  maxImages?: number;
};

const MultipleImageUpload = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  required = false,
  maxImages = 5,
}: MultipleImageUploadProps<T>) => {
  const inputId = useId();

  const [previews, setPreviews] = useState<string[]>([]);

  const { ref, onChange, ...rest } = register(name, {
    required: required ? `${label} is required` : false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);

    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const selected = files.slice(0, maxImages);

    const urls = selected.map((file) => URL.createObjectURL(file));

    setPreviews(urls);
  };

  const removeImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <label
        htmlFor={inputId}
        className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed hover:border-primary"
      >
        <Upload size={26} />

        <p className="mt-2 text-sm">
          Click to upload images
        </p>

        <span className="text-xs text-gray-500">
          Maximum {maxImages} images
        </span>
      </label>

      <input
        id={inputId}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        {...rest}
        ref={ref}
        onChange={handleChange}
      />

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {previews.map((image, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden border"
            >
              <Image
                src={image}
                alt={`Preview ${index + 1}`}
                width={180}
                height={180}
                className="w-full h-36 object-cover"
                unoptimized
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default MultipleImageUpload;