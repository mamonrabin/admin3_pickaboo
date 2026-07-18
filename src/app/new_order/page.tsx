import TodayOrders from '@/components/pages/order_managment/TodayOrders';
import React from 'react';

const NewOrder = () => {
    return (
        <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
            <TodayOrders/>
        </div>
    );
};

export default NewOrder;