//import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {Container, Box, Button, Typography, TextField, IconButton, InputLabel, MenuItem, FormControl,Select } from '@mui/material';

import {useState, useContext} from 'react'
import axios from 'axios'
import { AppContext } from './Context'
import {boxStyle} from './utilities/Box'

export default function FestivalEdit() {

    const {state, dispatch} = useContext(AppContext)

    const [data, setData] = useState({...state.user})
/*     const [imgUrl, setImgUrl] = useState(state.user.image ? '/images/' + state.user.image : null)
    const [file, setFile] = useState(null)  */

/*     const handleImageChange = (e) => {
        const url = URL.createObjectURL(e.currentTarget.files[0])
        setImgUrl(url)
        setFile(e.currentTarget.files[0])
    } */

    const handleSave = async (event) => {
        event.preventDefault();

        const formdata = new FormData()

        Object.entries(data).forEach(item => formdata.set(item[0], item[1]))
        
        // if(file) formdata.set('image', file, 'profile-image')

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
console.log('profile data is', data);
    } 

  return (
<Container component="main" maxWidth="xs">
    <Box sx={boxStyle}> 
    <Typography component="h1" variant="h5">
      Change your user data
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

  );
}
