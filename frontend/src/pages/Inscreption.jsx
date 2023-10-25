import { Login } from "../components/Form/Login.jsx"
import { Register } from "../components/Form/Register.jsx"
import {  useState } from 'react'
import { ButtonDefault } from "../components/common/Buttons"
import { Shadow } from "../components/shadow"
import {Backgrounds} from '../components/Backgrounds.jsx'

const Inscreption = () => {
    const [login, setLogin] = useState(true)
    const [signup,setSignup] = useState(false)
    const handleLogin=()=>{
    setLogin(true)
    setSignup(false)
    }
    const handleSignup=()=>{
    setSignup(true)
    setLogin(false)
    }
  return (
    <>
    <Backgrounds />
    <div className="modal-inscreption">
        <h3 className=" w-full text-white text-center inline-block text-5xl">Mugiwara</h3>
        <div className="flex gap-[3%] my-3 p-1 w-[65%] mx-auto bg-gray-900 rounded-md">
          <ButtonDefault
            onClick={handleLogin}
            className={`${login ? 'opacity-100 border border-white' : 'opacity-50'}`}>
            login
          </ButtonDefault>
          <ButtonDefault
            onClick={handleSignup}
            className={`${signup ? 'opacity-100 border border-white' : 'opacity-50'}`}>
            signup
          </ButtonDefault>
        </div>
        {
            login ? <Login /> : <Register />
        }
    </div>
    <Shadow className={`opacity-80`}/>
    </>
  )
}

export default Inscreption