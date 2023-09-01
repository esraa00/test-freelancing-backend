import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../components/Input";
import { ClosedEyeIcon, OpenedEyeIcon } from "../components/icons";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [requestStatus, setRequestStatus] = useState<{
    status: "failure" | "success" | null;
    message: string;
  }>({
    status: null,
    message: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: newValue,
      };
    });
  };

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestStatus({ status: null, message: "" });
    const response = await fetch(`http://localhost:3000/api/auth/login`, {
      body: JSON.stringify(formData),
      headers: { "content-type": "application/json" },
      method: "POST",
    });
    const {
      status,
      message,
      data,
    }: {
      status: number;
      message?: string;
      data: { isOtpVerified: boolean };
    } = await response.json();

    if (status != 200) {
      setRequestStatus({ message, status: "failure" });
      return;
    }
    if (data.isOtpVerified) {
      navigate("/otp");
    } else {
      navigate("/otpSetup");
    }
  };

  return (
    <>
      <form
        onSubmit={handleOnSubmit}
        className=" w-[100vw] h-[100vh] flex items-center justify-center flex-col"
      >
        <div className="w-full flex items-center justify-center flex-col md:w-1/3 gap-2">
          <div className="flex flex-col items-center md:flex-row gap-2">
            <Input
              attributes={{
                placeholder: "Email",
                name: "email",
                type: "email",
                onChange: handleOnChange,
                value: formData.email,
                required: true,
              }}
            />
            <Input
              icon={
                showPassword ? (
                  <ClosedEyeIcon onClick={togglePasswordVisibility} />
                ) : (
                  <OpenedEyeIcon onClick={togglePasswordVisibility} />
                )
              }
              attributes={{
                placeholder: "Password",
                name: "password",
                type: showPassword ? "text" : "password",
                onChange: handleOnChange,
                value: formData.password,
                required: true,
              }}
            />
          </div>
          <div className="flex gap-1">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleOnChange}
            />
            <label className="font-bold" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>
          <Button type="primary" className="w-5/6 md:w-full">
            Login
          </Button>
          <span className="font-bold">
            Not A Member?{" "}
            <Link to={"/signUp"} className="text-green-700">
              Create An Account
            </Link>
          </span>
          {requestStatus.status === "failure" && (
            <Alert
              message={requestStatus.message}
              status={requestStatus.status}
            />
          )}
        </div>
      </form>
    </>
  );
}
