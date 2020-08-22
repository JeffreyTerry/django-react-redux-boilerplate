import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/features/user/userSelector';
import { trackNavbarEvent } from '../../assets/utils/GoogleAnalytics';
import { executeOnEnter } from '../../assets/utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignal, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, Container } from 'react-bootstrap';
import UserDropdown from './navbar/UserDropdown';
import './Navbar.scss';

const MyAppNavbar = ({ isAuthenticated }) => {
  // ISAAC -- this is how you grab stuff from the Redux store
  // const <varName> = useSelector(<selectorName>);
  const currentUser = useSelector(getUser);
  const [isViewingUserDropdown, setIsViewingUserDropdown] = useState(false);

  return <>
    <Navbar
      id='myapp-navbar'
      expand='lg'
      fixed='top'
      variant={isAuthenticated ? 'dark' : 'light'}
      className={isAuthenticated ? 'compact' : ''}
      aria-label='Primary Navigation Bar'
    >
      <Container fluid>
        <Navbar.Text>
          <Link className='navbar-brand mr-2' to='/index'>
            <FontAwesomeIcon id='navbar-logo' className='navbar-logo' alt='logo' icon={faSignal}
              onClick={() => trackNavbarEvent('Clicked Logo Icon')} />
            <span id='navbar-title' className='ml-2'
              onClick={() => trackNavbarEvent('Clicked Logo Text')}>
              MyApp
            </span>
          </Link>
        </Navbar.Text>
        {isAuthenticated ?
          <Nav className='ml-auto mr-0'>
            <Navbar.Text
              id='user-icon-container'
              className='mr-sm-2 mr-md-3 mr-lg-4 no-select'
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
            </Navbar.Text>
          </Nav>
          : <Nav id='navbar-links' className='ml-auto mr-0 verbose-navbar-links'>
            <Navbar.Text id='navbar-demo-btn'>
              <Link className='nav-link' to='/demo'>Additional Navbar Link</Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link id='navbar-sign-in-btn' className='nav-link' to='/signin'>
                Sign&nbsp;In
              </Link>
            </Navbar.Text>
          </Nav>
        }
      </Container>
    </Navbar>
    {isViewingUserDropdown &&
      <UserDropdown
        onSelect={() => setIsViewingUserDropdown(false)}
      />
    }
  </>
}

export default MyAppNavbar;