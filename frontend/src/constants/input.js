import { AiFillLock, AiOutlineMail } from "react-icons/ai"

const registerInput = [
  {
    icon: AiOutlineMail,
    type:'text',
    name:'username',
    id:'username',
    placeholder:'Enter your Name',
    onchange:()=>{},
    className:'bg-gray-900 border-solid text-white',
    submit:false,
    validate:false,
    errorMessage:'',
    key:1
  },
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
  {
    icon: AiFillLock,
    type:'password',
    name:'password_confirmation',
    id:'password_confirmation',
    placeholder:'●●●●●●●●●●',
    onchange:()=>{},
    className:'bg-gray-900 border-solid text-white',
    submit:false,
    validate:false,
    errorMessage:'',
    key:4
  },
]

export default registerInput

