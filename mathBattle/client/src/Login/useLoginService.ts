import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../Authentication/useAuthentication";
import { fetchFromBackend } from "../fetch/fetch-backend";
import { IUser } from "./IUser";

interface LoginResponse {
    success: boolean,
    token: string,
    message: string
}

export function useLoginService() {
    const navigate = useNavigate();
    const authContext = useAuthentication();

    const loginUser = async (user: IUser) => {
        if (import.meta.env.VITE_USE_BACKEND == "TRUE") {
            const response = await fetchFromBackend("/users/login", "POST", user);
            const loginResponse: LoginResponse = await response.json();
            if (loginResponse.success) {
                authContext.setToken(loginResponse.token);
                navigate('/');
            } else {
                alert(loginResponse.message);
            }
        } else {
            authContext.setToken("SomeTest");
            navigate('/');
        }
    }

    const logoutUser = () => {
        authContext.setToken(null);
        navigate('/login');
    }

    const isLoggedIn = () => {
        return authContext.token == null ? false : true;
    }

    return [loginUser, logoutUser, isLoggedIn];
}