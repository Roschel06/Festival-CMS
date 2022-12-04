import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import { AppContext } from './Context'
import {Link} from 'react-router-dom'
import { dividerClasses } from '@mui/material';

export default function BandList() {

    const theme = createTheme();

    const {state, dispatch} = useContext(AppContext)
    const [bandList, setBandList] = useState({...state.user})
    
    useEffect(() => {
        getData()
    }, [])
  
    const getData = async () => {
      const {data} = await axios.get('/bands/list')
      setBandList(data)
    } 

    const filteredBands = bandList.bands.filter(item => item.owner === state.user._id)

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
        sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
        <Typography component="h1" variant="h5">
            Bands in Database
        </Typography>
        <Link to={'/add-band'} className='button'>Add new Band</Link>

        {filteredBands.map((item, idx) => {
            return <Link key={idx} to={`/bands/${item._id}`}>{item.name}</Link>
        })}
        </Box>
    </Container>
    </ThemeProvider>
  )
}
