import { AxiosInstance } from "../lib/AxiosInstance";

export const createhomeController = async (formData: FormData) => {
  const { data } = await AxiosInstance.post("/home/create-home-controll", formData);
  return data;
};

export const getAllhomeControllers = async () => {
  const { data } = await AxiosInstance.get("/home");
  return data;
};

export const deletehomeController = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/home/${id}`);
  return data;
};

export const updatehomeController = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    landing?: string;
    order?: string;
    enabled?: string;
  };
}) => {
  const { data } = await AxiosInstance.patch(`/home/${id}`, payload);

  return data;
};
