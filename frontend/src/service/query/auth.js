import { useNavigate } from "react-router-dom";
import APIClient from "../api/api";
import { useQueryClient } from "react-query";

const apiClient = new APIClient("/register");

const RegisterAPI = () => {
  const queryClient = useQueryClient() 
  const navigate=useNavigate();
  return {
    mutationFn: data => {
      return apiClient.post(data);
    },
    onError: (error) => {
      //handle error
      console.log(error)
    },
    onSuccess: (data) => {
      //handle success
      queryClient.setQueryData(["users", data.saveUser], data)
      queryClient.invalidateQueries(["users"], { exact: true })
      navigate('/verifyEmail')
    },
  };
};

export default RegisterAPI;