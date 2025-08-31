import { useQuery } from "@tanstack/react-query";
import type { PrismaWhere, Product } from "../../types/product.types";
import { axiosInstance } from "../../api/axios";

const fetchProducts = async (params?: PrismaWhere): Promise<Product[]> => {
  const response = await axiosInstance.get("/products", {
    params,
  });

  return response.data;
};

const useGetProducts = (params?: PrismaWhere, enabled: boolean = true) => {
  return useQuery<Product[]>({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
    enabled,
  });
};

export default useGetProducts;
