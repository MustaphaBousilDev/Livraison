import './login.css'
import  {useState} from 'react'
import CustomInput from '../common/Input'
import { useMutation } from 'react-query';
import axios from 'axios';
import { useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom';
import { FormButton} from '../common/Buttons'
import Cookies from 'js-cookie';
import { 
  AiOutlineMail,
  AiFillLock,
} from 'react-icons/ai'
//import { validateEmail, validatePassword } from '../../helpers/validations'
let emailValidate={}
let passwordValidate={}
export const Login = () => {
  const navigate=useNavigate()
  const loginUser=(login)=> {
    console.log('fuck')
    console.log(login)
    return axios
      .post("http://localhost:5000/api/v1/auth/login", login)
      .then(res => res.data)
  }
  //react query 
  const queryClient = useQueryClient()
  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: data => {
      //set
      console.log("sucees",data)
      //queryClient.set
      queryClient.setQueryData(["users", data], data)
      queryClient.invalidateQueries(["users"], { exact: true })
      alert(data.message)
      //navigate('/')
      //store token in local storage 
      localStorage.setItem('token',data.data.token)
      Cookies.set('token', data.data.token, { httpOnly: true });
      //store in cookie the token using only http^
      
      navigate('/')


      //get response from 


      //setCurrentPage(<Post id={data.id} />)
    },
    onError: (error)=>{
      console.log(error)
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