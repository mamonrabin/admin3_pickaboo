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
  PieChart as PieChartIcon,
  UserPlus,
  UserCheck,
  Star,
  Eye,
  ShoppingCart,
  Truck,
  CreditCard,
  UserX,
  UserMinus,
  UserBlocked,
  MapPin,
  Wallet,
  RotateCcw,
  Download,
  AlertCircle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";

// ==================== DEMO DATA ====================
const DEMO_DATA = {
  orders: {
    total: 156,
    today: 12,
    last3Days: 38,
    last7Days: 52,
    last30Days: 156,
    recent: [
      { id: "#ORD-001", customer: "John Doe", amount: "$125.00", status: "Delivered", date: "2024-01-15", color: "bg-green-100 text-green-800" },
      { id: "#ORD-002", customer: "Jane Smith", amount: "$89.50", status: "Processing", date: "2024-01-15", color: "bg-yellow-100 text-yellow-800" },
      { id: "#ORD-003", customer: "Bob Johnson", amount: "$210.00", status: "Shipped", date: "2024-01-14", color: "bg-blue-100 text-blue-800" },
      { id: "#ORD-004", customer: "Alice Brown", amount: "$67.25", status: "Pending", date: "2024-01-14", color: "bg-gray-100 text-gray-800" },
      { id: "#ORD-005", customer: "Charlie Wilson", amount: "$150.00", status: "Delivered", date: "2024-01-13", color: "bg-green-100 text-green-800" },
    ],
    status: [
      { label: "Delivered", count: 45, percent: 45, color: "#10b981" },
      { label: "Processing", count: 28, percent: 28, color: "#3b82f6" },
      { label: "Shipped", count: 15, percent: 15, color: "#8b5cf6" },
      { label: "Pending", count: 8, percent: 8, color: "#f59e0b" },
      { label: "Cancelled", count: 1, percent: 4, color: "#ef4444" },
    ]
  },
  products: {
    total: 11,
    categories: [
      { name: "Electronics", count: 3 },
      { name: "Fashion", count: 2 },
      { name: "Books", count: 2 },
      { name: "Home & Living", count: 2 },
      { name: "Beauty & Health", count: 1 },
      { name: "Sports", count: 1 }
    ],
    cost: 4850,
    topSelling: [
      { name: "Wireless Headphones", sold: 6, orders: 3, revenue: 2400 },
      { name: "Smart Watch", sold: 5, orders: 5, revenue: 3000 },
      { name: "Leather Bag", sold: 2, orders: 2, revenue: 800 }
    ],
    lowStock: [
      { name: "Smart Watch", stock: 5, threshold: 10, status: "Critical", color: "red" },
      { name: "Wireless Earbuds", stock: 8, threshold: 15, status: "Low", color: "yellow" },
      { name: "USB-C Cable", stock: 3, threshold: 20, status: "Critical", color: "red" },
      { name: "Phone Case", stock: 12, threshold: 15, status: "Low", color: "yellow" },
    ]
  },
  users: {
    total: 2456,
    active: 2150,
    inactive: 306,
    blocked: 45,
    new7Days: 120,
    new30Days: 450,
    roles: [
      { name: "USER", count: 2356 },
      { name: "ADMIN", count: 5 },
      { name: "SELLER", count: 95 }
    ]
  },
  revenue: [
    { day: "Mon", revenue: 4000, orders: 240 },
    { day: "Tue", revenue: 3000, orders: 139 },
    { day: "Wed", revenue: 5000, orders: 280 },
    { day: "Thu", revenue: 2780, orders: 190 },
    { day: "Fri", revenue: 5890, orders: 320 },
    { day: "Sat", revenue: 4390, orders: 250 },
    { day: "Sun", revenue: 3490, orders: 210 },
  ],
  activities: [
    { user: "John Doe", action: "placed a new order", order: "#ORD-001", amount: "$125.00", time: "2 min ago", icon: ShoppingBag, color: "blue" },
    { user: "Jane Smith", action: "left a 5-star review", order: "Wireless Headphones", time: "15 min ago", icon: Star, color: "yellow" },
    { user: "Admin", action: "updated product stock", order: "Smart Watch (+50 units)", time: "1 hour ago", icon: Package, color: "green" },
    { user: "Alice Brown", action: "registered as a new user", time: "2 hours ago", icon: UserPlus, color: "purple" },
    { user: "Bob Johnson", action: "cancelled order", order: "#ORD-003", time: "3 hours ago", icon: ShoppingBag, color: "red" },
  ],
  ratings: [
    { stars: 5, count: 45, percent: 60 },
    { stars: 4, count: 20, percent: 27 },
    { stars: 3, count: 6, percent: 8 },
    { stars: 2, count: 3, percent: 4 },
    { stars: 1, count: 1, percent: 1 },
  ],
  reviews: [
    { name: "John D.", rating: 5, comment: "Amazing product! Highly recommend.", time: "2 hours ago" },
    { name: "Sarah M.", rating: 4, comment: "Great quality, fast shipping.", time: "5 hours ago" },
    { name: "Mike R.", rating: 5, comment: "Best purchase ever!", time: "1 day ago" },
  ],
  locations: [
    { city: "Dhaka", orders: 345, revenue: 25000, growth: 12 },
    { city: "Chittagong", orders: 230, revenue: 18000, growth: 8 },
    { city: "Rajshahi", orders: 120, revenue: 9500, growth: 5 },
    { city: "Khulna", orders: 95, revenue: 7200, growth: 3 },
    { city: "Sylhet", orders: 78, revenue: 6400, growth: 15 },
  ],
  payments: [
    { name: "Credit Card", value: 45, color: "#3b82f6" },
    { name: "COD", value: 30, color: "#10b981" },
    { name: "Bkash", value: 15, color: "#8b5cf6" },
    { name: "Nagad", value: 7, color: "#f59e0b" },
    { name: "Bank Transfer", value: 3, color: "#ef4444" },
  ],
  returns: [
    { reason: "Product Defect", count: 12, percent: 35 },
    { reason: "Wrong Item", count: 8, percent: 23 },
    { reason: "Size Issue", count: 7, percent: 20 },
    { reason: "Changed Mind", count: 5, percent: 14 },
    { reason: "Other", count: 3, percent: 8 },
  ]
};

// ==================== CONSTANTS ====================
const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];
const USER_STATUS = [
  { name: "Active Users", value: DEMO_DATA.users.active, color: "#10b981" },
  { name: "Inactive Users", value: DEMO_DATA.users.inactive, color: "#f59e0b" },
  { name: "Blocked Users", value: DEMO_DATA.users.blocked, color: "#ef4444" }
];

const formatCurrency = (amount: number) => `৳${amount.toLocaleString()}`;

// ==================== COMPONENTS ====================
const StatsCard = ({ title, value, change, isPositive, icon: Icon, color }: any) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`${color} p-2.5 rounded-lg`}>
        <Icon size={18} className="text-white" />
      </div>
    </div>
    <div className="flex items-center gap-1.5 mt-3">
      {isPositive ? <TrendingUp size={14} className="text-green-500" /> : <TrendingDown size={14} className="text-red-500" />}
      <span className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>{change}</span>
      <span className="text-xs text-gray-400">vs last week</span>
    </div>
  </div>
);

const GradientCard = ({ title, value, sub, icon: Icon, color, trend }: any) => (
  <div className={`bg-gradient-to-br ${color} rounded-xl p-5 text-white shadow-lg`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white/80 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
        {sub && <p className="text-white/70 text-xs mt-1">{sub}</p>}
      </div>
      <div className="bg-white/20 p-3 rounded-lg">
        <Icon size={20} className="text-white" />
      </div>
    </div>
    {trend && (
      <div className="flex items-center gap-2 mt-3">
        <TrendingUp size={14} className="text-green-300" />
        <span className="text-sm text-green-200">{trend}</span>
      </div>
    )}
  </div>
);

// ==================== MAIN COMPONENT ====================
const Dashboard = () => {
  const [period, setPeriod] = useState("This Week");

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
            <select className="bg-transparent outline-none text-sm text-gray-700" value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Revenue" value={formatCurrency(DEMO_DATA.products.cost)} change="+12.5%" isPositive icon={DollarSign} color="bg-blue-500" />
        <StatsCard title="Total Orders" value={DEMO_DATA.orders.total.toString()} change="+12.5%" isPositive icon={ShoppingBag} color="bg-green-500" />
        <StatsCard title="Total Products" value={DEMO_DATA.products.total.toString()} change="+8.2%" isPositive icon={Package} color="bg-purple-500" />
        <StatsCard title="Total Users" value={DEMO_DATA.users.total.toLocaleString()} change="+15.3%" isPositive icon={Users} color="bg-orange-500" />
      </div>

      {/* Order Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <GradientCard title="Orders Today" value={DEMO_DATA.orders.today} icon={Clock} color="from-blue-500 to-blue-600" trend="+8.2% vs yesterday" />
        <GradientCard title="New Users (7 Days)" value={DEMO_DATA.users.new7Days} icon={UserPlus} color="from-purple-500 to-purple-600" trend="+12.3% vs previous" />
        <GradientCard title="Active Users" value={DEMO_DATA.users.active.toLocaleString()} sub={`${((DEMO_DATA.users.active / DEMO_DATA.users.total) * 100).toFixed(1)}% of total`} icon={UserCheck} color="from-green-500 to-green-600" />
        <GradientCard title="New Users (30 Days)" value={DEMO_DATA.users.new30Days} icon={Users} color="from-orange-500 to-orange-600" trend="+18.3% vs last month" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Revenue Overview</h3>
              <p className="text-xs text-gray-400">Weekly revenue & orders</p>
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">View</button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEMO_DATA.revenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar dataKey="orders" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Category Distribution</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={DEMO_DATA.products.categories} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="count" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine>
                  {DEMO_DATA.products.categories.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {DEMO_DATA.products.categories.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-xs text-gray-600">{item.name}</span>
                <span className="text-xs font-medium text-gray-900">({item.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Status Pie */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">User Status</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={USER_STATUS} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine>
                  {USER_STATUS.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {USER_STATUS.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-600">{item.name}</span>
                <span className="text-xs font-medium text-gray-900">({item.value.toLocaleString()})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity, Orders Status, Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Activity Feed */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Recent Activity</h3>
              <p className="text-xs text-gray-400">Live store activity feed</p>
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">View All</button>
          </div>
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {DEMO_DATA.activities.map((act, i) => {
              const Icon = act.icon;
              const colorMap: any = { blue: "bg-blue-100 text-blue-600", yellow: "bg-yellow-100 text-yellow-600", green: "bg-green-100 text-green-600", purple: "bg-purple-100 text-purple-600", red: "bg-red-100 text-red-600" };
              return (
                <div key={i} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                  <div className={`p-2 rounded-lg ${colorMap[act.color]}`}><Icon size={14} /></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-gray-900">{act.user}</span> {act.action} {act.order && <span className="text-blue-600 font-medium">{act.order}</span>} {act.amount && <span className="text-green-600 font-medium ml-1">{act.amount}</span>}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{act.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Order Status</h3>
          <div className="space-y-3">
            {DEMO_DATA.orders.status.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} /><span className="text-gray-600">{item.label}</span></div>
                  <span className="font-medium text-gray-900">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${item.percent}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div><h3 className="text-sm font-semibold text-gray-700">Low Stock Alerts</h3><p className="text-xs text-gray-400">Items needing restock</p></div>
            <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">2 Critical</span>
          </div>
          <div className="space-y-3">
            {DEMO_DATA.products.lowStock.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div><p className="text-sm font-medium text-gray-800">{item.name}</p><p className="text-xs text-gray-400">Stock: {item.stock} / {item.threshold}</p></div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.color === 'red' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Satisfaction, Location, Payment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Satisfaction */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div><h3 className="text-sm font-semibold text-gray-700">Customer Satisfaction</h3><p className="text-xs text-gray-400">Reviews & ratings</p></div>
            <div className="flex items-center gap-1"><span className="text-2xl font-bold text-gray-900">4.7</span><Star size={16} className="text-yellow-400 fill-yellow-400" /></div>
          </div>
          <div className="space-y-2">
            {DEMO_DATA.ratings.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-12">{r.stars} ★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2"><div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${r.percent}%` }} /></div>
                <span className="text-sm text-gray-500 w-8">{r.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Recent Reviews</p>
            {DEMO_DATA.reviews.map((rev, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800">{rev.name}</span>
                    <div className="flex gap-0.5">{[...Array(5)].map((_, j) => <Star key={j} size={12} className={j < rev.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />)}</div>
                  </div>
                  <p className="text-xs text-gray-600">{rev.comment}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{rev.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div><h3 className="text-sm font-semibold text-gray-700">Sales by Location</h3><p className="text-xs text-gray-400">Top cities by revenue</p></div>
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium"><MapPin size={14} className="inline mr-1" />View Map</button>
          </div>
          <div className="space-y-3">
            {DEMO_DATA.locations.map((loc, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-2"><span className="text-gray-600">{loc.city}</span><span className="text-xs text-green-600 font-medium">+{loc.growth}%</span></div>
                  <span className="font-medium text-gray-900">${loc.revenue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full bg-blue-500 transition-all duration-500" style={{ width: `${(loc.revenue / 25000) * 100}%` }} /></div>
                <p className="text-xs text-gray-400 mt-0.5">{loc.orders} orders</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div><h3 className="text-sm font-semibold text-gray-700">Payment Methods</h3><p className="text-xs text-gray-400">Transaction distribution</p></div>
            <Wallet size={16} className="text-gray-400" />
          </div>
          <div className="space-y-3">
            {DEMO_DATA.payments.map((method, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: method.color }} /><span className="text-gray-600">{method.name}</span></div>
                  <span className="font-medium text-gray-900">{method.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full transition-all duration-500" style={{ width: `${method.value}%`, backgroundColor: method.color }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products & Returns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <div><h3 className="text-sm font-semibold text-gray-700">Top Selling Products</h3><p className="text-xs text-gray-400">Most ordered products</p></div>
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
                {DEMO_DATA.products.topSelling.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-500">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs">{p.name.charAt(0)}</div>
                        <p className="text-sm font-medium text-gray-900">{p.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{p.sold}</td>
                    <td className="px-4 py-3"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{p.orders} orders</span></td>
                    <td className="px-4 py-3 text-sm font-semibold text-green-600">{formatCurrency(p.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Returns */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div><h3 className="text-sm font-semibold text-gray-700">Return Analytics</h3><p className="text-xs text-gray-400">Return reasons & trends</p></div>
            <div className="flex items-center gap-2"><RotateCcw size={16} className="text-red-500" /><span className="text-sm font-medium text-red-600">2.3% Return Rate</span></div>
          </div>
          <div className="space-y-3">
            {DEMO_DATA.returns.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.reason}</span>
                  <span className="font-medium text-gray-900">{item.count} ({item.percent}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full bg-red-500 transition-all duration-500" style={{ width: `${item.percent}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatsCard title="Total Products" value={DEMO_DATA.products.total} change="+8.2%" isPositive icon={Package} color="bg-purple-500" />
        <StatsCard title="Product Categories" value={DEMO_DATA.products.categories.length} change="+4.5%" isPositive icon={PieChartIcon} color="bg-green-500" />
        <StatsCard title="Product Cost" value={formatCurrency(DEMO_DATA.products.cost)} change="+5.8%" isPositive icon={DollarSign} color="bg-orange-500" />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div><h3 className="text-sm font-semibold text-gray-700">Recent Orders</h3><p className="text-xs text-gray-400">Latest 5 orders</p></div>
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
              {DEMO_DATA.orders.recent.map((order, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-2.5 text-sm font-medium text-blue-600">{order.id}</td>
                  <td className="px-4 py-2.5 text-sm text-gray-700">{order.customer}</td>
                  <td className="px-4 py-2.5 text-sm font-medium text-gray-900">{order.amount}</td>
                  <td className="px-4 py-2.5"><span className={`text-xs font-medium px-2 py-1 rounded-full ${order.color}`}>{order.status}</span></td>
                  <td className="px-4 py-2.5 text-sm text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        {[
          { icon: ShoppingBag, label: "Total Products", value: DEMO_DATA.products.total, color: "blue" },
          { icon: Package, label: "Total Categories", value: DEMO_DATA.products.categories.length, color: "green" },
          { icon: Users, label: "Total Users", value: DEMO_DATA.users.total.toLocaleString(), color: "purple" },
          { icon: Clock, label: "Last 3 Days Orders", value: DEMO_DATA.orders.last3Days, color: "orange" },
          { icon: Star, label: "Avg Orders/Day", value: Math.round(DEMO_DATA.orders.last30Days / 30), color: "pink" },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className={`bg-${item.color}-100 p-2.5 rounded-lg`}><item.icon size={18} className={`text-${item.color}-600`} /></div>
              <div><p className="text-xs text-gray-400">{item.label}</p><p className="text-lg font-bold text-gray-900">{item.value}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;