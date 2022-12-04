import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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

import {useState, useContext,useEffect} from 'react'
import axios from 'axios'
import { AppContext } from './Context'
import {useNavigate} from 'react-router-dom'

export default function BandAdd() {
  const theme = createTheme();

  const {state, dispatch} = useContext(AppContext)
  
  const [name, setName] = useState('')
  //const [data, setData] = useState({...state.user})
  const [imgUrl, setImgUrl] = useState(state.user.image ? '/images/' + state.user.image : null)
  const [file, setFile] = useState(null) 

  const navigate = useNavigate()

  const handleImageChange = (e) => {
      const url = URL.createObjectURL(e.currentTarget.files[0])
      setImgUrl(url)
      setFile(e.currentTarget.files[0])
  }

  const handleSave = async (event) => {
      event.preventDefault();

      /* const response = await axios.post('/band/add',{name, _id: state.user._id})
      console.log("🚀 ~ band add response", response) */

      const response = await axios.post('/bands/add',{
        name,
        owner: state.user._id
      })
      console.log("🚀 ~ response from add band ", response)

      if (response.data.success) {
          navigate('/bands')
      }

/*       const formdata = new FormData()

      Object.entries(data).forEach(item => formdata.set(item[0], item[1]))
      
      if(file) formdata.set('image', file, 'profile-image')

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
*/
  } 


/*   const [bandList, setBandList] = useState()
    
  useEffect(() => {
   getData()
  }, [])
  
  
   const getData = async () => {
  
     const {data} = await axios.get('/band/list')
     setBandList(data)
     console.log("🚀 ~ response of the band list: ", data)
   } */

   //console.log("🚀 ~ state at the end is ", state)
  return (      
<ThemeProvider theme={theme}>
<Container component="main" maxWidth="xs">
  <CssBaseline />
  <Box
    sx={{
      marginTop: { xs: 2, sm: 4 , md: 8 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Typography component="h1" variant="h5">
      Add a band to your database
    </Typography>
    <Box component="form" onSubmit={handleSave} noValidate sx={{ mt: 1 }}>

        <div className={"imgUpload"}>
            
            <IconButton color="primary" aria-label="upload picture" component="label">
                <img src={imgUrl} alt=''/>
                <div className={"imgUploadBtn " + (imgUrl ? 'imgHere' : '')}>
                <input hidden accept="image/*" type="file" onChange={handleImageChange}/>
                <PhotoCamera />
                <Typography textAlign="center">Upload band logo</Typography>
                </div>
            </IconButton>
        </div>

        <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Band name"
            name="name"
            value={name}
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

  )
}
