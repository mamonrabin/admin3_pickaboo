"use client";

import { 
  ShoppingBag, 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  UserPlus,
  UserCheck,
  Star,
  Eye,
  ShoppingCart,
  Truck,
  CreditCard,
  UserX,
  UserCog,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  MoreHorizontal,
  User,
  UserMinus,
  UserX as UserBlocked,
  Tag,
  Mail,
  AlertCircle,
  Bell,
  MapPin,
  Wallet,
  RotateCcw,
  Globe,
  Monitor,
  Smartphone,
  Tablet
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { useState } from "react";
import Image from "next/image";

// Demo Data
const orderData = {
  totalOrder: 156,
  totalOrderByCategory: [
    { categoryName: "Electronics", totalOrders: 45 },
    { categoryName: "Fashion", totalOrders: 38 },
    { categoryName: "Books", totalOrders: 28 },
    { categoryName: "Home & Living", totalOrders: 25 },
    { categoryName: "Beauty & Health", totalOrders: 20 }
  ],
  orderToday: 12,
  orderLast3Days: 38,
  orderLast7Days: 52,
  orderLast30Days: 156
};

const productData = {
  totalProducts: 11,
  totalProductsByCategory: [
    { _id: "Electronics", count: 3 },
    { _id: "Fashion", count: 2 },
    { _id: "Books", count: 2 },
    { _id: "Home & Living", count: 2 },
    { _id: "Beauty & Health", count: 1 },
    { _id: "Sports", count: 1 }
  ],
  productCost: [{ totalProductCost: 4850 }],
  totalHighestOrderProduct: [
    { name: "Wireless Headphones", totalSold: 6, totalOrders: 3, revenue: 2400 },
    { name: "Smart Watch", totalSold: 5, totalOrders: 5, revenue: 3000 },
    { name: "Leather Bag", totalSold: 2, totalOrders: 2, revenue: 800 }
  ]
};

const userData = {
  totalUsers: 2456,
  totalActiveUsers: 2150,
  totalInActiveUsers: 306,
  totalBlockedUsers: 45,
  newUsersInLast7Days: 120,
  newUsersInLast30Days: 450,
  usersByRole: [
    { _id: "USER", count: 2356 },
    { _id: "ADMIN", count: 5 },
    { _id: "SELLER", count: 95 }
  ]
};

// User status data for pie chart
const userStatusData = [
  { name: "Active Users", value: userData.totalActiveUsers, color: "#10b981" },
  { name: "Inactive Users", value: userData.totalInActiveUsers, color: "#f59e0b" },
  { name: "Blocked Users", value: userData.totalBlockedUsers, color: "#ef4444" }
];

// Activity Feed Data
const activities = [
  { user: "John Doe", action: "placed a new order", order: "#ORD-001", amount: "$125.00", time: "2 min ago", icon: ShoppingBag, color: "blue" },
  { user: "Jane Smith", action: "left a 5-star review", order: "Wireless Headphones", time: "15 min ago", icon: Star, color: "yellow" },
  { user: "Admin", action: "updated product stock", order: "Smart Watch (+50 units)", time: "1 hour ago", icon: Package, color: "green" },
  { user: "Alice Brown", action: "registered as a new user", order: "", time: "2 hours ago", icon: UserPlus, color: "purple" },
  { user: "Bob Johnson", action: "cancelled order", order: "#ORD-003", time: "3 hours ago", icon: ShoppingBag, color: "red" },
];

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
  { name: "Smart Watch", stock: 5, threshold: 10, status: "Critical", color: "red" },
  { name: "Wireless Earbuds", stock: 8, threshold: 15, status: "Low", color: "yellow" },
  { name: "USB-C Cable", stock: 3, threshold: 20, status: "Critical", color: "red" },
  { name: "Phone Case", stock: 12, threshold: 15, status: "Low", color: "yellow" },
];

// Customer Satisfaction Data
const ratings = [
  { stars: 5, count: 45, percentage: 60 },
  { stars: 4, count: 20, percentage: 27 },
  { stars: 3, count: 6, percentage: 8 },
  { stars: 2, count: 3, percentage: 4 },
  { stars: 1, count: 1, percentage: 1 },
];

const recentReviews = [
  { name: "John D.", rating: 5, comment: "Amazing product! Highly recommend.", time: "2 hours ago" },
  { name: "Sarah M.", rating: 4, comment: "Great quality, fast shipping.", time: "5 hours ago" },
  { name: "Mike R.", rating: 5, comment: "Best purchase ever!", time: "1 day ago" },
];

// Sales by Location Data
const locations = [
  { city: "Dhaka", orders: 345, revenue: 25000, growth: 12 },
  { city: "Chittagong", orders: 230, revenue: 18000, growth: 8 },
  { city: "Rajshahi", orders: 120, revenue: 9500, growth: 5 },
  { city: "Khulna", orders: 95, revenue: 7200, growth: 3 },
  { city: "Sylhet", orders: 78, revenue: 6400, growth: 15 },
];

// Payment Method Data
const paymentMethods = [
  { name: "Credit Card", value: 45, color: "#3b82f6" },
  { name: "COD", value: 30, color: "#10b981" },
  { name: "Bkash", value: 15, color: "#8b5cf6" },
  { name: "Nagad", value: 7, color: "#f59e0b" },
  { name: "Bank Transfer", value: 3, color: "#ef4444" },
];

// Return Analytics Data
const returnData = [
  { reason: "Product Defect", count: 12, percentage: 35 },
  { reason: "Wrong Item", count: 8, percentage: 23 },
  { reason: "Size Issue", count: 7, percentage: 20 },
  { reason: "Changed Mind", count: 5, percentage: 14 },
  { reason: "Other", count: 3, percentage: 8 },
];

const Demo = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");
  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#06b6d4", "#f472b6"];

  const formatCurrency = (amount: number) => `৳${amount.toLocaleString()}`;

  const statsData = [
    { title: "Total Revenue", value: formatCurrency(productData.productCost[0]?.totalProductCost || 0), change: "+12.5%", isPositive: true, icon: DollarSign, color: "bg-blue-500" },
    { title: "Total Orders", value: orderData.totalOrder.toString(), change: "+12.5%", isPositive: true, icon: ShoppingBag, color: "bg-green-500" },
    { title: "Total Products", value: productData.totalProducts.toString(), change: "+8.2%", isPositive: true, icon: Package, color: "bg-purple-500" },
    { title: "Total Users", value: userData.totalUsers.toLocaleString(), change: "+15.3%", isPositive: true, icon: Users, color: "bg-orange-500" },
  ];

  const revenueData = [
    { name: "Mon", revenue: 4000, orders: 240 },
    { name: "Tue", revenue: 3000, orders: 139 },
    { name: "Wed", revenue: 5000, orders: 280 },
    { name: "Thu", revenue: 2780, orders: 190 },
    { name: "Fri", revenue: 5890, orders: 320 },
    { name: "Sat", revenue: 4390, orders: 250 },
    { name: "Sun", revenue: 3490, orders: 210 },
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "John Doe", amount: "$125.00", status: "Delivered", date: "2024-01-15", statusColor: "bg-green-100 text-green-800" },
    { id: "#ORD-002", customer: "Jane Smith", amount: "$89.50", status: "Processing", date: "2024-01-15", statusColor: "bg-yellow-100 text-yellow-800" },
    { id: "#ORD-003", customer: "Bob Johnson", amount: "$210.00", status: "Shipped", date: "2024-01-14", statusColor: "bg-blue-100 text-blue-800" },
    { id: "#ORD-004", customer: "Alice Brown", amount: "$67.25", status: "Pending", date: "2024-01-14", statusColor: "bg-gray-100 text-gray-800" },
    { id: "#ORD-005", customer: "Charlie Wilson", amount: "$150.00", status: "Delivered", date: "2024-01-13", statusColor: "bg-green-100 text-green-800" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back! Here's what's happening with your store today.</p>
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-2.5 rounded-lg`}>
                  <Icon size={18} className="text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                {stat.isPositive ? (
                  <TrendingUp size={14} className="text-green-500" />
                ) : (
                  <TrendingDown size={14} className="text-red-500" />
                )}
                <span className={`text-sm font-medium ${stat.isPositive ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-400">vs last week</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Orders Today</p>
              <p className="text-3xl font-bold mt-1">{orderData.orderToday}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Clock size={20} className="text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <TrendingUp size={14} className="text-green-300" />
            <span className="text-sm text-green-200">+8.2% vs yesterday</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">New Users (7 Days)</p>
              <p className="text-3xl font-bold mt-1">{userData.newUsersInLast7Days}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <UserPlus size={20} className="text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <TrendingUp size={14} className="text-green-300" />
            <span className="text-sm text-green-200">+12.3% vs previous</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Active Users</p>
              <p className="text-3xl font-bold mt-1">{userData.totalActiveUsers.toLocaleString()}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <UserCheck size={20} className="text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <TrendingUp size={14} className="text-green-300" />
            <span className="text-sm text-green-200">{((userData.totalActiveUsers / userData.totalUsers) * 100).toFixed(1)}% of total</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">New Users (30 Days)</p>
              <p className="text-3xl font-bold mt-1">{userData.newUsersInLast30Days}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Users size={20} className="text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <TrendingUp size={14} className="text-green-300" />
            <span className="text-sm text-green-200">+18.3% vs last month</span>
          </div>
        </div>
      </div>

      {/* Charts Row - Revenue, Category Pie, User Status Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Revenue Overview</h3>
              <p className="text-xs text-gray-400">Weekly revenue & orders</p>
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">View</button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="orders" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Category Distribution</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productData.totalProductsByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="_id"
                  label={({ _id, percent }) => `${_id} ${(percent * 100).toFixed(0)}%`}
                  labelLine={true}
                >
                  {productData.totalProductsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {productData.totalProductsByCategory.map((item, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: COLORS[index] }} />
                <span className="text-xs text-gray-600">{item._id}</span>
                <span className="text-xs font-medium text-gray-900">({item.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Status Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">User Status</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={true}
                >
                  {userStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {userStatusData.map((item, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-600">{item.name}</span>
                <span className="text-xs font-medium text-gray-900">({item.value.toLocaleString()})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed & Order Status & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Activity Feed */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-700">Recent Activity</h3>
                <p className="text-xs text-gray-400">Live store activity feed</p>
              </div>
              <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">View All</button>
            </div>
          </div>
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              const colorClasses = {
                blue: "bg-blue-100 text-blue-600",
                yellow: "bg-yellow-100 text-yellow-600",
                green: "bg-green-100 text-green-600",
                purple: "bg-purple-100 text-purple-600",
                red: "bg-red-100 text-red-600",
              };
              return (
                <div key={index} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                  <div className={`p-2 rounded-lg ${colorClasses[activity.color as keyof typeof colorClasses]}`}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-gray-900">{activity.user}</span>
                      {' '}{activity.action}{' '}
                      {activity.order && <span className="text-blue-600 font-medium">{activity.order}</span>}
                      {activity.amount && <span className="text-green-600 font-medium ml-1">{activity.amount}</span>}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Order Status</h3>
              <p className="text-xs text-gray-400">Current order distribution</p>
            </div>
          </div>
          <div className="space-y-3">
            {orderStatuses.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-600">{item.status}</span>
                  </div>
                  <span className="font-medium text-gray-900">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
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
              <h3 className="text-sm font-semibold text-gray-700">Low Stock Alerts</h3>
              <p className="text-xs text-gray-400">Items needing restock</p>
            </div>
            <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">2 Critical</span>
          </div>
          <div className="space-y-3">
            {lowStockItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400">Stock: {item.stock} / {item.threshold}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  item.color === 'red' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Satisfaction & Sales by Location & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Customer Satisfaction */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Customer Satisfaction</h3>
              <p className="text-xs text-gray-400">Reviews & ratings</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-gray-900">4.7</span>
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
            </div>
          </div>
          <div className="space-y-2">
            {ratings.map((rating, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-12">{rating.stars} ★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${rating.percentage}%` }} />
                </div>
                <span className="text-sm text-gray-500 w-8">{rating.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Recent Reviews</p>
            {recentReviews.map((review, index) => (
              <div key={index} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800">{review.name}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{review.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Location */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Sales by Location</h3>
              <p className="text-xs text-gray-400">Top cities by revenue</p>
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
              <MapPin size={14} className="inline mr-1" />
              View Map
            </button>
          </div>
          <div className="space-y-3">
            {locations.map((location, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{location.city}</span>
                    <span className="text-xs text-green-600 font-medium">+{location.growth}%</span>
                  </div>
                  <span className="font-medium text-gray-900">${location.revenue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-500 transition-all duration-500" 
                    style={{ width: `${(location.revenue / 25000) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{location.orders} orders</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Payment Methods</h3>
              <p className="text-xs text-gray-400">Transaction distribution</p>
            </div>
            <Wallet size={16} className="text-gray-400" />
          </div>
          <div className="space-y-3">
            {paymentMethods.map((method, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: method.color }} />
                    <span className="text-gray-600">{method.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{method.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${method.value}%`, backgroundColor: method.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products & Return Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Top Products (takes 2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Top Selling Products</h3>
              <p className="text-xs text-gray-400">Most ordered products</p>
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">#</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Product</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Sold</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Orders</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {productData.totalHighestOrderProduct.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-500">{index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs">
                          {product.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.totalSold}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.totalOrders} orders
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-green-600">{formatCurrency(product.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Return Analytics */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Return Analytics</h3>
              <p className="text-xs text-gray-400">Return reasons & trends</p>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={16} className="text-red-500" />
              <span className="text-sm font-medium text-red-600">2.3% Return Rate</span>
            </div>
          </div>
          <div className="space-y-3">
            {returnData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.reason}</span>
                  <span className="font-medium text-gray-900">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-red-500 transition-all duration-500" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{productData.totalProducts}</p>
            </div>
            <div className="bg-purple-500 p-2.5 rounded-lg">
              <Package size={18} className="text-white" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <TrendingUp size={14} className="text-green-500" />
            <span className="text-sm font-medium text-green-600">+8.2%</span>
            <span className="text-xs text-gray-400">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Product Categories</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{productData.totalProductsByCategory.length}</p>
            </div>
            <div className="bg-green-500 p-2.5 rounded-lg">
              <PieChartIcon size={18} className="text-white" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <TrendingUp size={14} className="text-green-500" />
            <span className="text-sm font-medium text-green-600">+4.5%</span>
            <span className="text-xs text-gray-400">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Product Cost</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(productData.productCost[0]?.totalProductCost || 0)}</p>
            </div>
            <div className="bg-orange-500 p-2.5 rounded-lg">
              <DollarSign size={18} className="text-white" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <TrendingUp size={14} className="text-green-500" />
            <span className="text-sm font-medium text-green-600">+5.8%</span>
            <span className="text-xs text-gray-400">vs last month</span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Recent Orders</h3>
            <p className="text-xs text-gray-400">Latest 5 orders</p>
          </div>
          <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-2">Order ID</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-2">Customer</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-2">Amount</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-2">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-2.5 text-sm font-medium text-blue-600">{order.id}</td>
                  <td className="px-4 py-2.5 text-sm text-gray-700">{order.customer}</td>
                  <td className="px-4 py-2.5 text-sm font-medium text-gray-900">{order.amount}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-sm text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2.5 rounded-lg">
              <ShoppingBag size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Total Products</p>
              <p className="text-lg font-bold text-gray-900">{productData.totalProducts}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2.5 rounded-lg">
              <Package size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Total Categories</p>
              <p className="text-lg font-bold text-gray-900">{productData.totalProductsByCategory.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2.5 rounded-lg">
              <Users size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Total Users</p>
              <p className="text-lg font-bold text-gray-900">{userData.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2.5 rounded-lg">
              <Clock size={18} className="text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Last 3 Days Orders</p>
              <p className="text-lg font-bold text-gray-900">{orderData.orderLast3Days}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="bg-pink-100 p-2.5 rounded-lg">
              <Star size={18} className="text-pink-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Avg Orders/Day</p>
              <p className="text-lg font-bold text-gray-900">{Math.round(orderData.orderLast30Days / 30)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;