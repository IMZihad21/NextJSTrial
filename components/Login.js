import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import Cookies from 'js-cookie';

export default function Login({ redirectUrl }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleLogin = data => {
        const loginAPI = `${window.location.origin}/api/auth/login`;
        fetch(loginAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => {
                Cookies.set('token', res.token)
                Router.push(redirectUrl)
            })
    }

    return (
        <Box>
            <Typography
                component='h3'
                variant='h3'
                sx={{
                    textAlign: "center"
                }}
            >
                Login
            </Typography>
            <Box
                component='form'
                onSubmit={handleSubmit(handleLogin)}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    margin: "auto",
                    width: "50%",
                    maxWidth: "500px",
                    marginTop: "20px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 10px #ccc",
                }}
            >
                <TextField
                    id="email"
                    label="Email"
                    sx={{
                        width: "100%",
                    }}
                    {...register("email", {
                        required: {
                            value: true,
                            message: "You must enter an email"
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Provide a valid email address"
                        }
                    })}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    sx={{
                        width: "100%",
                    }}
                    {...register("password", {
                        required: {
                            value: true,
                            message: "You must enter your password"
                        },
                        pattern: {
                            value: /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[\d|@#$!%*?&])[\p{L}\d@#$!%*?&]{8,96}$/gmu,
                            message: "Password must be at least 8 characters, uppercase, lowercase and digit or symbol"
                        },
                        // pattern: /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[\d|@#$!%*?&])[\p{L}\d@#$!%*?&]{8,96}$/,
                    })}

                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                />
                <Button variant='contained' type='submit' sx={{ px: "20%" }} >
                    Login
                </Button>
            </Box>
        </Box>
    )
}
