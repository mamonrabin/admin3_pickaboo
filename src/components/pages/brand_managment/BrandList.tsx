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
import EditBrand from "./EditBrand";

const tableHeaders = ["SL", "Brand Name", "Brand Image", "Action"];

const brands = [
  {
    id: 1,
    name: "Home Appliances",
    title: "Official Warranty | EMI with 34 Banks",
    image: c1,
  },
  {
    id: 2,
    name: "Smartphone Series",
    title: "Official Warranty | EMI with 34 Banks",
    image: c2,
  },
  {
    id: 3,
    name: "Deals on Gadgets",
    title: "Official Warranty | EMI with 34 Banks",
    image: c3,
  },
  {
    id: 4,
    name: "Home Appliances",
    title: "Official Warranty | EMI with 34 Banks",
    image: c4,
  },
];

const BrandList = () => {
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
        <TableBody className="">
          {brands.map((brand) => (
            <TableRow key={brand.id}>
              <TableCell className="font-medium">{brand.id}</TableCell>
              <TableCell className="font-medium capitalize">{brand.name}</TableCell>
              <TableCell className="">
                <Image
                  width={300}
                  height={300}
                  src={brand.image}
                  alt={brand.name}
                  className="md:w-25 md:h-25 w-18 h-18 rounded object-cover"
                />
              </TableCell>
              <TableCell className="flex md:mt-8 mt-4 gap-2">
                <button className="bg-destructive hover:bg-destructive/70 duration-300 cursor-pointer text-secondary px-2 py-2 rounded text-sm">
                  <Trash size={16} />
                </button>

             
                <EditBrand/>
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

export default BrandList;
