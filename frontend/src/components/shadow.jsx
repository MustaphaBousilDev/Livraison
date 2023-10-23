import PropTypes from 'prop-types';

const Shadow = (props) => {
  // Extract the className prop from the passed props
  const { className } = props;
  return (
    <div
      className={`
        absolute top-0 left-0 w-full h-full z-30 bg-gray-800 
        ${className || ''} 
      `}
    />
  );
};

// Define propTypes for the component
Shadow.propTypes = {
  className: PropTypes.string,
};

export { Shadow };