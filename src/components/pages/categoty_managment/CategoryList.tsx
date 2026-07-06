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

import { Trash } from "lucide-react";
import EditCategory from "./EditCategory";
import Pagination from "@/reuseble_components/Paginations";
import { useCategories, useDeleteCategory } from "@/hooks/category.hook";
import { useState } from "react";
import page from "@/app/products/create-product/page";
import { BASE_URL } from "@/config";
import Image from "next/image";
import { toast } from "sonner";
import { TCategory } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";

const tableHeaders = [
  "SL",
  "Category Name",
  "title",
  "Category Image",
  "Action",
];

const CategoryList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: categorysList,
    isLoading,
    isError,
  } = useCategories(page, limit);
  const { mutate: deleteCategory } = useDeleteCategory();

  const categories = categorysList?.data?.data;
  const meta = categorysList?.data?.meta;

  const handleDelete = (id: string) => {
    toast("Delete Category?", {
      description: "This category will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteCategory(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "Category deleted successfully");
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
      <h2 className="text-lg font-semibold capitalize">Category List</h2>

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
        {
          isLoading ? (
            <TableSkeleton rows={5} />
          ):(<TableBody>
          {categories?.length ? (
            categories.map((category: TCategory, index: number) => (
              <TableRow key={category._id}>
                <TableCell>{index + 1}</TableCell>

                <TableCell className="capitalize">
                  {category.categoryName}
                </TableCell>

                <TableCell className="capitalize">{category.title}</TableCell>

                <TableCell>
                  <Image
                    width={300}
                    height={300}
                    src={BASE_URL + category.image}
                    alt={category.categoryName}
                    className="md:w-25 md:h-25 w-18 h-18 rounded object-cover"
                    unoptimized
                  />
                </TableCell>

                <TableCell className="flex md:mt-8 mt-4 gap-2">
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-destructive hover:bg-destructive/70 duration-300 cursor-pointer text-secondary px-2 py-2 rounded text-sm"
                  >
                    <Trash size={16} />
                  </button>

                  <EditCategory category={category} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableHeaders.length}
                className="text-center py-10 text-muted-foreground"
              >
                There are no categories.
              </TableCell>
            </TableRow>
          )}
        </TableBody>)
        }
        
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

export default CategoryList;
