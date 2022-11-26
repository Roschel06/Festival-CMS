import React from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'

export default function ChangePassword() {
    const theme = createTheme();
    const navigate = useNavigate()
    const {token} = useParams()
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')

    const handleSubmit = async (event) => {

        if (!password || password !== verifyPassword) return alert('Passwords do not match')

        event.preventDefault();

        const response = await axios.post('/user/change-password', {password, token})

        if (response.data.success) {
            navigate('/')
        }

    }

  return (
    <div>
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
            Change your password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography component="h4" variant="h5">
            Please type your new password
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Typography component="h4" variant="h5">
                Retype your new password
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="verifyPassword"
                label="Password"
                name="verifyPassword"
                autoComplete="password"
                value={verifyPassword}
                onChange={e => setVerifyPassword(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Save
            </Button>
        </Box>
    </Box>
    </Container>
    </ThemeProvider>
    </div>
  )
}
