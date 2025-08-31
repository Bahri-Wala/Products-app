import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../api/axios";

const deleteVariant = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/variants/${id}`);
};

export const useDeleteVariant = () => {
  return useMutation<void, Error, string>({
    mutationFn: deleteVariant,
  });
};
