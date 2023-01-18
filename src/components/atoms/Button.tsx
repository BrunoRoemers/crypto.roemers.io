import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Button = ({ children }: Props) => {
  return (
    <button className="w-full h-8 p-1 bg-black text-white hover:bg-white hover:text-black border border-black">
      {children}
    </button>
  );
};

export default Button;
