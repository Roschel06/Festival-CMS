import React, {useContext} from 'react'
import { AppContext } from './Context'

export default function Dashboard() {
    const {dispatch, state} = useContext(AppContext)
    console.log("🚀 ~ state", state)
  return (
    <div>Dashboard</div>
  )
}
