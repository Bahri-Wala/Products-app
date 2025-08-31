import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../api/axios";

const deleteProduct = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/products/${id}`);
};

export const useDeleteProduct = () => {
  return useMutation<void, Error, string>({
    mutationFn: deleteProduct,
  });
};
