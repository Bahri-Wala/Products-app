import CustomInput from "../components/CustomInput";
import { Button } from "../components/Button";
import useLogin from "./hooks/login";
import { useForm } from "react-hook-form";
import type { UserCredentials } from "../types/auth.types";

const LoginPage = () => {
  const { mutateAsync: login } = useLogin();
  const form = useForm<UserCredentials>();
  const { handleSubmit } = form;

  const handleConnect = async (formData: UserCredentials) => {
    await login(formData);
  };

  return (
    <form
      className="flex flex-col h-full w-full justify-center items-center gap-6"
      onSubmit={handleSubmit(handleConnect)}
    >
      <CustomInput placeholder="Enter your username" icon="User" type="text" />
      <CustomInput
        placeholder="Enter the password"
        icon="Lock"
        type="password"
      />
      <Button
        type="submit"
        className="py-4 px-12 bg-blue-600 cursor-pointer w-full hover:bg-blue-700"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginPage;
