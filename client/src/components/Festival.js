import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { InputLabel, MenuItem, FormControl, Select, Divider, Avatar } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

import FestivalActions from './FestivalActions';

import { useState, useContext, useMemo } from "react";
import axios from "axios";
import { AppContext } from "./Context";
import { useNavigate, Link } from "react-router-dom";
import { boxStyle } from "./utilities/Box";

export default function Festival() {
  const { state, dispatch } = useContext(AppContext);
  const [user, setUser] = useState({ ...state.user });
  const [name, setName] = useState("");
  const [rowId, setRowId] = useState(null);
  
  const navigate = useNavigate();

  const festivals = user.festivals
  console.log("🚀 ~ festivals", festivals)

  let rows = []
  for (let i = 0; i < festivals.length; i++) {
  rows.push({ 
    id: festivals[i]._id, 
    band: festivals[i].name,
    genre: festivals[i].genre,
    logo: festivals[i].logo
  })
  }
/*     const columns = useMemo (() =>  [
      { field: 'id', headerName: 'ID', flex: 1 },
      { field: 'logo', headerName: 'Logo', flex: 1, renderCell:params=><Avatar src={params.row.logo} />},
      { field: 'band', headerName: 'Name', flex: 1},
      { field: 'link', headerName: 'Link', flex: 1, renderCell: (params) => {
        return <Typography component={Link} to={`/festivals/${params.id}`}>Details</Typography>;
      } },
      {
        field: 'actions', 
        headerName: 'Actions', 
        type: 'actions', 
        renderCell: (params) => <FestivalActions {...{params, rowId, setRowId}} />
      },
    ], [rowId]) */

    const columns = [
      { field: 'id', headerName: 'ID', flex: 1 },
      { field: 'logo', headerName: 'Logo', flex: 1, renderCell:params=><Avatar src={params.row.logo} />},
      { field: 'band', headerName: 'Name', flex: 1},
      { field: 'link', headerName: 'Link', flex: 1, renderCell: (params) => {
        return <Typography component={Link} to={`/festivals/${params.id}/edit`}>Details</Typography>;
      } },
    ]


  const handleSave = async (event) => {
    event.preventDefault();

    const response = await axios.post("/festivals/add", {
      name,
      owner: state.user._id,
    });
    
    console.log("🚀 ~ response", response)
/*     if (response.data.success) {
      navigate("/dashboard"); // ??? should link to /dashboard/${festival.name}
    } */
  };


  const handelRowClick = (id) => {
   navigate(`/festivals/${id}/edit`);
  }

  const handleSelect = async (event) => {
    event.preventDefault();

    const editUser = {
      _id: user._id,
      currentFestival: user.currentFestival
    }

    const response = await axios.patch("/festivals/select", editUser);
    console.log("🚀 ~ Patch response", response);

/*     axios
      .patch('/festival/select', editUser, config)
      .then(res => {
        console.log("🚀 ~ Patch response", res.data);
        setCurrentFestival(res.data);
      })
      .catch(err => {
      console.log(err);
    }) */


    if (response.data.success) {
      dispatch({
        type: "login",
        payload: { ...response.data.user },
      });
    } else {
      console.log("There was an error");
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <Box sx={boxStyle}>
        {state.user.festivals.length !== 0 ? (
          <>
            <Box
              component="form"
              onSubmit={handleSelect}
              noValidate
              sx={{ mt: 1, width: '50%' }}
            >
              <Typography component="h1" variant="h5">
                Choose a festival
              </Typography>
              <br />
              <FormControl fullWidth margin="normal">
                <InputLabel id="Festival">Festival</InputLabel>
                <Select
                  required
                  fullWidth
                  labelId="Festival"
                  id="Festival"
                  value={user.currentFestival || ""}
                  label="Festival"
                  onChange={(e) =>
                    setUser({ ...user, currentFestival: e.target.value })
                  }
                >
                  {state.user.festivals.map((festival, idx) => (
                    <MenuItem key={idx} value={festival._id}>
                      {festival.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* {state.user.festivals.map(festival => <Link key={festival.name} to={`/dashboard/${festival.name}`}>{festival.name}</Link>)} */}
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 5 }}
              >
                Select
              </Button>
            </Box>
            <Divider/>
            <Typography component="h2" variant="h5" sx={{ mt: 4 }}>
              Or create a new festival
            </Typography>
          </>
        ) : (
          <Typography component="h1" variant="h5">
            Create a festival
          </Typography>
        )}
        <Box component="form" onSubmit={handleSave} noValidate sx={{ mt: 1, width: '50%'  }}>
          {/*         <div className={"imgUpload"}>
            
            <IconButton color="primary" aria-label="upload picture" component="label">
                <img src={imgUrl} alt=''/>
                <div className={"imgUploadBtn " + (imgUrl ? 'imgHere' : '')}>
                <input hidden accept="image/*" type="file" onChange={handleImageChange}/>
                <PhotoCamera />
                <Typography textAlign="center">Upload image</Typography>
                </div>
            </IconButton>
        </div> */}

          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
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
      {state.user.festivals.length !== 0 ? 
        <Box sx={boxStyle}>  
          <Typography component="h1" variant="h5">
              Festivals in Database
          </Typography>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              loading={!festivals.length}
              pageSize={10}
              rowsPerPageOptions={[10]}
              //checkboxSelection
              //onCellEditCommit={params => setRowId(params.id)}
              onRowClick={params => handelRowClick(params.id)}
            />
          </div>
        </Box>
        : null
      }
    </Container>
  );
}
