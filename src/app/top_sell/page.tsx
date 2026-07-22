import TopSell from '@/components/pages/dashboard_managmnet/Top_Sell';

import React from 'react';

const page = () => {
    return (
         <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
        
           <TopSell/>
         
        </div>
    );
};

export default page;