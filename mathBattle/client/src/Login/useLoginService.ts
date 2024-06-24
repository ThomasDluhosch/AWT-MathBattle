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
        console.log("logging in");
        console.log(user);
        const response = await fetchFromBackend("/users/login", "POST", user);
        const loginResponse : LoginResponse = await response.json();
        if (loginResponse.success) {
            authContext.setToken(loginResponse.token);
            navigate('/');
        } else {
            alert(loginResponse.message);
        }
    }
    return [loginUser];
}