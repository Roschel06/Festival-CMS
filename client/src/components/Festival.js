import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import { AppContext } from './Context'
import {useNavigate} from 'react-router-dom'

export default function Festival() {

    const theme = createTheme();

    const {state, dispatch} = useContext(AppContext)
    const navigate = useNavigate()
    const [name, setName] = useState('')
    
  useEffect(() => {
    getData()
  }, [])


    const getData = async () => {

      const response = await axios.get('/festival/list')
      console.log("🚀 ~ response of the festival list: ", response)
    } 

    const handleSave = async (event) => {
      event.preventDefault();
      
      const response = await axios.post('/festival/add',{
        name,
        owner: state.user._id
      })
      if (response.data.success) {
        navigate('/dashboard')
      }
    } 
    console.log("🚀 ~ state festivals ", state.user.festivals)

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
    <p>{state.user.email}</p>
    <p>{state.user.festivals[4].name}</p> 
       <Typography component="h1" variant="h5">
      Add a festival
    </Typography>
    <Box component="form" onSubmit={handleSave} noValidate sx={{ mt: 1 }}>

{/*         <div className={"imgUpload"}>
            
            <IconButton color="primary" aria-label="upload picture" component="label">
                <img src={imgUrl} alt=''/>
                <div className={"imgUploadBtn " + (imgUrl ? 'imgHere' : '')}>
                <input hidden accept="image/*" type="file" onChange={handleImageChange}/>
                <PhotoCamera />
                <Typography textAlign="center">Upload image</Typography>
                </div>
            </IconButton>
        </div> */}

        <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            value={name || ''}
            onChange={e => setName(e.target.value)}
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
  );
}
