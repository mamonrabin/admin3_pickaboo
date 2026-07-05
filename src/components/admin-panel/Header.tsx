import { Bell, Search } from 'lucide-react';
import React from 'react';

const Header = () => {
    return (
        <div className='flex items-center gap-2 py-2 rounded-b justify-end bg-secondary shadow-xs md:px-8 px-4 sticky z-10 top-0 w-full'>
           <div>
            <form className='lg:inline-flex hidden items-center justify-between border rounded px-2 py-1 w-64'>
                <input className='w-full outline-none' type="text" placeholder='Search...' />
                <Search size={16} />
            </form>
           </div>
           <div className='w-8 h-8 rounded border flex items-center justify-center relative'>
            <p><Bell size={16} /></p>
            <p className='w-2 h-2 rounded-full bg-[#2B748A] absolute top-1.5 right-2'></p>
           </div>
           <div className='w-8 h-8 rounded border flex items-center justify-center'>
            <h2 className='font-medium'>A</h2>
           </div>
        </div>
    );
};

export default Header;