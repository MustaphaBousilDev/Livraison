import Email from '../assets/verify-removebg-preview.png'
const VerifyEmail = () => {
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
            </div>
          </div>
        </div>
    </div>
  )
}

export default VerifyEmail