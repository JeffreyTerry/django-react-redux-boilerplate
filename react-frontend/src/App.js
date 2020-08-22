import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router } from 'react-router-dom';
import { initializeGoogleAnalytics } from './assets/utils/GoogleAnalytics';
import { myappSummaryLong } from './assets/constants/constants';
import { getCookie } from 'react-use-cookie';
import { useDispatch } from 'react-redux';
import { fetchUser } from './redux/features/user/userSlice';
import './App.scss';  // Goes before AppRoutes and other components (so that the stylesheets cascade correctly)
import AppRoutes from './routes/routes';
import ScrollToTop from './routes/ScrollToTop';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = getCookie('isAuthenticated');

  // TODO make sure this code works as expected
  useEffect(() => {
    if (isAuthenticated === 'true') {
      // ISAAC -- this is how you fetch stuff from the API
      // The way I've designed fetchUser means that it will fetch the user from
      // the backend API, then it will store the returned value in the
      // Redux store. You can then access it in any component via
      // `const currentUser = useSelector(getUser);`
      dispatch(fetchUser());
    }

    initializeGoogleAnalytics();
  }, [dispatch, isAuthenticated]);

  return <Router>
    <ScrollToTop />
    <div className='App'>
      <Helmet>
        <meta name='description' content={myappSummaryLong} />
      </Helmet>
      <Navbar isAuthenticated={isAuthenticated} />
      <AppRoutes isAuthenticated={isAuthenticated} />
      <Footer />
    </div>
  </Router>
}

export default App;