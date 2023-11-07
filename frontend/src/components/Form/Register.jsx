import CustomInput from '../common/Input'
import { FormButton} from '../common/Buttons'
import {RegisterService} from './register'
import './login.css'
import registerInput from '../../constants/input'

//new QueyClient is a new instance of QueryClient we use it to make request to the server
export const Register = () => {
  const registerService = RegisterService();
  const {
    submet,registerStatus,handleSubmit,handleRegisterChange
  }=registerService
  //---------------------------------------------------------------
  return (
    <>
    <form onSubmit={handleSubmit} 
    className={`my-4 flex flex-col gap-4 `}>
      {
        registerInput.map((item,index)=>{
          return(
            <CustomInput 
              key={index}
              icon={<item.icon/>} 
              type={item.type} 
              name={item.name}
              id={item.id}
              placeholder={item.placeholder} 
              onChange={handleRegisterChange}
              className={`${item.className}`}
              submit={submet}
              validate={registerStatus[item.name].error}
              errorMessage={registerStatus[item.name].message}
            />
          )
        })
      }
      <FormButton disabled={ registerService.createUserMutation.isLoading}>
        { 
          registerService.createUserMutation.isLoading ? 'Registering...' : 'Register'
        }
      </FormButton>
    </form>
    </>
  )
}