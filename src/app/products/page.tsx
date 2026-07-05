

import ProductSelector from '@/components/pages/product-management/ProductSelector';
import ProductsList from '@/components/pages/product-management/ProductsList';
import React from 'react';

const Products = () => {
    return (
        <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
            <div className="border rounded p-4">
                <ProductSelector />
            </div>
            <div className="border rounded p-4">
                <ProductsList />
            </div>
        </div>
    );
};

export default Products;