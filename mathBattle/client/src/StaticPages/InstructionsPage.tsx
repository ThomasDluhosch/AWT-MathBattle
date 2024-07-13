import { Container, Typography, Box, Button } from "@mui/material";
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

        {/* First Text and Image */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" component="p" gutterBottom>
            Enter your name and password, click "Register," and then log in with
            your credentials to start playing.
          </Typography>
          <img
            src="/screenshots/screenshot1.PNG"
            alt="Instructions 1"
            style={{ width: "100%", maxWidth: "400px" }}
          />
        </Box>

        {/* Second Text and Image */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" component="p" gutterBottom>
            Pick a Hero by clicking on one of the four icons, each representing
            a different mathematical operation (addition, subtraction,
            multiplication, division). Then, pick a Battle by selecting an
            unlocked level card, starting with level 1 and progressing through
            the levels.
          </Typography>
          <img
            src="/screenshots/screenshot2.PNG"
            alt="Instructions 2"
            style={{ width: "100%", maxWidth: "400px" }}
          />
        </Box>

        {/* Third Text and Image */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" component="p" gutterBottom>
            InstructionsYour current highscore is displayed at the top right.
            The hearts represent your remaining lives. Enter your answer to the
            math problem in the solution box and press "Enter" to submit. The
            number next to the enemy indicates its remaining health, and the
            timer shows how long you've taken to solve the current problem.
          </Typography>
          <img
            src="/screenshots/screenshot3.PNG"
            alt="Instructions 3"
            style={{ width: "100%", maxWidth: "400px" }}
          />
        </Box>

        {/* Third Text and Image */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" component="p" gutterBottom>
            In the Options you can switch between multiple-choice options or
            typing the answers yourself.
          </Typography>
          <img
            src="/screenshots/screenshot4.PNG"
            alt="Instructions 3"
            style={{ width: "100%", maxWidth: "400px" }}
          />
        </Box>

        <Button
          size="large"
          variant="contained"
          onClick={returnToMap}
          sx={{ mt: 4 }}
        >
          Main Menu
        </Button>
      </Container>
    </div>
  );
}
