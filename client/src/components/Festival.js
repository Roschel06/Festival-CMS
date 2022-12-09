import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "./Context";
import { useNavigate, Link } from "react-router-dom";
import { boxStyle } from "./utilities/Box";

export default function Festival() {
  const { state, dispatch } = useContext(AppContext);
  const [data, setData] = useState({ ...state.user });
  const [currentFestival, setCurrentFestival] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  /*     const [festivalList, setFestivalList] = useState()
    
   useEffect(() => {
    getData()
  }, [])
 

    const getData = async () => {

      const {data} = await axios.get('/festival/list')
      setFestivalList(data)
      console.log("🚀 ~ response of the festival list: ", data)
    }  */

  const handleSave = async (event) => {
    event.preventDefault();

    const response = await axios.post("/festival/add", {
      name,
      owner: state.user._id,
    });
    if (response.data.success) {
      navigate("/dashboard"); // ??? should link to /dashboard/${festival.name}
    }
  };
  //console.log("🚀 ~ state festivals ", state.user.data.festivals)

  const handleSelect = async (event) => {
    event.preventDefault();

    const formdata = new FormData();
    console.log(`Logged in user ${data._id}`);
    formdata.set("_id", data._id);
    formdata.set("currentFestival", data.currentFestival);
    console.log("🚀 ~ data.currentFestival", data.currentFestival);

    const editUser = {
      _id: data._id,
      currentFestival: data.currentFestival
    }

    const config = {
      Headers: { "content-type": "multipart/form-data" },
    };


    const response = await axios.patch("/festival/select", editUser, config);
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
      console.log("Sorry");
    }
  };

  // console.log(data.currentFestival);

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={boxStyle}>
        {state.user.festivals.length !== 0 ? (
          <>
            <Box
              component="form"
              onSubmit={handleSelect}
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
                  value={data.currentFestival || ""}
                  label="Festival"
                  onChange={(e) =>
                    setData({ ...data, currentFestival: e.target.value })
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
                sx={{ mt: 3, mb: 2 }}
              >
                Select
              </Button>
            </Box>
            <Typography component="h2" variant="h5">
              Or create a new festival
            </Typography>
          </>
        ) : (
          <Typography component="h1" variant="h5">
            Create a festival
          </Typography>
        )}
        <Box component="form" onSubmit={handleSave} noValidate sx={{ mt: 1 }}>
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
    </Container>
  );
}
