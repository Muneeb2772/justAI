'use client'

import { useRouter } from 'next/navigation'
import { AppBar, Box, Button, Container, createTheme, CssBaseline, IconButton, Menu, MenuItem, styled, ThemeProvider, Toolbar, Typography } from '@mui/material'
import SmartToyIcon from '@mui/icons-material/SmartToy';
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import { AccountCircle, AccountCircleOutlined, Logout } from '@mui/icons-material';

const theme = createTheme({
    palette: {
        primary: {
          main: '#121212',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#e5e7eb', // Light grey
        },
        error: {
          main: '#dc2626',
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '4px',
              transition: 'background-color 0.3s, color 0.3s',
              '&:hover': {
                backgroundColor: '#333333',
                color: '#ffffff',
              },
              '&:active': {
                backgroundColor: '#555555',
                color: '#ffffff',
              },
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              borderRadius: '4px',
            },
          },
        },
      },
    });


const Header = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1,2),
    position:'relative',
    width:'100%',
    padding: 10,
}));

const HeaderContent = styled(Container) (({ theme })=> ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0',
    margin: '0',
    [theme.breakpoints.down('sm')]:{
        flexDirection: 'row',
        alignItems: 'center',
    },
}));

const HeaderText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: '1rem', // Smaller text
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem', // Smaller text on small screens
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  textAlign: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
}));

const CustomerSupport = () => {
    const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu
    const [userEmail, setUserEmail] = useState(''); // State to hold user email
    const [userUid, setUserUid] = useState(''); // State to hold user UID
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            if (user) {
                setUserEmail(user.email);
                setUserUid(user.uid); 
            }else{
                setUserEmail('');
                setUserUid('');
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await signOut(auth);
        router.push('/')
    };

    const handleMenuOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose =() => {
        setAnchorEl(null);
    };
    
    return (
        <ThemeProvider theme = {theme}>
            <Header>
                <HeaderContent maxWidth = '2000'>
                    <a href = '/' style={{display: 'flex', alignItems:'center', color:'inherit', textDecoration:'none'  }}>
                        <SmartToyIcon fontSize = 'medium' />
                        <HeaderText variant = 'h6' component ='span'> JustAI</HeaderText>
                    </a>
                    <IconButton
                    onClick={handleMenuOpen}
                    sx = {{marginLeft: 'auto'}}
                    color='inherit'>
                        <AccountCircleOutlined fontSize='large' />
                    </IconButton>
                    <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}>
                        <MenuItem>
                        <Typography variant = 'body2'>{userEmail}</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleSignOut}>
                            <Logout fontSize="small" />
                            <Typography variant="body2" sx={{ marginLeft: 1 }}>Sign Out</Typography>
                        </MenuItem>
                    </Menu> 
                </HeaderContent>
            </Header>





        </ThemeProvider>
    )
}

export default CustomerSupport

