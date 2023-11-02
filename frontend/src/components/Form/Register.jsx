import './login.css'
import  {useState} from 'react'
import CustomInput from '../common/Input'
import { FormButton} from '../common/Buttons'
import {validateEmail,validatePassword,validateUsername} from '../../helpers/validations'
import { AiOutlineMail,AiFillLock} from 'react-icons/ai'
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../service/api/auth/auth';


let emailValidate={}
let passwordValidate={}
let usernameValidate={} 
let password_confirmationValidate={}

//new QueyClient is a new instance of QueryClient we use it to make request to the server
export const Register = () => {
  const navigate=useNavigate()
  //react query 
  const queryClient = useQueryClient()
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: data => {
      queryClient.setQueryData(["users", data.saveUser], data)
      queryClient.invalidateQueries(["users"], { exact: true })
      navigate('/verifyEmail')
    },
    onError: (error)=>{
      console.log(error)
    }
  })
  //---------------------------------------------------------------
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
    //emailValidate=validateEmail(register.email)
    //passwordValidate=validatePassword(register.password)
    //usernameValidate=validateUsername(register.username)
    //password_confirmationValidate=validateConfirmPassword(register.password_confirmation,register.password)
    if(
      !emailValidate?.error 
      && !passwordValidate?.error 
      && !usernameValidate?.error 
    ){
      createUserMutation.mutate(register);
    }
  }
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
    emailValidate=validateEmail(register.email)
    passwordValidate=validatePassword(register.password)
    usernameValidate=validateUsername(register.username)
    //password_confirmationValidate=validateConfirmPassword(register.password_confirmation,register.password)
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
        className={'text-white'}
      />
      {
        /**
         * submet && usernameValidate?.error && (
            <span className='text-red-500 text-sm w-[80%] flex mx-auto'>
              {usernameValidate.message}
            </span>
        )
         */
      }
      <CustomInput 
        icon={<AiOutlineMail />} 
        type={'text'} 
        name={'email'}
        id={'email'}
        placeholder={'Enter your Email'} 
        onChange={handleRegisterChange}
        className={'text-white'}
      />
      {
        /**
         * submet && emailValidate?.error && (
            <span className='text-red-500 text-sm w-[80%] flex mx-auto'>
              {emailValidate.message}
            </span>
        )
         */
      }
      <CustomInput 
        icon={<AiFillLock />} 
        type={'password'} 
        name={'password'}
        id={'password'}
        placeholder={'●●●●●●●●●●'} 
        onChange={handleRegisterChange}
        className={'text-white'}
      />
      {
        /**
         * submet && passwordValidate?.error && (
            <span className='text-red-500 text-sm w-[80%] flex mx-auto'>
              {passwordValidate.message}
            </span>
        )
         */
      }
      <CustomInput 
        icon={<AiFillLock />} 
        type={'password'} 
        name={'password_confirmation'}
        id={'password_confirmation'}
        placeholder={'●●●●●●●●●●'} 
        onChange={handleRegisterChange}
        className={'text-white'}
        
      />
      
      <FormButton
        disabled={createUserMutation.isLoading}
        >
        { 
          createUserMutation.isLoading ? 'Registering...' : 'Register'
        }
      </FormButton>
    </form>
  )
}