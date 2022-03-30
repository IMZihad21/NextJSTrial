import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function EditBlog({ blogData }) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const router = useRouter()
    const { id } = router.query;

    React.useEffect(() => {
        setValue('blog_name', blogData.blog_name);
        setValue('blog_content', blogData.blog_content);
    }, [blogData, setValue])

    const handleAddBlog = data => {

        fetch(`/api/blog/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(() => {
                router.back()
            })
            .catch(err => console.log(err))
    };

    return (
        <Box component='form' onSubmit={handleSubmit(handleAddBlog)} >
            <Typography>Edit Blog</Typography>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button variant='contained' onClick={() => router.back()}>
                    Go Back
                </Button>
            </Box>
            <Box>
                <Typography>
                    Add a new blog with blog tile and blog content.
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="blog_name"
                    name='blog_name'
                    type="text"
                    fullWidth
                    {...register("blog_name")}
                />
                <TextField
                    id="blog_content"
                    name='blog_content'
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    {...register("blog_content")}
                />
                <Button variant='contained' type='submit' sx={{ my: 2 }} >Edit Blog</Button>
            </Box>
        </Box>
    );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }) {
    const res = await fetch('https://nextmongoose.vercel.app/api/blog');
    const blogs = await res.json()
    const blogData = blogs?.data.find((item) => item._id === params.id);

    return {
        props: {
            blogData
        },
        revalidate: 1
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
