import { createContext } from "react";

export const AuthContext = createContext<AuthContextValue>({ token: null, setToken: () => { } });
interface AuthContextValue {
  token: string | null;
  setToken: (token: string | null) => void;
}
