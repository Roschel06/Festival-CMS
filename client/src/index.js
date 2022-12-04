import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
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
import BandAdd from './components/BandAdd';
import Facilities from './components/Facilities';
import FoodServices from './components/FoodServices';
import Shopping from './components/Shopping';
import Profile from './components/Profile';
import ProtectedRoutes from './components/ProtectedRoutes'
import EmailConfirm from './components/EmailConfirm'
import ForgotPassword from './components/ForgotPassword'
import ChangePassword from './components/ChangePassword'
import Festival from './components/Festival'

//import ContextProvider from './components/Context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
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
                        <Route path='/festival' element={<Festival />} />
                        <Route path='/stages' element={<Stages />} />
                        <Route path='/bands' element={<BandList />} />
                        <Route path='/bands/:id' element={<BandDetails />} />
                        <Route path='/add-band' element={<BandAdd />} />
                        <Route path='/facilities' element={<Facilities />} />
                        <Route path='/food-services' element={<FoodServices />} />
                        <Route path='/shopping' element={<Shopping />} />
                        <Route path='/profile' element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        
        </BrowserRouter>
    </ContextProvider>
);
