import CreateSocial from '@/components/pages/social_managment/CreateSocial';
import SocialList from '@/components/pages/social_managment/SocialList';
import React from 'react';

const Social = () => {
    return (
       <div>
            <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
            <CreateSocial/>
            <SocialList/>
        </div>
        </div>
    );
};

export default Social;