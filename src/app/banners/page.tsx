import BannerList from '@/components/pages/banner_managment/BannerList';
import CreateBanner from '@/components/pages/banner_managment/CreateBanner';
import React from 'react';

const Banners = () => {
    return (
        <div>
            <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
            <CreateBanner/>
            <BannerList/>
        </div>
        </div>
    );
};

export default Banners;