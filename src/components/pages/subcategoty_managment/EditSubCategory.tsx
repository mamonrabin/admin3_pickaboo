"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import SelectInput from "@/reuseble_components/SelectInput";
import { SquarePen } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";

type EditFormData = {
  title: string;
  category: string;
  image: FileList;
};

const EditCategory = () => {


  
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
     } = useForm<EditFormData>();
   
     const onSubmit: SubmitHandler<EditFormData> = (data) => {
       console.log("All Data:", data);
       reset()
     };
  return (
  <div>
      <Sheet>
      <SheetTrigger>
           <button className="bg-primary hover:bg-primary/80 duration-300 cursor-pointer text-secondary px-2 py-2 rounded text-sm">
                  <SquarePen size={16} />
                </button>
      </SheetTrigger>
      <SheetContent className="!max-w-2xl">
        <div className="border-b py-4 px-8">
            <h2 className="md:text-lg text-base font-medium capitalize">Update Sub Category</h2>
        </div>

         <form onSubmit={handleSubmit(onSubmit)}  className="pt-4 px-8">
        <div className="flex  flex-col gap-2 w-full">
          <InputField
            label="Sub-Category Title"
            name="title"
            type="text"
            placeholder="Enter Sub-Category Name"
            register={register}
            error={errors.title}
            required
            
          />

          <SelectInput<EditFormData>
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
          value="Update"
          className="mt-6 px-6 py-2 bg-primary text-secondary rounded hover:bg-primary/80 transition disabled:opacity-60 cursor-pointer"
        />
      </form>
      </SheetContent>
    </Sheet>
  </div>
  );
};

export default EditCategory;
