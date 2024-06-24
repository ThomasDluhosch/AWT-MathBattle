import { Box, Button, Grid, Typography, TextField } from '@mui/material'
import { NavBar } from '../NavBar'
import { useLoginService } from './useLoginService';
import { useState } from 'react';

export function LoginPage() {
  const [loginUser] = useLoginService();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div>
      <NavBar />
      <Box textAlign='center' sx={{ m: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2" >
              Welcome
            </Typography><br />
            <Typography variant="h4" >
              this is
            </Typography><br />
            <Typography variant="h2" >
              Math Battle
            </Typography><br />
          </Grid>
          <Grid item xs={12}>
            <TextField id="username" label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField id="password" label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => loginUser({ username: username, password: password })}>Login</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined">Register</Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}