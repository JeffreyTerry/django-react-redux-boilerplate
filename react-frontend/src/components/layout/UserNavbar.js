import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import './UserNavbar.scss';


const UserNavbar = () => {
  const location = useLocation();

  return <div className={'user-nav d-none ' + (location.pathname.startsWith('/user') ? 'd-md-block' : 'd-sm-block')}>
    <nav aria-label='User Navigation Bar'>
      {/* Add more links here if desired */}
      <Link
        to='/user/help'
        className={'unset-link-styling user-nav-btn user-help-nav-btn no-select' + (location.pathname.includes('/user/help') ? ' active' : '')}
      >
        <FontAwesomeIcon icon={faQuestionCircle} className='icon' />
        <span className='text'>Help Center</span>
      </Link>
    </nav>
  </div>
}

export default UserNavbar;
