import React, { useEffect } from "react";
import { Howl } from "howler";
import { Box, Typography } from "@mui/material";
import backgroundMusic from "./sounds/backgroundMusic.mp3";
const SoundComponent: React.FC = () => {
  useEffect(() => {
    const sound = new Howl({
      src: [backgroundMusic],
      autoplay: true,
      loop: true,
      volume: 0.5,
    });

    sound.play();

    return () => {
      sound.stop();
    };
  }, []);

  return (
    <Box>
      <Typography variant="h4">This component plays a sound!</Typography>
    </Box>
  );
};

export default SoundComponent;
