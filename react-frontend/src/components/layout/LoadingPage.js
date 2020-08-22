import React from 'react';
import UserNavbar from './UserNavbar';
import { useLocation } from 'react-router';

const LoadingPage = () => {
  const location = useLocation();

  return <div id='loading-page-container' className='container-fluid'>
    <div className='row'>
      {location.pathname.startsWith('/user') &&
        <UserNavbar />
      }
      <div className='inner-page-container min-height-page-container col'></div>
    </div>
  </div>
}

export default LoadingPage;
