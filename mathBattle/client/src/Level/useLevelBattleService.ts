import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthentication } from "../Authentication/useAuthentication";
import { fetchFromBackendAuth } from "../fetch/fetch-backend";
import { ILevelBattle } from "../Interfaces/ILevelBattle";
import { CalcType } from "../Interfaces/CalcType";

export function useLevelBattleService() : [(id: number | undefined) => Promise<ILevelBattle | undefined>, (id: number | undefined, score: number) => Promise<boolean | undefined>] {
    const navigate = useNavigate();
    const authContext = useAuthentication();
    const [searchParams, setSearchParams] = useSearchParams();
    const typeParam = searchParams.get("type");
    const calcType :CalcType = typeParam ? parseInt(typeParam) : 0;

    const getLevelBattle = async (id: number | undefined) => {
        if (authContext.token == null) return undefined;
        const mapResponse = await fetchFromBackendAuth("/levels/" + id + "/battle?calcType=" + calcType, "GET", authContext.token);

        if (mapResponse.status == 403 || id == undefined) {
            console.error("No level id given");
            navigate("/");
        } else if (mapResponse.status == 404) {
            console.error("Level id not found");
            navigate("/");
        } else if (mapResponse.status == 200) {
            const levelBattle: ILevelBattle = await mapResponse.json();
            return levelBattle;
        } else {
            console.error("Error while loading level %s", mapResponse.status);
            return undefined;
        }
    }

    const battleSuccess = async (id: number | undefined, score: number) => {
        if (authContext.token == null) return undefined;
        const response = await fetchFromBackendAuth(`/levels/${id}/success`, "POST", authContext.token, {
            score: score,
            calcType: calcType
        });

        if (response.status == 200) {
            return true;
        } else {
            return false;
        } 
    }


    return [getLevelBattle, battleSuccess];
}