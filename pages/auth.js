import { Box } from '@mui/material'
import React from 'react'
import Login from '../components/Login'

export async function getServerSideProps(context) {
    const redirectUrl = context.req.url;
    return { props: { redirectUrl } }
}

export default function Auth({ redirectUrl }) {
    console.log(redirectUrl);
    return (
        <Box>
            <Login redirectUrl={redirectUrl} />
        </Box>
    )
}
