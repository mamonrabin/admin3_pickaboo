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

import { Trash, FolderOpen } from "lucide-react";

import { BASE_URL } from "@/config";
import Image from "next/image";
import { toast } from "sonner";
import { TBanner } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";
import { useAllBanners } from "@/hooks/banner.hook";
import { useDeleteCategory } from "@/hooks/category.hook";
import EditBanner from "./EditBanner";

const tableHeaders = [
  "#",
  "title",
  "image",
  "type",
  "description",
  "category",
  "link",
  "Actions",
];

const BannerList = () => {
  const { data: bannerList, isLoading } = useAllBanners();
  const { mutate: deleteCategory } = useDeleteCategory();

  const banners = bannerList?.data;
  //   const meta = bannersList?.data?.meta;

  console.log("---banner---",banners)

  const handleDelete = (id: string) => {
    toast("Delete Category?", {
      description: "This banner will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteCategory(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "Category deleted successfully");
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to delete banner",
              );
            },
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 10000,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2.5 rounded-lg">
            <FolderOpen size={20} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Banner List</h2>
            <p className="text-sm text-gray-500">
              Total{" "}
              <span className="font-semibold text-gray-700">
                {/* {meta?.total || 0} */}0
              </span>{" "}
              banner
            </p>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-transparent border-b border-gray-200">
              {tableHeaders.map((header) => (
                <TableHead
                  key={header}
                  className="text-xs font-semibold text-gray-600 uppercase tracking-wider py-3 px-4"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <TableSkeleton rows={5} />
          ) : (
            <TableBody>
              {banners?.length ? (
                banners.map((banner: TBanner, index: number) => (
                  <TableRow
                    key={banner._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-3 px-4 text-sm text-gray-500 font-medium text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900 capitalize">
                        {banner.title || "N/A"}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        <Image
                          width={300}
                          height={300}
                          src={BASE_URL + banner.image}
                          alt="banner"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                    </TableCell>


                     <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        {banner.type || "N/A"}
                      </span>
                    </TableCell>
                     <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        {banner.description || "N/A"}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        {banner?.category?.categoryName || "N/A"}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        {banner.link || "N/A"}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(banner._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:shadow-sm"
                        >
                          <Trash size={16} />
                        </button>
                        <EditBanner banner={banner}/>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableHeaders.length}
                    className="text-center py-16 text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <FolderOpen size={32} className="text-gray-300" />
                      </div>
                      <p className="text-lg font-medium text-gray-700">
                        No categories found
                      </p>
                      <p className="text-sm text-gray-400">
                        Start by adding your first banner
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default BannerList;
