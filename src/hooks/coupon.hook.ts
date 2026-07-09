/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCoupon, deleteCoupon, getAllCoupons, getCoupons, updateCoupon } from "../services/cupon.api";




export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createCoupon(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
};

export const useAllCoupons = () => {
  return useQuery({
    queryKey: ["coupons"],
    queryFn: getAllCoupons,
  });
};


export const useCoupons = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["coupons", page, limit],
    queryFn: () => getCoupons(page, limit),
    placeholderData: (previousData) => previousData,
  });
};

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCoupon(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["coupons"],
      });
    },
  });
};


export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCoupon,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["coupons"],
      });
    },
  });
}; 


