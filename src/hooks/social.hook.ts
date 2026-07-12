/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSocial, deleteSocial, getAllSocials, updateSocial } from "@/services/social.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";





export const useCreateSocial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createSocial(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social"] });
    },
  });
};

export const useAllSocials = () => {
  return useQuery({
    queryKey: ["social"],
    queryFn: getAllSocials,
  });
};




export const useDeleteSocial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSocial(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["social"],
      });
    },
  });
};


export const useUpdateSocial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSocial,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["social"],
      });
    },
  });
}; 


