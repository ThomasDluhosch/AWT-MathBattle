import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { Box, Button, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { NavBar } from "../NavBar";
import { useNavigate } from "react-router-dom";

const OptionsPage: React.FC = () => {
  const [volume, setVolume] = useState<number>(30);
  const [font, setFont] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setFont(event.target.value as string);
  };

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const navigate = useNavigate();
  const returnToMap = () => {
    navigate("/");
  };

  return (
    <div>
      <NavBar />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
          height: "100vh",
        }}
      >
        <Box width={300}>
          <Typography gutterBottom>Volume</Typography>
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            aria-labelledby="volume-slider"
            valueLabelDisplay="auto"
            min={0}
            max={100}
          />
        </Box>

        <Box sx={{ minWidth: 300 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Font Size</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={font}
              label="Font Size"
              onChange={handleChange}
            >
              <MenuItem value={10}>Small</MenuItem>
              <MenuItem value={20}>Medium</MenuItem>
              <MenuItem value={30}>Large</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <FormGroup>
          <FormControlLabel control={<Switch defaultChecked />} label="Timer" />
        </FormGroup>

        <Button onClick={() => navigate(-1)} variant="contained">Go back</Button><br />

      </Box>
    </div>
  );
};

export default OptionsPage;
