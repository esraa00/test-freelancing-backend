import { HTMLProps, InputHTMLAttributes, ReactNode } from "react";
interface InputProps {
  className?: HTMLProps<HTMLElement>["className"];
  attributes?: InputHTMLAttributes<HTMLInputElement>;
  icon?: ReactNode;
}
export default function Input({ attributes, className, icon }: InputProps) {
  return (
    <div className="flex gap-1 px-4 py-2 border-sm border border-gray-400 rounded">
      <input
        className={`outline-none ${className ? className : ""}`}
        {...attributes}
      />
      {icon}
    </div>
  );
}
