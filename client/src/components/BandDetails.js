import {Container, Grid, Card, CardContent, CardHeader, CardActionArea, Button, Typography, Divider } from '@mui/material';

import {useParams} from 'react-router-dom'
import axios from 'axios'
import {useState, useContext, useEffect} from 'react'
import { AppContext } from './Context'

export default function BandDetails(props) {

    const {id} = useParams()
    const {state, dispatch} = useContext(AppContext)
    const [band, setBand] = useState({...state.user})
    
    useEffect(() => {
        getData()
    }, [])
  
    const getData = async () => {
      const {data} = await axios.get(`/bands/band/${id}`)
      setBand(data)
    } 
    console.log("🚀 ~ band in band details is ", band)
    console.log("🚀 ~ band name ", band.name)
    
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Typography variant="h1">
        {band.name}{id}
      </Typography>
    </Container>
  )
}