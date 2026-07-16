import { createSteadfastParcel, trackSteadfastParcel } from "@/services/courier.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export const useCreateSteadfastParcel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) =>
      createSteadfastParcel(orderId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

export const useTrackSteadfastParcel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (consignmentId: string) =>
      trackSteadfastParcel(consignmentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};