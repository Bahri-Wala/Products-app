import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../api/axios";
import type { ProductUpdate } from "../../types/product.types";

const updateVariant = async (data: ProductUpdate): Promise<void> => {
  const { id, ...name } = data;
  await axiosInstance.patch(`/variants/${data.id}`, name);
};

export const useUpdateVariant = () => {
  return useMutation<void, Error, ProductUpdate>({
    mutationFn: updateVariant,
  });
};
