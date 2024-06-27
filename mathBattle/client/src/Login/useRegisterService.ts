import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../Authentication/useAuthentication";
import { fetchFromBackend } from "../fetch/fetch-backend";
import { IUser } from "./IUser";

interface RegisterResponse {
    success: boolean,
    message: string
}

export function useRegisterService() {
    const navigate = useNavigate();

    const registerUser = async (user: IUser) => {
        const response = await fetchFromBackend("/users/register", "POST", user);
        const registerResponse: RegisterResponse = await response.json();
        if (registerResponse.success) {
            alert(registerResponse.message);
            navigate("/login");
        } else {
            alert(registerResponse.message);
        }

    }

    
    return registerUser;
}