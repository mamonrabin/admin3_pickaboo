import CreateLogo from '@/components/pages/logo_managment/CreateLogo';
import LogoList from '@/components/pages/logo_managment/LogoList';
import React from 'react';

const Logo = () => {
    return (
        <div>
            <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
            <CreateLogo/>
            <LogoList/>
        </div>
        </div>
    );
};

export default Logo;