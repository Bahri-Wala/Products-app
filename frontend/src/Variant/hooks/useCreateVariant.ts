import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../api/axios";
import type { Variant, VariantInput } from "../../types/variant.types";

const createVariant = async (data: VariantInput): Promise<Variant> => {
  const response = await axiosInstance.post(`/variants`, data);
  return response.data;
};

export const useCreateVariant = () => {
  return useMutation<Variant, Error, VariantInput>({
    mutationFn: createVariant,
  });
};
