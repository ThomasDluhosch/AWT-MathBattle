import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import { NavBar } from "../NavBar";
import { useNavigate } from "react-router-dom";

export function InstructionsPage() {
  const navigate = useNavigate();
    const returnToMap = () => {
        navigate("/");
    };
    
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

        <Button size="large" variant="contained" onClick={returnToMap}>
          Main Menu
        </Button>
        
      </Container>
    </div>
  );
}
