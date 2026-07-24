/* eslint-disable @typescript-eslint/no-explicit-any */

import { createhomeController, deletehomeController, getAllhomeControllers, updatehomeController } from "@/services/homeController.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";





export const useCreateHome = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createhomeController(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
  });
};



// export const useAllHomes = (page: number, limit: number) => {
//   return useQuery({
//     queryKey: ["home"],
//     queryFn: () => getAllhomeControllers(),
//     placeholderData: (previousData) => previousData,
//   });
// };

export const useAllHomes = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: getAllhomeControllers,
  });
};


export const useDeleteHome = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletehomeController(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["home"],
      });
    },
  });
};


export const useUpdateHome = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatehomeController,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["home"],
      });
    },
  });
}; 


