import { Box, Button, Grid, Typography, TextField } from '@mui/material'
import { NavBar } from '../NavBar'
import { useLoginService } from './useLoginService';
import { useState } from 'react';

export function LoginPage() {
  const [loginUser] = useLoginService();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = () => {
    loginUser({ username: username, password: password })
  }


  return (
    <div>
      <NavBar />
      <Box textAlign='center' sx={{ m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img src='/public/MathBattle_logo.png'  style={{ maxHeight: "40vh" }}></img>
            <br />
            <Typography variant="h6" >
              Welcome
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField id="username" label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField id="password" label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={login}>Login</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined">Register</Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}