"use client";
import SelectInput from "@/reuseble_components/SelectInput";
import { FilePlus} from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import SelectorSideBar from "./SelectorSideBar";

type SubCategoryFormData = {
  title: string;
  category: string;
  image: FileList;
};

const ProductSelector = () => {
  const categories = [
    { label: "Electronics", value: "electronics" },
    { label: "Fashion", value: "fashion" },
    { label: "Books", value: "books" },
  ];

  const {
    register,
    control,
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
      <div className="flex  justify-between">
        <h2 className="text-sm font-semibold text-gray-500">
          Total Products 120
        </h2>
        <div className="flex items-center gap-2">
          <Link href="products/create-product">
            <div className="md:px-6 px-2 md:py-3 py-2 inline-flex items-center justify-right rounded bg-primary hover:bg-primary/80 duration-300 text-secondary text-sm cursor-pointer">
              <button className="uppercase text-sm font-medium md:flex hidden items-center gap-1 cursor-pointer">
                <FilePlus size={16} />
                Add Product
              </button>
              <button className="uppercase text-sm font-medium md:hidden flex items-center gap-1 cursor-pointer">
                <FilePlus size={16} />
              </button>
            </div>
          </Link>

          <SelectorSideBar/>
        </div>
      </div>

      <div className="md:flex flex-wrap hidden items-center gap-2 justify-end mt-2">
        <SelectInput<SubCategoryFormData>
          label=""
          name="category"
          options={categories}
          control={control}
          error={errors.category}
          // required
          placeholder="Select Category"
          placeholderColor="!text-white"
          inputstyle="bg-primary w-40 text-secondary outline-none border-transparent rounded !h-10 outline-none"
        />
        <SelectInput<SubCategoryFormData>
          label=""
          name="category"
          options={categories}
          control={control}
          error={errors.category}
          // required
          placeholder="Select Sub Category"
          placeholderColor="!text-white"
          inputstyle="bg-primary w-50 text-secondary outline-none border-transparent rounded !h-10 outline-none"
        />
        <SelectInput<SubCategoryFormData>
          label=""
          name="category"
          options={categories}
          control={control}
          error={errors.category}
          // required
          placeholder="Select Brand"
          placeholderColor="!text-white"
          inputstyle="bg-primary w-40 text-secondary outline-none border-transparent rounded !h-10 outline-none"
        />
        <SelectInput<SubCategoryFormData>
          label=""
          name="category"
          options={categories}
          control={control}
          error={errors.category}
          // required
          placeholder="Today"
          placeholderColor="!text-white"
          inputstyle="bg-primary w-40 text-secondary outline-none border-transparent rounded !h-10 outline-none"
        />
      </div>
    </div>
  );
};

export default ProductSelector;
