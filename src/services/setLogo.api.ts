import { AxiosInstance } from "@/lib/AxiosInstance";

export const createLogo = async (formData: FormData) => {
  const { data } = await AxiosInstance.post(
    "/logo/create-logo",
    formData,
  );
  return data;
};

export const getAllLogo = async () => {
  const { data } = await AxiosInstance.get("/logo");
  return data;
};



export const deleteLogo = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/logo/${id}`);
  return data;
};

export const updateLogo = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const { data } = await AxiosInstance.patch(`/logo/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
