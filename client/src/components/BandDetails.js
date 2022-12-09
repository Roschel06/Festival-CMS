import {Container, Box,Grid, Card, CardContent, CardHeader, CardActionArea, Button, Typography, TextField } from '@mui/material';

import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import { AppContext } from './Context'
import {useState, useContext, useEffect} from 'react'
import {boxStyle} from './utilities/Box'

export default function BandDetails(props) {

    const {id} = useParams()
    const {state, dispatch} = useContext(AppContext)
    const [data, setData] = useState({...state.user})
    const [band, setBand] = useState({})
    const [festival, setFestival] = useState({})
    
    
    useEffect(() => {
      getData()
      //getFestival()
    }, [])
    
    const getData = async () => {
      const {data} = await axios.get(`/bands/band/${id}`)
      setBand({...data.band})
    } 
/*     const getFestival = async () => {
      const {data1} = await axios.get('/festival/list')
      setFestival(data1)
    }  */
    
    console.log("🚀 ~ band", band)
    
    const handleAddToFestival = async (event) => {
      event.preventDefault();

      const response = await axios.post('/festival/addToFestival',{
        festival,
        band: band._id
      })
      console.log("🚀 ~ response", response)
      
      console.log("🚀 ~ festival", festival)
    }
    
    console.log("🚀 ~ state.band._id", band._id)
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
  </Box>
  <Typography variant="body2">
      The band is currently not playing at a festival
  </Typography>
  <Typography variant="body2">
      List of festivals a user has:
  </Typography>
  {state.user.festivals.map((item, idx) => {
      return <div key={idx}> <br />Name:{item.name} <br />ID: {item._id} <br /></div>
  })}
  <Box component="form" onSubmit={handleAddToFestival} noValidate sx={{ mt: 1 }}>
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
  </Box>
</Container>
  )
}