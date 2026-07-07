import React from 'react';

const Banners = () => {
    return (
        <div>
            <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
            <div className="border rounded p-4">
                <h2>create banners</h2>
            </div>
            <div className="border rounded p-4">
                <h2>banners list</h2>
            </div>
        </div>
        </div>
    );
};

export default Banners;