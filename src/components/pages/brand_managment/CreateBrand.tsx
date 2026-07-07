/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateBrand } from "@/hooks/brand.hook";
import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus } from "lucide-react";

type BrandFormData = {
  title: string;
  image: FileList;
};

const Createbrand = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<BrandFormData>();

  const { mutate, isPending } = useCreateBrand();

  const onSubmit: SubmitHandler<BrandFormData> = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("image", data.image[0]);
    mutate(formData, {
      onSuccess: (res) => {
        reset();
        toast.success(res?.message || "Brand created successfully");
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
        <div className="bg-blue-50 p-2.5 rounded-lg">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Create Brand</h2>
          <p className="text-sm text-gray-500">Add a new brand to your store</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Brand Title */}
          <div className="space-y-1.5">
            <InputField
              label="Brand Title"
              name="title"
              type="text"
              placeholder="Enter brand name"
              register={register}
              error={errors.title}
              required
              inputstyle="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <p className="text-xs text-gray-400">Example: Nike, Apple, Samsung</p>
          </div>

          {/* Brand Image */}
          <div className="space-y-1.5">
            <ImageUpload
              label="Brand Image"
              name="image"
              watch={watch}
              register={register}
              error={errors.image}
              required
            />
            <p className="text-xs text-gray-400">Upload brand logo or icon (PNG, JPG)</p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-6 mt-2 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-400">
              <span className="text-red-500">*</span> Required fields
            </p>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              <>
                <Plus size={18} />
                Create Brand
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Createbrand;