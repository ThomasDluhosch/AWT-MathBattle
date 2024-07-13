declare module "*.mp3" {
  const src: string;
  export default src;
}
declare module "howler" {
  export class Howl {
    unload() {
      throw new Error("Method not implemented.");
    }
    constructor(options: {
      src?: string[];
      loop?: boolean;
      autoplay?: boolean;
      volume?: number;
    });

    play(): void;
    stop(): void;
  }
}

declare module "react-use-keypress"{
  export default function useKeypress(key: string, callback: () => void);
}