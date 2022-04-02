import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
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

export default function EditBlog({ blog }) {
    const router = useRouter()
    const { id } = router.query;
    const { data } = useSWR(`/api/blog/${id}`, fetcher, { fallbackData: blog })
    const { register, handleSubmit, setValue } = useForm();

    React.useEffect(() => {
        setValue('blog_name', data?.blog_name);
        setValue('blog_content', data?.blog_content);
    }, [ data, setValue ])

    const handleAddBlog = data => {
        fetch(`/api/blog/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(() => {
                router.back();
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
