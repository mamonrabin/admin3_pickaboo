import AboutList from '@/components/pages/about_managment/AboutList';
import CreateAbout from '@/components/pages/about_managment/CreateAbout';
import React from 'react';

const About = () => {
    return (
        <div>
            <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
            <CreateAbout/>
            <AboutList/>
        </div>
        </div>
    );
};

export default About;