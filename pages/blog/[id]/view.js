import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import useSWR from 'swr';
import { useRouter } from 'next/router'
import fetcher from '../../../utils/fetcher';

const View = ({ blogData }) => {
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

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }) {
    const res = await fetch('https://nextmongoose.vercel.app/api/blog');
    const blogs = await res.json()
    const blogData = blogs.data.find((item) => item._id === params.id);

    return {
        props: {
            blogData,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 1, // In seconds
    }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
    const res = await fetch('https://nextmongoose.vercel.app/api/blog');
    const blogs = await res.json()
    // Get the paths we want to pre-render based on posts
    const paths = blogs?.data?.map((blog) => ({
        params: { id: blog._id },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' }
}

export default View