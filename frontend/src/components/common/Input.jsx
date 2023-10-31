import PropTypes from 'prop-types';
import { useState } from 'react';
import {  AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
const CustomInput = ({ 
    icon, 
    type, 
    placeholder, 
    value, 
    onChange, 
    name,
    className,
    disabled=false,
}) => {

    const [showPassword, setShowPassword] = useState(false)
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            
                <div className='w-[80%] mx-auto relative '>
                    {icon &&
                        <div 
                            className=" absolute z-20  text-gray-300 left-3 scale-125 top-[50%] translate-y-[-50%]">
                            {icon}
                        </div>
                    }

                    <input
                        type={showPassword ? 'text' : type}
                        placeholder={placeholder}
                        value={value}
                        onKeyUp={onChange}
                        disabled={disabled}
                        name={name}
                        className={`
                            w-full p-3 px-10 rounded-md border 
                             transition duration-200 ease-in-out 
                            bg-gray-900 outline-none 
                            ${className}`}
                    />
                    {
                        type === 'password' && (
                            <div className="absolute z-20  text-gray-300 right-4 scale-125 top-[50%] translate-y-[-50%]" onClick={handleTogglePassword}>
                                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </div>
                        )
                    }
                </div>
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
};
export default CustomInput 