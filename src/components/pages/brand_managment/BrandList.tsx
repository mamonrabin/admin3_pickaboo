/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { Trash } from "lucide-react";
import Pagination from "@/reuseble_components/Paginations";
import EditBrand from "./EditBrand";
import { useState } from "react";

import { BASE_URL } from "@/config";
import { useBrands, useDeleteBrand } from "@/hooks/brand.hook";
import { TBrand } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";
import { toast } from "sonner";

const tableHeaders = ["SL", "Brand Name", "Brand Image", "Action"];

const BrandList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: brandList, isLoading } = useBrands(page, limit);
   const { mutate: deleteBrand } = useDeleteBrand();

  const brands = brandList?.data?.data;
  const meta = brandList?.data?.meta;


  
  const handleDelete = (id: string) => {
    toast("Delete Brand?", {
      description: "This brand will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteBrand(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "Brand deleted successfully");
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to delete brand",
              );
            },
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 10000, // Keeps the confirmation toast visible for 10 seconds
    });
  };

  return (
    <div className="">
      <h2 className="text-lg font-semibold capitalize">Brand List</h2>

      <Table className="mt-4 rounded-lg overflow-hidden">
        <TableHeader className="bg-primary">
          <TableRow className="">
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
          <TableBody className="">
            {brands?.length ? (
              brands?.map((brand: TBrand, index: number) => (
                <TableRow key={brand._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium capitalize">
                    {brand.title}
                  </TableCell>
                  <TableCell className="">
                    <Image
                      width={300}
                      height={300}
                      src={BASE_URL + brand.image}
                      alt={brand.title}
                      className="md:w-25 md:h-25 w-18 h-18 rounded object-cover"
                      unoptimized
                    />
                  </TableCell>
                  <TableCell className="flex md:mt-8 mt-4 gap-2">
                    <button 
                    onClick={() => handleDelete(brand._id)}
                    
                    className="bg-destructive hover:bg-destructive/70 duration-300 cursor-pointer text-secondary px-2 py-2 rounded text-sm">
                      <Trash size={16} />
                    </button>

                    <EditBrand brand = {brand} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableHeaders.length}
                  className="text-center py-10 text-muted-foreground"
                >
                  There are no brands.
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

export default BrandList;
