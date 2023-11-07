import './login.css'
import  {useState} from 'react'
import CustomInput from '../common/Input'
import { useMutation } from 'react-query';
import axios from 'axios';
import { useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom';
import { FormButton} from '../common/Buttons'
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { loginUser } from '../../service/api/auth/auth';
import {AiOutlineMail,AiFillLock} from 'react-icons/ai'
//import { validateEmail, validatePassword } from '../../helpers/validations'
let emailValidate={}
let passwordValidate={}
export const Login = () => {
  const navigate=useNavigate()
  //react query 
  const queryClient = useQueryClient()
  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: data => {
      queryClient.setQueryData(["users", data], data)
      queryClient.invalidateQueries(["users"], { exact: true })
      localStorage.setItem('token',data.data.token)
      Cookies.set('token', data.data.token, { httpOnly: true });
      navigate('/')
    },
    onError: (error)=>{
      toast.error(error.response.data.message);
    }
  })
  const [submet,setSubmet]=useState(false) 
  const [login,setLogin]=useState({
    email:'',
    password:'',
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmet(true)
    //emailValidate=validateEmail(login.email)
    //passwordValidate=validatePassword(login.password)
    if(!emailValidate?.error && !passwordValidate?.error){
      loginUserMutation.mutate(login);
    }
  }
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    //emailValidate=validateEmail(login.email)
    //passwordValidate=validatePassword(login.password)
  };
  
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
        className={`border-gray-500 focus:border-white text-white ${submet && emailValidate?.error && 
          ' border-2 border-red-500 focus:border-red-800'}`}
        
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
      
        <Toaster position="top-right" reverseOrder={false}>
          {/* Add any toasts you want to display when an error occurs */}
        </Toaster>
      
      <CustomInput 
        icon={<AiFillLock />} 
        type={'password'} 
        name={'password'}
        id={'password'}
        placeholder={'●●●●●●●●●●'} 
        onChange={handleLoginChange}
        className={`border-gray-500 focus:border-white text-white 
          ${submet && passwordValidate?.error && 
            'border-2 border-red-500 focus:border-red-800'}`}
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
      <FormButton
        disabled={loginUserMutation.isLoading}
        >
        {
          loginUserMutation.isLoading ? 'Login...' : 'Login'
        }
      </FormButton>

      <div className=' text-white w-[80%] mx-auto hover:underline transition text-sm'>
        <Link to='/forgotPassword'>
          Forgot password
        </Link>
      </div>

      <div className=' flex items-center gap-2 w-[80%] mx-auto my-6'>
        <span className=' h-[1px] w-[49%] bg-white mt-1'></span>
        <span className=' text-white'>or</span>
        <span className=' h-[1px] w-[49%] bg-white mt-1'></span>
      </div>
    </form>
  )
}