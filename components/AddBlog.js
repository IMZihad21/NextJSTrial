import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSWRConfig } from 'swr';
import { useForm } from 'react-hook-form';

export default function AddBlog({ open, setOpen }) {
    const { register, handleSubmit, reset } = useForm();
    const { mutate } = useSWRConfig()

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddBlog = data => {

        fetch('/api/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(() => {
                mutate('/api/blog')
                setOpen(false);
                reset();
            })
            .catch(err => console.log(err))
    };

    return (
        <Dialog component='form' onSubmit={handleSubmit(handleAddBlog)} open={open} onClose={handleClose}>
            <DialogTitle>Add New Blog</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Add a new blog with blog tile and blog content.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="blog_name"
                    name='blog_name'
                    label="Blog Title"
                    type="text"
                    fullWidth
                    {...register("blog_name")}
                />
                <TextField
                    id="blog_content"
                    name='blog_content'
                    label="Blog Content"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    {...register("blog_content")}
                />
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={handleClose}>Cancel</Button>
                <Button variant='contained' type='submit' >Add Blog</Button>
            </DialogActions>
        </Dialog>
    );
}
