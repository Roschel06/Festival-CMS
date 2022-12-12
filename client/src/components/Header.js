import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MusicVideoTwoToneIcon from '@mui/icons-material/MusicVideoTwoTone';

import { useContext, useState, useEffect } from 'react'
import { AppContext } from './Context'
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';
import { Divider } from '@mui/material';

const pages = [
  {name: 'Festivals', path: 'festivals'},
  {name: 'Stages', path: 'stages'},
  {name: 'Bands', path: 'bands'},
  {name: 'Facilities', path: 'facilities'},
  {name: 'Food services', path: 'food-services'},
  {name: 'Shopping', path: 'shopping'}]

  const dataBase = [
    {name: 'Festivals', path: 'festivals', db: 'db'},
    {name: 'Stages', path: 'stages',db: 'db'},
    {name: 'Bands', path: 'bands',db: 'db'},
    {name: 'Facilities', path: 'facilities', db: 'db'},
    {name: 'Food services', path: 'food-services', db: 'db'},
    {name: 'Shopping', path: 'shopping', db: 'db'}]   
const settings = ['Profile'];

function ResponsiveAppBar({setDatabase}) {

    const {state, dispatch} = useContext(AppContext)
    const [data, setData] = useState({...state.user})
    const navigate = useNavigate()


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {

        const response = await axios.get('/user/logout')
        console.log("🚀 ~ response", response)

        if (response.data.success) {

            dispatch({type: 'logout'})

            navigate('/')
        }
}

/* console.log('Header state is', state);
console.log('Header data is', data); */
  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={'/dashboard'} className='appLogo'>
            <MusicVideoTwoToneIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            Festival CMS
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                        <Link style={{textDecoration: "none", color: "black"}} to={`/${page.path}`}>{page.name}</Link>
                    </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link to={'/dashboard'} className='appLogo appLogo--xs'>
            <MusicVideoTwoToneIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              Festival CMS
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={`/${page.path}`}>{page.name}</Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} onMouseOver={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={state.user.firstName} src={'/images/' + data.image}  sx={{ color: "#ffffff", bgcolor: ' rgb(255 255 255 / 25%)' }}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             <Typography sx={{ pl: '16px', pr: '16px', fontWeight: 'bold', color: '#8f91a9' }}>General database</Typography>
              {dataBase.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link style={{textDecoration: "none"}} to={`/${page.name}`} db={page.db}>{page.name}</Link>
                  </Typography>
                </MenuItem>
              ))}
              <Divider />
{/*               <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">
                    <Link style={{textDecoration: "none"}} to={'/profile'}>Profile</Link>
                  </Typography>
              </MenuItem> */}
              {settings.map((page) => (
                <MenuItem key={page} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link style={{textDecoration: "none"}} to={`/${page}`}>{page}</Link>
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;