/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPolicy, deletePolicy, getAllPolicyByType, getAllPolicys, TPolicyType, updatePolicy } from "@/services/policy.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";





export const useCreatePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createPolicy(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policys"] });
    },
  });
};

export const useAllPolicys = () => {
  return useQuery({
    queryKey: ["policys"],
    queryFn: getAllPolicys,
  });
};


export const usePolicyByType = (type?: TPolicyType) => {
  return useQuery({
    queryKey: ["policys", type],
    queryFn: () => getAllPolicyByType(type),
    placeholderData: (previousData) => previousData,
  });
};

export const useDeletePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePolicy(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["policys"],
      });
    },
  });
};


export const useUpdatePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePolicy,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["policys"],
      });
    },
  });
}; 


