import { ReactNode, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "./Spinner";
interface IsAuthenticatedWrapperProps {
  children: ReactNode;
}
const IsAuthenticatedWrapper = ({ children }: IsAuthenticatedWrapperProps) => {
  const [requestStatus, setRequestStatus] = useState<{
    status: "failure" | "success" | null;
    message?: string;
    data?: { isAuthenticated: boolean } | null;
  }>({ status: null, message: "", data: null });
  useEffect(() => {
    const isAuthenticatedRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/auth/isAuthenticated`,
          { credentials: "include" }
        );
        const json: { isAuthenticated: boolean } = await response.json();
        setRequestStatus({
          status: "success",
          data: { isAuthenticated: json.isAuthenticated },
        });
      } catch (error) {
        setRequestStatus({ status: "failure", message: error.message });
      }
    };
    isAuthenticatedRequest();
  }, []);

  if (requestStatus.status === null) {
    return <Spinner />;
  } else if (
    requestStatus.status === "success" &&
    requestStatus.data?.isAuthenticated === true
  ) {
    return children;
  } else if (requestStatus.status === "failure") {
    return <h1>{requestStatus.message}</h1>;
  } else {
    return (
      <h1>
        Please <NavLink to="/login">login</NavLink> first to continue.
      </h1>
    );
  }
};
export default IsAuthenticatedWrapper;
