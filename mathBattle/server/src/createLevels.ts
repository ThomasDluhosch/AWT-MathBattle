import { ILevel } from "./database/levels/ILevel";
import { LevelModel } from "./database/levels/LevelModel";



export async function createLevels() {
    const monsters = [
        "/public/monsters/FlyingEye.svg",
        "/public/monsters/RedBug.svg",
        "/public/monsters/SlimeBlue.svg",
    ];
    for (let index = 1; index <= 20; index++) {

        const level: ILevel = {
            calcDifficulty: 1 + Math.floor(index / 5),
            monsterHealth: 20 + (index % 5) * 20,
            monsterPicture: monsters[(index - 1) % 3],
            number: index
        };
        await LevelModel.create(level);
    }
}
