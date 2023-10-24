import './login.css'
import videoBack from '../../assets/background.mp4'
import  {useState} from 'react'
import { Shadow} from '../shadow.jsx'
import CustomInput from '../common/Input'
import { FormButton } from '../common/Buttons'
import { 
  AiOutlineMail,
  AiFillLock,
} from 'react-icons/ai'
export const Login = () => {
  const [login, setLogin] = useState(true)
  const [signup,setSignup] = useState(false)
  const handleLogin=()=>{
    setLogin(!login)
    setSignup(!signup)
  }
  const handleSignup=()=>{
    setSignup(!signup)
    setLogin(!login)
  }
  return (
    <>
    <div className='w-full h-screen'>
          <video 
            className=' w-full h-full object-cover'
            src={videoBack} 
            autoPlay 
            loop 
            muted 
          />
    </div>
    <div className="
      absolute z-[10000] w-[95%] sm:w-[80%] md:w-[60%] lg:w-[50%] 
      xl:w-[38%] 2xl:w-[30%] h-[75%] bg-black top-[50%] 
      left-[50%] translate-x-[-50%] translate-y-[-50%] flex 
       p-3 py-5 flex-col opacity-70 rounded-md lg:rounded-2xl ">
        <h3 className=" w-full text-white text-center inline-block text-5xl">livraison</h3>
        <div className="flex gap-[3%] my-3 p-1 w-[65%] mx-auto bg-white rounded-md">
          <button 
            onClick={handleLogin}
            className={`w-[48.5%] scale-100 transition active:scale-[.97]  py-3 
            rounded-lg text-md text-white button__gradient  ${login ? 'opacity-100' : 'opacity-60'}`}>
            login
          </button>
          <button 
            onClick={handleSignup}
            className={`w-[48.5%] scale-100 transition active:scale-[.97]  py-3 
            rounded-lg text-md text-white  button__gradient ${signup ? 'opacity-100' : 'opacity-60'}`}>
            signup
          </button>
        </div>
        <form className=' my-4'>
          <CustomInput 
            icon={<AiOutlineMail />} 
            type={'text'} 
            placeholder={'Enter your Email'} 
          />
          <CustomInput 
            icon={<AiFillLock />} 
            type={'password'} 
            placeholder={'●●●●●●●●●●'} 
          />
          <FormButton>
            login
          </FormButton>

          <div className=' flex items-center gap-2 w-[80%] mx-auto my-6'>
            <span className=' h-[1px] w-[49%] bg-white mt-1'></span>
            <span className=' text-white'>or</span>
            <span className=' h-[1px] w-[49%] bg-white mt-1'></span>
          </div>
        </form>
    </div>
    <Shadow className={`opacity-80`}/>
    </>
  )
}