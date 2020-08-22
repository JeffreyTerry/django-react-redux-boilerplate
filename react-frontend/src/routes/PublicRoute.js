import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// PublicRoutes redirect to a specific private page if the user is logged in (e.g. '/' can redirect to '/user')
const PublicRoute = ({ component: Component, isAuthenticated, redirectTo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated !== true) {
          return <Component {...props} {...rest} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: redirectTo,
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

export default PublicRoute;
