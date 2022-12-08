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
    <Container sx={{ py: 8 }} maxWidth="xl">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
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
            ))}
          </Grid>
        </Container>
  )
}
