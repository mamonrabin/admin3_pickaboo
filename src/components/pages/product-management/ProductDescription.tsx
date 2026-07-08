/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BASE_URL } from "@/config";
import { TProduct } from "@/types";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import React from "react";

interface productDescriptionProps {
  product: TProduct;
}

const ProductDescription: React.FC<productDescriptionProps> = ({ product }) => {
  const {
    title,
    mrpPrice,
    price,
    discount,
    discountType,
    quantity,
    soldQuantity,
    availableQuantity = 0,
    description,
    sku,
    category,
    subCategory,
    brand,
    thumbnailImage,
    backviewImage,
    images,
    freeShipping,
    inventoryType,
    inventories,
    stock_status,
    label,
    tags,
    averageRating,
    totalReviews,
    specifications,
    metaTitle,
    metaDescription,
  } = product;

  // const allImages = [thumbnailImage, backviewImage, ...images];
  const allImages = [
    thumbnailImage,
    ...(backviewImage ? [backviewImage] : []),
    ...(images ?? []),
  ];

  console.log("-------------------------images----------------", allImages);

  return (
    <div>
      <Sheet>
        <SheetTrigger className="ml-8 cursor-pointer">
          <Ellipsis size={16} />
        </SheetTrigger>
        {/* <SheetContent className="lg:!max-w-4xl !w-full !max-w-full  md:p-12 p-8 overflow-y-scroll">
          <div className="">
            <p className="text-lg font-medium capitalize"><span className="text-sm">Product Title : </span>
              {title}</p>
            <p
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />

            <p>
              <span>Product Specifications : </span>
              {specifications
                ? specifications?.map((item, index) => (
                    <p key={index}>
                      <span>{item.key}</span> <span>{item.value}</span>
                    </p>
                  ))
                : "N/A"}
            </p>
            <p>
              <span>Product Tags : </span> {tags ? tags : "N/A"}
            </p>
            <p>
              {" "}
              <span>Product SKU : </span>
              {sku}
            </p>
            <div>
              <p>
                {" "}
                <span>MRP Price : </span>
                {mrpPrice}
              </p>
              <p>
                <span>Discount Type : </span>{" "}
                {discountType ? discountType : "N/A"}
              </p>
              <p>
                <span>Discount : </span> {discount}
              </p>
              <p>
                <span>Price : </span> {price}
              </p>
            </div>
            <div>
              <p>
                {" "}
                <span>Totla Quantity : </span>
                {quantity}
              </p>
              <p>
                <span>Sold Quantity : </span> {soldQuantity}
              </p>
              <p>
                <span>Available Quantity : </span> {availableQuantity}
              </p>
            </div>

            <div>
              <p>
                {" "}
                <span>Shipping : </span>
                {freeShipping ? freeShipping : "N/A"}
              </p>
              <p>
                <span>Product Label : </span> {label ? label : "N/A"}
              </p>
              <p>
                <span>Stock Status : </span>{" "}
                {stock_status ? stock_status : "N/A"}
              </p>
            </div>

            <div>
              <p>Images</p>
              <div className="flex items-center gap-2">
                {allImages?.map((image, index) => (
                  <Image
                    key={index}
                    src={`${BASE_URL}${image}`}
                    alt={`Product image ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-cover"
                    unoptimized
                  />
                ))}
              </div>
            </div>

            <div>
              <p>
                <span>Inventory Type : </span> {inventoryType}
              </p>
              <div className="flex items-center flex-wrap gap-2">
                {inventories?.map((item) => (
                  <div
                    key={item._id}
                    className="bg-secondary shadow-xs hover:shadow-md duration-300 border rounded p-3 text-[13px] font-medium"
                  >
                    <p>Size: {item.size}</p>
                    <p>Color: {item.colorName}</p>
                    <p>Quantity: {item.quantity}</p>
                    <div className="mt-2 flex flex-col gap-0.5">
                      <p>Sold Quantity: {item.soldQuantity || 0}</p>
                      <p>Hold Quantity: {item.holdQuantity || 0}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p>
                {" "}
                <span>Category : </span>
                {category.categoryName}
              </p>
              <p>
                <span>Subcategory : </span>{" "}
                {subCategory ? subCategory.subcategoryName : "N/A"}
              </p>
              <p>
                <span>Brand : </span> {brand ? brand.title : "N/A"}
              </p>
            </div>
            <div>
              <p>
                {" "}
                <span>Average Rating : </span>
                {averageRating}
              </p>
              <p>
                <span>Total Reviews : </span> {totalReviews}
              </p>
            </div>
            <div>
              <p>
                {" "}
                <span>meta Title : </span>
                products
              </p>
              <p>
                <span>metaDescription : </span> metaDescription
              </p>
              <p>
                <span>metaKeywords : </span> {metaKeywords || "products"}
              </p>
            </div>

            <p>warranty : jgfjgfgf</p>
          </div>
        </SheetContent> */}

        <SheetContent className="lg:!max-w-4xl !w-full !max-w-full md:p-8 p-6 overflow-y-scroll bg-gray-50/50">
          <div className="space-y-8">
            {/* Product Title Section */}
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-500 mt-1">SKU: {sku}</p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                Description
              </h3>
              <div
                className="prose prose-sm max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>

            {/* Key Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pricing Card */}
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Pricing
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">MRP Price</span>
                    <span className="font-medium text-gray-900">
                      ৳{mrpPrice}
                    </span>
                  </div>
                  {discountType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-medium text-green-600">
                        {discount}% ({discountType})
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="text-gray-800 font-semibold">
                      Final Price
                    </span>
                    <span className="font-bold text-lg text-blue-600">
                      ৳{price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stock Card */}
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Inventory
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Quantity</span>
                    <span className="font-medium text-gray-900">
                      {quantity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sold</span>
                    <span className="font-medium text-orange-600">
                      {soldQuantity}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="text-gray-800 font-semibold">
                      Available
                    </span>
                    <span
                      className={`font-bold ${availableQuantity > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {availableQuantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications */}
            {specifications && specifications.length > 0 && (
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {specifications.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="font-medium text-gray-700">
                        {item.key}:
                      </span>
                      <span className="text-gray-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags & Labels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags && tags.length > 0 ? (
                    tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
                      >
                        #{tag.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No tags available
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Status
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stock Status</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        stock_status === "In Stock"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {stock_status || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{freeShipping || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Label</span>
                    <span className="font-medium">{label || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Images */}
            {allImages && allImages.length > 0 && (
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Images
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {allImages.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden border border-gray-200"
                    >
                      <Image
                        src={`${BASE_URL}${image}`}
                        alt={`Product image ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inventory Details */}
            {inventories && inventories.length > 0 && (
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Inventory Variants
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  Type: {inventoryType}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {inventories.map((item) => (
                    <div
                      key={item._id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-400 transition-colors"
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-800">
                            Size {item.size}
                          </span>
                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                            {item.colorName}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Quantity</span>
                          <span className="font-medium">{item.quantity}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Sold</span>
                          <span className="text-orange-600">
                            {soldQuantity || 0}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Hold</span>
                          <span className="text-yellow-600">0</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category & Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Category
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">
                      {category?.categoryName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subcategory</span>
                    <span className="font-medium">
                      {subCategory?.subcategoryName || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brand</span>
                    <span className="font-medium">{brand?.title || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Reviews
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Rating</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-lg">★</span>
                      <span className="font-bold text-gray-900">
                        {averageRating || "0"}
                      </span>
                      <span className="text-gray-400 text-sm">/ 5</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Reviews</span>
                    <span className="font-medium">{totalReviews || "0"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Section */}
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                SEO Settings
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Meta Title</p>
                  <p className="text-sm font-medium text-gray-800">
                    {metaTitle}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Meta Description</p>
                  <p className="text-sm text-gray-600">{metaDescription}</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-100/70 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Warranty:</span> jgfjgfgf
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductDescription;
