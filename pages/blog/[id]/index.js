import { Box, Button, Link, Typography } from '@mui/material'
import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr';
import fetcher from '../../../utils/fetcher';

export async function getServerSideProps({ params }) {
    const res = await fetch(`${process.env.API_HOST}/api/blog/${params.id}`);
    const blog = await res.json()

    return {
        props: {
            blog
        }
    }
}

export default function View({ blog }) {
    const router = useRouter();
    const { id } = router.query;
    const { data } = useSWR(`/api/blog/${id}`, fetcher, { fallbackData: blog })
    return (
        <Box sx={{ mx: 10, my: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "end", gap: 5 }}>
                <Button component={Link} href={`/blog/${id}/edit`} variant='contained' >
                    Edit
                </Button>
                <Button variant='contained' onClick={() => router.back()}>
                    Go Back
                </Button>
            </Box>
            <Typography component='h5' variant='h5'>
                {data?.blog_name}
            </Typography>
            <Typography>
                {data?.blog_content}
            </Typography>
        </Box>
    )
}
