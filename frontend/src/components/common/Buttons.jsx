import PropTypes from 'prop-types';
const FormButton = ({ 
    children,
    className
 }) => {
    return (
      <div className='form_btn'>
        <button 
            className={`
                w-[80%] mx-auto flex  p-3 rounded-md 
                justify-center items-center scale-[.99] hover:scale-100 text-white font-bold bg-primary transition 
                duration-200 ease-in-out hover:bg-red-500 active:bg-red-600 active:scale-[.98]
               ${className}`
            }
            type='submit' >
                {children}
        </button>
      </div>
    )
}
  
export {
    FormButton
}



FormButton.propTypes = {
    children: PropTypes.element, // You can specify the expected prop types
    className: PropTypes.string,
};