import { useQuery } from "@tanstack/react-query";
import type { Variant } from "../../types/variant.types";
import { axiosInstance } from "../../api/axios";
import type { PrismaWhere } from "../../types/product.types";

const fetchVariants = async (params?: PrismaWhere): Promise<Variant[]> => {
  const response = await axiosInstance.get("/variants", {
    params,
  });

  return response.data;
};

const useGetVariants = (params?: PrismaWhere, enabled: boolean = true) => {
  return useQuery<Variant[]>({
    queryKey: ["variants", params],
    queryFn: () => fetchVariants(params),
    enabled,
  });
};

export default useGetVariants;
