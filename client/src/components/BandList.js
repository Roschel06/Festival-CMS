import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {Typography, Modal} from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import InfoIcon from '@mui/icons-material/Info';

import {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import { AppContext } from './Context'
import {Link} from 'react-router-dom'
import {boxStyle} from './utilities/Box'
import {buttonBoxStyle} from './utilities/ButtonBox'
import { Avatar } from '@mui/material';

export default function BandList() {
  
  const {state, dispatch} = useContext(AppContext)
  //const [bands, setBands] = useState({...state.user})
  const [bands, setBands] = useState({})
  const [bandsCurrentFestival, setBandsCurrentFestival] = useState({})
  const [allAttendance, setAllAttendance] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  console.log("🚀 ~ selectedRows", selectedRows)


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    textAlign: 'center',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  
  useEffect(() => {
      getData()
      getBandsInCurrentFestival()
      getUserAttendance()
      sendSelectedBandsToFestival()
  }, [])


  const sendSelectedBandsToFestival = async (event) => {
    event.preventDefault();

    const selectedRowsNew = {
      currentFestival: state.user.currentFestival,
      selectedRows
    }

    const response = await axios.patch(`/festivals/addBands`, selectedRowsNew)
    console.log("🚀 ~ response", response)
  
  }

  const getData = async () => {
    const response = await axios.get(`/bands/list/${state.user._id}`)
    setBands(response)
  } 

  const getBandsInCurrentFestival = async () => {
    const response = await axios.get(`/bands/list/${state.user._id}/${state.user.currentFestival}`)
    
    if (response.data.success) {

      const attendancTableDataArray = response.data.bands.map(item => {
      
        const attendancTableData = item.attendance.find(el => el.festival === state.user.currentFestival)
  
        if (attendancTableData) {
  
          item.attendancTableData = {
            stage: attendancTableData.stage ,
            time: attendancTableData.time,
            day: attendancTableData.day
          }
        } else {
          item.attendancTableData = {
            stage: '' ,
            time: '',
            day: ''
          }
        }
  
        return item
      })
      setBandsCurrentFestival(attendancTableDataArray) 
    } else {
      console.log('There was an error');
    }
  }  

  const getUserAttendance = async () => {
    const response = await axios.get(`/band-attendance/festival/${state.user.currentFestival}`)
    setAllAttendance(response)
  } 


  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    setSelectedRows(selectedRowsData)
    //console.log(selectedRowsData);
  };





  
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
    { field: 'details', headerName: 'Details', flex: 1, sortable: false, renderCell: (params) => {
      return <Typography component="body2" component={Link} to={`/bands/${params.id}`}><InfoIcon/></Typography>;
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
  for (let i = 0; i < bandsCurrentFestival.length; i++) {
    rowsCurrentFestival.push({ 
      id: bandsCurrentFestival[i]?._id, 
      band: bandsCurrentFestival[i]?.name,
      genre: bandsCurrentFestival[i]?.genre,
      logo: bandsCurrentFestival[i]?.logo,
      stage: bandsCurrentFestival[i]?.attendancTableData?.stage,
      day: bandsCurrentFestival[i]?.attendancTableData?.day,
      time: bandsCurrentFestival[i]?.attendancTableData?.time,
    })
  }
  const columnsCurrentFestival = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'logo', headerName: 'Logo', flex: 1, renderCell:params=><Avatar src={params.row.logo} />},
    { field: 'band', headerName: 'band', flex: 1},
    { field: 'genre', headerName: 'Genre', flex: 1, sortable: false,},
    { field: 'stage', headerName: 'Stage', flex: 1},
    { field: 'day', headerName: 'Day', flex: 1},
    { field: 'time', headerName: 'Time', flex: 1},
    { field: 'details', headerName: 'Details', flex: 1, sortable: false, renderCell: (params) => {
      return <Typography component="body2" component={Link} to={`/bands/${params.id}`}><InfoIcon/></Typography>;
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
        <Box sx={{buttonBoxStyle, textAlign: 'center', mt: 2}}>
          <Button
            component={Link}
            onClick={handleOpen}
            variant="outlined"
            sx={{ m: 1, width: 'auto'}}
          >
            Add from DB
          </Button>
          <Button
              component={Link}
              to={'/add-band'} 
                fullWidth
                variant="contained"
                sx={{ m: 1, width: 'auto'}}
              >
                Add new band
            </Button>
        </Box>
      </Box>

           <Box sx={boxStyle}>  
           <Typography component="h1" variant="h5">
               Bands in {state.user.currentFestival}
           </Typography>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rowsCurrentFestival}
                columns={columnsCurrentFestival}
                loading={!bandsCurrentFestival?.length}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                //onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
              />
            </div>
           </Box>
           <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Select bands from the database and add them to the current festival
                </Typography>
                <Button
                  component={Link}
                  onClick={sendSelectedBandsToFestival}
                  variant="contained"
                  sx={{ m: 1, mt: '2rem'}}
                >
                  Add selected bands
                </Button>
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
                      onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                    />
                  </div>
                </Box>
              </Box>
            </Modal>
       </Container>
  )
}
