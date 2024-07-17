import { Container, Typography, Box, Button, Tab, Tabs } from "@mui/material";
import { NavBar } from "../NavBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function InstructionsPage() {
  const navigate = useNavigate();
  const returnToMap = () => {
    navigate("/");
  }; 
  const [value, setValue] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (
    <div>
        <Typography variant="h2" component="h1" sx={{ mt: 10 }}>
          Instructions
        </Typography>

        <Typography variant="h4" component="h1" sx={{m: 4}} >
          Here you can look up how to start your adventure.
        </Typography>

        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="secondary"
            aria-label="primary tabs example"
          >
            <Tab value={0} label="Level Selection" />
            <Tab value={1} label="Battle" />
            <Tab value={2} label="Options" />
          </Tabs>
        </Box>

        {/* Second Text and Image */}
        <Box sx={{textAlign:"left",  mt: 4, display: value == 0 ? "block" : "none" }}>
          <Typography variant="body1" component="p" gutterBottom>
          On the starting page, you can choose a hero to go into battle with. 
          Each hero is good at a different type of math. 
          Blue loves addition, Red likes subtraction, Violet is great at multiplication, and Green enjoys division. 
          <br/>
          <br/>
          After picking your hero, you can start a battle by choosing a level. 
          Levels you've already played will have a green background. 
          When you complete a level, your hero earns a medal, and you can see the medal in the hero's color below the level number.
          </Typography>
          <br/>
          <img
            src="/public/screenshots/levelMapPage.PNG"
            alt="Instructions 2"
            style={{ width: "100%" }}
          />
        </Box>

        {/* Third Text and Image */}
        <Box sx={{textAlign:"left",  mt: 4, display: value == 1 ? "block" : "none"  }}>
          <Typography variant="body1" component="p" gutterBottom>
          This is what a battle looks like. On the left, you can see the math problem you need to solve to defeat the monster. 
          Depending on the game mode, you will either type in your answer or pick from a list of choices. 
          Below this, you will see a timer. Try to solve the problem before time runs out. 
          <br/>
          <br/>
          When you get the answer right, the monster loses health, and you get closer to winning. 
          If you get the answer wrong or run out of time, you lose a life. Be careful, you only have three lives. 
          If you lose all of them, you will fail the battle.
          </Typography>
          <br/>
          <img
            src="/public/screenshots/battlePage.PNG"
            alt="Instructions 3"
            style={{ width: "100%" }}
          />
        </Box>

        {/* Third Text and Image */}
        <Box sx={{textAlign:"left",  mt: 4, display: value == 2 ? "block" : "none"  }}>
          <Typography variant="body1" component="p" gutterBottom>
          Here you can select a game mode. Choose Typing to play with your keyboard, or Multiple Choice if you want to use your mouse.  </Typography>
          <br/>
          <img
            src="/public/screenshots/optionsPage.PNG"
            alt="Instructions 3"
            style={{ width: "100%" }}
          />
        </Box>
    </div>
  );
}
