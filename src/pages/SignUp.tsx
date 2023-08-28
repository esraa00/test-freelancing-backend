import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import EmailConfirmationModal from "../components/Modal/EmailConfirmationModal";
import { ClosedEyeIcon, OpenedEyeIcon } from "../components/icons";
import PasswordRule from "../components/PasswordRule";

export default function SignUpPage() {
  const REQUIREMENTS = [
    {
      name: "minLength",
      label: "At least 8 characters",
    },
    {
      name: "hasUppercase",
      label: "Contains an uppercase letter",
    },
    {
      name: "hasLowercase",
      label: "Contains a lowercase letter",
    },
    {
      name: "hasNumber",
      label: "Contains a number",
    },
    {
      name: "hasSpecialChar",
      label: "Contains a special character",
    },
  ];

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [requestStatus, setRequestStatus] = useState<{
    status: "failure" | "success" | null;
    message: string;
  }>({
    status: null,
    message: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [requirements, setRequirements] = useState<{ [key: string]: boolean }>(
    REQUIREMENTS.reduce((acc, requirement) => {
      acc[requirement.name] = false;
      return acc;
    }, {})
  );

  const checkRequirements = (value: string) => {
    const updatedRequirements = {
      minLength: value.length >= 8,
      hasUppercase: /[A-Z]/.test(value),
      hasLowercase: /[a-z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecialChar: /[!@#$%^&*]/.test(value),
    };
    setRequirements(updatedRequirements);
  };

  const closeModal = () => {
    setRequestStatus({
      message: "",
      status: null,
    });
    navigate("/login");
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setRequestStatus({ status: null, message: "" });
    event.preventDefault();

    if (Object.values(requirements).some((fulfilled) => !fulfilled)) {
      setRequestStatus({
        status: "failure",
        message:
          "Please make sure all the required rules for the password are achieved",
      });
      return;
    }

    const response = await fetch(`http://localhost:3000/api/auth/signup`, {
      body: JSON.stringify(formData),
      headers: { "content-type": "application/json" },
      method: "POST",
    });
    const json = await response.json();
    if (json.status != 200) {
      setRequestStatus({
        status: "failure",
        message: json.error,
      });
      return;
    }
    setRequestStatus({
      status: "success",
      message: "",
    });
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
                placeholder: "First Name",
                name: "firstName",
                type: "text",
                onChange: handleOnChange,
                value: formData.firstName,
                required: true,
              }}
            />
            <Input
              attributes={{
                placeholder: "Last Name",
                name: "lastName",
                type: "text",
                onChange: handleOnChange,
                value: formData.lastName,
                required: true,
              }}
            />
          </div>
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
                onChange: (e) => {
                  handleOnChange(e);
                  checkRequirements(e.target.value);
                },
                value: formData.password,
                required: true,
              }}
            />
          </div>
          <Button type="primary" className="w-5/6 md:w-full">
            SignUp
          </Button>
          <span className="font-bold">
            have an account?{" "}
            <Link to={"/login"} className="text-green-700">
              Login
            </Link>
          </span>
          <ul className="flex flex-col gap-2">
            {REQUIREMENTS.map((requirement) => (
              <PasswordRule
                key={requirement.name}
                requirement={requirement}
                fulfilled={requirements[requirement.name]}
              />
            ))}
          </ul>
          {requestStatus.status === "failure" && (
            <Alert
              message={requestStatus.message}
              status={requestStatus.status}
            />
          )}
          {requestStatus.status === "success" && (
            <EmailConfirmationModal closeModal={closeModal} />
          )}
        </div>
      </form>
    </>
  );
}
