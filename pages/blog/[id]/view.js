import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import useSWR from 'swr';
import { useRouter } from 'next/router'
import fetcher from '../../../utils/fetcher';

const View = () => {
    const router = useRouter()
    const { id } = router.query;
    const { data } = useSWR(id ? `/api/blog/${id}` : null, fetcher);
    return (
        <Box sx={{ mx: 10, my: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button variant='contained' onClick={() => router.back()}>
                    Go Back
                </Button>
            </Box>
            <Typography component='h5' variant='h5'>
                {data?.data?.blog_name}
            </Typography>
            <Typography>
                {data?.data?.blog_content}
            </Typography>
        </Box>
    )
}

export default View