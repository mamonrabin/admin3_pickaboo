import { getDashboardStats, getOrderStats, getProductsStats, getUserStats } from "@/services/stats.api";
import { useQuery } from "@tanstack/react-query";

export const useAllDashboardStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getDashboardStats,
  });
};
export const useAllOrdersStats = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrderStats,
  });
};
export const useAllUserStats = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUserStats,
  });
};
export const useAllProductsStats = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsStats,
  });
};