import React from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer } from '@fortawesome/free-solid-svg-icons';
import './UnderConstruction.scss';

function UnderConstruction() {
  return (
    <div id='under-construction-page-container' className='container-fluid'>
      <Helmet>
        <title>MyApp</title>
      </Helmet>
      <header className='row text-center'>
        <div className='col-12'>
          <div className='h1'>This page is currently under construction.</div>
          <div className='h1'>Check back again soon!</div>
        </div>
      </header>
      <div className='row text-center mt-4'>
        <div className='col-12'>
          <div className='huge-icon'>
            <FontAwesomeIcon icon={faHammer} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnderConstruction;
