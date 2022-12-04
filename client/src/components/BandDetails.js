import {useParams} from 'react-router-dom'
import axios from 'axios'
import {useState, useContext, useEffect} from 'react'
import { AppContext } from './Context'

export default function BandDetails(props) {

    const {id} = useParams()

    const {state, dispatch} = useContext(AppContext)
    const [bandList, setBandList] = useState({...state.user})
    
    useEffect(() => {
        getData()
    }, [])
  
    const getData = async () => {
      const {data} = await axios.get('/bands/band')
      setBandList(data)
    } 

  return (
    <div>BandDetails {id}</div>
  )
}
