import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// PrivateRoutes redirect to the sign in page if the user is not signed in.
const PrivateRoute = ({ component: Component, isAuthenticated, redirectTo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated === true) {
          return <Component {...props} {...rest} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: redirectTo || '/signin',
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
