import './login.css'
import  {useState} from 'react'
import CustomInput from '../common/Input'
import { FormButton} from '../common/Buttons'
import {validateConfirmPassword, validateEmail,validatePassword,validateUsername} from '../../helpers/validations'
import { AiOutlineMail,AiFillLock} from 'react-icons/ai'
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../service/api/auth/auth';
import { useForm, FormProvider } from "react-hook-form";



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
    emailValidate=validateEmail(register.email)
    passwordValidate=validatePassword(register.password)
    usernameValidate=validateUsername(register.username)
    password_confirmationValidate=validateConfirmPassword(register.password_confirmation,register.password)
    console.log(register)
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
    console.log(submet)
    
    emailValidate=validateEmail(register.email)
    passwordValidate=validatePassword(register.password)
    usernameValidate=validateUsername(register.username)
    password_confirmationValidate=validateConfirmPassword(register.password_confirmation,register.password)
    console.log(password_confirmationValidate?.error)
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
        validate={usernameValidate?.error}
        errorMessage={usernameValidate?.message}
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
        validate={emailValidate?.error}
        errorMessage={emailValidate?.message}
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
        validate={passwordValidate?.error}
        errorMessage={passwordValidate?.message}
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
        disabled={createUserMutation.isLoading}
        >
        { 
          createUserMutation.isLoading ? 'Registering...' : 'Register'
        }
      </FormButton>
    </form>
    </>
  )
}