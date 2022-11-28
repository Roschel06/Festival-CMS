import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EmailConfirm(props) {
    const theme = createTheme();

    const {token} = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        async function getData() {
            const response = await axios.post('/user/emailconfirm', {token})
            console.log("🚀 ~ response", response)

            if (response.data.success){
                setTimeout(() => navigate('/'), 3000)
            }

        }
        getData()
    }, [])

  return (
    
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
        sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
        <Typography component="h1" variant="h5">
            Thank you for registering
            <br />
            Please wait while verifying your email.
        </Typography>
        </Box>
    </Container>
    </ThemeProvider>
    
  )
}