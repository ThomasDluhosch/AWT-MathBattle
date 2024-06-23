import {
  AppBar,
  Box,
  Button,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

export function NavBar() {
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
            <Icon>home</Icon>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
