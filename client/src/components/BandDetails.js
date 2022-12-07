import {Container, Grid, Card, CardContent, CardHeader, CardActionArea, Button, Typography, Divider } from '@mui/material';

import {useParams} from 'react-router-dom'
import axios from 'axios'
import {useState, useContext, useEffect} from 'react'

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
    <Container sx={{ py: 8 }} maxWidth="md">
      <img
        src={band.logo}
        alt={`${band.name} logo`}
        loading="lazy"
      />
      <Typography variant="h1">
        {band.name}, {band.name}
      </Typography>
    </Container>
  )
}