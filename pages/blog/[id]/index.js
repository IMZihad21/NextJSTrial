import { Box, Button, Link, Typography } from '@mui/material'
import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr';
import fetcher from '../../../utils/fetcher';
import Blog from '../../../models/Blog';
import dbConnect from '../../../utils/dbConnect';

export async function getStaticProps({ params }) {
    await dbConnect()
    const res = await Blog.findById(params.id)
    const blog = JSON.parse(JSON.stringify(res));

    return {
        props: { blog },
        revalidate: 1,
    }
}

export async function getStaticPaths() {
    await dbConnect();
    const res = await Blog.find({});
    const blogs = JSON.parse(JSON.stringify(res))

    const paths = blogs.map((blog) => ({
        params: { id: blog._id },
    }))

    return { paths, fallback: 'blocking' }
}

export default function View({ blog }) {
    const router = useRouter();
    const { id } = router.query;
    const { data } = useSWR(`/api/blog/${id}`, fetcher, { fallbackData: blog })
    return (
        <Box sx={{ mx: { md: 10 }, my: 5 }}>
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
