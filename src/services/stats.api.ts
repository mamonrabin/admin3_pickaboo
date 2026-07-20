import { AxiosInstance } from "@/lib/AxiosInstance";

export const getDashboardStats = async () => {
  const { data } = await AxiosInstance.get("/stats/dashboard");
  return data;
};
export const getOrderStats = async () => {
  const { data } = await AxiosInstance.get("/stats/order");
  return data;
};
export const getUserStats = async () => {
  const { data } = await AxiosInstance.get("/stats/user");
  return data;
};
export const getProductsStats = async () => {
  const { data } = await AxiosInstance.get("/stats/products");
  return data;
};