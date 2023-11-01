import { useEffect, useState } from 'react';
import axios from 'axios';
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