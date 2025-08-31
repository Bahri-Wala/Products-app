import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { LoginResponse, UserCredentials } from "../../types/auth.types";
import { axiosInstance } from "../../api/axios";
import { toast } from "react-toastify";

const loginUser = async (data: UserCredentials): Promise<LoginResponse> => {
  if (!data.username || !data.password) {
    toast.error("Wrong Credentials");
  }
  const response = await axiosInstance.post("/login", data);
  return response.data;
};

const useLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (userCredentials: UserCredentials) =>
      loginUser(userCredentials),

    onSuccess: (data) => {
      localStorage.setItem("username", data.username);
      navigate(`/products`);
    },
  });
  return {
    ...mutation,
  };
};

export default useLogin;
