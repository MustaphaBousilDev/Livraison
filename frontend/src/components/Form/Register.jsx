import './login.css'
import  {useEffect} from 'react'
import CustomInput from '../common/Input'
import { FormButton} from '../common/Buttons'
import { 
  AiOutlineMail,
  AiFillLock,
} from 'react-icons/ai'
import { gapi } from 'gapi-script'
export const Register = () => {
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
    <form className=' my-4'>
      <CustomInput 
        icon={<AiOutlineMail />} 
        type={'text'} 
        placeholder={'Enter your Name'} 
      />
      <CustomInput 
        icon={<AiOutlineMail />} 
        type={'text'} 
        placeholder={'Enter your Email'} 
      />
      <CustomInput 
        icon={<AiFillLock />} 
        type={'password'} 
        placeholder={'●●●●●●●●●●'} 
      />
      <CustomInput 
        icon={<AiFillLock />} 
        type={'password'} 
        placeholder={'●●●●●●●●●●'} 
      />
      <FormButton>
        Register
      </FormButton>
    </form>
  )
}