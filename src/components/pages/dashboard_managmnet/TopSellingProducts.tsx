/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TProductStats } from "@/types";
import { Package, PieChartIcon, DollarSign } from "lucide-react";
import Link from "next/link";
import React from "react";

const StatsCard = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  color,
}: any) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-base font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`${color} p-1.5 rounded-lg`}>
        <Icon size={12} className="text-white" />
      </div>
    </div>
  </div>
);

const formatCurrency = (amount: number) => `৳${amount.toLocaleString()}`;

interface productDataProps {
  productData: TProductStats;
}

const TopSellingProducts: React.FC<productDataProps> = ({ productData }) => {
  const highestOrderProduct = productData?.totalHighestOrderProduct;
  const inventoryValueStats = productData?.inventoryValueStats;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">
              Top Selling Products
            </h3>
            <p className="text-xs text-gray-400">Most ordered products</p>
          </div>
          <Link href="/top_sell">
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer">
              View All
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  #
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  Sold
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  Orders
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {highestOrderProduct?.slice(0, 5).map((p, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-500">
                    {i + 1}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">
                      {p.name}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {p.totalSold}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {p.totalOrders} orders
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">
                    {formatCurrency(p.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Returns */}
      <div className="grid  gap-4 mb-6">
        <div className="grid grid-cols-2 gap-2">
          <StatsCard
            title="Total Products"
            value={inventoryValueStats?.[0]?.totalProducts || 0}
            isPositive
            icon={Package}
            color="bg-purple-500"
          />
          <StatsCard
            title="total Stock"
            value={inventoryValueStats?.[0]?.totalStock || 0}
            isPositive
            icon={PieChartIcon}
            color="bg-green-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <StatsCard
            title="MRP Value"
            value={formatCurrency(inventoryValueStats?.[0]?.totalMRPValue || 0)}
            isPositive
            icon={DollarSign}
            color="bg-orange-500"
          />
          <StatsCard
            title="Selling Value"
            value={formatCurrency(inventoryValueStats?.[0]?.totalSellingValue || 0)}
            isPositive
            icon={DollarSign}
            color="bg-[#3B82F6]"
          />
        </div>
        <StatsCard
          title="Discount Value"
          value={formatCurrency(inventoryValueStats?.[0]?.totalDiscountValue || 0)}
          isPositive
          icon={DollarSign}
          color="bg-[#06B6D4]"
        />
      </div>
    </div>
  );
};

export default TopSellingProducts;
