import CouponList from '@/components/pages/coupon_managment/CouponList';
import CreateCoupon from '@/components/pages/coupon_managment/CreateCoupon';
import React from 'react';

const Coupon = () => {
    return (
        <div>
            <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
            <CreateCoupon/>
            <CouponList/>
        </div>
        </div>
    );
};

export default Coupon;