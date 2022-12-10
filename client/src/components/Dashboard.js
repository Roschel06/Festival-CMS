import {Container, Grid, Card, CardContent, CardHeader, CardActionArea, Button, Typography, Divider } from '@mui/material';
import MusicNoteTwoToneIcon from '@mui/icons-material/MusicNoteTwoTone';

import {Link} from 'react-router-dom'

import { useContext, useState, useEffect } from 'react'
import { AppContext } from './Context'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function Dashboard() {
  const cards = [1, 2, 3, 4, 5, 6];
  const navigate = useNavigate()
  const {state, dispatch} = useContext(AppContext)
  const [bandList, setBandList] = useState({...state.user})
  
  useEffect(() => {
      getData()
  }, [])

  const getData = async () => {
    const {data} = await axios.get('/bands/list')
    setBandList(data)
  } 
  console.log('currentFestival is ', state.user);
  const filteredBands = bandList.bands.filter(item => item.owner === state.user._id)
const newFilteredBands = bandList.bands.filter(item => item.owner === state.user._id && item.festivals.includes(state.user.currentFestival))
  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
          <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardActionArea onClick={() => navigate('/bands')}         
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    padding: 2,
                    }}>
                    <MusicNoteTwoToneIcon  color="primary"/>
                    <Typography variant="h4"  color="primary">
                      Bands
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{marginLeft: 'auto', fontWeight: 500}}>
                      {newFilteredBands.length}
                    </Typography>
                  </CardActionArea>
                    <Divider />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Recently added / edited
                    </Typography>
                    <div className="card__list">
                      {newFilteredBands.map((item, idx) => {
                          return <Link key={idx} to={`/bands/${item._id}`}>{item.name}</Link>
                      })}
                    </div>
                    <Link to={'/add-band'} > 
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3}}
                      >
                        Add new Band
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardActionArea onClick={() => navigate('/bands')}         
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    padding: 2,
                    }}>
                    <MusicNoteTwoToneIcon  color="primary"/>
                    <Typography variant="h4"  color="primary">
                      Bands
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{marginLeft: 'auto', fontWeight: 500}}>
                      {filteredBands.length}
                    </Typography>
                  </CardActionArea>
                    <Divider />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Recently added / edited
                    </Typography>
                    <div className="card__list">
                      {filteredBands.map((item, idx) => {
                          return <Link key={idx} to={`/bands/${item._id}`}>{item.name}</Link>
                      })}
                    </div>
                    <Link to={'/add-band'} > 
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3}}
                      >
                        Add new Band
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
        </Container>
  )
}
