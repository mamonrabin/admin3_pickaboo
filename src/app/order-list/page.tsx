"use client";

import OrderList from "@/components/pages/order_managment/OrderList";
import OrderSelector from "@/components/pages/order_managment/OrderSelector";
import { useAllOrders } from "@/hooks/order.hook";
import React, { useState } from "react";

const Order = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [paymentMethod, setPaymentMethod] = useState<string>();
  const [paymentStatus, setPaymentStatus] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [dateFilter, setDateFilter] = useState<string>();

  const { data: orderList, isLoading } = useAllOrders({
    page,
    limit,
    paymentMethod,
    paymentStatus,
    status,
    dateFilter,
  });
  const orders = orderList?.data?.data;
  const meta = orderList?.data?.meta;

  return (
    <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
      <OrderSelector 
      setPaymentMethod={setPaymentMethod}
      setPaymentStatus={setPaymentStatus}
      setStatus={setStatus}
      setDateFilter={setDateFilter}
        meta={meta}
       />
      <OrderList 
      orders={orders}
      meta={meta}
      setPage={setPage}
      setLimit={setLimit}
      isLoading={isLoading}
      />
    </div>
  );
};

export default Order;
