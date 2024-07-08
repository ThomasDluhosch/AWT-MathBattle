import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../Authentication/useAuthentication";
import { fetchFromBackendAuth } from "../fetch/fetch-backend";
import { ILevelBattle } from "../Interfaces/ILevelBattle";

export function useLevelHighscoresService() : (id: number | undefined) => Promise< [{ username: String, score: number }] | undefined > {
    const navigate = useNavigate();
    const authContext = useAuthentication();

    const getLevelHighscores = async (id: number | undefined) => {
        if (authContext.token == null) return undefined;
        const response = await fetchFromBackendAuth("/levels/" + id + "/highscores", "GET", authContext.token);

        if (response.status == 403 || id == undefined) {
            console.error("No level id given");
            navigate("/");
        } else if (response.status == 200) {
            const levelHighscores: [{ username: String, score: number}] = await response.json();
            return levelHighscores;
        } else {
            console.error("Error while loading highscores %s", response.status);
            return undefined;
        }
    }

    return getLevelHighscores;
}