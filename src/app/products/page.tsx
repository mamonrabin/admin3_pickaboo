"use client";

import ProductSelector from "@/components/pages/product-management/ProductSelector";
import ProductsList from "@/components/pages/product-management/ProductsList";
import { useAllProducts } from "@/hooks/product.hook";
import React, { useState } from "react";

const Products = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [category, setCategory] = useState<string>();
  const [subCategory, setSubCategory] = useState<string>();
  const [brand, setBrand] = useState<string>();
 const [dateFilter, setDateFilter] = useState<string>();

  const { data: productsList, isLoading } = useAllProducts({
    page,
    limit,
    category,
    subCategory,
    brand,
    dateFilter
  });
  const products = productsList?.data?.data;
  const meta = productsList?.data?.meta;
  return (
    <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
      <ProductSelector
        setCategory={setCategory}
        setSubCategory={setSubCategory}
        setBrand={setBrand}
        setDateFilter={setDateFilter}
      />
      <ProductsList
        products={products}
        meta={meta}
        setPage={setPage}
        setLimit={setLimit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Products;
