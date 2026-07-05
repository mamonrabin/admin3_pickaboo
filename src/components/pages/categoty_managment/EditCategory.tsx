/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BASE_URL } from "@/config";
import { useUpdateCategory } from "@/hooks/category.hook";
import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import { SquarePen } from "lucide-react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditFormData = {
  categoryName: string;
  title: string;
  image: FileList;
};

interface EditCategoryProps {
  category: {
    _id: string;
    categoryName: string;
    title: string;
    image: string;
  };
}

const EditCategory = ({category} : EditCategoryProps) => {
   const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
      watch,
    formState: { errors },
  } = useForm<EditFormData>();

   const { mutate, isPending } = useUpdateCategory();

  const onSubmit = (data: EditFormData) => {
    const formData = new FormData();
    formData.append("categoryName", data.categoryName);
    formData.append("title", data.title);

    // ✅ Only append image if user selects new file
 
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
  

    mutate(
      { id: category._id, formData },
      {
         onSuccess: (res) => {
          toast.success(res?.message || "Category updated successfully");

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
          <button className="bg-primary hover:bg-primary/80 duration-300 cursor-pointer text-secondary px-2 py-2 rounded text-sm">
          <SquarePen size={16} />
        </button>
        </SheetTrigger>
        <SheetContent className="!max-w-2xl">
          <div className="border-b py-4 px-8">
            <h2 className="md:text-lg text-base font-medium capitalize">
              Update Category
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="pt-4 px-8">
            <div className="flex  flex-col gap-2 w-full">
              <InputField
            label="Category Name"
            name="categoryName"
            type="text"
            placeholder={category.categoryName}
            register={register}
            error={errors.categoryName}
            required
          />
          <InputField
            label="Category Title"
            name="title"
            type="text"
            placeholder={category.title}
            register={register}
            error={errors.title}
            required
          />

              <ImageUpload
                label="Image"
                name="image"
                existingImage={BASE_URL + category.image}
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

export default EditCategory;
