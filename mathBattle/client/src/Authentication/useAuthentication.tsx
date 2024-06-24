
import { useContext} from "react";
import { AuthContext } from "./AuthContext";

export const useAuthentication = () => {
  return useContext(AuthContext);
};



