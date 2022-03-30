import { createTheme, ThemeProvider } from '@mui/material';
import Head from 'next/head';
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
      <Head>
        <title>Mango Test</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
