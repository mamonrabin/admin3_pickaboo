import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBrand, deleteBrand, getAllBrands, getBrands, updateBrand } from "../services/brand.api";



export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createBrand(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
  });
};

export const useAllBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
  });
};


export const useBrands = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["brands", page, limit],
    queryFn: () => getBrands(page, limit),
    placeholderData: (previousData) => previousData,
  });
};


export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBrand,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
  });
};




export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBrand(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
  });
};

