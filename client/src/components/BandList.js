import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

import {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import { AppContext } from './Context'
import {Link} from 'react-router-dom'
import {boxStyle} from './utilities/Box'
import { Avatar } from '@mui/material';

export default function BandList() {
  
  const {state, dispatch} = useContext(AppContext)
  console.log("🚀 ~ state", state)
  //const [bands, setBands] = useState({...state.user})
  const [bands, setBands] = useState({})
  const [bandsCurrentFestival, setBandsCurrentFestival] = useState({})
  const [allAttendance, setAllAttendance] = useState([])
  console.log("🚀 ~ allAttendance", allAttendance)
  //console.log("🚀 ~ allAttendance special", allAttendance?.data?.allAttendance)

  //console.log("🚀 ~ bandsCurrentFestival special", bandsCurrentFestival?.data?.bands)

  console.log("🚀 ~ bandsCurrentFestival", bandsCurrentFestival)
/*   const allBands = bands?.data?.bands
  console.log("🚀 ~ allBands", allBands) */
/*   const currentFestivalBands = bandsCurrentFestival?.data?.bands
  console.log("🚀 ~ currentFestivalBands", currentFestivalBands) */
//console.log('length is ', currentFestivalBands?.length);
//console.log('band 0 ', currentFestivalBands[0]?.name);
//console.log('band 0 special ', bandsCurrentFestival?.data?.bands[0].name);
  
  useEffect(() => {
      getData()
      getBandsInCurrentFestival()
      getUserAttendance()
  }, [])

  const getData = async () => {
    const response = await axios.get(`/bands/list/${state.user._id}`)
    setBands(response)
  } 

  const getBandsInCurrentFestival = async () => {
    const response = await axios.get(`/bands/list/${state.user._id}/${state.user.currentFestival}`)
    setBandsCurrentFestival(response)
        
    if (response.data.success) {
      console.log("🚀 ~ Yeah it works!")     
    } else {
      console.log('There was an error');
    }
  }  

  const getUserAttendance = async () => {
    const response = await axios.get(`/band-attendance/festival/${state.user.currentFestival}`)
    setAllAttendance(response)
  } 



  
  // All bands of a user
  //const filteredBands = bands.bands.filter(item => item.owner === state.user._id)
  //console.log("🚀 ~ filteredBands", filteredBands)

  let rows = []
  for (let i = 0; i < bands?.data?.bands.length; i++) {
    rows.push({ 
      id: bands?.data?.bands[i]._id, 
      band: bands?.data?.bands[i].name,
      genre: bands?.data?.bands[i].genre,
      logo: bands?.data?.bands[i].logo,
    })
  }
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'logo', headerName: 'Logo', flex: 1, renderCell:params=><Avatar src={params.row.logo} />},
    { field: 'band', headerName: 'band', flex: 1},
    { field: 'genre', headerName: 'Genre', flex: 1, sortable: false,},
/*       {
      field: 'genre',
      headerName: 'Genre',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    }, */
    { field: 'stage', headerName: 'Stage', flex: 1},
    { field: 'link', headerName: 'Link', flex: 1, renderCell: (params) => {
      return <Typography component="body2" component={Link} to={`/bands/${params.id}`}>Details</Typography>;
    } },
  ];   

  // Only bands which are in currentFestival
  /*   const filteredBandsInCurrentFestival = filteredBands?.filter(item => item?.festivals?._id === state.user.currentFestival)
  console.log("🚀 ~ state.user.currentFestival", state.user.currentFestival)
  console.log("🚀 ~ filteredBandsInCurrentFestival", filteredBandsInCurrentFestival) */
  


/*   allAttendance?.data?.allAttendance?.forEach((item, idx) => {
    if(item.band === bandsCurrentFestival?.data?.bands[idx]._id){
      console.log('yes', item.stage, item.day);
    } else {
      console.log('no');
    }
  }) */


/*   function stage(){
    allAttendance?.data?.allAttendance?.forEach((item) => {
      if(item.band === '6397568aa559a5070ec27eff'){
        return item.stage;
      } else {
        console.log('no');
      }
  })
  } */
  
  let rowsCurrentFestival = []
  for (let i = 0; i < bandsCurrentFestival?.data?.bands?.length; i++) {
    rowsCurrentFestival.push({ 
      id: bandsCurrentFestival?.data?.bands[i]?._id, 
      band: bandsCurrentFestival?.data?.bands[i]?.name,
      genre: bandsCurrentFestival?.data?.bands[i]?.genre,
      logo: bandsCurrentFestival?.data?.bands[i]?.logo,
      stage:  allAttendance?.data?.allAttendance?.forEach((item, idx) => {
              if(item.band === bandsCurrentFestival?.data?.bands[idx]._id){
                console.log('yes', item.stage, item.day);
              } else {
                console.log('no');
              }
            }),
    })
  }
  const columnsCurrentFestival = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'logo', headerName: 'Logo', flex: 1, renderCell:params=><Avatar src={params.row.logo} />},
    { field: 'band', headerName: 'band', flex: 1},
    { field: 'genre', headerName: 'Genre', flex: 1, sortable: false,},
    { field: 'stage', headerName: 'Stage', flex: 1},
    { field: 'link', headerName: 'Link', flex: 1, renderCell: (params) => {
      return <Typography component="body2" component={Link} to={`/bands/${params.id}`}>Details</Typography>;
    } },
  ];

/*   const currentFestivalAttendance = bandsCurrentFestival?.data?.bands.filter((item, idx) => item.attendance[2].festival === state.user.currentFestival)
    console.log("🚀 ~ currentFestivalAttendance", currentFestivalAttendance)
    console.log("🚀 ~ check", bandsCurrentFestival?.data?.bands[0]?.attendance[2]?.festival) */

  return (
    <Container component="main" maxWidth="xl">
     <Box sx={boxStyle}>  
        <Typography component="h1" variant="h5">
            Actions
        </Typography>
        <Button
          component={Link}
          to={'/add-band'} 
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add new Band
        </Button>
      </Box>
        <Box sx={boxStyle}>  
           <Typography component="h1" variant="h5">
               Bands in Database
           </Typography>
  
       {/*     {filteredBands.map((item, idx) => {
               return <Link key={idx} to={`/bands/${item._id}`}>{item.name}, {item.countryOfOrigin}</Link>
           })} */}
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                loading={!bands?.data?.bands.length}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
              />
            </div>
           </Box>
           <Box sx={boxStyle}>  
           <Typography component="h1" variant="h5">
               Bands in {state.user.currentFestival}
           </Typography>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rowsCurrentFestival}
                columns={columnsCurrentFestival}
                loading={!bandsCurrentFestival?.data?.bands?.length}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
              />
            </div>
           </Box>
       </Container>
  )
}
