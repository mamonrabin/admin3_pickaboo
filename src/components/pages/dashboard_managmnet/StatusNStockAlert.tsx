"use client";
import { TUserStats } from "@/types";
import React from "react";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Order Status Data
const orderStatuses = [
  { status: "Delivered", count: 45, percentage: 45, color: "#10b981" },
  { status: "Processing", count: 28, percentage: 28, color: "#3b82f6" },
  { status: "Shipped", count: 15, percentage: 15, color: "#8b5cf6" },
  { status: "Pending", count: 8, percentage: 8, color: "#f59e0b" },
  { status: "Cancelled", count: 4, percentage: 4, color: "#ef4444" },
];

// Low Stock Alerts Data
const lowStockItems = [
  {
    name: "Smart Watch",
    stock: 5,
    threshold: 10,
    status: "Critical",
    color: "red",
  },
  {
    name: "Wireless Earbuds",
    stock: 8,
    threshold: 15,
    status: "Low",
    color: "yellow",
  },
  {
    name: "USB-C Cable",
    stock: 3,
    threshold: 20,
    status: "Critical",
    color: "red",
  },
  {
    name: "Phone Case",
    stock: 12,
    threshold: 15,
    status: "Low",
    color: "yellow",
  },
];

// const userData = {
//   totalUsers: 2456,
//   totalActiveUsers: 2150,
//   totalInActiveUsers: 306,
//   totalBlockedUsers: 45,
//   newUsersInLast7Days: 120,
//   newUsersInLast30Days: 450,
//   usersByRole: [
//     { _id: "USER", count: 2356 },
//     { _id: "ADMIN", count: 5 },
//     { _id: "SELLER", count: 95 }
//   ]
// };

interface StatusNStockAlertProps {
  userData: TUserStats;
}

const StatusNStockAlert: React.FC<StatusNStockAlertProps> = ({ userData }) => {
  const userStatusData = [
    {
      name: "Active Users",
      value: userData?.totalActiveUsers ?? 0,
      color: "#10b981",
    },
    {
      name: "Inactive Users",
      value: userData?.totalInActiveUsers ?? 0,
      color: "#f59e0b",
    },
    {
      name: "Blocked Users",
      value: userData?.totalBlockedUsers ?? 0,
      color: "#ef4444",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-6">
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          User Status
        </h3>

        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={userStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                label={({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {userStatusData.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value: number) => [value.toLocaleString(), "Users"]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {userStatusData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-600">{item.name}</span>
              <span className="text-xs font-semibold text-gray-900">
                ({item.value.toLocaleString()})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Order Status Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">
              Order Status
            </h3>
            <p className="text-xs text-gray-400">Current order distribution</p>
          </div>
        </div>
        <div className="space-y-3">
          {orderStatuses.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between text-sm mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600">{item.status}</span>
                </div>
                <span className="font-medium text-gray-900">{item.count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">
              Low Stock Alerts
            </h3>
            <p className="text-xs text-gray-400">Items needing restock</p>
          </div>
          <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
            2 Critical
          </span>
        </div>
        <div className="space-y-3">
          {lowStockItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-400">
                  Stock: {item.stock} / {item.threshold}
                </p>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  item.color === "red"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusNStockAlert;
