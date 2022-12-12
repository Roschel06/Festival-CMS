import {Container, Box, Button, Typography, TextField, IconButton, InputLabel, MenuItem, FormControl,Select } from '@mui/material';
import {Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import {useState, useContext, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AppContext } from './Context'
import {boxStyle} from './utilities/Box'

export default function BandAttendance(props) {

    const {id} = useParams()
    const navigate = useNavigate()

    const {state, dispatch} = useContext(AppContext)
    const [data, setData] = useState({...state.user})
    const [band, setBand] = useState({})
    const [attendance, setAttendance] = useState ({})

    useEffect(() => {
      getData()
    }, [])
    
    const getData = async () => {
      const {data} = await axios.get(`/bands/${id}`)
      setBand({...data?.band})
    } 

    const handleSave = async (event) => {
        event.preventDefault();

        const attendanceDetails = {
            ...attendance,
            band: band._id,
            attendance: data.currentFestival
          }

        const response = await axios.patch(`/band-attendance/add`, attendanceDetails)
        console.log("🚀 ~ response", response)

        if (response.data.success) {
          navigate(`/bands/${id}`)
        } else {
            if(response.data.error === 1){
                console.log("There was an error")
            }
        }

    } 

  return (
<Container component="main" maxWidth="xs">
    <Box sx={boxStyle}> 
    <Typography component="h1" variant="h5">
      Attendanc details
    </Typography>
    <Box component="form" onSubmit={handleSave} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            fullWidth
            id="day"
            label="Day"
            name="day"
            value={attendance.day || ''}
            onChange={e => setAttendance({...attendance, day: e.target.value})}
        />
        <TextField
            margin="normal"
            fullWidth
            id="time"
            label="Time"
            name="time"
            value={attendance.time || ''}
            onChange={e => setAttendance({...attendance, time: e.target.value})}
        />
        <FormControl fullWidth margin="normal">
            <InputLabel id="Festival">Stage</InputLabel>
            <Select
                required
                fullWidth
                labelId="stage"
                id="stage"
                value={attendance.stage || ""}
                label="Stage"
                onChange={(e) =>
                    setAttendance({ ...attendance, stage: e.target.value })
                }
            >
                <MenuItem value='Stage Name 1'>
                    Stage Name 1
                </MenuItem>
                <MenuItem value='Stage Name 1'>
                    Stage Name 2
                </MenuItem>
                <MenuItem value='Stage Name 1'>
                    Stage Name 3
                </MenuItem>
            </Select>
        </FormControl>
        <TextField
            margin="normal"
            fullWidth
            id="fee"
            label="Fee"
            name="fee"
            value={attendance.fee || ''}
            onChange={e => setAttendance({...attendance, fee: e.target.value})}
        />
        <TextField
            margin="normal"
            fullWidth
            id="equipmentDemands"
            label="Equipment Demands"
            name="equipmentDemands"
            value={attendance.equipmentDemands || ''}
            onChange={e => setAttendance({...attendance, equipmentDemands: e.target.value})}
        />
        <TextField
            margin="normal"
            fullWidth
            id="furtherDemands"
            label="Further Demands"
            name="furtherDemands"
            value={attendance.furtherDemands || ''}
            onChange={e => setAttendance({...attendance, furtherDemands: e.target.value})}
        />
        <FormGroup>
            <FormControlLabel control={<Checkbox value={attendance.cancelled} onChange={e => setAttendance({...attendance, cancelled: e.target.checked})}/>} label="Cancelled" />
        </FormGroup>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Save
        </Button>
    </Box>
    </Box>
</Container>

  );
}
