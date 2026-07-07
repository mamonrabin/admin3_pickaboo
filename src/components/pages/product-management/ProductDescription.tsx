/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BASE_URL } from "@/config";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

const ProductDescription = ({ product }) => {
  const {
    title,
    mrpPrice,
    price,
    discount,
    discountType,
    quantity,
    soldQuantity,
    availableQuantity,
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
    metaKeywords,
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
        <SheetContent className="lg:!max-w-2xl !w-full !max-w-full  md:p-12 p-8 overflow-y-scroll">
          <div className="">
            <p className="text-lg font-medium capitalize">{title}</p>
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductDescription;
