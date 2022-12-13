import {Container, Box, Button, Typography, Divider } from '@mui/material';

import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useSnackbar } from 'notistack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';


import {useParams, Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AppContext } from './Context'
import {useState, useContext, useEffect} from 'react'
import {boxStyle} from './utilities/Box'
import {buttonBoxStyle} from './utilities/ButtonBox'
import {BandAddToFestivalModal} from './BandAddToFestivalModal'

export default function BandDetails(props) {
  
  const {id} = useParams()
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {state, dispatch} = useContext(AppContext)
  const [user, setUser] = useState({...state.user})
  const [band, setBand] = useState({})
  const [allAttendance, setAllAttendance] = useState([])
  const [attendance, setAttendance] = useState({})
  const [festival, setFestival] = useState('')

/*   const userFestivalsObject = state.user.festivals
  let userFestivalsArray = Object.keys(userFestivalsObject).map(key => userFestivalsObject[key]);

  const bandFestivalsObject = band.festivals
  let bandFestivalsArray = Object.keys(bandFestivalsObject).map(key => bandFestivalsObject[key]);
     */
    
  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { variant });
  };
  
  
  useEffect(() => {
    getData()
    getUserAttendance()
    //getAttendance()
  }, [])
  
  const getData = async () => {
    const {data} = await axios.get(`/bands/${id}`)
    setBand({...data.band})
  } 

  const currentFestivalName = user.festivals.filter(item => item._id === user.currentFestival)
  console.log("🚀 ~ currentFestivalName", currentFestivalName)


  const attendanceInBand = band.attendance
  console.log("🚀 ~ attendanceInBand", attendanceInBand)
  

  const attendanceFound = allAttendance?.filter(item => item.festival === user.currentFestival && item.band === band._id)
  console.log("🚀 ~ attendanceFound", attendanceFound)
  
  
  //console.log("🚀 ~ attendanceFound", attendanceFound)
  
  const getUserAttendance = async () => {
    const response = await axios.get(`/band-attendance/list/${user._id}`)
    setAllAttendance(response.data.allAttendance)
  } 
  console.log("🚀 ~ allAttendance", allAttendance)
  
  
  
  
  const getAttendance = async () => {
    const response = await axios.get(`/band-attendance/${attendanceInBand}`)
    setAttendance(response.data.attendance)
  } 
  
  console.log("🚀 ~ band", band)
  
  console.log("🚀 ~ attendance", attendance)
  //console.log("🚀 ~ band", band)
  
  const handleAddToFestival = async (event) => {
    event.preventDefault();

    const response = await axios.patch('/bands/addToFestival',{
      festival,
      band: band._id
    })

    if (response.data.success) {
      console.log("🚀 ~ Yeah it works!")
      handleClickVariant('success')
      
    } else {
      console.log('There was an error');
    }
  }


  const handleDelete = async (id) => {
    
    const response = await axios.delete(`/bands/${id}/delete`)

    if (response.data.success) {
      console.log('No more band here');
      navigate("/dashboard");
    }
  }


   const bandInFestivals = user.festivals?.filter((item,) => !band.festivals?.includes(item._id) )
   console.log("🚀 ~ bandInFestivals", bandInFestivals)

   console.log("🚀 ~ band.festivals", band.festivals)
   console.log("🚀 ~ data.festivals", user.festivals)

  return (

<Container component="main" maxWidth="xl">
  <Box sx={boxStyle}>  
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img
          className='bandLogo'
          src={band.logo}
          alt={`${band.name} logo`}
          loading="lazy"
        />
        <Typography variant="h1" sx={{ ml: 3}}>
          {band.name}
        </Typography>
    </Box>
    <Typography variant="body2" sx={{ mb: 2}}>
     <strong>Contact person:</strong> {band.contactFirstName} {band.contactLastName}
    </Typography>
    <Box sx={buttonBoxStyle}>
      <Button
        color='error'
          onClick={() => handleDelete(band._id)}
          variant="outlined"
          sx={{ m: 1, minWidth: '140px' }}
          startIcon={<DeleteForeverIcon />}
        >
          Delete
      </Button>
      <Button
        component={Link}
        to={`/bands/${id}/edit`} 
        variant="outlined"
        sx={{ m: 1, minWidth: '140px'}}
        startIcon={<EditIcon />}
      >
        Band
      </Button>
      <Button
        component={Link}
        to={`/bands/${id}/attendance`} 
        variant="contained"
        sx={{ m: 1, minWidth: '140px'}}
        startIcon={<EditIcon />}
      >
        Attendance
      </Button>
    </Box>
    <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
  </Box>
    <Box sx={{ mt: 1 }}>
    <Typography variant="h4">
      Attendance at {currentFestivalName[0].name}
    </Typography>
    <Divider sx={{ mt: 1, mb: 1 }}/>
    {attendanceFound.length ?
      attendanceFound.map((item, idx)=>(
        <Typography variant="body2" key={idx}>
          <strong>Day:</strong> {item.day}<br />
          <strong>Stage:</strong> {item.stage}<br />
          <strong>Fee:</strong> {item.fee}<br />
          <strong>Equipment demands:</strong> {item.equipmentDemands}<br />
          <strong>Further demands:</strong> {item.furtherDemands}<br />
          {item.cancelled ?<><strong>Cancelled:</strong> {item.cancelled}</>:null} 
        </Typography>
      ))
      :<Link to={`/bands/${id}/attendance`}><EditIcon sx={{fontSize: '16px' }} /> Set attendance</Link>
    }
  </Box>
  <Box sx={{ mt: 1 }}>
  {band?.festivals?.length ?
    <>
    <Typography variant="h4">
      The band plays here:
    </Typography>
    {band.festivals.map((item, idx) => {
        return <Typography variant="body2" key={idx}> <br />Festival ID: {item}<br /></Typography>
    })}
    </>
    :
    <>
      <Typography variant="body2">
          The band is currently not playing at a festival
      </Typography>
      <BandAddToFestivalModal />
    </>
  }
{/*   <Typography variant="body2">
      List of festivals a user has:
  </Typography>
  {state.user.festivals.map((item, idx) => {
      return <div key={idx}> <br />Name:{item.name} <br />ID: {item._id} <br /></div>
  })} */}
  </Box>
  <Box
    component="form"
    onSubmit={handleAddToFestival}
    noValidate
    sx={{ mt: 1 }}
  >
    <Typography component="h1" variant="h5">
      Choose a festival
    </Typography>
    <br />
    <FormControl fullWidth margin="normal">
      <InputLabel id="Festival">Festival</InputLabel>
      <Select
        //defaultValue=""
        required
        labelId="Festival"
        id="Festival"
        value={festival}
        label="Festival"
        onChange={e => setFestival(e.target.value)}
      >
        {state.user.festivals.map((festival, idx) => (
          <MenuItem key={idx} value={festival._id}>
            {festival.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Select
    </Button>
  </Box>
{/*   <Box component="form" onSubmit={handleAddToFestival} noValidate sx={{ mt: 1 }}>
  <FormGroup>
  {state.user.festivals.map((item, idx) => {
      return <FormControlLabel key={idx} control={<Checkbox />} label={item.name} />
  })}
  <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
  <FormControlLabel control={<Checkbox />} label="Disabled" />
</FormGroup>
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
    >
        Add to festival
    </Button>
  </Box> */}
{/*   <Box component="form" onSubmit={handleAddToFestival} noValidate sx={{ mt: 1 }}>
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
  </Box> */}
</Container>
  )
}