import ContactList from '@/components/pages/contact_managment/ContactList';
import React from 'react';

const Contact = () => {
    return (
        <div>
      <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
        <ContactList/>
      </div>
    </div>
    );
};

export default Contact;