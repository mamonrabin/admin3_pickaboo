import { AxiosInstance } from "../lib/AxiosInstance";

export const createBanner = async (formData: FormData) => {
  const { data } = await AxiosInstance.post(
    "/banner/create-banner",
    formData,
  );
  return data;
};

// export const createBanner = async (formData: FormData) => {
//   const { data } = await AxiosInstance.post(
//     "/banner/create-banner",
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return data;
// };

export const getAllBanners = async () => {
  const { data } = await AxiosInstance.get("/banner");
  return data;
};

// export const getBanners = async (page: number, limit: number) => {
//   const { data } = await AxiosInstance.get(
//     `/banner/pagination?page=${page}&limit=${limit}`,
//   );

//   return data;
// };

export const deleteBanner = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/banner/${id}`);
  return data;
};

export const updateBanner = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const { data } = await AxiosInstance.put(`/banner/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
