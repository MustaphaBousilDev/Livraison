import axios from "axios"

export const loginUser=(login)=> {
    return axios
      .post("http://localhost:5000/api/v1/auth/login", login)
      .then(res => res.data)
}
export const createUser=(register)=> {
    return axios
      .post("http://localhost:5000/api/v1/auth/register", register)
      .then(res => res.data)
}
export const verifyEm=(token)=> {
    return axios
      .get(`http://localhost:5000/api/v1/auth/activate/${token}`)
      .then(res => res.data)
}
export const verifyEmail=(email)=>{
    return axios
      .post("http://localhost:5000/api/v1/auth/sendResetPasswordCode",email)
      .then(res => res.data)
}
export const verifyCode=(code,email)=>{
    return axios
      .post(`http://localhost:5000/api/v1/auth/validateResetPassword/${email}`,code)
      .then(res => res.data)
}
export const verifyChangePassword=(password)=>{
    return axios
      .post(`http://localhost:5000/api/v1/auth/changePassword`,password)
      .then(res => res.data)
}
export const logout=()=> {
    return axios
      .get(`http://localhost:5000/api/v1/auth/logout/${localStorage.getItem('token')}`)
      .then(res => {
        //
        localStorage.setItem('token','')
      })
      .catch(err=>{
        console.log(err)
      })
}