import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { NavBar } from "./NavBar";

export function InstructionsPage() {
  return (
    <div>
      <NavBar />
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Instructions
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          Follow these steps to get started:
        </Typography>

        <List>
          <ListItem>
            <ListItemText primary="1. Select your hero" />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. Select a level" />
          </ListItem>
        </List>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" component="p">
            Once you have selected your heroes and the first level, you are
            ready to begin. Enjoy your adventure!
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
