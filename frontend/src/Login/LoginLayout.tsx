import "./auth.css";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = (props: Props) => {
  return (
    <div className="flex w-[100vw] h-[100vh] mylayout justify-center items-center ">
      <div
        className="flex flex-col md:w-1/2 h-auto lg:w-1/4 w-full p-9 justify-center items-center rounded-4xl gap-6"
        style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default AuthLayout;
