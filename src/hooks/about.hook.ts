/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAbout, deleteAbout, getAllAbouts, updateAbout } from "@/services/about.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";





export const useCreateAbout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createAbout(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
    },
  });
};

export const useAllAbouts = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: getAllAbouts,
  });
};




export const useDeleteAbout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAbout(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["about"],
      });
    },
  });
};


export const useUpdateAbout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAbout,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["about"],
      });
    },
  });
}; 


