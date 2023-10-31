import { useEffect, useState } from 'react';
import Email from '../assets/verify-removebg-preview.png'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const VerifyEmail = () => {
  const navigate=useNavigate()
  const params = useParams();
  const { token } = params;
  const verifyEm=(token)=> {
    //console.log('fuck')
    //console.log(token)
    return axios
      .get(`http://localhost:5000/api/v1/auth/activate/${token}`)
      .then(res => res.data)
  }
  //react query 
  const queryClient = useQueryClient()
  const createUserMutation = useMutation({
    mutationFn: verifyEm,
    onSuccess: data => {
      console.log("sucees",data)
      //queryClient.set
      queryClient.setQueryData(["verify", data], data)
      queryClient.invalidateQueries(["verify"], { exact: true })
      navigate('/inscription')

    },
    onError: (error)=>{
      console.log(error)
    }
  })
  const [time, setTime] = useState(1200);
  
  const [decodedToken, setDecodedToken] = useState(null);
  useEffect(() => {
    if (token.length > 0) {
      console.log('fuck bitch')
      //atob is a function to decode base64
      const decodedTokens = atob(token);
      console.log('hahahahaha')
      console.log(decodedTokens);
      setDecodedToken(decodedTokens);
      createUserMutation.mutate(decodedToken);
      console.log('after')
      console.log(decodedToken)
    }
   },[])
  
   
  
  useEffect(() => {
    const countdown = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        clearInterval(countdown);
      }
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, [time]);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  //const 
  return (
    <div  className=" bg-gray-100 w-screen h-screen flex items-center justify-center">
        <div className=" relative w-[98%] mx-auto rounded-xl md:mx-auto md:w-[80%] xl:w-[60%] min-h-[50vh] border bg-white">
          <img src={Email} className=' w-40 absolute top-[-90px] left-[50%] translate-x-[-50%]'   />
          <div className=' mt-16 flex flex-col gap-12'>
            <h2 className=' text-center text-4xl lg:text-5xl  text-gray-700'>
                Verify your email
            </h2>
            <div className=' w-[80%] text-lg flex flex-col gap-10 mx-auto text-center text-gray-700'>
                <p className=' text-gray-700'>
                    We have sent an email to your email address, please check and verify your email
                    address and activate your account. The link will be valid for 24 hours.
                </p>
                <p className='text-gray-700'>
                    <a className=' text-blue-400 font-semibold cursor-pointer hover:underline'>Click here</a> if you did not receive the email or would like to change the email address 
                    you signed up with
                </p>
                <p>
                  {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </p>
            </div>
          </div>

        </div>
    </div>
  )
}

export default VerifyEmail