import {Container, Box, Button, Typography, TextField } from '@mui/material';

import {useParams, Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useState, useContext, useEffect} from 'react'
import {boxStyle} from './utilities/Box'

export default function BandAttendance() {

    const {id} = useParams()
    const navigate = useNavigate();

    const [band, setBand] = useState({})


    useEffect(() => {
        getData()
      }, [])
      
      const getData = async () => {
        const {data} = await axios.get(`/bands/${id}`)
        setBand({...data.band})
      } 

  return (
    <div>BandAttendance
    <Typography variant="body2">
      {band._id}
    </Typography>
    </div>
  )
}
