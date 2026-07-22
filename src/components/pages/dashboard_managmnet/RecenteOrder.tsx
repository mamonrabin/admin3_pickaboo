"use client"

import { TOrder } from "@/types";

import { format } from "date-fns";


interface orderProps {
    orders:TOrder[]
}

const RecenteOrder:React.FC<orderProps> = ({orders}) => {

    
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-6">
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
              {orders?.map((order, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-2.5 text-sm font-medium text-blue-600">#{order.orderId}</td>
                  <td className="px-4 py-2.5 text-sm text-gray-700">{order.shippingAddress.name}</td>
                  <td className="px-4 py-2.5 text-sm font-medium text-gray-900">{order.totalPrice}</td>
                  <td className="px-4 py-2.5"><span className={`text-xs font-medium px-2 py-1 rounded-full bg-gray-200`}>{order.status}</span></td>
                  <td className="px-4 py-2.5 text-sm text-gray-500"> {order.createdAt
                                            ? format(
                                                new Date(order.createdAt),
                                                "dd MMM yyyy",
                                              )
                                            : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default RecenteOrder;