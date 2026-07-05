/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateCategory } from "@/hooks/category.hook";
import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type CategoryFormData = {
  categoryName: string;
  title: string;
  image: FileList;
};

const CategoryCreate = () => {
  const {
    register,
    handleSubmit,
    reset,
     watch,
    formState: { errors },
  } = useForm<CategoryFormData>();

  const { mutate, isPending } = useCreateCategory();

  const onSubmit: SubmitHandler<CategoryFormData> = (data) => {
     const formData = new FormData();
    formData.append("categoryName", data.categoryName);
    formData.append("title", data.title);
    formData.append("image", data.image[0]);
    mutate(formData, {
  onSuccess: (res) => {
    reset();

    toast.success(res?.message || "Category created successfully");
  },

  onError: (error: any) => {
    toast.error(
      error?.response?.data?.message ??
        "Something went wrong. Please try again."
    );
  },
});
  };

  return (
    <div>
      <h2 className="text-lg font-semibold capitalize">Create Category</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
        <div className="flex md:flex-row flex-col gap-2 w-full">
          <InputField
            label="Category Name"
            name="categoryName"
            type="text"
            placeholder="Enter Category Name"
            register={register}
            error={errors.categoryName}
            required
          />
          <InputField
            label="Category Title"
            name="title"
            type="text"
            placeholder="Enter Category Title"
            register={register}
            error={errors.title}
            required
          />

          <ImageUpload
            label="Image"
            name="image"
             watch={watch}
            register={register}
            error={errors.image}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-6 px-6 py-2 bg-primary text-secondary rounded hover:bg-primary/80 transition disabled:opacity-60 cursor-pointer"
        >
          {isPending ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CategoryCreate;