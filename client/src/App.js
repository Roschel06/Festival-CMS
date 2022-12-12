import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ContextProvider from './components/Context';
import LoginLayout from './layouts/LoginLayout'
import UserLayout from './layouts/UserLayout'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Stages from './components/Stages';
import BandList from './components/BandList';
import BandDetails from './components/BandDetails';
import BandEdit from './components/BandEdit';
import BandAdd from './components/BandAdd';
import BandAttendance from './components/BandAttendance';
import Facilities from './components/Facilities';
import FoodServices from './components/FoodServices';
import Shopping from './components/Shopping';
import Profile from './components/Profile';
import ProtectedRoutes from './components/ProtectedRoutes'
import EmailConfirm from './components/EmailConfirm'
import ForgotPassword from './components/ForgotPassword'
import ChangePassword from './components/ChangePassword'
import Festival from './components/Festival'
import FestivalEdit from './components/FestivalEdit'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider} from 'notistack';

function App() {

  const theme = createTheme({ 
    palette: {
        primary: {
          main: '#5069c5',
        },
        secondary: {
          main: '#090d45',
        },
        background: {
            default: '#d2d7e7',
          },
      },
    typography: {
      h1: {
        fontSize: '2.5rem',
        fontWeight: 500,
      },
      h2: {
        fontSize: '2.1rem',
        fontWeight: 500,
      },
      h3: {
        fontSize: '1.8rem',
      },
      h4: {
        fontSize: '1.5rem',
      },
      h5: {
        fontSize: '1.3rem',
      },
      h6: {
        fontSize: '1.1rem',
        fontWeight: 600,
      },
    }, 
    components: {
        MuiIcon: {
          defaultProps: {
            // Replace the `material-icons` default value.
            baseClassName: 'material-icons-two-tone',
          },
        },
      },
    })

  return (

    <ThemeProvider theme={theme}>
    <CssBaseline />
    <ContextProvider>
    <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
            <Routes>
                <Route element={<LoginLayout />}>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/email-confirm/:token' element={<EmailConfirm />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/change-password/:token' element={<ChangePassword />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                {/* <Route element={<LoginLayout />}>
                        <Route path='/festival' element={<Festival />} />
                    </Route> */}
                    <Route element={<UserLayout />}>
                        {/* <Route path='/dashboard/:festivalName' element={<Dashboard />} /> */}
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/festivals' element={<Festival />} />
                        <Route path='/festivals/:id/edit' element={<FestivalEdit />} />
                        <Route path='/stages' element={<Stages />} />
                        <Route path='/bands' element={<BandList />} />
                        <Route path='/bands/:id' element={<BandDetails />} />
                        <Route path='/bands/:id/edit' element={<BandEdit />} />
                        <Route path='/bands/:id/attendance' element={<BandAttendance />} />
                        <Route path='/add-band' element={<BandAdd />} />
                        <Route path='/facilities' element={<Facilities />} />
                        <Route path='/food-services' element={<FoodServices />} />
                        <Route path='/shopping' element={<Shopping />} />
                        <Route path='/profile' element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </SnackbarProvider>
    </ContextProvider>
    </ThemeProvider>
  );
}
export default App;