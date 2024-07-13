declare module "*.mp3" {
  const src: string;
  export default src;
}

declare module "howler" {
  export class Howl {
    constructor(options: { src: string[] });

    play(): void;
  }

  export class Howler {
    static volume(volume?: number): number;
  }
}

declare module "react-use-keypress"{
  export default function useKeypress(key: string, callback: () => void);
}