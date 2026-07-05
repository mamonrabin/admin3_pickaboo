"use client";

import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import SelectInput from "@/reuseble_components/SelectInput";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type SubCategoryFormData = {
  title: string;
  category: string;
  image: FileList;
};

const CreateSubCategory = () => {

  const categories = [
    { label: "Electronics", value: "electronics" },
    { label: "Fashion", value: "fashion" },
    { label: "Books", value: "books" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubCategoryFormData>();

  const onSubmit: SubmitHandler<SubCategoryFormData> = (data) => {
    console.log("All Data:", data);
    reset();
  };

  return (
    <div>
      <h2 className="text-lg font-semibold capitalize">Create Sub-Category</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
        <div className="flex md:flex-row flex-col gap-2 w-full">
          <InputField
            label="Sub-Category Title"
            name="title"
            type="text"
            placeholder="Enter Sub-Category Name"
            register={register}
            error={errors.title}
            required
            
          />

          <SelectInput<SubCategoryFormData>
            label="Category"
            name="category"
            options={categories}
            register={register}
            error={errors.category}
            required
            className="lg:mt-1"
          />

          <ImageUpload
            label="Image"
            name="image"
            register={register}
            error={errors.image}
            required
          />
        </div>

        <input
          type="submit"
          value="Create"
          className="mt-6 px-6 py-2 bg-primary text-secondary rounded hover:bg-primary/80 transition disabled:opacity-60 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CreateSubCategory;
