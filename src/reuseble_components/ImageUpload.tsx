/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

type ImageUploadProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  watch?: UseFormWatch<T>;
  error?: FieldError;
  required?: boolean;
  existingImage?: string;
};

const ImageUpload = <T extends FieldValues>({
  label,
  name,
  register,
  watch,
  error,
  required = false,
  existingImage,
}: ImageUploadProps<T>) => {
  const [preview, setPreview] = useState(existingImage || "");
  const inputId = useId();

  // Watch the field
  const file = watch?.(name);

 
  

 useEffect(() => {
  if (file && file.length > 0) {
    const objectUrl = URL.createObjectURL(file[0]);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  } else {
    setPreview(existingImage || "");
  }
}, [file, existingImage]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const { ref, onChange, ...rest } = register(name, {
    required: required ? `${label} is required` : false,
  });

  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      {preview ? (
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
            onClick={() => {
              URL.revokeObjectURL(preview);
              setPreview("");
            }}
            className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white"
          >
            <X size={16} />
          </button>

          <label
            htmlFor={inputId}
            className="absolute bottom-2 right-2 cursor-pointer rounded bg-black/70 px-3 py-1 text-sm text-white"
          >
            Change
          </label>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed hover:border-primary"
        >
          <Upload size={24} />
          <p className="mt-2 text-sm text-gray-500">
            Click to upload image
          </p>
        </label>
      )}

      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="hidden"
        {...rest}
        ref={ref}
        onChange={(e) => {
          onChange(e);

          const selectedFile = e.target.files?.[0];

          if (selectedFile) {
            if (preview) {
              URL.revokeObjectURL(preview);
            }

            setPreview(URL.createObjectURL(selectedFile));
          }
        }}
      />

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
};

export default ImageUpload;