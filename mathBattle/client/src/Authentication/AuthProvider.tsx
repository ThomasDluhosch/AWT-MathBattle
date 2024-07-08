import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";


export function AuthProvider(props: { children: JSX.Element; }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // update contextValue on token change
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
  );
}
;
