import {Container, Box,Grid, Card, CardContent, CardHeader, CardActionArea, Button, Typography, Divider } from '@mui/material';

import {useParams} from 'react-router-dom'
import axios from 'axios'
import {useState, useContext, useEffect} from 'react'
import {boxStyle} from './utilities/Box'

export default function BandDetails(props) {

    const {id} = useParams()
    const [band, setBand] = useState({})
    
    
    useEffect(() => {
      getData()
    }, [])
    
    const getData = async () => {
      const {data} = await axios.get(`/bands/band/${id}`)
      setBand({...data.band})
    } 
    
    console.log("🚀 ~ band", band)
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
          {band.contactLastName} {band.contactFirstName}
        </Typography>
    </Box>
</Container>
  )
}