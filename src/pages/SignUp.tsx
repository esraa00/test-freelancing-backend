import { ChangeEvent, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <>
      <div className=" w-[100vw] h-[100vh] flex items-center justify-center">
        <div className="w-full flex items-center justify-center flex-col md:w-1/3 gap-2">
          <div className="flex flex-col items-center md:flex-row gap-2">
            <Input
              attributes={{
                placeholder: "First Name",
                name: "firstName",
                type: "text",
                onChange: handleOnChange,
                value: formData.firstName,
              }}
            />
            <Input
              attributes={{
                placeholder: "Last Name",
                name: "lastName",
                type: "text",
                onChange: handleOnChange,
                value: formData.lastName,
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
              }}
            />
            <Input
              attributes={{
                placeholder: "Password",
                name: "password",
                type: "password",
                onChange: handleOnChange,
                value: formData.password,
              }}
            />
          </div>
          <Button type="primary" className="w-5/6 md:w-full">
            SignUp
          </Button>
          <span>
            have an account? <Link to={"/login"}>Login</Link>
          </span>
        </div>
      </div>
    </>
  );
}
