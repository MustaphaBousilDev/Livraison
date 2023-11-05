import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../service/api/auth/auth'
import {validateEmail,validatePassword,validateUsername} from '../../helpers/validations'
export const RegisterService = () => {
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

  //validate credentials
  const validateCredentials=(email,password,username)=>{
    const emailValidate=validateEmail(email)
    const passwordValidate=validatePassword(password)
    const usernameValidate=validateUsername(username)

    return [
      {
        email: {
          error:emailValidate.error,
          message:emailValidate.message
        },
        password: {
          error:passwordValidate.error,
          message:passwordValidate.message
        },
        username: {
          error:usernameValidate.error,
          message:usernameValidate.message
        },
      }
    ]
  }

  return {
    createUserMutation,
    validateCredentials
  }
}


