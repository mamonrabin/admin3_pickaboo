import Overview from '@/components/pages/dashboard_managmnet/Overview';
import React from 'react';

const DashboardOverview = () => {
  return (
    <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
      <Overview/>
    </div>
  );
};

export default DashboardOverview;