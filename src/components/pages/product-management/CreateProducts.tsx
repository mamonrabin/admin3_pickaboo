"use client";
import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import MultipleImageUpload from "@/reuseble_components/MultipleImageUpload";
import RichTextEditor from "@/reuseble_components/RichTextEditor";
import SelectInput from "@/reuseble_components/SelectInput";
import { Controller, useForm } from "react-hook-form";
import { CreateInventeryType } from "./CreateInventeryType";

const CreateProducts = () => {
  const discountType = [
    { label: "flat", value: "flat" },
    { label: "percentag", value: "percentag" },
  ];

  const categories = [
    { label: "Electronics", value: "electronics" },
    { label: "Fashion", value: "fashion" },
    { label: "Books", value: "books" },
  ];

  type ProductForm = {
    title: string;
    mrp: string;
    discountType: string;
    discount: string;
    image: FileList;
    images: FileList;
    description: string;
    category: string;
  };

  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ProductForm>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: ProductForm) => {
    console.log(data);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold capitalize">create products</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pt-4 flex flex-col gap-6"
      >
        <InputField
          label="Product Title"
          name="title"
          type="text"
          placeholder="Enter Product Title"
          required
        />
        <div className="">
          <p className="text-sm font-medium pb-2">
            Product Description <span className="text-red-500">*</span>
          </p>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <RichTextEditor value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="flex md:flex-nowrap flex-wrap gap-2">
          <ImageUpload
            label="Front View image"
            name="image"
            register={register}
            error={errors.image}
            required
          />
          <ImageUpload
            label="Back View image"
            name="image"
            register={register}
            error={errors.image}
            // required
          />

          <MultipleImageUpload
            label="Product Images"
            name="images"
            register={register}
            error={errors.images}
            // required
          />
        </div>

        <div className="flex md:flex-nowrap flex-wrap items-center gap-3">
          <InputField
            label="MRP"
            name="mrp"
            type="text"
            placeholder="Enter MRP Price"
            register={register}
            error={errors.mrp}
            required
            inputstyle="w-full rounded"
          />

          <SelectInput<ProductForm>
            label="Discount Type"
            name="discountType"
            options={discountType}
            control={control}
            error={errors.discountType}
            // required
            inputstyle="rounded !w-full !h-[38px]"
          />

          <InputField
            label="Discount"
            name="discount"
            type="text"
            placeholder="Enter Discount Amount"
            register={register}
            error={errors.discount}
            required
            inputstyle="w-full rounded"
          />

          <SelectInput<ProductForm>
            label="Free Shipping"
            name="discountType"
            options={discountType}
            control={control}
            error={errors.discountType}
            // required
            inputstyle="rounded !w-full !h-[38px]"
          />
        </div>

        <div className="flex md:flex-nowrap flex-wrap items-center gap-3">
          <SelectInput<ProductForm>
            label="Category"
            name="category"
            options={categories}
            control={control}
            error={errors.category}
            required
            placeholder="Select Category"
            placeholderColor=""
            inputstyle="w-full rounded !h-9.5"
          />
          <SelectInput<ProductForm>
            label="Sub-Category"
            name="category"
            options={categories}
            control={control}
            error={errors.category}
            // required
            placeholder="Select Sub Category"
            placeholderColor=""
          inputstyle="w-full rounded !h-9.5"
          />
          <SelectInput<ProductForm>
            label="Brand"
            name="category"
            options={categories}
            control={control}
            error={errors.category}
            // required
            placeholder="Select Brand"
            placeholderColor=""
           inputstyle="w-full rounded !h-9.5"
          />
        </div>

        <div className="flex flex-col gap-3">
          <SelectInput<ProductForm>
            label="Labels"
            name="category"
            options={categories}
            control={control}
            error={errors.category}
            // required
            placeholder="Select Labels"
            placeholderColor=""
            inputstyle="w-full rounded md:w-77 !h-[38px]"
          />

          <CreateInventeryType
            control={control}
            register={register}
            watch={watch}
          />
        </div>

        <button className=" text-base font-medium px-6 py-3 bg-primary hover:bg-primary/80 duration-300 cursor-pointer text-secondary rounded mt-4">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProducts;
