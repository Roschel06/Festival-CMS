import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {Container, Box, Button, Typography, TextField, IconButton, InputLabel, MenuItem, FormControl,Select } from '@mui/material';

import {useState, useContext, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AppContext } from './Context'
import {boxStyle} from './utilities/Box'

export default function BandEdit(props) {

    const {id} = useParams()
    const navigate = useNavigate()

    const {state, dispatch} = useContext(AppContext)
    const [data, setData] = useState({...state.user})
    const [band, setBand] = useState({})
    const [imgUrl, setImgUrl] = useState(null)
    const [file, setFile] = useState(null) 
    console.log("🚀 ~ file", file)



    useEffect(() => {
      getData()
    }, [])
    
    const getData = async () => {
        try {
          const { data } = await axios.get(`/bands/${id}`);
          setBand(data.band);
          setImgUrl(data.band.logo);
        } catch (error) {
          console.error(error.message)
        }
    }
 
    console.log("🚀 ~ band", band)



    const handleImageChange = (e) => {
        const url = URL.createObjectURL(e.currentTarget.files[0])
        setImgUrl(url)
        setFile(e.currentTarget.files[0])
    }

    const handleSave = async (event) => {
        event.preventDefault();

        const formdata = new FormData()

        Object.entries(band).forEach(item => formdata.set(item[0], item[1]))
        
        if(file) formdata.set('image', file, 'band-logo')

        const config = {
            Headers: {'content-type': 'multipart/form-data'}
        }
        const response = await axios.patch(`/bands/${id}/edit`, formdata, config)
        console.log("🚀 ~ response", response)

        if (response.data.success) {
          navigate(`/bands/${id}`)
        } else {
            if(response.data.error === 1){
                alert('name is mandatory')
            }
        }
    } 

  return (
<Container component="main" maxWidth="xs">
    <Box sx={boxStyle}> 
    <Typography component="h1" variant="h5">
      Change data of band
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
            id="name"
            label="Band name"
            name="name"
            value={band.name || ''}
            onChange={e => setBand({...band, name: e.target.value})}
        />
        <TextField
            margin="normal"
            fullWidth
            id="countryOfOrigin"
            label="Country of origin"
            name="countryOfOrigin"
            value={band.countryOfOrigin || ''}
            onChange={e => setBand({...band, countryOfOrigin: e.target.value})}
        />
        <TextField
            margin="normal"
            fullWidth
            id="genre"
            label="Genre"
            name="genre"
            value={band.genre || ''}
            onChange={e => setBand({...band, genre: e.target.value})}
        />
        <Typography component="h3" variant="h5"  sx={{mt: 2}}>
          Contact person
        </Typography>
        <TextField
            margin="normal"
            fullWidth
            id="firstName"
            label="First name"
            name="firstName"
            value={band.contactFirstName || ''}
            onChange={e => setBand({...band, contactFirstName: e.target.value})}
        />
        <TextField
            margin="normal"
            fullWidth
            id="lastName"
            label="Last name"
            name="lastName"
            value={band.contactLastName || ''}
            onChange={e => setBand({...band, contactLastName: e.target.value})}
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

  );
}
