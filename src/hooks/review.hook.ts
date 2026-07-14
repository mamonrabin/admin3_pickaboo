/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReview, deleteReview, getAllReviews, updateReview } from "@/services/review.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";





export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createReview(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review"] });
    },
  });
};



export const useAllReviews = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["review", page, limit],
    queryFn: () => getAllReviews(page, limit),
    placeholderData: (previousData) => previousData,
  });
};


export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteReview(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["review"],
      });
    },
  });
};


export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["review"],
      });
    },
  });
}; 


