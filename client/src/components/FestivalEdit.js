
//import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {Container, Box, Button, Typography, TextField, IconButton, InputLabel, MenuItem, FormControl,Select } from '@mui/material';

import {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import { AppContext } from './Context'
import {useParams} from 'react-router-dom'
import {boxStyle} from './utilities/Box'

export default function FestivalEdit() {

    const {id} = useParams()
    const {state, dispatch} = useContext(AppContext)
    const [data, setData] = useState({...state.user})
    const [festival, setFestival] = useState({})
    const [editFestival, setEditFestival] = useState({
        _id: id,
        name: festival?.data?.name,
    })
    
    
    useEffect(() => {
        getData()
    }, [])
    
    const getData = async () => {
        const response = await axios.get(`/festivals/${id}`)
        setFestival(response.data.festival)
    } 
    console.log("🚀 ~ festival", festival)
/*     console.log("🚀 ~ festival name", festival)
    console.log("🚀 ~ festival name", festival?.festival?.name)
    //console.log("🚀 ~ festival id", festival.festival._id)
    
    console.log("🚀 ~ editFestival", editFestival) */

/*     const [imgUrl, setImgUrl] = useState(state.user.image ? '/images/' + state.user.image : null)
    const [file, setFile] = useState(null)  */

/*     const handleImageChange = (e) => {
        const url = URL.createObjectURL(e.currentTarget.files[0])
        setImgUrl(url)
        setFile(e.currentTarget.files[0])
    } */

/*     const updateEdit = item => {
        setEditFestival({...item})
      }
     */

    const handleSave = async (event) => {
        event.preventDefault();

/*         const editFestival = {
            _id: id
          }
      
          const response = await axios.patch("/festivals/edit", editFestival);
          console.log("🚀 ~ Patch response", response); */
/*
         const formdata = new FormData()

         Object.entries(festival.festival).forEach(item => formdata.set(item[0], item[1]))
        //formdata.set('_id', festival.festival._id)
        console.log(...formdata)
        //if(file) formdata.set('image', file, 'profile-image')

        const config = {
            Headers: {'content-type': 'multipart/form-data'}
        }
        const response = await axios.patch(`/festivals/edit`, formdata, config) */
        const response = await axios.patch(`/festivals/edit`, festival)
        console.log("🚀 ~ response", response)

/*          if (response.data.success) {
                dispatch({
                    type: 'login',
                    payload: {...response.data.user}
                })
        } else {
            if(response.data.errorId === 1){
                alert('email and username are mandatory')
            }
        }  */
    } 
   // console.log('profile data is', data);

  return (
<Container component="main" maxWidth="xs">
    <Box sx={boxStyle}> 
    <Typography component="h1" variant="h5">
      Change festival <br />{id}<br />{festival.festival?.name}
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
            //defaultValue={festival?.data?.name}
            value={festival.name}
            onChange={e => setFestival({...festival, name: e.target.value })}
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
