import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../Authentication/useAuthentication";
import { fetchFromBackend, fetchFromBackendAuth } from "../fetch/fetch-backend";
import { GameMode, IOptions } from "../Interfaces/IOptions";

export function useOptionService() : [() => Promise<IOptions | undefined>, (options: IOptions) => Promise<boolean>] {

    const navigate = useNavigate();
    const authContext = useAuthentication();

    const getOptions = async () => {
        if (import.meta.env.VITE_USE_BACKEND != "TRUE") {
           return {gameMode: GameMode.TYPING} as IOptions;
        }

        if (authContext.token == null) return undefined;
        const optionsResponse = await fetchFromBackendAuth("/users/options", "get", authContext.token);
        
        console.log(optionsResponse.status);
        
        if (optionsResponse.status == 403) {
            authContext.setToken(null);
            navigate("/login");
        } else if (optionsResponse.status == 200) {
            const options = await optionsResponse.json() as IOptions;
            return options;
        } else {
            console.error("Error while loading options %s", optionsResponse.status);
            return undefined;
        }
    }

    const setOptions = async (options : IOptions) => {

        if (authContext.token == null) return false;
        const optionsResponse = await fetchFromBackendAuth("/users/options", "post", authContext.token, options);
        
        console.log(optionsResponse.status);
        
        if (optionsResponse.status == 403) {
            authContext.setToken(null);
            navigate("/login");
            return false;
        } else if (optionsResponse.status == 200) {
            return true;
        } else {
            console.log(optionsResponse.status);
            return false;
        }
    }


    return [getOptions, setOptions];

}
