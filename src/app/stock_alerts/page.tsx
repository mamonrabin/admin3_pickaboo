import LowStackAlert from '@/components/pages/stack_managment/LowStackAlert';
import React from 'react';

const page = () => {
    return (
         <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
        
           <LowStackAlert/>
        </div>
    );
};

export default page;