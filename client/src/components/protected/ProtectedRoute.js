import { Route, Redirect } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

/**
 * ProtectedRoute
 * Takes an object containing:
 *    The component that needs to be protected
 *    The auth reducer from the store
 *    All props, such as the other reducers from the store
 * Returns a Route that:
 *    Contains all props
 *    Renders an object that:
 *      Takes the props
 *      Checks if the user is authenticated
 *        And if so, renders the component, passing along all props
 *        Otherwise, does not render the component and redirects to "/login"
 */
const ProtectedRoute = ({ component: Component, auth, ...props }) => (
  <Route
    {...props}
    render={props =>
      auth.authenticated === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
