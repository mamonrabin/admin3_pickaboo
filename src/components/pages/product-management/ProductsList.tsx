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
  "Category",
  "Subcategory",
  "Brand",
  "Action",
];

const products = [
  {
    id: 1,
    title: "Home Appliances",
    frontView: shirt,
    backView: shirt,
    description: "description",
    discountType: "Flat",
    discount: "৳ 50",
    mrp: "৳ 500",
    price: "৳ 450",
    inventoryType: "colorSize",
    inventory: [
      {
        size: "XL",
        color: "Red",
        quantity: 18,
        sold: 8,
        hold: 10,
      },
      
    ],
    quantity: 12,
    category: "category-01",
    subCategory: "subCategory-01",
    brand: "brand-1",
  },
  {
    id: 3,
    title: "Home Appliances",
    frontView: shirt,
    backView: shirt,
    description: "description",
    discountType: "Flat",
    discount: "৳ 50",
    mrp: "৳ 500",
    price: "৳ 450",
    inventoryType: "colorSize",
    inventory: [
      {
        size: "XL",
        color: "Red",
        quantity: 18,
        sold: 8,
        hold: 10,
      },
      {
        size: "XL",
        color: "Red",
        quantity: 18,
        sold: 8,
        hold: 10,
      },
      
    ],
    quantity: 12,
    category: "category-01",
    subCategory: "subCategory-01",
    brand: "brand-1",
  },
  {
    id: 3,
    title: "Home Appliances",
    frontView: shirt,
    backView: shirt,
    description: "description",
    discountType: "Flat",
    discount: "৳ 50",
    mrp: "৳ 500",
    price: "৳ 450",
    inventoryType: "colorSize",
    inventory: [
      {
        size: "XL",
        color: "Red",
        quantity: 18,
        sold: 8,
        hold: 10,
      },
      {
        size: "XL",
        color: "Red",
        quantity: 18,
        sold: 8,
        hold: 10,
      },
      {
        size: "XL",
        color: "Red",
        quantity: 18,
        sold: 8,
        hold: 10,
      },
      
    ],
    quantity: 12,
    category: "category-01",
    subCategory: "subCategory-01",
    brand: "brand-1",
  },
  {
    id: 4,
    title: "Home Appliances",
    frontView: shirt,
    backView: shirt,
    description: "description",
    discountType: "Flat",
    discount: "৳ 50",
    mrp: "৳ 500",
    price: "৳ 450",
    inventoryType: "colorSize",
    inventory: [
      {
        size: "XL",
        color: "Red",
        quantity: 18,
        sold: 8,
        hold: 10,
      },
      {
        size: "XL",
        color: "Red",
        quantity: 18,
        sold: 8,
        hold: 10,
      },
      {
        size: "XL",
        color: "Red",
        quantity: 18,
        sold: 8,
        hold: 10,
      },
      {
        size: "XL",
        color: "Red",
        quantity: 18,
        sold: 8,
        hold: 10,
      },
      
    ],
    quantity: 12,
    category: "category-01",
    subCategory: "subCategory-01",
    brand: "brand-1",
  },
];



const ProductsList = () => {
  return (
    <div className="">
      <h2 className="text-lg font-semibold capitalize">Product List</h2>

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
        <TableBody>
  {products.map((product, index) => (
    <TableRow key={product.id}>
      <TableCell className="text-center">{index + 1}</TableCell>

      <TableCell className="text-center">{product.title}</TableCell>

      <TableCell className="text-center">
        <Image
          src={product.frontView}
          alt="front"
          width={60}
          height={60}
        />
      </TableCell>

      <TableCell className="text-center">
        <Image
          src={product.backView}
          alt="back"
          width={60}
          height={60}
        />
      </TableCell>

      <TableCell className="text-center">
        {product.description}
      </TableCell>

      <TableCell className="text-center">
        {product.discountType}
      </TableCell>

      <TableCell className="text-center">
        {product.discount}
      </TableCell>

      <TableCell className="text-center">
        {product.mrp}
      </TableCell>

      <TableCell className="text-center">
        {product.price}
      </TableCell>

      <TableCell className="text-center">
        {product.inventoryType}
      </TableCell>

      <TableCell className="p-2 min-w-[500px]">
  <div className="grid grid-cols-3 gap-2">
    {product.inventory.map((item, index) => (
      <div
        key={index}
        className="bg-secondary shadow-xs hover:shadow-md duration-300 cursor-pointer border border-[#262626]/10 rounded p-3 text-[12px] font-medium"
      >
        <div>
          <p>Size: {item.size}</p>
          <p>Color: {item.color}</p>
          <p>Quantity: {item.quantity}</p>
        </div>

        <div className="mt-2">
          <p className="text-[#6967E7]">
            Sold Quantity: {item.sold}
          </p>
          <p className="text-orange-500">
            Hold Quantity: {item.hold}
          </p>
        </div>
      </div>
    ))}
  </div>
</TableCell>

      <TableCell className="text-center">
        {product.quantity}
      </TableCell>

      <TableCell className="text-center">
        {product.category}
      </TableCell>

      <TableCell className="text-center">
        {product.subCategory}
      </TableCell>

      <TableCell className="text-center">
        {product.brand}
      </TableCell>

      <TableCell>
        <div className="flex   gap-2">
          <button className="bg-destructive hover:bg-destructive/70 duration-300 cursor-pointer text-secondary px-2 py-2 rounded text-sm">
            <Trash size={16} />
          </button>

          <EditProduct />
        </div>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
      </Table>

      <div className="py-4">
        <Pagination />
      </div>
    </div>
  );
};

export default ProductsList;
