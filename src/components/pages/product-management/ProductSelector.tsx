"use client";
import SelectInput from "@/reuseble_components/SelectInput";
import { FilePlus, Filter, X } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { useAllCategories } from "@/hooks/category.hook";
import { TBrand, TCategory, TSubCategory } from "@/types";
import { useAllSubCategories } from "@/hooks/subCategory.hook";
import { useAllBrands } from "@/hooks/brand.hook";

type SubCategoryFormData = {
  title: string;
  category: string;
  subCategory: string;
  brand: string;
  date: string;
};

interface ProductProps {
  setCategory: (value?: string) => void;
  setSubCategory: (value?: string) => void;
  setBrand: (value?: string) => void;
  setDateFilter: (value?: string) => void;
}

const ProductSelector: React.FC<ProductProps> = ({
  setCategory,
  setSubCategory,
  setBrand,
  setDateFilter,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data: categoryList } = useAllCategories();
  const { data: subCategoryList } = useAllSubCategories();
  const { data: brandList } = useAllBrands();

  const categories = categoryList?.data?.data;
  const subCategories = subCategoryList?.data?.data;
  const brands = brandList?.data?.data;

  const filteredSubCategories = selectedCategory
    ? subCategories?.filter(
        (sub: TSubCategory) => sub.category._id === selectedCategory,
      )
    : [];

  const dates = [
    { label: "Today", value: "today" },
    { label: "yesterday", value: "yesterday" },
    { label: "This Week", value: "this-week" },
    { label: "This Month", value: "this-month" },
    { label: "This Year", value: "this-year" },
  ];

  const {
    control,
    setValue,
    reset,
    // formState: { errors },
  } = useForm<SubCategoryFormData>();

  const handleReset = () => {
  reset();

  setSelectedCategory("");
  setCategory(undefined);
  setSubCategory(undefined);
  setBrand(undefined);
  setDateFilter(undefined);
  setValue("subCategory", "");
};

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2.5 rounded">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <div>
            <h2 className="md:text-xl text-lg font-bold text-gray-900">
              Products
            </h2>
            <p className="text-sm text-gray-500">
              Total <span className="font-semibold text-gray-700">120</span>{" "}
              products
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden p-2.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <Filter size={18} className="text-gray-600" />
          </button>

          <Link href="products/create-product">
            <div
              className="md:px-6 px-4 py-2.5 inline-flex items-center justify-center rounded
             bg-blue-600 hover:bg-blue-700 transition-all duration-300
              text-white text-sm font-medium cursor-pointer shadow-sm hover:shadow-md"
            >
              <FilePlus size={18} className="md:mr-2" />
              <span className="hidden md:flex">Add Product</span>
            </div>
          </Link>

          {/* <SelectorSideBar /> */}
        </div>
      </div>

      {/* Filters Section - Desktop */}
      <div className="hidden lg:flex lg:flex-nowrap flex-wrap items-center gap-3 mt-5 pt-5 border-t border-gray-200">
        <SelectInput<SubCategoryFormData>
          label=""
          name="category"
          control={control}
          options={categories?.map((category: TCategory) => ({
            label: category.categoryName,
            value: category._id,
          }))}
          onValueChange={(value) => {
            setSelectedCategory(value);
            setCategory(value);

            // Clear previous subcategory
            setSubCategory(undefined);
            setValue("subCategory", "");
          }}
          placeholder="Select Category"
          inputstyle="bg-gray-50 w-full text-gray-700 border border-gray-300 rounded !h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />

        <SelectInput<SubCategoryFormData>
          label=""
          name="subCategory"
          control={control}
          disabled={!selectedCategory}
          options={filteredSubCategories?.map((sub: TSubCategory) => ({
            label: sub.subcategoryName,
            value: sub._id,
          }))}
          onValueChange={(value) => {
            setSubCategory(value);
          }}
          placeholder="Select Category"
          inputstyle="bg-gray-50 w-full text-gray-700 border border-gray-300 rounded !h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />

        <SelectInput<SubCategoryFormData>
          label=""
          name="brand"
          options={brands?.map((brand: TBrand) => ({
            label: brand.title,
            value: brand._id,
          }))}
          control={control}
          onValueChange={(value) => {
            setBrand(value);
          }}
          placeholder="Select brand"
          inputstyle="bg-gray-50 w-full text-gray-700 border border-gray-300 rounded !h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />

        <SelectInput<SubCategoryFormData>
          label=""
          name="date"
          options={dates}
          control={control}
          onValueChange={(value) => {
            setDateFilter(value);
          }}
          placeholder="Select date"
          placeholderColor="!text-gray-600"
          inputstyle="bg-gray-50 w-full text-gray-700 border border-gray-300 rounded !h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />

        <button
          className="px-4  py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
        >
          Apply
        </button>

        <button
           onClick={handleReset}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="lg:hidden mt-4 p-4 bg-gray-50 rounded border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          <div className="space-y-3">
            <SelectInput<SubCategoryFormData>
              label=""
              name="category"
              control={control}
              options={categories?.map((category: TCategory) => ({
                label: category.categoryName,
                value: category._id,
              }))}
              onValueChange={(value) => {
                setSelectedCategory(value);
                setCategory(value);

                // Clear previous subcategory
                setSubCategory(undefined);
                setValue("subCategory", "");
              }}
              placeholder="Select Category"
              placeholderColor="!text-gray-600"
              inputstyle="bg-white w-full text-gray-700 border border-gray-300 rounded !h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />

            <SelectInput<SubCategoryFormData>
              label=""
              name="subCategory"
              control={control}
              disabled={!selectedCategory}
              options={filteredSubCategories?.map((sub: TSubCategory) => ({
                label: sub.subcategoryName,
                value: sub._id,
              }))}
              onValueChange={(value) => {
                setSubCategory(value);
              }}
              placeholder="Select SubCategory"
              placeholderColor="!text-gray-600"
              inputstyle="bg-white w-full text-gray-700 border border-gray-300 rounded !h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />

            <SelectInput<SubCategoryFormData>
              label=""
              name="brand"
              options={brands?.map((brand: TBrand) => ({
                label: brand.title,
                value: brand._id,
              }))}
              control={control}
              onValueChange={(value) => {
                setBrand(value);
              }}
              placeholder="Select brand"
              placeholderColor="!text-gray-600"
              inputstyle="bg-white w-full text-gray-700 border border-gray-300 rounded !h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />

            <SelectInput<SubCategoryFormData>
              label=""
              name="date"
              options={dates}
              control={control}
              onValueChange={(value) => {
                setDateFilter(value);
              }}
              placeholder="Select date"
              placeholderColor="!text-gray-600"
              inputstyle="bg-white w-full text-gray-700 border border-gray-300 rounded !h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />

            <div className="flex gap-2 pt-2">
              <button
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
              >
                Apply Filters
              </button>
              <button
                 onClick={handleReset}
                className="flex-1 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSelector;
