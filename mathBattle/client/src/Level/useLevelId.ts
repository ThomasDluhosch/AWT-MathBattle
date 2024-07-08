import { useParams } from "react-router-dom";

export function useLevelId(){
    const { id  } = useParams(); 
    const levelId = Number(id);
    if (isNaN(levelId)) return 0;
    return levelId;
}