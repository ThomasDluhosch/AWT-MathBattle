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
