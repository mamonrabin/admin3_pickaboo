
import CategoryCreate from '@/components/pages/categoty_managment/CategoryCreate';
import CategoryList from '@/components/pages/categoty_managment/CategoryList';
import React from 'react';

const Category = () => {
    return (
        <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
            <div className="border rounded p-4">
                <CategoryCreate />
            </div>
            <div className="border rounded p-4">
                <CategoryList />
            </div>
        </div>
    );
};

export default Category;