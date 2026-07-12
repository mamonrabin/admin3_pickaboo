import CreatePolicy from '@/components/pages/policy_managment/CreatePolicy';
import PolicyList from '@/components/pages/policy_managment/PolicyList';
import React from 'react';

const Policy = () => {
    return (
        <div>
            <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
            <CreatePolicy/>
            <PolicyList/>
        </div>
        </div>
    );
};

export default Policy;