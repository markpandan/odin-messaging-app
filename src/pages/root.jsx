import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

const Root = () => {
  const { user, setToken, token } = useAuth();

  return (
    <>
      <Navbar user={user} />
      <Outlet context={{ user, setToken, token }} />
    </>
  );
};

export default Root;
