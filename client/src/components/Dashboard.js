import {Container, Grid, Card, CardContent, CardHeader, CardActionArea, Button, Typography, Divider, Box } from '@mui/material';
import MusicNoteTwoToneIcon from '@mui/icons-material/MusicNoteTwoTone';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import FoodBankTwoToneIcon from '@mui/icons-material/FoodBankTwoTone';
import WcTwoToneIcon from '@mui/icons-material/WcTwoTone';
import ApprovalTwoToneIcon from '@mui/icons-material/ApprovalTwoTone';

import {Link} from 'react-router-dom'

import { useContext, useState, useEffect } from 'react'
import { AppContext } from './Context'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function Dashboard() {

  const navigate = useNavigate()
  const {state, dispatch} = useContext(AppContext)
  const [user, setUser] = useState({...state.user})
  console.log("🚀 ~ user", state.user)
  
  useEffect(() => {
      getData()
  }, [])

  const getData = async () => {
    const {data} = await axios.get('/bands/list')
    setUser(data)
  } 

  const filteredBands = user.bands.filter(item => item.owner === state.user._id)
  const newFilteredBands = user.bands.filter(item => item.owner === state.user._id && item.festivals.includes(state.user.currentFestival))   

  const festivalName = state.user.festivals.filter(item => item._id === state.user.currentFestival)

return (
    <Container sx={{ py: 8 }} maxWidth="xl">
          {festivalName.map((item, idx) => <Typography variant="h3" color="secondary" sx={{ mb:4, textAlign: 'center' }} key={idx}>{item.name}</Typography>)}
          <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                      Recently added
                    </Typography>
                    <div className="card__list">
                      {newFilteredBands.slice(0, 8).map((item, idx) => {
                          return <Link key={idx} to={`/bands/${item._id}`}>{item.name}</Link>
                      })}
                    </div>
                    <Link to={'/add-band'} > 
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3}}
                    >
                        Add band
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardActionArea onClick={() => navigate('/bands')}         
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      padding: 2,
                      }}>
                    <MusicNoteTwoToneIcon  color="primary"/>
                    <Typography variant="h4"  color="primary">
                      Bands in DB
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{marginLeft: 'auto', fontWeight: 500}}>
                      {filteredBands.length}
                    </Typography>
                  </CardActionArea>
                  <Divider />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Recently added
                    </Typography>
                    <div className="card__list">
                      {filteredBands.slice(0, 8).map((item, idx) => {
                          return <Link key={idx} to={`/bands/${item._id}`}>{item.name}</Link>
                      })}
                    </div>
                    <Link to={'/add-band'} > 
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3}}
                    >
                        Add band
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardActionArea onClick={() => navigate('/dashboard')}         
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      padding: 2,
                      }}>
                    <ApprovalTwoToneIcon  color="primary"/>
                    <Typography variant="h4"  color="primary">
                      Stages
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{marginLeft: 'auto', fontWeight: 500}}>
                      0
                    </Typography>
                  </CardActionArea>
                  <Divider />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      
                    </Typography>
                    <div className="card__list card__list--empty">
                      <Typography variant="h5" color="text.secondary">
                          no stages added yet
                      </Typography>
                    </div>
                    <Link to={'/dashboard'} > 
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3}}
                    >
                        Add stage
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardActionArea onClick={() => navigate('/dashboard')}         
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      padding: 2,
                      }}>
                    <FoodBankTwoToneIcon  color="primary"/>
                    <Typography variant="h4"  color="primary">
                      Gastronomy
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{marginLeft: 'auto', fontWeight: 500}}>
                      0
                    </Typography>
                  </CardActionArea>
                  <Divider />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      
                    </Typography>
                    <div className="card__list card__list--empty">
                      <Typography variant="h5" color="text.secondary">
                          no gastronomy added yet
                      </Typography>
                    </div>
                    <Link to={'/dashboard'} > 
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3}}
                    >
                        Add gastronomy
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardActionArea onClick={() => navigate('/dashboard')}         
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      padding: 2,
                      }}>
                    <ShoppingBagTwoToneIcon  color="primary"/>
                    <Typography variant="h4"  color="primary">
                      Shopping
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{marginLeft: 'auto', fontWeight: 500}}>
                      0
                    </Typography>
                  </CardActionArea>
                  <Divider />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      
                    </Typography>
                    <div className="card__list card__list--empty">
                      <Typography variant="h5" color="text.secondary">
                          no shopping added yet
                      </Typography>
                    </div>
                    <Link to={'/dashboard'} > 
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3}}
                    >
                        Add shopping
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardActionArea onClick={() => navigate('/dashboard')}         
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      padding: 2,
                      }}>
                    <WcTwoToneIcon  color="primary"/>
                    <Typography variant="h4"  color="primary">
                      Facilities
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{marginLeft: 'auto', fontWeight: 500}}>
                      0
                    </Typography>
                  </CardActionArea>
                  <Divider />
                  <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        
                      </Typography>
                      <div className="card__list card__list--empty">
                        <Typography variant="h5" color="text.secondary">
                            no facilities added yet
                        </Typography>
                      </div>
                      <Link to={'/dashboard'} > 
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3}}
                      >
                          Add facilities
                        </Button>
                      </Link>
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
        </Container>
  )
}
