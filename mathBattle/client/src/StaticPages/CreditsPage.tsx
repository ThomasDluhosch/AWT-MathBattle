import { Typography, Box, Button, Grid } from "@mui/material";
import { NavBar } from "../NavBar";
import { useNavigate } from "react-router-dom";

export function CreditsPage() {
    const navigate = useNavigate();
    const returnToMap = () => {
        navigate("/");
    };

    return (
        <div>

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h4">CREDITS</Typography>

                    <Typography variant="h5">
                        Group 404 - AWT Project
                    </Typography>
                </Grid>

                <Grid
                    display="flex"
                    justifyContent="center"
                    gap={3}
                    item
                    xs={12}
                >
                    <Button
                        size="large"
                        variant="contained"
                        onClick={returnToMap}
                    >
                        Main Menu
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
