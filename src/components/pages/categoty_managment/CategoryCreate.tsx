"use client";

import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import { SubmitHandler, useForm } from "react-hook-form";

type CategoryFormData = {
  title: string;
  image: FileList;
};

const CategoryCreate = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>();

  const onSubmit: SubmitHandler<CategoryFormData> = (data) => {
    console.log("All Data:", data);
    reset()
  };

  return (
    <div>
      <h2 className="text-lg font-semibold capitalize">Create Category</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
        <div className="flex md:flex-row flex-col gap-2 w-full">
          <InputField
            label="Category Title"
            name="title"
            type="text"
            placeholder="Enter Category Name"
            register={register}
            error={errors.title}
            required
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

export default CategoryCreate;