
import BrandList from '@/components/pages/brand_managment/BrandList';
import Createbrand from '@/components/pages/brand_managment/CreateBrand';
import React from 'react';

const Brand = () => {
    return (
        <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
            <div className="border rounded p-4">
                <Createbrand />
            </div>
            <div className="border rounded p-4">
                <BrandList />
            </div>
        </div>
    );
};

export default Brand;