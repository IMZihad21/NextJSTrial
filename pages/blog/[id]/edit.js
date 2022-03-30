import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useSWR, { useSWRConfig } from 'swr';
import { useForm } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import fetcher from '../../../utils/fetcher';

export default function EditBlog() {
    const router = useRouter()
    const { id } = router.query;
    const { data } = useSWR(id ? `/api/blog/${id}` : null, fetcher, {
        onSuccess: (data) => {
            setValue('blog_name', data.data.blog_name);
            setValue('blog_content', data.data.blog_content);
        }
    });
    const { register, handleSubmit, reset, setValue } = useForm();
    const { mutate } = useSWRConfig()

    const handleAddBlog = data => {

        fetch(`/api/blog/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(() => {
                mutate('/api/blog')
                router.push("/blog")
                reset();
            })
            .catch(err => console.log(err))
    };

    return (
        <Box component='form' onSubmit={handleSubmit(handleAddBlog)} >
            <Typography>Edit Blog</Typography>
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
                <Button variant='contained' type='submit' >Edit Blog</Button>
            </Box>
        </Box>
    );
}
