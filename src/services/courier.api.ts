import { AxiosInstance } from "@/lib/AxiosInstance";


export const createSteadfastParcel = async (orderId: string) => {
  const { data } = await AxiosInstance.post(
    `/courier/steadfast/${orderId}`
  );

  return data;
};

export const trackSteadfastParcel = async (
  consignmentId: string,
) => {
  const { data } = await AxiosInstance.get(
    `/courier/track/${consignmentId}`
  );

  return data;
};