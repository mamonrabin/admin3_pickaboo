/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { format } from "date-fns";
import { Printer,  X } from "lucide-react";
import { useRef } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TOrder } from "@/types";

interface InvoiceProps {
  order?: TOrder;
}

const Invoice = ({ order }: InvoiceProps) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = invoiceRef.current;
    if (!printContent) return;

    const win = window.open('', '_blank');
    if (!win) return;

    win.document.write(`
      <html>
        <head>
          <title>Invoice #${order?.orderId || 'N/A'}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #fff; }
            * { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            @page { margin: 20px; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    win.document.close();
    win.print();
    win.close();
  };

  const getStatusColor = (status?: string) => {
    const colors: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      CONFIRMED: "bg-blue-100 text-blue-800",
      PROCESSING: "bg-purple-100 text-purple-800",
      SHIPPED: "bg-indigo-100 text-indigo-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
      ON_HOLD: "bg-orange-100 text-orange-800",
      IN_REVIEW: "bg-gray-100 text-gray-800",
      RETURNED: "bg-pink-100 text-pink-800",
    };
    return status ? colors[status] || "bg-gray-100 text-gray-800" : "bg-gray-100 text-gray-800";
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors" title="Invoice">
            <Printer size={16} />
          </button>
        </SheetTrigger>

        <SheetContent className="md:!max-w-4xl !w-full p-0 bg-gray-50/50">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Printer size={18} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Invoice</h2>
                <p className="text-sm text-gray-500">
                  #{order?.orderId || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Printer size={16} />
                Print
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Invoice Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
            <div ref={invoiceRef} className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
              {/* Invoice Header */}
              <div className="flex justify-between items-start border-b border-gray-200 pb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">INVOICE</h1>
                  <p className="text-sm text-gray-500 mt-1">Order #{order?.orderId || "N/A"}</p>
                </div>
                <div className="text-right">
                  <div className="bg-blue-50 px-4 py-2 rounded-lg">
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {order?.createdAt ? format(new Date(order.createdAt), "dd MMM yyyy") : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Company & Customer Info */}
              <div className="grid grid-cols-2 gap-8 py-6 border-b border-gray-200">
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">From</h3>
                  <p className="text-sm font-bold text-gray-900">Your Store Name</p>
                  <p className="text-sm text-gray-600">123 Business Street</p>
                  <p className="text-sm text-gray-600">Dhaka, Bangladesh</p>
                  <p className="text-sm text-gray-600">Phone: +880 1234 567890</p>
                  <p className="text-sm text-gray-600">Email: info@yourstore.com</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Bill To</h3>
                  <p className="text-sm font-bold text-gray-900">{order?.userRef?.name || "N/A"}</p>
                  <p className="text-sm text-gray-600">{order?.shippingAddress?.email || "N/A"}</p>
                  <p className="text-sm text-gray-600">{order?.shippingAddress?.phone || "N/A"}</p>
                  <p className="text-sm text-gray-600">
                    {order?.shippingAddress?.house && `${order.shippingAddress.house}, `}
                    {order?.shippingAddress?.road && `Road ${order.shippingAddress.road}, `}
                    {order?.shippingAddress?.address || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order?.shippingAddress?.thana && `${order.shippingAddress.thana}, `}
                    {order?.shippingAddress?.city || "N/A"}
                  </p>
                </div>
              </div>

              {/* Products Table */}
              <div className="py-6">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">#</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">Description</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">Color</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">Size</th>
                      <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">Qty</th>
                      <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">Price</th>
                      <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {order?.products?.map((item: any, index: number) => (
                      <tr key={item._id}>
                        <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">{item.productRef?.title || "N/A"}</p>
                          <p className="text-xs text-gray-400">ID: {item.productRef?._id?.slice(0, 8) || "N/A"}</p>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{item.color || "N/A"}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{item.size || "N/A"}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 text-right">৳{item.price}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">৳{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t-2 border-gray-200">
                    <tr>
                      <td colSpan={5} className="px-4 py-2 text-right text-sm font-medium text-gray-600">Subtotal:</td>
                      <td colSpan={2} className="px-4 py-2 text-right text-sm font-semibold text-gray-900">৳{order?.subTotalPrice || 0}</td>
                    </tr>
                    {(order?.couponRef?.discount ?? 0) > 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-2 text-right text-sm font-medium text-green-600">
                          Discount ({order?.couponRef?.code}):
                        </td>
                        <td colSpan={2} className="px-4 py-2 text-right text-sm font-semibold text-green-600">-৳{order?.couponRef?.discount}</td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan={5} className="px-4 py-2 text-right text-sm font-medium text-gray-600">Shipping:</td>
                      <td colSpan={2} className="px-4 py-2 text-right text-sm font-semibold text-gray-900">৳{order?.shippingCost || 0}</td>
                    </tr>
                    <tr className="border-t-2 border-gray-300">
                      <td colSpan={5} className="px-4 py-3 text-right text-base font-bold text-gray-900">Total:</td>
                      <td colSpan={2} className="px-4 py-3 text-right text-xl font-bold text-blue-600">৳{order?.totalPrice || 0}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Payment & Status */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Payment Details</h4>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="text-gray-500">Method:</span>
                      <span className="font-medium text-gray-900 ml-2">{order?.paymentMethod || "N/A"}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Status:</span>
                      <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${order?.paymentStatus === "PAID" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {order?.paymentStatus || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Order Status</h4>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="text-gray-500">Status:</span>
                      <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(order?.status)}`}>
                        {order?.status || "N/A"}
                      </span>
                    </p>
                    {order?.note && (
                      <p className="text-sm text-gray-600">
                        <span className="text-gray-500">Note:</span>
                        <span className="ml-2">{order.note}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-6 border-t border-gray-200 mt-6">
                <p className="text-xs text-gray-400">Thank you for your business!</p>
                <p className="text-xs text-gray-300 mt-1">
                  This is a computer-generated invoice. No signature required.
                </p>
                <p className="text-xs text-gray-300">
                  Generated on {format(new Date(), "dd MMM yyyy, hh:mm a")}
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Invoice;