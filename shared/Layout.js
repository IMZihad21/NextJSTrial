import React from 'react'
import { Box, createTheme, ThemeProvider } from '@mui/material';
import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children }) => {
    const theme = React.useMemo(() =>
        createTheme({
            typography: {
                fontFamily: [ "Source Sans Pro", "sans-serif" ].join(","),
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
        }), [],
    );

    return (
        <ThemeProvider theme={theme} >
            <Head>
                <title>Mango Test</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <NavBar />
                <Box component='main' sx={{ flexGrow: 1 }} >
                    {children}
                </Box>
                <Footer />
            </Box>
        </ThemeProvider >
    )
}

export default Layout