import { createTheme, responsiveFontSizes } from '@mui/material';


export const theme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#4648ba',
    },
    secondary: {
      main: '#f3bc77',
    },
    error: {
      main: '#B6244F',
    }
  },
  typography: {
    fontFamily: "Lora, sans-serif",
    fontSize: 16
  }
}));
