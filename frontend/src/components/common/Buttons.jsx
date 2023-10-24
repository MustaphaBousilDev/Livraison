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
/* Button Default */
const ButtonDefault=({
    children,
    className,
    onClick,
})=>{
    return (
        <button
        onClick={onClick}
        className={`w-[48.5%] scale-100 transition active:scale-[.97]  py-3 
        rounded-lg text-md text-white button__gradient  ${className}`}
        >
            {children}
        </button>
    )
}
  
export {
    FormButton,
    ButtonDefault,
}



FormButton.propTypes = {
    children: PropTypes.element, // You can specify the expected prop types
    className: PropTypes.string,
};

ButtonDefault.propTypes = {
    children: PropTypes.element, // You can specify the expected prop types
    className: PropTypes.string,
    onClick: PropTypes.func,
};