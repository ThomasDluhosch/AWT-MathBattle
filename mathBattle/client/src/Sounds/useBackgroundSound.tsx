import React, { useEffect } from "react";
import { Howl } from "howler";
import { Box, Typography } from "@mui/material";
import backgroundMusic from "./files/backgroundMusic.mp3";

export const useBackgroundSound = () => {
  useEffect(() => {
    const sound = new Howl({
      src: [backgroundMusic],
      autoplay: true,
      loop: true,
      volume: 0.02,
    });

    sound.play();

    return () => {
      sound.stop();
    };
  }, []);

};

