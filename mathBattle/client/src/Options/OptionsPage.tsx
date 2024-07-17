import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
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
import { useAlertSnackbar } from "../useAlertSnackbar";

function OptionsPage() {

	const [getOptions, setOptions] = useOptionService();
	const [setAlert, AlertBar, closeAlert] = useAlertSnackbar();
	const [gameMode, setGameMode] = useState<GameMode | undefined>(undefined);

	const handleChange = (event: SelectChangeEvent) => {
		console.log(parseInt(event.target.value))
		setGameMode(parseInt(event.target.value));
	};

	useEffect(() => {
		getOptions().then((result) => {
			if (result) setGameMode(result.gameMode);
		});
	}, []);

	const navigate = useNavigate();
	const save = async () => {
		const success = await setOptions({
			gameMode: gameMode ?? 1
		});
		if (success) {
			setAlert("Saved", "success");
		}
	};

	if (gameMode === undefined) {
		return (
			<>
					<CircularProgress />
			</>
		);
	}
	return (
		<div>
			<AlertBar></AlertBar>
			<Grid container spacing={4}>

				<Grid item xs={12}>
					<Typography variant="h2">Options</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h6">Game Mode</Typography>
					<Select
						id="demo-simple-select"
						value={gameMode.toString()}
						onChange={handleChange}
						variant="outlined"
					>

						<MenuItem value={"0"}>Multiple choice</MenuItem>
						<MenuItem value={"1"}>Type it yourself!</MenuItem>


					</Select>
				</Grid>

				<Grid item xs={12}>
					<Button onClick={save} variant="contained">Save</Button><br />
				</Grid>

			</Grid>
		</div>
	);
};

export default OptionsPage;
