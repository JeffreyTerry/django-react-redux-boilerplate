import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/features/user/userSelector';
import { trackNavbarEvent } from '../../assets/utils/GoogleAnalytics';
import { executeOnEnter } from '../../assets/utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignal, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import UserDropdown from './navbar/UserDropdown';
import './Navbar.scss';

const Navbar = ({ isAuthenticated }) => {
  // ISAAC -- this is how you grab stuff from the Redux store
  // const <varName> = useSelector(<selectorName>);
  const currentUser = useSelector(getUser);
  const [isViewingUserDropdown, setIsViewingUserDropdown] = useState(false);

  return <>
    <nav
      id='myapp-navbar'
      className={'navbar navbar-expand-sm fixed-top' +
        (isAuthenticated ? ' navbar-dark compact' : ' navbar-light')}
      aria-label='Primary Navigation Bar'
    >
      <div className='container-fluid'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link className='navbar-brand mr-2' to='/index'>
              <FontAwesomeIcon id='navbar-logo' className='navbar-logo' alt='logo' icon={faSignal}
                onClick={() => trackNavbarEvent('Clicked Logo Icon')} />
              <span id='navbar-title' className='ml-2'
                onClick={() => trackNavbarEvent('Clicked Logo Text')}>
                MyApp
              </span>
            </Link>
          </li>
        </ul>
        {isAuthenticated ?
          <ul id='navbar-links' className='navbar-nav ml-auto mr-0'>
            <li
              id='user-icon-container'
              className='nav-item mr-sm-2 mr-md-3 mr-lg-4 no-select'
              onClick={() => setIsViewingUserDropdown(true)}
              onKeyPress={event => executeOnEnter(event, () => {
                setIsViewingUserDropdown(!isViewingUserDropdown);
              })}
              aria-label='User dropdown menu'
            >
              {!!currentUser.firstName &&
                <div id='user-name-container'>
                  <div onClick={() => trackNavbarEvent('Clicked User Name')}>
                    {currentUser.firstName}
                  </div>
                </div>
              }
              <FontAwesomeIcon
                onClick={() => trackNavbarEvent('Clicked User Icon')}
                icon={faUserCircle}
                tabIndex='0'
                aria-hidden={false} />
            </li>
          </ul>
          : <ul id='navbar-links' className='navbar-nav ml-auto mr-0 verbose-navbar-links'>
            <li id='navbar-demo-btn' className='nav-item'>
              <Link className='nav-link' to='/demo'>Additional Navbar Link</Link>
            </li>
            <li className='nav-item'>
              <Link id='navbar-sign-in-btn' className='nav-link' to='/signin'>
                Sign&nbsp;In
              </Link>
            </li>
          </ul>
        }
      </div>
    </nav>
    {isViewingUserDropdown &&
      <UserDropdown
        onSelect={() => setIsViewingUserDropdown(false)}
      />
    }
  </>
}

export default Navbar;