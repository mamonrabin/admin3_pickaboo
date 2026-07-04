"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type ImageUploadProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  required?: boolean;
};

const ImageUpload = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  required = false,
}: ImageUploadProps<T>) => {
  const [preview, setPreview] = useState("");

  const { onChange, ref, ...rest } = register(name, {
    required: required ? `${label} is required` : false,
    
  });

  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      {!preview ? (
        <label
          htmlFor={String(name)}
          className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed hover:border-primary"
        >
          <Upload />
          <p className="mt-2 text-sm text-gray-500">
            Click to upload image
          </p>
        </label>
      ) : (
        <div className="relative">
          <Image
            src={preview}
            alt="Preview"
            width={300}
            height={160}
            className="h-40 w-full rounded-xl object-cover"
            unoptimized
          />

          <button
            type="button"
            onClick={() => setPreview("")}
            className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white"
          >
            <X size={16} />
          </button>

          <label
            htmlFor={String(name)}
            className="absolute bottom-2 right-2 cursor-pointer rounded bg-black/70 px-3 py-1 text-sm text-white"
          >
            Change
          </label>
        </div>
      )}

      <input
        id={String(name)}
        type="file"
        className="hidden"
        accept="image/*"
        ref={ref}
        {...rest}
        onChange={(e) => {
          onChange(e);

          const file = e.target.files?.[0];
          if (file) {
            setPreview(URL.createObjectURL(file));
          }
        }}
      />

      {error && (
        <p className="text-xs text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default ImageUpload;