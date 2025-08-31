import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../api/axios";
import type { Product, ProductInput } from "../../types/product.types";

const createProduct = async (data: ProductInput): Promise<Product> => {
  const response = await axiosInstance.post(`/products`, data);
  return response.data;
};

export const useCreateProduct = () => {
  return useMutation<Product, Error, ProductInput>({
    mutationFn: createProduct,
  });
};
