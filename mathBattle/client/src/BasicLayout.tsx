import { Container, Box, Typography } from "@mui/material";
import { NavBar } from "./NavBar";
import { Outlet } from "react-router-dom";



export function BasicLayout() {

    return (
        <>
            <NavBar />
            <Container sx={{ textAlign: "center", mt: 10 }} maxWidth="xl">
                <Outlet />
            </Container>
            <Box sx={{
                marginTop: 10,
                width: '100%',
            }} component="footer">
                <Typography variant="caption" color="initial">
                    Group 404 - AWT Project
                </Typography>
            </Box>
        </>
    );
}
;