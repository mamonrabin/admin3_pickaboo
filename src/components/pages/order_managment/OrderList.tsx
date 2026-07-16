/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import { Trash, Package} from "lucide-react";
import Pagination from "@/reuseble_components/Paginations";



import { TMeta, TOrder } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";
import { toast } from "sonner";

import {
  useDeleteOrder,
  useUpdateOrder,
} from "@/hooks/order.hook";
import ViewOrder from "./ViewOrder";
import SendQuiriar from "./SendQuiriar";
import Invoice from "./Invoice";

const tableHeaders = [
  "#",
  "Order ID",
  "Date",
  "Products",
  "Qty",
  "Subtotal",
  "Coupon",
  "Discount",
  "Shipping",
  "Total",
  "Payment Method",
  "Payment Status",
  "Customer",
  "Shipping Info",
  "Status",
  "Update Status",
  "Courier",
  "Invoice",
  "Actions",
];


interface orderListProps {
  orders: TOrder[];
  meta: TMeta;
  isLoading: boolean;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

const OrderList:React.FC<orderListProps> = ({orders,meta,setPage,setLimit,isLoading}) => {



  const { mutate } = useUpdateOrder();
  const { mutate: deleteOrder } = useDeleteOrder();


  const handleDelete = (id: string) => {
    toast("Delete Order?", {
      description: "This order will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteOrder(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "Order deleted successfully");
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to delete order",
              );
            },
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 10000,
    });
  };

  const getStatusColor = (status: string) => {
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
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2.5 rounded-lg">
            <Package size={20} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Order List</h2>
            <p className="text-sm text-gray-500">
              Total{" "}
              <span className="font-semibold text-gray-700">
                {meta?.total || 0}
              </span>{" "}
              orders
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Showing {orders?.length || 0} of {meta?.total || 0}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-transparent border-b border-gray-200">
              {tableHeaders.map((header) => (
                <TableHead
                  key={header}
                  className="text-xs font-semibold text-gray-600 uppercase tracking-wider py-3 px-3 whitespace-nowrap"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <TableSkeleton rows={5} />
          ) : (
            <TableBody>
              {orders?.length ? (
                orders?.map((order: TOrder, index: number) => (
                  <TableRow
                    key={order._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    {/* SL */}
                    <TableCell className="py-3 px-3 text-sm text-gray-500 font-medium text-center">
                      {index + 1}
                    </TableCell>

                    {/* Order ID */}
                    <TableCell className="py-3 px-3">
                      <span className="text-sm font-semibold text-blue-600">
                        #{order.orderId?.slice(0, 8)}
                      </span>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="py-3 px-3">
                      <span className="text-xs text-gray-600">
                        {order.createdAt
                          ? format(
                              new Date(order.createdAt),
                              "dd MMM yyyy",
                            )
                          : "-"}
                      </span>
                      <br />
                      <span className="text-xs text-gray-400">
                        {order.createdAt
                          ? format(
                              new Date(order.createdAt),
                              "hh:mm a",
                            )
                          : "-"}
                      </span>
                    </TableCell>

                    {/* Products */}
                    <TableCell className="py-3 px-3 min-w-[200px]">
                      <div className="space-y-1">
                        {order?.products?.slice(0, 2).map((item) => (
                          <div key={item._id} className="text-xs">
                            <span className="font-medium text-gray-700">
                              {item.productRef?.title?.slice(0, 20)}
                              {item.productRef?.title?.length > 20 && "..."}
                            </span>
                            <span className="text-gray-400 ml-1">
                              (x{item.quantity})
                            </span>
                          </div>
                        ))}
                        {order?.products?.length > 2 && (
                          <span className="text-xs text-blue-600">
                            +{order.products.length - 2} more
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Quantity */}
                    <TableCell className="py-3 px-3 text-center">
                      <span className="text-sm font-semibold text-gray-900">
                        {order.products?.reduce(
                          (sum, item) => sum + item.quantity,
                          0,
                        )}
                      </span>
                    </TableCell>

                    {/* Subtotal */}
                    <TableCell className="py-3 px-3">
                      <span className="text-sm font-medium text-gray-900">
                        ৳{order.subTotalPrice || 0}
                      </span>
                    </TableCell>

                    {/* Coupon */}
                    <TableCell className="py-3 px-3">
                      <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                        {order.couponRef?.code || "N/A"}
                      </span>
                    </TableCell>

                    {/* Discount */}
                    <TableCell className="py-3 px-3">
                      <span className="text-sm font-medium text-green-600">
                        ৳{order.couponRef?.discount || 0}
                      </span>
                    </TableCell>

                    {/* Shipping */}
                    <TableCell className="py-3 px-3">
                      <span className="text-sm font-medium text-gray-900">
                        ৳{order.shippingCost || 0}
                      </span>
                    </TableCell>

                    {/* Total */}
                    <TableCell className="py-3 px-3">
                      <span className="text-sm font-bold text-blue-600">
                        ৳{order.totalPrice || 0}
                      </span>
                    </TableCell>

                    {/* Payment Method */}
                    <TableCell className="py-3 px-3">
                      <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                        {order.paymentMethod || "N/A"}
                      </span>
                    </TableCell>

                    {/* Payment Status */}
                    <TableCell className="py-3 px-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        order.paymentStatus === "PAID" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.paymentStatus || "N/A"}
                      </span>
                    </TableCell>

                    {/* Customer */}
                    <TableCell className="py-3 px-3">
                      <div className="text-xs">
                        <p className="font-medium text-gray-700">
                          {order.userRef?.name || "N/A"}
                        </p>
                        <p className="text-gray-400">
                          {order.userRef?.email?.slice(0, 15) || ""}
                          {order.userRef?.email && order.userRef.email.length > 15 && "..."}
                        </p>
                      </div>
                    </TableCell>

                    {/* Shipping Info */}
                    <TableCell className="py-3 px-3 min-w-[150px]">
                      <div className="text-xs space-y-0.5">
                        <p><span className="text-gray-400">Phone:</span> {order.shippingAddress?.phone || "N/A"}</p>
                        <p><span className="text-gray-400">Area:</span> {order.shippingAddress?.thana || "N/A"}</p>
                        <p className="text-gray-400 truncate max-w-[120px]">
                          {order.shippingAddress?.address || "N/A"}
                        </p>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="py-3 px-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {order.status || "N/A"}
                      </span>
                    </TableCell>

                    {/* Update Status */}
                    <TableCell className="py-3 px-3">
                      <Select
                        onValueChange={(value) => {
                          mutate(
                            {
                              id: order._id,
                              payload: { status: value },
                            },
                            {
                              onSuccess: (res) => {
                                toast.success(
                                  res?.message || "Status updated successfully",
                                );
                              },
                              onError: (error: any) => {
                                toast.error(
                                  error?.response?.data?.message ||
                                    "Something went wrong.",
                                );
                              },
                            },
                          );
                        }}
                      >
                        <SelectTrigger className="w-[110px] h-8 text-xs rounded-lg border-gray-300">
                          <SelectValue placeholder="Update" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                          <SelectItem value="PROCESSING">Processing</SelectItem>
                          <SelectItem value="SHIPPED">Shipped</SelectItem>
                          <SelectItem value="DELIVERED">Delivered</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                          <SelectItem value="ON_HOLD">On Hold</SelectItem>
                          <SelectItem value="IN_REVIEW">In Review</SelectItem>
                          <SelectItem value="RETURNED">Returned</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    {/* Courier */}
                    <TableCell className="py-3 px-3">
                      <SendQuiriar order={order}/>
                    </TableCell>

                    {/* Invoice */}
                    <TableCell className="py-3 px-3">
                      {/* <button className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors">
                        <Printer size={16} />
                      </button> */}
                      <Invoice order={order}/>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200"
                          title="Delete Order"
                        >
                          <Trash size={14} />
                        </button>
                        <ViewOrder order={order} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableHeaders.length}
                    className="text-center py-16 text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <Package size={32} className="text-gray-300" />
                      </div>
                      <p className="text-lg font-medium text-gray-700">
                        No orders found
                      </p>
                      <p className="text-sm text-gray-400">
                        Orders will appear here once placed
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>

      {/* Footer/Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50/50">
        
        <Pagination
          page={meta?.page}
          limit={meta?.limit}
          total={meta?.total}
          setPage={setPage}
          setLimit={setLimit}
        />
      </div>
    </div>
  );
};

export default OrderList;