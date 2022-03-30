import { Box, Button, CircularProgress, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr';
import AddBlog from '../../components/AddBlog';
import { useRouter } from 'next/router';

const Blog = ({ blogs }) => {
    const router = useRouter()
    const [addBlogModalOpen, setAddBlogModalOpen] = useState(false);
    // const { data, error } = useSWR('/api/blog', fetcher);
    const { mutate } = useSWRConfig()
    const handleBlogDelete = async (id) => {
        const res = await fetch(`/api/blog/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (res.status === 200) {
            router.replace(router.asPath);
        }
    }

    return (
        <Box sx={{ mx: 10, my: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button variant='contained' onClick={() => setAddBlogModalOpen(true)}>
                    Add New
                </Button>
            </Box>
            {blogs?.map(blog => (
                <Box key={blog._id} sx={{ mb: 3 }}>
                    <Typography component='h5' variant='h5'>
                        {blog.blog_name}
                    </Typography>
                    <Typography>
                        {blog.blog_content}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        <Button component={Link} href={`/blog/${blog._id}/view`} variant='contained' sx={{ height: 30 }}>
                            View
                        </Button>
                        <Button component={Link} href={`/blog/${blog._id}/edit`} variant='contained' sx={{ height: 30 }}>
                            Edit
                        </Button>
                        <Button variant='contained' onClick={() => handleBlogDelete(blog._id)} sx={{ height: 30 }}>
                            Delete
                        </Button>
                    </Box>
                </Box>
            ))
            }
            <AddBlog open={addBlogModalOpen} setOpen={setAddBlogModalOpen} />
        </Box>
    )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
    const res = await fetch('https://nextjsmongoosetest.herokuapp.com/api/blog');
    const blogs = await res.json()

    return {
        props: {
            blogs: blogs.data,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 1, // In seconds
    }
}

// // This function gets called at build time on server-side.
// // It may be called again, on a serverless function, if
// // the path has not been generated.
// export async function getStaticPaths() {
//     const res = await fetch('https://nextjsmongoosetest.herokuapp.com/api/blog');
//     const blogs = await res.json()

//     // Get the paths we want to pre-render based on posts
//     const paths = blogs?.data?.map((blog) => ({
//         params: { id: blog._id },
//     }))

//     // We'll pre-render only these paths at build time.
//     // { fallback: blocking } will server-render pages
//     // on-demand if the path doesn't exist.
//     return { paths, fallback: 'blocking' }
// }

export default Blog