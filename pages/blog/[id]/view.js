import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useRouter } from 'next/router'

export async function getServerSideProps({ params }) {
    const res = await fetch(`${process.env.API_HOST}/api/blog`);
    const blogs = await res.json()
    const blogData = blogs?.data.find((item) => item._id === params.id);

    return {
        props: {
            blogData
        }
    }
}

export default function View({ blogData }) {
    const router = useRouter();
    return (
        <Box sx={{ mx: 10, my: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button variant='contained' onClick={() => router.back()}>
                    Go Back
                </Button>
            </Box>
            <Typography component='h5' variant='h5'>
                {blogData?.blog_name}
            </Typography>
            <Typography>
                {blogData?.blog_content}
            </Typography>
        </Box>
    )
}
