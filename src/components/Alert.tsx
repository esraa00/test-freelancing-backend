import { HTMLProps } from "react";

interface AlertProps {
  status: "failure" | "success";
  message: string;
  className?: HTMLProps<HTMLElement>["className"];
}
export default function Alert({ message, status, className }: AlertProps) {
  return (
    <div
      className={` ${
        status === "success"
          ? "bg-green-100 border border-green-400 text-green-700"
          : "bg-red-100 border border-red-400 text-red-700"
      } px-4 py-3 rounded relative w-full ${className ? className : ""}`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          className={`fill-current h-6 w-6 ${
            status === "success" ? "text-green-500" : "text-red-500"
          }`}
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        ></svg>
      </span>
    </div>
  );
}
