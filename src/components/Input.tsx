import { HTMLProps, InputHTMLAttributes } from "react";
interface InputProps {
  className?: HTMLProps<HTMLElement>["className"];
  attributes?: InputHTMLAttributes<HTMLInputElement>;
}
export default function Input({ attributes, className }: InputProps) {
  return (
    <input
      className={`px-4 py-2 border-sm outline-none border border-gray-400 rounded ${
        className ? className : ""
      }`}
      {...attributes}
    />
  );
}
