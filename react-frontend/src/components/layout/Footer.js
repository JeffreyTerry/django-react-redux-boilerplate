import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import './Footer.scss';

function Footer() {
  return (
    <footer className='container-fluid py-5'>
      <div className='row'>
        <div className='col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2'>
          <div className='row'>
            <div className='col-12 order-2 mt-4 text-center col-lg-7 order-lg-1 mt-lg-0 text-lg-left'>
              <FontAwesomeIcon icon={faCopyright} aria-label='copyright' /> David Askey, Isaac Yates, and Jeffrey Terry 2020.
            </div>
            <div className='col-12 order-1 text-center col-lg-5 order-lg-2 text-lg-right'>
              Made with <FontAwesomeIcon icon={faHeart} aria-label='heart' /> in Norman, Oklahoma.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
