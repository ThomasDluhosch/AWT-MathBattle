import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../Authentication/useAuthentication";
import { fetchFromBackendAuth } from "../fetch/fetch-backend";
import { ILevel } from "../Interfaces/ILevel";


export function useLevelMapService() {
    const navigate = useNavigate();
    const authContext = useAuthentication();

    const getLevels = async () => {
        if (authContext.token == null) return undefined;
        const mapResponse = await fetchFromBackendAuth("/levels", "get", authContext.token);
        
        if (mapResponse.status == 403) {
            authContext.setToken(null);
            navigate("/login");
        } else if (mapResponse.status == 200) {
            const levels: ILevel[] = await mapResponse.json();
            return levels;
        } else {
            console.error("Error while loading levels %s", mapResponse.status);
            return undefined;
        }
    }

    return getLevels;
}