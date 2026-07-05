import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import c1 from "@/assets/category/c1.jpg";
import c2 from "@/assets/category/c2.jpg";
import c3 from "@/assets/category/c3.jpg";
import c4 from "@/assets/category/c4.jpg";
import Image from "next/image";
import { Trash } from "lucide-react";
import Pagination from "@/reuseble_components/Paginations";
import EditSubCategory from "./EditSubCategory";

const tableHeaders = ["SL", "SubCategory", "Category", "Sub Category Image", "Action"];

const subcategories = [
  {
    id: 1,
    name: "Home Appliances",
    subCategory: "Washing Machine",
    title: "Official Warranty | EMI with 34 Banks",
    image: c1,
  },
  {
    id: 2,
    name: "Smartphone Series",
    subCategory: "Smartphone",
    title: "Official Warranty | EMI with 34 Banks",
    image: c2,
  },
  {
    id: 3,
    name: "Deals on Gadgets",
    subCategory: "Gadgets",
    title: "Official Warranty | EMI with 34 Banks",
    image: c3,
  },
  {
    id: 4,
    name: "Home Appliances",
    subCategory: "Washing Machine",
    title: "Official Warranty | EMI with 34 Banks",
    image: c4,
  },
];

const SubCategoryList = () => {
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
        <TableBody className="">
          {subcategories.map((subcategory) => (
            <TableRow key={subcategory.id}>
              <TableCell className="font-medium">{subcategory.id}</TableCell>
              <TableCell className="font-medium capitalize">{subcategory.subCategory}</TableCell>
              <TableCell className="font-medium capitalize">{subcategory.name}</TableCell>
              <TableCell className="">
                <Image
                  width={300}
                  height={300}
                  src={subcategory.image}
                  alt={subcategory.name}
                  className="md:w-25 md:h-25 w-18 h-18 rounded object-cover"
                />
              </TableCell>
              <TableCell className="flex md:mt-8 mt-4 gap-2">
                <button className="bg-destructive hover:bg-destructive/70 duration-300 cursor-pointer text-secondary px-2 py-2 rounded text-sm">
                  <Trash size={16} />
                </button>

             
              <EditSubCategory/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="py-4">
        <Pagination/>
      </div>
    </div>
  );
};

export default SubCategoryList;
