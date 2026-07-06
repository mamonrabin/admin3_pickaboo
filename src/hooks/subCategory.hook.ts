import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategories,
  updateSubCategory,
} from "@/services/sub-category.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createSubCategory(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sub-categories"],
      });
    },
  });
};

export const useAllSubCategories = () => {
  return useQuery({
    queryKey: ["sub-categories"],
    queryFn: getAllSubCategories,
  });
};

export const useSubCategories = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["sub-categories", page, limit],
    queryFn: () => getSubCategories(page, limit),
    placeholderData: (previousData) => previousData,
  });
};

export const useUpdateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSubCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sub-categories"],
      });
    },
  });
}; 

export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSubCategory(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sub-categories"],
      });
    },
  });
};
