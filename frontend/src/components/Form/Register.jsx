import './login.css'
import  {useState} from 'react'
import CustomInput from '../common/Input'
import { FormButton} from '../common/Buttons'
import {validateEmail,validatePassword,validateConfirmPassword,validateUsername} from '../../helpers/validations'
import { AiOutlineMail,AiFillLock} from 'react-icons/ai'

let emailValidate={}
let passwordValidate={}
let usernameValidate={} 
let password_confirmationValidate={}
export const Register = () => {
  const [submet,setSubmet]=useState(false)  
  const [register,setRegister]=useState({
    username:'',
    email:'',
    password:'',
    password_confirmation:''
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmet(true)
    emailValidate=validateEmail(register.email)
    passwordValidate=validatePassword(register.password)
    usernameValidate=validateUsername(register.username)
    password_confirmationValidate=validateConfirmPassword(register.password_confirmation,register.password)
  }
  //validate register change
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
    emailValidate=validateEmail(register.email)
    passwordValidate=validatePassword(register.password)
    usernameValidate=validateUsername(register.username)
    password_confirmationValidate=validateConfirmPassword(register.password_confirmation,register.password)
  };
  return (
    <form onSubmit={handleSubmit} 
    className={`my-4 flex flex-col gap-4 `}>
      <CustomInput 
        icon={<AiOutlineMail />} 
        type={'text'} 
        name={'username'}
        id={'username'}
        placeholder={'Enter your Name'} 
        onChange={handleRegisterChange}
      />
      {
        submet && usernameValidate?.error && (
            <span className='text-red-500 text-sm w-[80%] flex mx-auto'>
              {usernameValidate.message}
            </span>
        )
      }
      <CustomInput 
        icon={<AiOutlineMail />} 
        type={'text'} 
        name={'email'}
        id={'email'}
        placeholder={'Enter your Email'} 
        onChange={handleRegisterChange}
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
        onChange={handleRegisterChange}
      />
      {
        submet && passwordValidate?.error && (
            <span className='text-red-500 text-sm w-[80%] flex mx-auto'>
              {passwordValidate.message}
            </span>
        )
      }
      <CustomInput 
        icon={<AiFillLock />} 
        type={'password'} 
        name={'password_confirmation'}
        id={'password_confirmation'}
        placeholder={'●●●●●●●●●●'} 
        onChange={handleRegisterChange}
        
      />
      {
        submet && password_confirmationValidate?.error && (
            <span className='text-red-500 text-sm w-[80%] flex mx-auto'>
              {password_confirmationValidate.message}
            </span>
        )
      }
      <FormButton>
        Register
      </FormButton>
    </form>
  )
}