import { ReactNode, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "./Spinner";
interface isTwoFactorAuthenticatedProps {
  children: ReactNode;
}
const IsTwoFactorAuthenticatedWrapper = ({
  children,
}: isTwoFactorAuthenticatedProps) => {
  const [requestStatus, setRequestStatus] = useState<{
    status: "failure" | "success" | null;
    message?: string;
    data?: { isTwoFactorAuthenticated: boolean } | null;
  }>({ status: null, message: "", data: null });

  console.log("data ", requestStatus.data);
  useEffect(() => {
    const isTwoFactorAuthenticatedRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/auth/isTwoFactorAuthenticated`,
          { credentials: "include" }
        );
        const json: { isTwoFactorAuthenticated: boolean } =
          await response.json();
        console.log("json ", json);

        setRequestStatus({
          status: "success",
          data: { isTwoFactorAuthenticated: json.isTwoFactorAuthenticated },
        });
      } catch (error) {
        setRequestStatus({ status: "failure", message: error.message });
      }
    };
    isTwoFactorAuthenticatedRequest();
  }, []);

  if (requestStatus.status === null) {
    return <Spinner />;
  } else if (
    requestStatus.status === "success" &&
    requestStatus.data?.isTwoFactorAuthenticated === true
  ) {
    return children;
  } else if (requestStatus.status === "failure") {
    return <h1>{requestStatus.message}</h1>;
  } else {
    return (
      <h1>
        Please complete the <NavLink to="/otp">2FA step</NavLink> to continue.
      </h1>
    );
  }
};
export default IsTwoFactorAuthenticatedWrapper;
