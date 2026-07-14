import ReviewList from '@/components/pages/reviwe_managment/ReviewList';
import React from 'react';

const ProductReview = () => {
    return (
        <div>
      <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
       <ReviewList/>
      </div>
    </div>
    );
};

export default ProductReview;