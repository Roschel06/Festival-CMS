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

export default function ForgotPassword() {
    const theme = createTheme();
    const [data, setData] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.post('/user/forgot-password', {email: data})
        console.log("🚀 ~ response", response)

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
      Forgot password
    </Typography>
    <Typography component="h4" variant="h5">
      Please provide your email address
    </Typography>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={data}
            onChange={e => setData(e.target.value)}
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
