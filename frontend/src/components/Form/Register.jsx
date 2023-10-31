import './login.css'
import  {useState} from 'react'
import CustomInput from '../common/Input'
import { FormButton} from '../common/Buttons'
//import {validateEmail,validatePassword,validateUsername} from '../../helpers/validations'
import { AiOutlineMail,AiFillLock} from 'react-icons/ai'
import { useMutation } from 'react-query';
import axios from 'axios';
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';


let emailValidate={}
let passwordValidate={}
let usernameValidate={} 
let password_confirmationValidate={}

//new QueyClient is a new instance of QueryClient we use it to make request to the server
export const Register = () => {
  const navigate=useNavigate()

  
  const createUser=(register)=> {
    console.log('fuck')
    console.log(register)
    return axios
      .post("http://localhost:5000/api/v1/auth/register", register)
      .then(res => res.data)
  }
  //react query 
  const queryClient = useQueryClient()
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: data => {
      //set
      console.log("sucees",data.saveUser)
      //queryClient.set
      queryClient.setQueryData(["users", data.saveUser], data)
      queryClient.invalidateQueries(["users"], { exact: true })
      navigate('/verifyEmail')


      //get response from 


      //setCurrentPage(<Post id={data.id} />)
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
    //if there is no error in the validation we make a request to the server
    if(!emailValidate?.error && !passwordValidate?.error && !usernameValidate?.error && !password_confirmationValidate?.error){
      //we use the mutate function to make a request to the server
      //registrationMutation.mutate(register);
      createUserMutation.mutate(register);

    }
  }
  //validate register change
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
    //emailValidate=validateEmail(register.email)
    //passwordValidate=validatePassword(register.password)
    //usernameValidate=validateUsername(register.username)
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