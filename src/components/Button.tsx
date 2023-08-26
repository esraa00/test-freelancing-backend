import { HTMLProps, ButtonHTMLAttributes, ReactNode } from "react";
interface ButtonProps {
  type: "primary" | "secondary";
  className?: HTMLProps<HTMLElement>["className"];
  attributes?: ButtonHTMLAttributes<HTMLButtonElement>;
  children: ReactNode;
}
export default function Button({
  type,
  attributes,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      className={`${
        type === "primary" && `bg-green-700 hover:bg-green-900 text-white`
      } 
        ${
          type === "secondary" &&
          `text-green-700 border-green-700 bg-transparent hover:bg-green-900  font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded
        `
        } 
        font-bold py-2 px-4 rounded ${className ? className : ""}`}
      {...attributes}
    >
      {children}
    </button>
  );
}
