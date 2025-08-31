import { useState } from "react";
import { icons } from "lucide-react";
import { Input } from "./Input";
import { cn } from "../lib/utils";

type IconName = keyof typeof icons;

type Props = {
  type: string;
  placeholder: string;
  icon: IconName;
  error?: string;
};

const CustomInput = (props: Props) => {
  const [currentIcon, setCurrentIcon] = useState<IconName>("Eye");
  console.log(props.error);
  const Icon = icons[props.icon];
  const VisibilityIcon = icons[currentIcon];
  return (
    <div className="relative w-full">
      <Input
        type={
          props.type === "password" && currentIcon === "Eye"
            ? "password"
            : "text"
        }
        className={cn(
          "w-full text-black placeholder:text-gray-500 py-6 px-6 pl-9 border-gray-500 focus-visible:border-blue-400 duration-300 transition",
          props.type.includes("password") && "pr-10"
        )}
        placeholder={props.placeholder}
      />
      <Icon className="absolute text-gray-600 left-2.5 top-1/4 pointer-events-none w-5" />
      {props.type === "password" ? (
        <VisibilityIcon
          className="absolute text-gray-600 right-3 top-1/4 w-5 cursor-pointer"
          onClick={() =>
            setCurrentIcon(currentIcon === "Eye" ? "EyeOff" : "Eye")
          }
        />
      ) : (
        ""
      )}
      {props.error ? (
        <span className="absolute text-xs text-red-600">{props.error}</span>
      ) : (
        ""
      )}
    </div>
  );
};

export default CustomInput;
