/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { KeyboardEvent, useState } from "react";
import { UseFormSetValue, FieldValues, Path } from "react-hook-form";
import { X } from "lucide-react";

type TagInputProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  setValue: UseFormSetValue<T>;
};

export default function TagInput<T extends FieldValues>({
  label = "Tags",
  name,
  setValue,
}: TagInputProps<T>) {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const addTag = () => {
    const value = input.trim();

    if (!value) return;
    if (tags.includes(value)) {
      setInput("");
      return;
    }

    const updatedTags = [...tags, value];

    setTags(updatedTags);
    setValue(name, updatedTags as unknown as T[typeof name], {
      shouldValidate: true,
    });

    setInput("");
  };

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);

    setTags(updatedTags);
    setValue(name, updatedTags as unknown as T[typeof name], {
      shouldValidate: true,
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-medium text-sm">
        {label}
      </label>

      <div className="border rounded p-2  flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-full text-sm"
          >
            {tag}

            <button
              type="button"
              onClick={() => removeTag(index)}
            >
              <X size={14} />
            </button>
          </div>
        ))}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type tag and press Enter"
          className="flex-1 min-w-40 outline-none bg-transparent"
        />
      </div>
    </div>
  );
}