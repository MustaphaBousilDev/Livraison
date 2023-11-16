import { AiFillLock, AiOutlineMail } from "react-icons/ai"

 const loginInputs = [
  {
    icon: AiOutlineMail ,
    type:'text',
    name:'email',
    id:'email',
    placeholder:'Enter your Email',
    onchange:()=>{},
    className:'bg-gray-900 border-solid text-white',
    submit:false,
    validate:false,
    errorMessage:'',
    key:2
  },
  {
    icon: AiFillLock ,
    type:'password',
    name:'password',
    id:'password',
    placeholder:'●●●●●●●●●●',
    onchange:()=>{},
    className:'bg-gray-900 border-solid text-white',
    submit:false,
    validate:false,
    errorMessage:'',
    key:3
  },
]

export default loginInputs


