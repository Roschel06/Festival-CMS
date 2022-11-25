import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {useState, useContext} from 'react'
import axios from 'axios'
import { AppContext } from './Context'

export default function Profile() {

    const theme = createTheme();

    const {state, dispatch} = useContext(AppContext)

    const [data, setData] = useState({...state.user})
    const [imgUrl, setImgUrl] = useState(state.user.image ? '/images/' + state.user.image : null)
    const [file, setFile] = useState(null) 

    const handleImageChange = (e) => {
        const url = URL.createObjectURL(e.currentTarget.files[0])
        setImgUrl(url)
        setFile(e.currentTarget.files[0])
    }

    const handleSave = async (event) => {
        event.preventDefault();

        const formdata = new FormData()

        Object.entries(data).forEach(item => formdata.set(item[0], item[1]))
        
        if(file) formdata.set('image', file, 'somefilename')

        const config = {
            Headers: {'content-type': 'multipart/form-data'}
        }
        const response = await axios.patch('/user/profile', formdata, config)
        console.log("🚀 ~ response", response)

        if (response.data.success) {
                dispatch({
                    type: 'login',
                    payload: {...response.data.user}
                })
        } else {
            if(response.data.errorId === 1){
                alert('email and username are mandatory')
            }
        }
console.log(data);
    } 

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
      Change your user data
    </Typography>
    <Box component="form" onSubmit={handleSave} noValidate sx={{ mt: 1 }}>

        <div className={"imgUpload"}>
            
            <IconButton color="primary" aria-label="upload picture" component="label">
                <img src={imgUrl} alt=''/>
                <div className={"imgUploadBtn " + (imgUrl ? 'imgHere' : '')}>
                <input hidden accept="image/*" type="file" onChange={handleImageChange}/>
                <PhotoCamera />
                <Typography textAlign="center">Upload image</Typography>
                </div>
            </IconButton>
        </div>

        <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First name"
            name="firstName"
            autoComplete="firstName"
            value={data.firstName || ''}
            onChange={e => setData({...data, firstName: e.target.value })}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last name"
            name="lastName"
            autoComplete="lastName"
            value={data.lastName || ''}
            onChange={e => setData({...data, lastName: e.target.value })}
        />
        <FormControl fullWidth margin="normal">
            <InputLabel id="Role">Role</InputLabel>
            <Select
                //defaultValue=""
                required
                labelId="Role"
                id="Role"
                value={data.role || ''}
                label="Role"
                onChange={e => setData({...data, role: e.target.value })}
                >
                <MenuItem value={'Admin'}>Admin</MenuItem>
                <MenuItem value={'Employee'}>Employee</MenuItem>
                <MenuItem value={'External'}>External</MenuItem>
            </Select>
        </FormControl>
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={data.email}
            onChange={e => setData({...data, email: e.target.value })}
        />
{/*         <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={data.password}
            onChange={e => setData({...data, password: e.target.value })}
        /> */}
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
