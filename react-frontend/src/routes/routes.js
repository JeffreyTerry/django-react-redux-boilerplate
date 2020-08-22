import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import LoadingPage from '../components/layout/LoadingPage';
import Home from '../components/pages/Home';
import { withTracker } from '../assets/utils/GoogleAnalytics';

// Load the routes lazily in order to make the home page load super quickly.
const SignIn = lazy(() => import('../components/pages/SignIn'));
const Legal = lazy(() => import('../components/pages/Legal'));
const UserBase = lazy(() => import('../components/pages/UserBase'));
const ErrorPage = lazy(() => import('../components/pages/ErrorPage'));

const AppRoutes = ({ isAuthenticated }) => {
  return <Suspense fallback={<LoadingPage />}>
    <Switch>
      <PublicRoute exact path='/' component={withTracker(Home)} isAuthenticated={isAuthenticated} redirectTo='/user' />
      <Route exact path='/index' component={withTracker(Home)} />
      {/* Users see just a single "Sign In" page for simplicity, which handles both sign ups and log ins */}
      <Route exact path='/signin' component={withTracker(SignIn)} />
      <Route exact path='/legal' component={withTracker(Legal)} />
      <PrivateRoute path='/user' component={withTracker(UserBase)} isAuthenticated={isAuthenticated} />
      {/* Show an error page if none of the above routes match */}
      <Route component={withTracker(ErrorPage)} />
    </Switch>
  </Suspense>
};

export default AppRoutes;
