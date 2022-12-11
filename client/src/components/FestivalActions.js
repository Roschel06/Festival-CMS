import { Box, CircularProgress, Fab } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import {Check, Save} from '@mui/icons-material'
import green from '@mui/material/colors/green';

export default function FestivalActions(params, rowId, setRowId) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    const handelSubmit = async () => {

    }



  return (
    <Box
    sx={{
      mt: 1,
      position: 'relative'
    }}>
        {success ? (
          <Fab
            color='primary'
            sx={{
                width: 40,
                height:40,
                bgcolor: green[500],
                'hover':{bgcolor: green[700]}
            }}
            >
            <Check />
          </Fab>
        ) :(
          <Fab
            color='primary'
            sx={{
                width: 40,
                height:40,
                bgcolor: green[500],
                'hover':{bgcolor: green[700]}
            }}
            disabled={params.id !== rowId || loading}
            onClick={handelSubmit}
            >
            <Save />
          </Fab>
        )}
        {loading && (
          <CircularProgress
          size={50}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1
          }}
          />
        )}
    </Box>
  )
}
