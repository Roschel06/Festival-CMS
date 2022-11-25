import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ContextProvider from './components/Context';
import LoginLayout from './layouts/LoginLayout'
import UserLayout from './layouts/UserLayout'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Stages from './components/Stages';
import Bands from './components/Bands';
import Facilities from './components/Facilities';
import FoodServices from './components/FoodServices';
import Shopping from './components/Shopping';
import Profile from './components/Profile';

//import ContextProvider from './components/Context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
        <BrowserRouter>
            <Routes>
                <Route element={<LoginLayout />}>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Route>

                    <Route element={<UserLayout />}>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/stages' element={<Stages />} />
                        <Route path='/bands' element={<Bands />} />
                        <Route path='/facilities' element={<Facilities />} />
                        <Route path='/food-services' element={<FoodServices />} />
                        <Route path='/shopping' element={<Shopping />} />
                        <Route path='/profile' element={<Profile />} />
                    </Route>

            </Routes>
        
        </BrowserRouter>
    </ContextProvider>
);
