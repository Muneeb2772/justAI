'use client'

import { useRouter } from 'next/navigation'
import { AppBar, Box, Button, Container, createTheme, CssBaseline, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React from 'react'

const theme = createTheme(({
    palette:{
        primary:{
            main: '#111111',
            contrastText: '#ffffff',
        },
        secondary:{
            main:'#e5e7eb',
        },
        background:{
            default:'#171717',
        },
        text:{
            primary:'#ffffff',
            secondary:'#e5e7eb'

        },
    },
}));

const CustomerSupport = () => {
    const router = useRouter();

    const handleSignIn = () => {
        router.push('/signin');
    };

    return (
        <ThemeProvider theme = {theme}>
            <CssBaseline />
            <AppBar position='static' color = 'primary'>
                <Toolbar>
                    <Typography variant = 'h6' color = 'inherit'>
                        justAI 
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth='md'>
            </Container>





        </ThemeProvider>
    )
}

export default CustomerSupport

