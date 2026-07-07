/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import MultipleImageUpload from "@/reuseble_components/MultipleImageUpload";
import RichTextEditor from "@/reuseble_components/RichTextEditor";
import SelectInput from "@/reuseble_components/SelectInput";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { CreateInventeryType } from "./CreateInventeryType";
import { useAllCategories } from "@/hooks/category.hook";
import { TBrand, TCategory, TSubCategory } from "@/types";
import { useAllSubCategories } from "@/hooks/subCategory.hook";
import { useAllBrands } from "@/hooks/brand.hook";
import { useCreateProduct } from "@/hooks/product.hook";
import { toast } from "sonner";
import TagInput from "@/reuseble_components/TagInput";
import { useRouter } from "next/navigation";

const CreateProducts = () => {
  const discountType = [
    { label: "flat", value: "flat" },
    { label: "percentage", value: "percentage" },
  ];
  const shipping = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const labels = [
    { label: "New", value: "New" },
    { label: "Trending", value: "Trending" },
    { label: "Limited Stock", value: "Limited Stock" },
    { label: "Featured", value: "Featured" },
    { label: "Best Sellers", value: "Best Sellers" },
  ];

  const { data: categorysList } = useAllCategories();
  const { data: subcategorysList } = useAllSubCategories();
  const { data: brandsList } = useAllBrands();
  const categories = categorysList?.data?.data;
  const subcategories = subcategorysList?.data?.data;
  const brands = brandsList?.data?.data;

  type ProductForm = {
    title: string;
    description: string;
    mrpPrice: string;
    discountType: string;
    discount: string;
    thumbnailImage: FileList;
    backviewImage: FileList;
    images: FileList;
    category: string;
    subCategory: string;
    brand: string;
    label: string;
    freeShipping: boolean;
    inventoryType: string;
    inventories: string[];
    tags: string[];
    specifications: {
      key: string;
      value: string;
    }[];
    metaTitle: string;
    metaDescription: string;
  };

  const router = useRouter();

  const { mutate: createProductMutation, isPending } = useCreateProduct();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProductForm>({
    defaultValues: {
      specifications: [
        {
          key: "",
          value: "",
        },
      ],
    },
  });

  const {
    fields: specificationFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "specifications",
  });

  const onSubmit: SubmitHandler<ProductForm> = (data) => {
    const formData = new FormData();

    /* ---------- Core ---------- */
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("mrpPrice", String(data.mrpPrice));
    formData.append("category", data.category);

    // Optional fields
    if (data.discountType) {
      formData.append("discountType", data.discountType);
    }

    if (data.subCategory) {
      formData.append("subCategory", data.subCategory);
    }

    if (data.brand) {
      formData.append("brand", data.brand);
    }

    if (data.label) {
      formData.append("label", data.label);
    }

    // Boolean
    formData.append("freeShipping", String(!!data.freeShipping));

    // Discount
    formData.append("discount", String(data.discount ?? 0));

    /* ---------- Images ---------- */
    if (data.thumbnailImage?.[0]) {
      formData.append("thumbnailImage", data.thumbnailImage[0]);
    }

    if (data.backviewImage?.[0]) {
      formData.append("backviewImage", data.backviewImage[0]);
    }

    if (data.images?.length) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    /* ---------- Inventory ---------- */
    if (data.inventoryType) {
      formData.append("inventoryType", data.inventoryType);
    }

    if (data.inventories?.length) {
      formData.append("inventories", JSON.stringify(data.inventories));
    }

    /* ---------- Specifications ---------- */
    if (data.specifications?.length) {
      formData.append("specifications", JSON.stringify(data.specifications));
    }
    if (data.tags?.length) {
      formData.append("tags", JSON.stringify(data.tags));
    }

    if (data.metaTitle) {
      formData.append("metaTitle", data.metaTitle);
    }
    if (data.metaDescription) {
      formData.append("metaDescription", data.metaDescription);
    }
    createProductMutation(formData, {
      onSuccess: (res) => {
        reset();

        toast.success(res?.message || "products created successfully");
        setTimeout(() => {
    router.push("/products");
  }, 1000);
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
      <h2 className="text-lg font-semibold capitalize">create products</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pt-4 flex flex-col gap-6"
      >
        <InputField
          label="Product Title"
          name="title"
          type="text"
          register={register}
          placeholder="Enter Product Title"
           error={errors.title}
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

        <div className="space-y-4 border rounded-md p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Specifications</h3>

            <button
              type="button"
              onClick={() => append({ key: "", value: "" })}
              className="px-3 py-1 bg-primary text-white rounded"
            >
              + Add
            </button>
          </div>

          {specificationFields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-end">
              <InputField
                label="Key"
                name={`specifications.${index}.key`}
                type="text"
                placeholder="e.g. Material"
                register={register}
                inputstyle="w-full rounded"
              />

              <InputField
                label="Value"
                name={`specifications.${index}.value`}
                type="text"
                placeholder="e.g. Cotton"
                register={register}
                inputstyle="w-full rounded"
              />

              <button
                type="button"
                onClick={() => remove(index)}
                className="h-10 px-4 rounded bg-red-500 text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex md:flex-nowrap flex-wrap gap-2">
          <ImageUpload
            label="Front View image"
            name="thumbnailImage"
            register={register}
            watch={watch}
            error={errors.thumbnailImage}
            required
          />
          <ImageUpload
            label="Back View image"
            name="backviewImage"
            watch={watch}
            register={register}
            error={errors.backviewImage}
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
            name="mrpPrice"
            type="text"
            placeholder="Enter MRP Price"
            register={register}
            error={errors.mrpPrice}
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
            // required
            inputstyle="w-full rounded"
          />

          <SelectInput<ProductForm>
            label="Free Shipping"
            name="freeShipping"
            options={shipping}
            control={control}
            error={errors.freeShipping}
            // required
            inputstyle="rounded !w-full !h-[38px]"
          />
        </div>

        <div className="flex md:flex-nowrap flex-wrap items-center gap-3">
          <SelectInput<ProductForm>
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
          <SelectInput<ProductForm>
            label="Sub-Category"
            name="subCategory"
            options={subcategories?.map((subcategory: TSubCategory) => ({
              label: subcategory.subcategoryName,
              value: subcategory._id,
            }))}
            control={control}
            error={errors.subCategory}
            inputstyle="w-full rounded !h-9.5 md:mt-1"
          />

          <SelectInput<ProductForm>
            label="Brand"
            name="brand"
            options={brands?.map((brand: TBrand) => ({
              label: brand.title,
              value: brand._id,
            }))}
            control={control}
            error={errors.brand}
            inputstyle="w-full rounded !h-9.5 md:mt-1"
          />
        </div>

        <div className="flex md:flex-row flex-col  gap-3">
          <SelectInput<ProductForm>
            label="Label"
            name="label"
            options={labels}
            control={control}
            error={errors.label}
            inputstyle="w-full rounded  !h-[39px]"
          />

          <TagInput<ProductForm>
            name="tags"
            label="Product Tags"
            setValue={setValue}
          />
        </div>
        <div>
          <CreateInventeryType
          control={control}
          register={register}
          watch={watch}
        />
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium">For SEO</h2>
          <div className="border rounded md:p-8 p-4 flex flex-col gap-2">
            <InputField
              label="Mete Title"
              name="metaTitle"
              type="text"
              register={register}
              placeholder="Enter Meta Title"
            />
            <InputField
              label="Meta Description"
              name="metaDescription"
              type="text"
              register={register}
              placeholder="Enter Meta Description"
              
            />
          </div>
        </div>

        <button
          disabled={isPending}
          className=" text-base font-medium px-6 py-3 bg-primary hover:bg-primary/80 duration-300 cursor-pointer text-secondary rounded mt-4"
          type="submit"
        >
          {isPending ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProducts;
