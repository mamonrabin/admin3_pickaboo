import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBanner, deleteBanner, getAllBanners, updateBanner } from "../services/banner.api";




export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createBanner(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banners"],
      });
    },
  });
};

export const useAllBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: getAllBanners,
  });
};


// export const useBanners = (page: number, limit: number) => {
//   return useQuery({
//     queryKey: ["brands", page, limit],
//     queryFn: () => getBanners(page, limit),
//     placeholderData: (previousData) => previousData,
//   });
// };


export const useUpdateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBanner,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banners"],
      });
    },
  });
}; 




export const useDeleteBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBanner(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banners"],
      });
    },
  });
};



