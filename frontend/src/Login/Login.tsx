import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { Button } from "../components/Button";

const LoginPage = () => {
  return (
    <form className="flex flex-col h-full w-full justify-center items-center gap-6">
      <CustomInput placeholder="Enter your email" icon="User" type="email" />
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
