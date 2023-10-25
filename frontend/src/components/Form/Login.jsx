import './login.css'
import  {useEffect} from 'react'
import CustomInput from '../common/Input'


import { FormButton} from '../common/Buttons'
import { 
  AiOutlineMail,
  AiFillLock,
} from 'react-icons/ai'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
export const Login = () => {
  const clientID='1090604505843-uq59rok8qc8jg41c7u218gtjfvtm2669.apps.googleusercontent.com'
  const onSuccess=(res)=>{
    console.log(res)
  }
  const onFailure=(res)=>{
    console.log(res)
  }
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId:clientID,
        scope:''
      })
    }
    gapi.load('client:auth2',start)
  })
  return (
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
      <GoogleLogin
        clientId={clientID}
        buttonText='Login by google'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        className='w-[80%] ml-[10%]  text-gray-800 flex items-center justify-center'
      />
    </form>
  )
}