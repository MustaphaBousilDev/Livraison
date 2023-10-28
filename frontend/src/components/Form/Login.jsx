import './login.css'
import  {useEffect, useState} from 'react'
import CustomInput from '../common/Input'


import { FormButton} from '../common/Buttons'
import { 
  AiOutlineMail,
  AiFillLock,
} from 'react-icons/ai'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import { validateEmail, validatePassword } from '../../helpers/validations'
let emailValidate={}
let passwordValidate={}
export const Login = () => {
  const [submet,setSubmet]=useState(false) 
  const [login,setLogin]=useState({
    email:'',
    password:'',
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmet(true)
    emailValidate=validateEmail(login.email)
    passwordValidate=validatePassword(login.password)
  }
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    emailValidate=validateEmail(login.email)
    passwordValidate=validatePassword(login.password)
  };
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
    <form
      onSubmit={handleSubmit}
      className=' my-4 flex flex-col gap-4' >
      <CustomInput 
        icon={<AiOutlineMail />} 
        type={'text'} 
        name={'email'}
        id={'email'}
        placeholder={'Enter your Email'} 
        onChange={handleLoginChange}
        className={`${submet && emailValidate?.error && 
          ' border-2 border-red-500 focus:border-red-800'}`}
      />
      {
        submet && emailValidate?.error && (
            <span className='text-red-500 text-sm w-[80%] flex mx-auto'>
              {emailValidate.message}
            </span>
        )
      }
      <CustomInput 
        icon={<AiFillLock />} 
        type={'password'} 
        name={'password'}
        id={'password'}
        placeholder={'●●●●●●●●●●'} 
        onChange={handleLoginChange}
        className={`${submet && passwordValidate?.error && 
          ' border-2 border-red-500 focus:border-red-800'}`}
      />
      {
        submet && passwordValidate?.error && (
            <span className='text-red-500 text-sm w-[80%] flex mx-auto'>
              {passwordValidate.message}
            </span>
        )
      }
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