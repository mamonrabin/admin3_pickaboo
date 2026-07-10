import { AxiosInstance } from "../lib/AxiosInstance";

export const createCampaign = async (formData: FormData) => {
  const { data } = await AxiosInstance.post(
    "/campaign/create-campaign",
    formData,
  );
  return data;
};

export const getAllCampaigns = async () => {
  const { data } = await AxiosInstance.get("/campaign");
  return data;
};



export const deleteCampaign = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/campaign/${id}`);
  return data;
};

export const updateCampaign = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const { data } = await AxiosInstance.patch(`/campaign/${id}`, formData, {
    headers: {
     "Content-Type": "multipart/form-data"
    },
  });

  return data;
};
