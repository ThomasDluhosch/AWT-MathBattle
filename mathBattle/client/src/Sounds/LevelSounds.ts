import { Howl } from "howler";
import hurt from "../Sounds/files/hurt.mp3";
import slash from "../Sounds/files/slash.mp3";

export const hurtSound = new Howl({ src: [hurt], volume: 0.05 });
export const slashSound = new Howl({ src: [slash], volume: 0.09 });