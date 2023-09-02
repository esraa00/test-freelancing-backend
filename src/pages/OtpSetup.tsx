import { useState, useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const OtpSetupPage = () => {
  const navigate = useNavigate();
  const [qrCodeDataURL, setQRCodeDataURL] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(
        "http://localhost:3000/api/auth/otp/generate",
        {
          credentials: "include",
        }
      );
      const json = await response.json();
      setQRCodeDataURL(json.data);
    };
    getUser();
  }, []);

  const handleButtonClick = () => {
    navigate("/otp");
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center flex-col">
      <div className="flex justify-center items-center flex-col max-w-[45rem] px-5 w-full gap-4">
        <span>
          In order to protect your account from unauthorized access, we require
          both a password and possession of your phone to access your account.
          Please install Microsoft Authenticator app through the following steps
          for us to verify that you have possession of your phone.
        </span>
        <ol className="list-decimal">
          <li>
            Install the Microsoft Authenticator App from{" "}
            <strong> IOS App Store/Android Play Store.</strong>
          </li>
          <li>Open the Microsoft Authenticator App.</li>
          <li>
            Click <strong>I agree</strong> for permissions to use the app.
          </li>
          <li>
            Click <strong>Scan a QR Code.</strong>
          </li>
          <li>Scan the image below</li>
        </ol>
        <div>
          <img src={qrCodeDataURL} alt="QR Code" />
        </div>
        <span className="text-center max-w-[30rem]">
          When Microsoft Authenticator app displays a six-digit code, click the
          Continue button below
        </span>
        <Button
          className="mt-10"
          type="primary"
          attributes={{ onClick: handleButtonClick }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default OtpSetupPage;
