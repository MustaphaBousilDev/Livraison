import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

export const PrivateRoute=({element,authenticated})=>{
    return authenticated ? element : <Navigate to='/inscription'/>
}


PrivateRoute.propTypes={
    element:PropTypes.element.isRequired,
    authenticated:PropTypes.bool.isRequired
}