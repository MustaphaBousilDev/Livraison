import './login.css'
import  {useEffect} from 'react'
import CustomInput from '../common/Input'
import { FormButton} from '../common/Buttons'
import { useForm } from 'react-hook-form';
import { 
  AiOutlineMail,
  AiFillLock,
} from 'react-icons/ai'
import { gapi } from 'gapi-script'
export const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log('errors', typeof(errors.username))
  const onSubmit = (data) => {
    console.log(data);
  };
  const clientID='1090604505843-uq59rok8qc8jg41c7u218gtjfvtm2669.apps.googleusercontent.com'
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
    <form onSubmit={handleSubmit(onSubmit)} 
    className={`my-4 flex flex-col 
    ${
      errors.username || errors.email || errors.password || errors.password_confirmation
      ?  'gap-4' : ' gap-6'
    }
    `}>
      <CustomInput 
        icon={<AiOutlineMail />} 
        type={'text'} 
        name={'username'}
        id={'username'}
        {...register('username', {
          required: true,
          pattern: {
            value: /^[a-zA-Z]+$/i,
            message: 'Please enter a valid name.',
          },
        })}
        placeholder={'Enter your Name'} 
      />
      {errors.username && 
      <span className=' text-red-500 w-[80%] mx-auto flex'>
        {errors.username.message}
      </span>}
      <CustomInput 
        icon={<AiOutlineMail />} 
        type={'text'} 
        name={'email'}
        id={'email'}
        {...register('email', { required: true, pattern: /^\S+@\S+$/i})}
        placeholder={'Enter your Email'} 
      />
      {errors.email && (
        <span className='text-red-500 w-[80%] mx-auto flex'>
          {errors.email.type === 'required'
            ? 'This field is required.'
            : 'Please enter a valid email address.'}
        </span>
      )}
      <CustomInput 
        icon={<AiFillLock />} 
        type={'password'} 
        name={'password'}
        id={'password'}
        {...register('password', { required: true, minLength: 6 })}
        placeholder={'●●●●●●●●●●'} 
      />
      {errors.password && (
        <span className='text-red-500 w-[80%] mx-auto flex'>
          {errors.password.type === 'required'
            ? 'This field is required.'
            : 'Password must have at least 6 characters.'}
        </span>
      )}
      <CustomInput 
        icon={<AiFillLock />} 
        type={'password'} 
        name={'password_confirmation'}
        id={'password_confirmation'}
        {...register('password_confirmation', { required: true, minLength: 6 })}
        placeholder={'●●●●●●●●●●'} 
      />
      {errors.password_confirmation && (
        <span className='text-red-500 w-[80%] mx-auto flex'>
          {errors.password_confirmation.type === 'required'
            ? 'This field is required.'
            : 'Password must have at least 6 characters.'}
        </span>
      )}
      <FormButton>
        Register
      </FormButton>
    </form>
  )
}