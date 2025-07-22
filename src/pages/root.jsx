import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

const Root = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar user={user} />
      <Outlet />
    </>
  );
};

export default Root;
