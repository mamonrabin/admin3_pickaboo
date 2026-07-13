
import { createLogo, deleteLogo, getAllLogo, updateLogo } from "@/services/setLogo.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



export const useCreateLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createLogo(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["logo"],
      });
    },
  });
};




export const useAllLogo = () => {
  return useQuery({
    queryKey: ["logo"],
    queryFn: getAllLogo,
  });
};


export const useUpdateLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLogo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["logo"],
      });
    },
  });
}; 


export const useDeleteLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteLogo(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["logo"],
      });
    },
  });
};



