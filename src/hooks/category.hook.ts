import { createCategory, deleteCategory, getCategories, updateCategory } from "@/services/category.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createCategory(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};


export const useCategories = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["categories", page, limit],
    queryFn: () => getCategories(page, limit),
    placeholderData: (previousData) => previousData,
  });
};


export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}; 


export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};



