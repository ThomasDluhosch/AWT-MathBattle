import { useSearchParams } from "react-router-dom";
import { CalcType } from "../Interfaces/CalcType";

export function useLevelParams (): [CalcType, string, string]{
    const [searchParams, setSearchParams] = useSearchParams();
    const score = searchParams.get("score") ?? "0";
    const time = searchParams.get("time") ?? "0";
    const type = searchParams.get("type");
    const calcType: CalcType = type ? parseInt(type) : 0;

    return [calcType, score, time];
}