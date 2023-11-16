import axios from "axios"
import { useEffect, useState } from "react"
import { logout } from "../service/api/auth/auth"
const Home = ( => {
  const [active,setActive] = useState(false)
  

  useEffect(()=>{
    if(active){
      logout()
    }
  },[active])
  return (
    <button onClick={()=>setActive(true)}>Homed</button>
  )
}

export default Home