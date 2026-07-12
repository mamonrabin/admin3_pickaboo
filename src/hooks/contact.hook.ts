import { deleteContact, getAllContact } from "@/services/contact.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";








export const useAllContact = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["contact", page, limit],
    queryFn: () => getAllContact(page, limit),
    placeholderData: (previousData) => previousData,
  });
};




export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteContact(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contact"],
      });
    },
  });
};

