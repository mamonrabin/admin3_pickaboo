import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCampaign, deleteCampaign, getAllCampaigns, updateCampaign } from "../services/campaign.api";




export const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createCampaign(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["campaigns"],
      });
    },
  });
};

export const useAllCampaigns = () => {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: getAllCampaigns,
  });
};


export const useUpdateampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCampaign,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["campaigns"],
      });
    },
  });
}; 

export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCampaign(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["campaigns"],
      });
    },
  });
};




