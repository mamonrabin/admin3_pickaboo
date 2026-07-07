"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import shirt from "@/assets/products/product.webp";
import Image from "next/image";
import { Trash } from "lucide-react";
import Pagination from "@/reuseble_components/Paginations";
import EditProduct from "./EditProduct";
import { useAllProducts } from "@/hooks/product.hook";
import { useState } from "react";
import { BASE_URL } from "@/config";
import ProductDescription from "./ProductDescription";
import TableSkeleton from "@/reuseble_components/TableSkeleton";

const tableHeaders = [
  "SL",
  "Title",
  "Front-View",
  "Back-View",
  "Description",
  "Discount Type",
  "Discount",
  "MRP",
  "Price",
  "Inventory Type",
  "Inventory Details",
  "Quantity",
  "AvailableQuantity",
  "Category",
  "Subcategory",
  "Brand",
  "Action",
];

const ProductsList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: productsList, isLoading } = useAllProducts(page, limit);
  const products = productsList?.data?.data;
  const meta = productsList?.data?.meta;
  return (
    <div className="">
      <h2 className="text-lg font-semibold capitalize">Product List</h2>

      <Table className="mt-4 rounded-lg overflow-hidden">
        <TableHeader className="bg-primary">
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHead key={header} className="text-secondary">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TableSkeleton rows={5} />
        ) : (
          <TableBody>
            {products?.length ? (
              products?.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell className="text-center">{index + 1}</TableCell>

                  {/* Title */}
                  <TableCell className="text-center">{product.title}</TableCell>

                  {/* Front Image */}
                  <TableCell className="text-center">
                    <Image
                      src={BASE_URL + product.thumbnailImage}
                      alt={product.title}
                      width={60}
                      height={60}
                      className="mx-auto rounded"
                      unoptimized
                    />
                  </TableCell>

                  {/* Back Image */}
                  <TableCell className="text-center">
                    {
                      product.backviewImage ? <Image
                      src={BASE_URL + product.backviewImage}
                      alt={product.title}
                      width={60}
                      height={60}
                      className="mx-auto rounded"
                      unoptimized
                    /> : "N/A"
                    }
                    
                  </TableCell>

                  {/* Description */}
                  <TableCell className="">
                    <ProductDescription product={product} />
                  </TableCell>

                  {/* Discount Type */}
                  <TableCell className="text-center">
                    {product.discountType}
                  </TableCell>

                  {/* Discount */}
                  <TableCell className="text-center">
                    {product.discount}
                  </TableCell>

                  {/* MRP */}
                  <TableCell className="text-center">
                    {product.mrpPrice}
                  </TableCell>

                  {/* Price */}
                  <TableCell className="text-center">{product.price}</TableCell>

                  {/* Inventory Type */}
                  <TableCell className="text-center">
                    {product.inventoryType}
                  </TableCell>

                  {/* Inventories */}
                  <TableCell className="p-2 min-w-[500px]">
                    <div className="grid grid-cols-3 gap-2">
                      {product.inventories.map((item) => (
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
                  </TableCell>

                  {/* Quantity */}
                  <TableCell className="text-center">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="text-center">
                    {product.availableQuantity}
                  </TableCell>

                  {/* Category */}
                  <TableCell className="text-center">
                    {product.category.categoryName}
                  </TableCell>

                  {/* Sub Category */}
                  <TableCell className="text-center">
                    {product.subCategory ?  product.subCategory.subcategoryName : "N/A"}
                  </TableCell>

                  {/* Brand */}
                  <TableCell className="text-center">
                    {
                      product.brand ? product.brand.title : "N/A"
                    }
                   
                  </TableCell>

                  {/* Action */}
                  <TableCell>
                    <div className="flex gap-2">
                      <button className="bg-destructive hover:bg-destructive/70 duration-300 cursor-pointer text-secondary px-2 py-2 rounded text-sm">
                        <Trash size={16} />
                      </button>

                      <EditProduct />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableHeaders.length}
                  className="text-center py-10 text-muted-foreground"
                >
                  There are no products.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>

      <div className="py-4">
        <Pagination
          page={meta?.page}
          limit={meta?.limit}
          total={meta?.total}
          setPage={setPage}
          setLimit={setLimit}
        />
      </div>
    </div>
  );
};

export default ProductsList;
