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
  const [user, setUser] = useState({...state.user})
  console.log("🚀 ~ user", user)

   
    useEffect(() => {
        getData()
    }, [])
  
    const getData = async () => {
      const {data} = await axios.get('/bands/list')
      setUser(data)
    } 


 
    const filteredBands = user.bands.filter(item => item.owner === state.user._id)
    console.log("🚀 ~ filteredBands", filteredBands)


    const filteredBandsInCurrentFestival = filteredBands.filter(item => item.festivals === user.currentFestival)
    console.log("🚀 ~ user.currentFestival", user)
    console.log("🚀 ~ filteredBandsInCurrentFestival", filteredBandsInCurrentFestival)



let rows = []
for (let i = 0; i < filteredBands.length; i++) {
  rows.push({ 
    id: filteredBands[i]._id, 
    band: filteredBands[i].name,
    genre: filteredBands[i].genre,
    logo: filteredBands[i].logo
   })
}
    const columns = [
      { field: 'id', headerName: 'ID', flex: 1 },
      { field: 'logo', headerName: 'Logo', flex: 1, renderCell:params=><Avatar src={params.row.logo} />},
      { field: 'band', headerName: 'band', flex: 1},
      { field: 'link', headerName: 'link', flex: 1, renderCell: (params) => {
        return <Typography component="body2" component={Link} to={`/bands/${params.id}`}>Details</Typography>;
      } },
      {
        field: 'genre',
        headerName: 'Genre',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
      },
    ];
  
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
                loading={!filteredBands.length}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
              />
            </div>
           </Box>
       </Container>
  )
}
