import { validateEmail, validatePassword, validateUsername } from "../validations"

export const validateCredentials=(email,password,username)=>{
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