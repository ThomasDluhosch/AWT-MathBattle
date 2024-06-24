import { Navigate, Outlet } from "react-router-dom";
import { useAuthentication } from "./useAuthentication";

export const AuthenticatedRoute = () => {
    const { token } = useAuthentication();
  
    if (!token) {
      return <Navigate to="/login" />;
    }

    return <Outlet />;
  };