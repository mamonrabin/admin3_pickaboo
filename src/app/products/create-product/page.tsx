import CreateProducts from '@/components/pages/product-management/CreateProducts';
import React from 'react';

const CreateProduct = () => {
    return (
        <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
            <div className="border rounded p-4">
                <CreateProducts/>
            </div>
            
        </div> 
    );
};

export default CreateProduct;