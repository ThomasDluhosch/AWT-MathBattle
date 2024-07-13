import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../Authentication/useAuthentication";
import { fetchFromBackend, fetchFromBackendAuth } from "../fetch/fetch-backend";
import { GameMode } from "../Interfaces/IOptions";

export function useOptionService() {

    const navigate = useNavigate();
    const authContext = useAuthentication();

    const getOptions = async () => {
        if (import.meta.env.VITE_USE_BACKEND != "TRUE") {
           return {gameMode: GameMode.TYPING};
        }

        if (authContext.token == null) return undefined;
        const optionsResponse = await fetchFromBackendAuth("/users/options", "get", authContext.token);
        
        console.log(optionsResponse.status);
        
        if (optionsResponse.status == 403) {
            authContext.setToken(null);
            navigate("/login");
        } else if (optionsResponse.status == 200) {
            const options = await optionsResponse.json();
            return options;
        } else {
            console.error("Error while loading options %s", optionsResponse.status);
            return undefined;
        }
    }


    return getOptions;

}
