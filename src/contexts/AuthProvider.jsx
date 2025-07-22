import { createContext, useState, useEffect, useMemo } from "react";
// import { fetchGet } from "../utils/fetchUtils";
import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(token ? jwtDecode(token) : {});

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      setUser(decoded);
    } else {
      localStorage.removeItem("token");
      setUser({});
    }

    // console.log(token, user);
  }, [token]);

  const contextValue = useMemo(
    () => ({ token, setToken, user }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
