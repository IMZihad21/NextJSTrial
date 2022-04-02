import { Box, Button, Link, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddBlog from '../../components/AddBlog';
import Blog from '../../models/Blog';
import dbConnect from '../../utils/dbConnect';
import useSWR, { mutate } from 'swr';
import fetcher from '../../utils/fetcher';

export async function getStaticProps() {
    await dbConnect();
    const res = await Blog.find({});
    const blogs = JSON.parse(JSON.stringify(res))

    return {
        props: { blogs },
        revalidate: 1,
    }
}

const Blogs = ({ blogs }) => {
    const { data } = useSWR("/api/blog", fetcher, { fallbackData: blogs })
    const [ addBlogModalOpen, setAddBlogModalOpen ] = useState(false);
    const handleBlogDelete = async (id) => {
        const res = await fetch(`/api/blog/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (res.status === 200) {
            mutate('/api/blog')
        }
    }

    return (
        <Box sx={{ mx: 10, my: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button variant='contained' onClick={() => setAddBlogModalOpen(true)}>
                    Add New
                </Button>
            </Box>
            {data?.map(blog => (
                <Box key={blog._id} sx={{ mb: 3 }}>
                    <Typography component='h5' variant='h5'>
                        {blog.blog_name}
                    </Typography>
                    <Typography>
                        {blog.blog_content}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        <Button component={Link} href={`/blog/${blog._id}`} variant='contained' sx={{ height: 30 }}>
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

export default Blogs