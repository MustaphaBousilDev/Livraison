import axios from "axios"
import { useEffect, useState } from "react"
import { logout } from "../service/api/auth/auth"
const Home = ( )=> {
  const [active,setActive] = useState(false)
  

  
  return (
    <button onClick={()=>setActive(true)}>Homed</button>
  )
}

export default Home