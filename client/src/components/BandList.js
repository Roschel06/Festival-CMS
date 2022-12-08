import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import { AppContext } from './Context'
import {Link} from 'react-router-dom'
import {boxStyle} from './utilities/Box'

export default function BandList() {

    const {state, dispatch} = useContext(AppContext)
    const [bandList, setBandList] = useState({...state.user})
    console.log("🚀 ~ bandList", bandList)
    
    useEffect(() => {
        getData()
    }, [])
  
    const getData = async () => {
      const {data} = await axios.get('/bands/list')
      setBandList(data)
    } 

    const filteredBands = bandList.bands.filter(item => item.owner === state.user._id)
    console.log("🚀 ~ filteredBands", filteredBands)

  return (
    <Container component="main" maxWidth="xl">
     <Box sx={boxStyle}>  
        <Typography component="h1" variant="h5">
            Bands in Database
        </Typography>
        <Link to={'/add-band'} > 
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add new Band
            </Button>
          </Link>

        {filteredBands.map((item, idx) => {
            return <Link key={idx} to={`/bands/${item._id}`}>{item.name}, {item.countryOfOrigin}</Link>
        })}
        </Box>
    </Container>
  )
}
