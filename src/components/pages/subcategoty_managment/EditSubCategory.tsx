/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BASE_URL } from "@/config";
import { useAllCategories } from "@/hooks/category.hook";
import { useUpdateSubCategory } from "@/hooks/subCategory.hook";
import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import SelectInput from "@/reuseble_components/SelectInput";
import { TCategory, TSubCategory } from "@/types";
import { SquarePen } from "lucide-react";
import { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditSubCategoryProps {
  subcategory: TSubCategory;
}

type EditFormData = {
  category: string;
  subcategoryName: string;
  image: FileList;
};

const EditSubCategory = ({ subcategory }: EditSubCategoryProps) => {
   const [open, setOpen] = useState(false);
  const { data: categorysList } = useAllCategories();

  const categories = categorysList?.data?.data;
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<EditFormData>();

     const { mutate, isPending } = useUpdateSubCategory();

  const onSubmit: SubmitHandler<EditFormData> = (data) => {
  const formData = new FormData();
    formData.append("category", data.category);
    formData.append("subcategoryName", data.subcategoryName);

    // ✅ Only append image if user selects new file
 
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
  

    mutate(
      { id: subcategory._id, formData },
      {
         onSuccess: (res) => {
          toast.success(res?.message || "Sub Category updated successfully");

          reset();
          setOpen(false); // ✅ Close sheet after successful update
        },
  

  onError: (error: any) => {
    toast.error(
      error?.response?.data?.message ??
        "Something went wrong. Please try again."
    );
  },
      }
    );
  };
  
  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
         <button  className="bg-primary hover:bg-primary/80 duration-300 cursor-pointer text-secondary px-2 py-2 rounded text-sm">
           <SquarePen size={16} />
         </button>
        </SheetTrigger>
        <SheetContent className="!max-w-2xl">
          <div className="border-b py-4 px-8">
            <h2 className="md:text-lg text-base font-medium capitalize">
              Update Sub Category
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="pt-4 px-8">
            <div className="flex  flex-col gap-2 w-full">
              <InputField
                label="Sub-Category Title"
                name="subcategoryName"
                type="text"
                placeholder={subcategory.subcategoryName}
                register={register}
                error={errors.subcategoryName}
                required
              />

              <SelectInput<EditFormData>
                label={subcategory?.category?.categoryName}
                name="category"
                options={categories?.map((category : TCategory) => ({
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
                existingImage={BASE_URL + subcategory.image}
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
                {isPending ? "Updating..." : "Update"}
              </button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditSubCategory;
