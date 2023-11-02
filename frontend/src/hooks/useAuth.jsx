import { useEffect, useState } from 'react';
import axios from 'axios';
import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthContext= createContext({
  user:null,
  signUp:async ()=>{},
  signIn:async ()=>{},
  logout:async ()=>{},
  error:null,
  loading:false
})


export const AuthProvider=({children})=>{
  const [loading,setIsLoading]=useState(true)
  const [user,setUser]=useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error,setError]=useState(null)
  const [initialLoading,setInitialLoading]=useState(true)
  const navigate=useNavigate()

  useEffect(()=>{
    const token=localStorage.getItem('token')
    if(token){
      axios.get(`http://localhost:5000/api/v1/auth/getUserAuth/${localStorage.getItem('token')}`)
        .then((response)=>{
          if(response.data){
            setUser(response.data)
            setIsAuthenticated(true)
          }else{
            setUser(null)
            setIsAuthenticated(false)
          }
          setIsLoading(false)
        })
        .catch((error)=>{
          setIsAuthenticated(false)
          setIsLoading(false)
          setUser(null)
        })
    }else{
      setIsAuthenticated(false)
      setIsLoading(false)
      setUser(false)
    }
  },[])
}

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Make a request to your authentication endpoint to verify the token
      // Replace 'YOUR_AUTH_ENDPOINT' with your actual authentication endpoint
      axios.get(`http://localhost:5000/api/v1/auth/getUserAuth/${localStorage.getItem('token')}`)
        
        .then((response) => {
          console.log(response.data)
          if (response.data) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error verifying token:', error);
          setIsAuthenticated(false);
          setIsLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  return { isLoading, isAuthenticated };
}

export default useAuth