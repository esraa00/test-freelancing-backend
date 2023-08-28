import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import EmailConfirmationModal from "../components/Modal/EmailConfirmationModal";

export default function SignUpPage() {
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

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setRequestStatus({ status: null, message: "" });
    event.preventDefault();
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
              attributes={{
                placeholder: "Password",
                name: "password",
                type: "password",
                onChange: handleOnChange,
                value: formData.password,
                required: true,
              }}
            />
          </div>
          <Button type="primary" className="w-5/6 md:w-full">
            SignUp
          </Button>
          <span>
            have an account? <Link to={"/login"}>Login</Link>
          </span>
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
