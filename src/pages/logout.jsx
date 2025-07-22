import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const Logout = () => {
  const { setToken } = useAuth();

  useEffect(() => {
    setToken();
  }, [setToken]);

  return <Navigate to="/" />;
};

export default Logout;
