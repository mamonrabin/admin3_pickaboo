import { AxiosInstance } from "../lib/AxiosInstance";

 
export const getAllContact = async (page = 1, limit = 10) => {
  const { data } = await AxiosInstance.get(`/contact?page=${page}&limit=${limit}`);
  return data;
};



export const deleteContact = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/contact/${id}`);
  return data;
};


