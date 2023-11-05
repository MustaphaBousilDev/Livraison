import './login.css'
import  {useState} from 'react'
import CustomInput from '../common/Input'
import { FormButton} from '../common/Buttons'
import {validateConfirmPassword} from '../../helpers/validations'
import { AiOutlineMail,AiFillLock} from 'react-icons/ai'
import {RegisterService} from './register'
let password_confirmationValidate={}

//new QueyClient is a new instance of QueryClient we use it to make request to the server
export const Register = () => {
  const registerService = RegisterService();
  //---------------------------------------------------------------
  const [submet,setSubmet]=useState(false)  
  const [register,setRegister]=useState({
    username:'',
    email:'',
    password:'',
    password_confirmation:''
  })
  const [registerStatus,setRegisterStatus]=useState({
    email:{
      error:false,
      message:''
    },
    password:{
      error:false,
      message:''
    },
    username:{
      error:false,
      message:''
    },
  })
  
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmet(true)
    const isValid = registerService.validateCredentials(register.email,register.password,register.username);
    setRegisterStatus({
      ...registerStatus,
      email: {error: isValid[0].email.error,message: isValid[0].email.message,},
      password: {error: isValid[0].password.error,message: isValid[0].password.message,},
      username: {error: isValid[0].username.error,message: isValid[0].username.message,},
    });
    
    password_confirmationValidate=validateConfirmPassword(register.password_confirmation,register.password)
    if (isValid && !password_confirmationValidate?.error) {
      registerService.createUserMutation.mutate(register);
    }
  }
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
    const isValid = registerService.validateCredentials(
      register.email,
      register.password,
      register.username
    );
    console.log(isValid[0].email)
    setRegisterStatus({
      ...registerStatus,
      email: {
        error: isValid[0].email.error,
        message: isValid[0].email.message,
      },
      password: {
        error: isValid[0].password.error,
        message: isValid[0].password.message,
      },
      username: {
        error: isValid[0].username.error,
        message: isValid[0].username.message,
      },
    });
    //password_confirmationValidate=validateConfirmPassword(register.password_confirmation,register.password)
   
  };
  return (
    <>
    <form onSubmit={handleSubmit} 
    className={`my-4 flex flex-col gap-4 `}>
      <CustomInput 
        icon={<AiOutlineMail />} 
        type={'text'} 
        name={'username'}
        id={'username'}
        placeholder={'Enter your Name'} 
        onChange={handleRegisterChange}
        className={`bg-gray-900 border-solid text-white`}
        submit={submet}
        validate={registerStatus.username.error}
        errorMessage={registerStatus.username.message}
      />
      
      <CustomInput 
        icon={<AiOutlineMail />} 
        type={'text'} 
        name={'email'}
        id={'email'}
        placeholder={'Enter your Email'} 
        onChange={handleRegisterChange}
        className={`bg-gray-900 border-solid  text-white`}
        submit={submet}
        validate={registerStatus.email.error}
        errorMessage={registerStatus.email.message}
      />
      <CustomInput 
        icon={<AiFillLock />} 
        type={'password'} 
        name={'password'}
        id={'password'}
        placeholder={'●●●●●●●●●●'} 
        onChange={handleRegisterChange}
        className={`bg-gray-900 border-solid  text-white`}
        submit={submet}
        validate={registerStatus.password.error}
        errorMessage={registerStatus.password.message}
      />
      <CustomInput 
        icon={<AiFillLock />} 
        type={'password'} 
        name={'password_confirmation'}
        id={'password_confirmation'}
        placeholder={'●●●●●●●●●●'} 
        onChange={handleRegisterChange}
        className={`bg-gray-900 border-solid  text-white`}
        submit={submet}
        validate={password_confirmationValidate?.error}
        errorMessage={password_confirmationValidate?.message}
      />
      
      <FormButton
        disabled={ registerService.createUserMutation.isLoading}
        >
        { 
           registerService.createUserMutation.isLoading ? 'Registering...' : 'Register'
        }
      </FormButton>
    </form>
    </>
  )
}