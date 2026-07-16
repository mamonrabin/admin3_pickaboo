/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  X,
  Package,
  User,
  MapPin,
  Truck,
  ShoppingBag,
  Phone,
  Send,
  Building,
} from "lucide-react";
import { format } from "date-fns";
import { TOrder } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

interface SendQuiriarProps {
  order?: TOrder;
}

const SendQuiriar = ({ order }: SendQuiriarProps) => {
  const [isSending, setIsSending] = useState(false);

  //   const getStatusColor = (status?: string) => {
  //     const colors: Record<string, string> = {
  //       PENDING: "bg-yellow-100 text-yellow-800",
  //       CONFIRMED: "bg-blue-100 text-blue-800",
  //       PROCESSING: "bg-purple-100 text-purple-800",
  //       SHIPPED: "bg-indigo-100 text-indigo-800",
  //       DELIVERED: "bg-green-100 text-green-800",
  //       CANCELLED: "bg-red-100 text-red-800",
  //       ON_HOLD: "bg-orange-100 text-orange-800",
  //       IN_REVIEW: "bg-gray-100 text-gray-800",
  //       RETURNED: "bg-pink-100 text-pink-800",
  //     };
  //     return status ? colors[status] || "bg-gray-100 text-gray-800" : "bg-gray-100 text-gray-800";
  //   };

  const handleSendToCourier = () => {
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      toast.success(`Order #${order?.orderId} sent to courier successfully!`);
      setIsSending(false);
    }, 1500);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <button className="inline-flex items-center gap-1.5 bg-[#2B748A] hover:bg-[#236a7e] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
            <Truck size={14} />
            Stedfast
          </button>
        </SheetTrigger>

        <SheetContent className="md:!max-w-4xl !w-full p-0 bg-gray-50/50">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="bg-[#2B748A]/10 p-2 rounded-lg">
                <Truck size={18} className="text-[#2B748A]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Send to Courier
                </h2>
                <p className="text-sm text-gray-500">
                  Order #{order?.orderId || "N/A"}
                </p>
              </div>
            </div>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors bg-amber-800">
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
            {/* Order Summary */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-gradient-to-r from-[#2B748A] to-[#236a7e]">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Package size={16} />
                  Order Summary
                </h3>
              </div>
              <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {order?.orderId || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {order?.createdAt
                      ? format(new Date(order.createdAt), "dd MMM yyyy")
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Total Amount</p>
                  <p className="text-sm font-bold text-blue-600">
                    ৳{order?.totalPrice || 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <span
                    className={`text-xs font-medium  py-1  inline-block ${order?.status}`}
                  >
                    {order?.status || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-700">
                    Customer Information
                  </h3>
                </div>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {order?.userRef?.name || "N/A"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order?.userRef?.email || "N/A"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Phone size={12} /> Phone
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {order?.shippingAddress?.phone || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Address - Focus Area */}
            <div className="bg-white rounded-lg border-2 border-[#2B748A] shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-[#2B748A]/5 border-b border-[#2B748A]/20">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#2B748A]" />
                  <h3 className="text-sm font-semibold text-gray-700">
                    Shipping Address
                  </h3>
                  <span className="ml-auto text-xs text-[#2B748A] font-medium">
                    Courier Destination
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#2B748A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Building size={14} className="text-[#2B748A]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {order?.shippingAddress?.name || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order?.shippingAddress?.house &&
                        `${order.shippingAddress.house}, `}
                      {order?.shippingAddress?.road &&
                        `Road ${order.shippingAddress.road}, `}
                      {order?.shippingAddress?.address || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order?.shippingAddress?.thana &&
                        `${order.shippingAddress.thana}, `}
                      {order?.shippingAddress?.city || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="text-sm font-medium text-gray-900">
                      {order?.shippingAddress?.phone || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Alternate Phone</p>
                    <p className="text-sm font-medium text-gray-900">
                      {order?.shippingAddress?.altPhone || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-sm font-medium text-gray-900">
                      {order?.shippingAddress?.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Shipping Cost</p>
                    <p className="text-sm font-medium text-gray-900">
                      ৳{order?.shippingCost || 0}
                    </p>
                  </div>
                </div>
                {order?.note && (
                  <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
                    <p className="text-xs text-gray-400">Note for Courier</p>
                    <p className="text-sm font-medium text-gray-900">
                      {order.note}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Products Summary */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={16} className="text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-700">
                    Products ({order?.products?.length || 0})
                  </h3>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {order?.products?.map((item: any, index: number) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 w-6">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.productRef?.title || "N/A"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.color && `Color: ${item.color}`}
                          {item.size && ` | Size: ${item.size}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        x{item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">৳{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Send to Courier Button */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Ready to send?
                  </p>
                  <p className="text-xs text-gray-400">
                    This will send the order to Stedfast courier
                  </p>
                </div>
                <button
                  onClick={handleSendToCourier}
                  disabled={isSending}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2B748A] hover:bg-[#236a7e] text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send to Courier
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SendQuiriar;
