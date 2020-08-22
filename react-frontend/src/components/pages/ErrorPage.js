import React from 'react';
import { Helmet } from 'react-helmet';
import './ErrorPage.scss';

function ErrorPage() {
  return (
    <div id='error-page-container' className='container-fluid min-height-page-container'>
      <Helmet>
        <title>404 Error</title>
      </Helmet>
      <div className='row text-center mt-5'>
        <div className='col-12 mt-5'>
          <div className='h1'>Page Not Found</div>
        </div>
      </div>
      <div className='row text-center'>
        <div className='col-12'>
          <div className='huge-icon'>
            {/* <FontAwesomeIcon icon={faExclamationCircle} /> */}
            404
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
