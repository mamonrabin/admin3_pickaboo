import CampaingList from "@/components/pages/campaign_managment/CampaingList";
import CreateCampaing from "@/components/pages/campaign_managment/CreateCampaing";
import React from "react";

const Campaign = () => {
  return (
    <div>
      <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
        <CreateCampaing />
        <CampaingList />
      </div>
    </div>
  );
};

export default Campaign;
