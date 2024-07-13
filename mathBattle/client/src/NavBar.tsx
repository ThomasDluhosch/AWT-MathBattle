import {
  AppBar,
  Box,
  Button,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLoginService } from "./Login/useLoginService";

export function NavBar() {
  const [_,logoutUser, isLoggedIn] = useLoginService();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{ mr: 2 }}
            href="/"
          >
           <img src='/public/MathBattle_Logo.png'  style={{ maxHeight: "40px" }}></img>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Math Battle
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="options"
            sx={{ mr: 1 }}
            href="/options"
          >
            <Icon>settings</Icon>
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="options"
            sx={{ mr: 1 }}
            href="/instruction"
          >
            <Icon>help</Icon>
          </IconButton>
          {isLoggedIn() ? 
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="options"
            sx={{ mr: 1 }}
            onClick={() => logoutUser()}
            
          >
            <Icon>logout</Icon>
          </IconButton>
          : <></>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
