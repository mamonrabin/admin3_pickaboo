/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAllCategories } from "@/hooks/category.hook";
import { useCreateSubCategory } from "@/hooks/subCategory.hook";
import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import SelectInput from "@/reuseble_components/SelectInput";
import { TCategory } from "@/types";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type SubCategoryFormData = {
  category: string;
  subcategoryName: string;
  image: FileList;
};

const CreateSubCategory = () => {
  const { data: categorysList } = useAllCategories();

  const categories = categorysList?.data?.data;

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<SubCategoryFormData>({
    defaultValues: {
      category: "",
      subcategoryName: "",
       image: undefined,
     
    },
  });

  const { mutate: createSubCategory, isPending } = useCreateSubCategory();

  const onSubmit: SubmitHandler<SubCategoryFormData> = (data) => {
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("subcategoryName", data.subcategoryName);
    formData.append("image", data.image[0]);
    createSubCategory(formData, {
      onSuccess: (res) => {
        reset({
          category: "",
          subcategoryName: "",
           image: undefined,
         
        });

        toast.success(res?.message || "Category created successfully");
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ??
            "Something went wrong. Please try again.",
        );
      },
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold capitalize">Create Sub-Category</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
        <div className="flex md:flex-row flex-col gap-2 w-full">
          <InputField
            label="Sub-Category Title"
            name="subcategoryName"
            type="text"
            placeholder="Enter Sub-Category Name"
            register={register}
            error={errors.subcategoryName}
            required
          />

          <SelectInput<SubCategoryFormData>
            label="Category"
            name="category"
            options={categories?.map((category: TCategory) => ({
              label: category.categoryName,
              value: category._id,
            }))}
            control={control}
            error={errors.category}
            required
            inputstyle="w-full rounded !h-9.5 md:mt-1"
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
          disabled={isPending}
          className="mt-6 px-6 py-2 bg-primary text-secondary rounded hover:bg-primary/80 transition disabled:opacity-60 cursor-pointer"
          type="submit"
        >
          {isPending ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateSubCategory;
