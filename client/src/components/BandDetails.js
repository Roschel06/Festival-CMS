import {Container, Box,Grid, Card, CardContent, CardHeader, CardActionArea, Button, Typography, TextField } from '@mui/material';

import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useSnackbar } from 'notistack';

import {useParams, Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AppContext } from './Context'
import {useState, useContext, useEffect} from 'react'
import {boxStyle} from './utilities/Box'
import {BandAddToFestivalModal} from './BandAddToFestivalModal'

export default function BandDetails(props) {

    const {id} = useParams()
    const {state, dispatch} = useContext(AppContext)
    const [data, setData] = useState({...state.user})
    const [band, setBand] = useState({})
    const [festival, setFestival] = useState('')
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const handleClickVariant = (variant) => () => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar('This is a success message!', { variant });
    };
    
    useEffect(() => {
      getData()
      //getFestival()
    }, [])
    
    const getData = async () => {
      const {data} = await axios.get(`/bands/${id}`)
      setBand({...data.band})
    } 
    
    console.log("🚀 ~ band", band)
    
    const handleAddToFestival = async (event) => {
      event.preventDefault();

      const response = await axios.patch('/bands/addToFestival',{
        festival,
        band: band._id
      })

      if (!response.data.success) {
        /* handleClickVariant() */
        console.log('sorry');
      }
    }


    const handleDelete = async (id) => {
      console.log("🚀 ~ id", id)
      
      const response = await axios.delete(`/bands/${id}/delete`)
      console.log("🚀 ~ response", response)
  
      if (response.data.success) {
        console.log('No more band here');
        navigate("/dashboard");
      }
    }


/* 
   const bandInFestivals = band.festivals.filter(item => item === data.festivals[0]._id)

    console.log("🚀 ~ bandInFestivals", bandInFestivals)

    console.log("🚀 ~ data.festivals", data.festivals[0]._id)

    console.log("🚀 ~ band ID", band._id) */

  return (

<Container component="main" maxWidth="xl">
  <Box sx={boxStyle}>  
    <div className="detailsHeader">
        <img
          className='bandLogo'
          src={band.logo}
          alt={`${band.name} logo`}
          loading="lazy"
        />
        <Typography variant="h1">
          {band.name}
        </Typography>
    </div>
    <Typography variant="body2">
      {band._id}
    </Typography>
    <Typography variant="body2">
      {band.contactFirstName} {band.contactLastName}
    </Typography>
    <Button
      component={Link}
      to={`/bands/${id}/edit`} 
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Edit band
    </Button>
    <Button
    color='error'
      onClick={() => handleDelete(band._id)}
      fullWidth
      variant="contained"
      sx={{ mb: 2 }}
    >
      Delete band
    </Button>
    <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
  </Box>
  <Box sx={{ mt: 1 }}>
  {band?.festivals?.length ?
    band.festivals.map((item, idx) => {
        return <Typography variant="body2" key={idx}> <br />Festival ID: {item}<br /></Typography>
    })
    :
    <>
      <Typography variant="body2">
          The band is currently not playing at a festival
      </Typography>
      <BandAddToFestivalModal />
    </>
  }
  <Typography variant="body2">
      List of festivals a user has:
  </Typography>
  {state.user.festivals.map((item, idx) => {
      return <div key={idx}> <br />Name:{item.name} <br />ID: {item._id} <br /></div>
  })}
  </Box>
  <Box
    component="form"
    onSubmit={handleAddToFestival}
    noValidate
    sx={{ mt: 1 }}
  >
    <Typography component="h1" variant="h5">
      Choose a festival
    </Typography>
    <br />
    <FormControl fullWidth margin="normal">
      <InputLabel id="Festival">Festival</InputLabel>
      <Select
        //defaultValue=""
        required
        labelId="Festival"
        id="Festival"
        value={festival}
        label="Festival"
        onChange={e => setFestival(e.target.value)}
      >
        {state.user.festivals.map((festival, idx) => (
          <MenuItem key={idx} value={festival._id}>
            {festival.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Select
    </Button>
    </Box>
{/*   <Box component="form" onSubmit={handleAddToFestival} noValidate sx={{ mt: 1 }}>
  <FormGroup>
  {state.user.festivals.map((item, idx) => {
      return <FormControlLabel key={idx} control={<Checkbox />} label={item.name} />
  })}
  <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
  <FormControlLabel control={<Checkbox />} label="Disabled" />
</FormGroup>
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
    >
        Add to festival
    </Button>
  </Box> */}
{/*   <Box component="form" onSubmit={handleAddToFestival} noValidate sx={{ mt: 1 }}>
    <TextField
        margin="normal"
        fullWidth
        id="bandInFestival"
        label="Id of festival"
        name="bandInFestival"
        value={festival}
        onChange={e => setFestival(e.target.value)}
    />
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
    >
        Add to festival
    </Button>
  </Box> */}
</Container>
  )
}