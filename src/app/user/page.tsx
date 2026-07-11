import UserList from '@/components/pages/user_managmant/UserList';
import React from 'react';

const User = () => {
    return (
       <div>
      <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
        <UserList/>
      </div>
    </div>
    );
};

export default User;