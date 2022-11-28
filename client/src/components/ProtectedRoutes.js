import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AppContext } from './Context'

export default function ProtectedRoutes() {

    const {state} = useContext(AppContext)

    if(state.user._id) {
        return <Outlet />
    }

  return <Navigate to='/'/>
}
