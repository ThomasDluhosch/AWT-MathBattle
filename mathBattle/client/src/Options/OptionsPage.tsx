import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { Box, Button, Grid, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { NavBar } from "../NavBar";
import { useNavigate } from "react-router-dom";
import { GameMode } from "../Interfaces/IOptions";
import { useOptionService } from "./useOptionService";

function OptionsPage() {

	const getOptions = useOptionService();

	const [gameMode, setGameMode] = useState<GameMode>(0);

	const handleChange = (event: SelectChangeEvent) => {
		setGameMode(parseInt(event.target.value));
	};

	useEffect(() => {
		getOptions().then((result) => {
		  if (result) setGameMode(result.gameMode);
		 
		});
	  }, []);

	const navigate = useNavigate();
	const returnToMap = () => {
		navigate("/");
	};


	return (
		
		<div>
			<NavBar />

			<Box textAlign='center' sx={{ m: 2 }}>

				<Grid container spacing={4}>

					<Grid item xs={12}>
						<Typography variant="h2">Options</Typography>
					</Grid>
					<Grid item xs={12}>
						<FormControl>
							<InputLabel id="demo-simple-select-label">GameMode</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={gameMode?.toString() ?? "1"}
								label="Font Size"
								onChange={handleChange}
							>

							<MenuItem value={"0"}>Multiple choice</MenuItem>
							<MenuItem value={"1"}>Type it yourself!</MenuItem>
	

							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={12}>
						<Button onClick={() => navigate(-1)} variant="contained">Go back</Button><br />
					</Grid>

				</Grid>
			</Box>

		</div>
	);
};

export default OptionsPage;
