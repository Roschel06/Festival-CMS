import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

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

  const {state, dispatch} = useContext(AppContext)
  
  //const [data, setData] = useState({...state.user})
  //const [imgUrl, setImgUrl] = useState(state.user.image ? '/images/' + state.user.image : null)
  const [file, setFile] = useState(null) 


  const [band, setBand] = useState({
    name: '',
    image: null,
    countryOfOrigin: '',
    owner: state.user._id,
  })
 
  const navigate = useNavigate()

  const handleImageChange = (e) => {
      const url = URL.createObjectURL(e.currentTarget.files[0])
      setBand({...band, image: url})
      setFile(e.currentTarget.files[0])
  }

  const handleSave = async (event) => {
      event.preventDefault();

/*       const response = await axios.post('/bands/add',{
        ...band,
        owner: state.user._id
      }) 

      console.log("🚀 ~ response from add band ", response)

      if (response.data.success) {
          navigate('/bands')
      } else {
          if(response.data.errorId === 1){
              alert('name is mandatory')
          }
    } */

      const formdata = new FormData()
      Object.entries(band).forEach(item => formdata.set(item[0], item[1]))
      
      if(file) formdata.set('image', file, 'band-logo')
      const config = {
          Headers: {'content-type': 'multipart/form-data'}
      }
      const response = await axios.post('/bands/add', formdata, config)
      console.log("🚀 ~ response", response)


      if (response.data.success) {
        navigate('/bands')
      } else {
          if(response.data.errorId === 1){
              alert('name is mandatory')
          }
      }
console.log('Band is ', band); 


  } 
  return (      
<Container component="main" maxWidth="xs">
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
                <img src={band.image} alt=''/>
                <div className={"imgUploadBtn " + (band.image ? 'imgHere' : '')}>
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
            value={band.name}
            onChange={e => setBand({...band, name: e.target.value})}
        />
        <TextField
            margin="normal"
            fullWidth
            id="countryOfOrigin"
            label="Country of origin"
            name="countryOfOrigin"
            value={band.countryOfOrigin}
            onChange={e => setBand({...band, countryOfOrigin: e.target.value})}
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
  )
}
