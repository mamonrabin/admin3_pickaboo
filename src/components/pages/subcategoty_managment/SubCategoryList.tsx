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
import EditSubCategory from "./EditSubCategory";
import { useState } from "react";
import { useDeleteSubCategory, useSubCategories } from "@/hooks/subCategory.hook";
import { BASE_URL } from "@/config";
import { TSubCategory } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";
import { toast } from "sonner";

const tableHeaders = [
  "SL",
  "SubCategory",
  "Category",
  "Sub Category Image",
  "Action",
];

const SubCategoryList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: subcategorysList,
    isLoading,
  } = useSubCategories(page, limit);

   const { mutate: deleteSubCategory } = useDeleteSubCategory();

  const subcategories = subcategorysList?.data?.data;
  const meta = subcategorysList?.data?.meta;

  const handleDelete = (id: string) => {
    toast("Delete Sub Category?", {
      description: "This sub category will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteSubCategory(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "Sub Category deleted successfully");
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to delete category",
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
      <h2 className="text-lg font-semibold capitalize">Sub Category List</h2>

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
            {subcategories?.length ? (
              subcategories?.map((subcategory: TSubCategory, index: number) => (
                <TableRow key={subcategory._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium capitalize">
                    {subcategory.subcategoryName}
                  </TableCell>
                  <TableCell className="font-medium capitalize">
                    {subcategory?.category?.categoryName}
                  </TableCell>
                  <TableCell className="">
                    <Image
                      width={300}
                      height={300}
                      src={BASE_URL + subcategory.image}
                      alt={subcategory.subcategoryName}
                      className="md:w-25 md:h-25 w-18 h-18 rounded object-cover"
                      unoptimized
                    />
                  </TableCell>
                  <TableCell className="flex md:mt-8 mt-4 gap-2">
                    <button 
                    onClick={() => handleDelete(subcategory._id)}
                    className="bg-destructive hover:bg-destructive/70 duration-300 cursor-pointer text-secondary px-2 py-2 rounded text-sm">
                      <Trash size={16} />
                    </button>

                    <EditSubCategory subcategory={subcategory} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableHeaders.length}
                  className="text-center py-10 text-muted-foreground"
                >
                  There are no sub categories.
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

export default SubCategoryList;
