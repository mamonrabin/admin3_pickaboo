"use client"
import { Calendar, Download } from "lucide-react";
import React from "react";
import DashboardStats from "./DashboardStats";
import { useAllDashboardStats, useAllOrdersStats, useAllProductsStats, useAllUserStats } from "@/hooks/stats.hook";
import OrderStats from "./OrderStats";
import RevenueNCategory from "./RevenueNCategory";
import StatusNStockAlert from "./StatusNStockAlert";

const Overview = () => {
    const {data:dashboardStats} = useAllDashboardStats()
    const {data:ordersStats} = useAllOrdersStats()
    const {data:userStats} = useAllUserStats()
    const {data:productStats} = useAllProductsStats()
    const statsData = dashboardStats?.data
    const orderData = ordersStats?.data
    const userData = userStats?.data
    const productData = productStats?.data
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome back! Here s what s happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-3 sm:mt-0">
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200 shadow-sm">
            <Calendar size={16} className="text-gray-400" />
            <select className="bg-transparent outline-none text-sm text-gray-700">
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <DashboardStats statsData={statsData}/>
      <OrderStats orderData={orderData} userData={userData}/>
      <RevenueNCategory orderData={orderData}/>

      <StatusNStockAlert userData={userData} orderData={orderData} lowStockAlert={productData?.lowStockAlerts}/>
    </div>
  );
};

export default Overview;
