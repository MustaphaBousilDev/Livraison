import PropTypes from 'prop-types';
import { useState } from 'react';
import {  AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import {BiErrorCircle} from 'react-icons/bi' 
import {AiOutlineCheckCircle} from 'react-icons/ai'
const CustomInput = ({ 
    icon, 
    type, 
    placeholder, 
    value, 
    onChange, 
    name,
    className,
    disabled=false,
    submit=false,
    validate=false,
    errorMessage,
}) => {

    const [showPassword, setShowPassword] = useState(false)
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
                <div className='w-[80%] mx-auto relative '>
                    {icon &&
                        (
                            submit && validate ? (
                                <div 
                                    className=" absolute z-20  text-red-500 left-3 scale-125 top-[50%] translate-y-[-50%]">
                                    <BiErrorCircle />
                                </div>
                            ) : (
                                submit && !validate
                                 ? (
                                    <div 
                                        className=" absolute z-20  text-green-400 text-xl left-3 scale-125 top-[50%] translate-y-[-50%]">
                                        <AiOutlineCheckCircle/>
                                    </div>
                                 )
                                : (
                                    <div 
                                        className=" absolute z-20  text-gray-300 left-3 scale-125 top-[50%] translate-y-[-50%]">
                                        {icon}
                                    </div>
                                )
                            )
                        )
                    }
                    <input
                        type={showPassword ? 'text' : type}
                        placeholder={placeholder}
                        value={value}
                        onKeyUp={onChange}
                        disabled={disabled}
                        name={name}
                        className={`
                            w-full p-3 px-10 rounded-md 
                             transition duration-200 ease-in-out 
                             outline-none 
                            ${className}
                            ${submit && validate 
                                ? 'border-red-500 border-[2px]' 
                                : (
                                  validate===false && submit
                                  ? 'border-green-500 border-[2px]' 
                                  : 'border-gray-100 border '
                                )}
                            `}
                    />
                    {
                        type === 'password' && (
                            <div className="absolute z-20  text-gray-300 right-4 scale-125 top-[50%] translate-y-[-50%]" onClick={handleTogglePassword}>
                                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </div>
                        )
                    }
                </div>
                {        
                    (submit && validate) && (
                        <span className='text-red-500 text-sm w-[80%] flex mx-auto'>
                        {errorMessage}
                        </span>
                    ) 
                }
                {
                    (submit && !validate) && (
                        <span className='text-green-500 text-sm w-[80%] flex mx-auto'>
                        {errorMessage}
                        </span>
                    )
                }
        </>
    )
}

CustomInput.propTypes = {
    icon: PropTypes.element, // You can specify the expected prop types
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    name: PropTypes.string,
    className: PropTypes.string,
    errorType: PropTypes.any,
    disabled: PropTypes.bool,
    submit: PropTypes.bool,
    validate: PropTypes.bool,
    errorMessage: PropTypes.string,
};
export default CustomInput 