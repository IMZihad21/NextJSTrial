import { Box, Button, CircularProgress, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';

const Blog = () => {
    const { data, error } = useSWR('/api/blog', fetcher);
    return (
        <Box sx={{ mx: 10, my: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button variant='contained'>
                    Add New
                </Button>
            </Box>
            {data?.data?.map(blog => (
                <Box key={blog._id} sx={{ mb: 3 }}>
                    <Typography component='h5' variant='h5'>
                        {blog.blog_name}
                    </Typography>
                    <Typography>
                        {blog.blog_content}
                    </Typography>
                </Box>
            ))
            }
        </Box>
    )
}

export default Blog