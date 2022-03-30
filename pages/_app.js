import { createTheme, ThemeProvider } from '@mui/material';
import '../styles/globals.css'

const theme = createTheme({
  typography: {
    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
  },
  palette: {
    // primary: {
    //   main: '#182F59',
    // },
    // secondary: {
    //   main: '#5BBC2E',
    //   contrastText: '#fff',
    // },
  },
});

function MyApp({ Component, pageProps }) {

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
