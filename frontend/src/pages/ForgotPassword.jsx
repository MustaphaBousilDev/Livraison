import { AiOutlineMail } from 'react-icons/ai'
//icon arrow left from react icons
import {BsArrowLeftShort} from 'react-icons/bs'
import forgotPassword from '../assets/forgotPassword.png'
import settingPassword from '../assets/setting.gif'
import { useMutation } from 'react-query';
import CustomInput from '../components/common/Input'
import axios from 'axios';
import { useQueryClient } from 'react-query'
import {validateEmail} from '../helpers/validations'
import { useNavigate } from 'react-router-dom';
import { FormButton } from '../components/common/Buttons'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {RiErrorWarningLine} from 'react-icons/ri'
import { verifyEmail,verifyChangePassword } from '../service/api/auth/auth';
let emailValidate={}
const ForgotPassword = () => {
  const [email,setEmail]=useState('')
  const [code,setCode]=useState('')
  const [submet,setSubmet]=useState(false)
  const [success,setSuccess]=useState(false)
  const [successCode,setSuccessCode]=useState(false)
  const [changePassword,setChangePassword]=useState({
    password:'',
    password_confirm:''
  })
  const navigate=useNavigate()
  
  const verifyCode=(code)=>{
    return axios
      .post(`http://localhost:5000/api/v1/auth/validateResetPassword/${email}`,code)
      .then(res => res.data)
  }
  
  const queryClient = useQueryClient()
  const VerifyMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: data => {
      //set
      console.log("sucees",data)
      //queryClient.set
      queryClient.setQueryData(["usersEmail", data], data)
      queryClient.invalidateQueries(["usersEmail"], { exact: true })
      setSuccess(true)
    },
    onError: (error)=>{
      console.log(error)
      alert(error.response.data.message)
    }
  })
  const VerifyCodeMutation = useMutation({
    mutationFn: verifyCode,
    onSuccess: data => {
      //set
      console.log("sucees",data)
      //queryClient.set
      queryClient.setQueryData(["usersCode", data], data)
      queryClient.invalidateQueries(["usersCode"], { exact: true })
      //navigate('/updatePassword')
      setSuccessCode(true)
    },
    onError: (error)=>{
      console.log(error)
      alert(error.response.data.message)
    }
  })
  const VerifyPasswordMutation = useMutation({
    mutationFn: verifyChangePassword,
    onSuccess: data => {
      //set
      console.log("sucees",data)
      //queryClient.set
      queryClient.setQueryData(["usersPassword", data], data)
      queryClient.invalidateQueries(["usersPassword"], { exact: true })
      navigate('/inscription')
    },
    onError: (error)=>{
      console.log(error)
      alert(error.response.data.message)
    }
  })
  
  

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmet(true)
    emailValidate=validateEmail(email)
    if(emailValidate.error){
      alert(emailValidate.msg)
    }else{
      setSubmet(true)
      VerifyMutation.mutate({email});
    }
  }

  const handleChange=(e)=>{
    setEmail(e.target.value)
    emailValidate=validateEmail(email)
  }


  const handleCodeChange=(e)=>{
    setCode(e.target.value)
  }

  const handleChangePassword=(e)=>{
    const { name, value } = e.target;
    setChangePassword({ ...changePassword, [name]: value });
  }

  const handleCode=(e)=>{
    e.preventDefault()
    VerifyCodeMutation.mutate({code})
    
  }

  const handlePassword=(e)=>{
    e.preventDefault()
    VerifyPasswordMutation.mutate({
      ...changePassword,
      email:email
    })
  }


  
  return (
    <div className=' w-screen relative h-screen bg-white flex items-center justify-center'>
      <div className=' absolute top-10 right-9 -rotat-45 -z-0'>
        <img src={settingPassword} alt='' className=' w-96 h-96 opacity-40'  />
      </div>
      <div className=' flex  w-[70%]  h-[50vh] items-center z-40'>
          <div className=' lg:w-[50%]'>
            <img src={forgotPassword} alt='' className=' opacity-60 w-full' />
          </div>
          <div className=' w-[50%]  p-8 flex flex-col gap-3'>
              <div className=' w-[80%] mx-auto flex flex-col gap-4'>
                <h3 className=' text-xl font-bold'>Forgot Password</h3>
                <p className=' text-gray-400'>Enter your email and well send you a link to reset  your password</p>
              </div>
              <div className=' mt-6 flex flex-col gap-4'>
                  <form onSubmit={handleSubmit} className=' flex flex-col gap-4'>
                    <CustomInput 
                      icon={ 
                        (emailValidate?.error && submet) 
                            ? <RiErrorWarningLine className=' text-red-500 font-bold'/> 
                            : <AiOutlineMail />
                      } 
                      type={'text'} 
                      onChange={handleChange}
                      name={'email'}
                      disabled={success}
                      id={'email'}
                      placeholder={'Enter your Email'} 
                      className={`
                        text-black    border-2 
                        border-gray-500  bg-white
                        ${(submet && !emailValidate?.error) && ' border-green-500 focus:border-green-600'}
                        ${(submet && emailValidate?.error) && 
                          ' border-red-500 focus:border-red-600'}
                       `}
                    />
                    {
                      (success) && (
                        <CustomInput 
                          type={'text'} 
                          name={'code'}
                          disabled={successCode}
                          id={'code'}
                          onChange={handleCodeChange}
                          placeholder={'XXXXXX'} 
                          className={`
                            text-black bg-white focus:text-black  border-2 
                            border-gray-500 focus:border-gray-600
                          `}
                        />
                      )
                    }
                    {
                      (successCode) && (
                        <>
                        <CustomInput 
                          type={'password'} 
                          name={'password'}
                          id={'password'}
                          onChange={handleChangePassword}
                          placeholder={'new password'} 
                          className={`
                            text-black bg-white focus:text-black  border-2 
                            border-gray-500 focus:border-gray-600
                          `}
                        />
                        <CustomInput 
                          type={'password'} 
                          name={'password_confirm'}
                          id={'password_confirm'}
                          onChange={handleChangePassword}
                          placeholder={'confirm password'} 
                          className={`
                            text-black bg-white focus:text-black  border-2 
                            border-gray-500 focus:border-gray-600
                          `}
                        />
                        </>
                      )
                    }
                    {
                      (!success && !successCode) && (
                        <FormButton>
                          {'Send'}
                        </FormButton>
                      )
                    }
                    
                  </form>
                  {
                      (success && !successCode) && (
                        <FormButton onClick={handleCode}>
                          {'verify'}
                        </FormButton>
                      )
                  }
                  {
                      (success && successCode) && (
                        <FormButton onClick={handlePassword}>
                          {'change'}
                        </FormButton>
                      )
                  }
                <div className=' w-[80%] mx-auto'>
                  <Link to='/inscreption' className=' hover:text-blue-400 transition-all font-semibold cursor-pointer 
                  hover:underline flex items-center gap-1 text-gray-400'>
                    <BsArrowLeftShort className=' inline-block  scale-150' />
                    <span>Back to login</span>
                  </Link>
                </div>
                </div>
          </div>
      </div>
    </div>
  )
}

export default ForgotPassword

