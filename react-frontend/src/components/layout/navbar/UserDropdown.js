import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearReduxStore } from '../../../redux/rootReducer';
import { trackNavbarEvent } from '../../../assets/utils/GoogleAnalytics';
import { executeOnEnter } from '../../../assets/utils/utils';
import { Container, Row, Col } from 'react-bootstrap';
import './UserDropdown.scss';


const UserDropdown = ({ onSelect }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  function handleWindowMouseClick(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      onSelect();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleWindowMouseClick);
    return () => {
      document.removeEventListener('click', handleWindowMouseClick);
    }
  });

  const trackAccountLinkClick = () => {
    trackNavbarEvent('Clicked Account Link');
    onSelect();
  }

  const logout = () => {
    let response = dispatch(clearReduxStore());
    if (response) {
      window.location = '/api/users/logout';
    }
  }

  return (
    <div className='user-dropdown-wrapper'>
      <Container fluid>
        <Row className='justify-content-end'>
          <Col ref={dropdownRef} className='user-dropdown'>
            <Row>
              <Col>
                <Link className='unset-link-styling user-dropdown-btn user-dropdown-open-account-btn no-select' to='/user/account' onClick={trackAccountLinkClick}>
                  Account
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className='divider'></div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div
                  className='user-dropdown-btn user-dropdown-logout-btn no-select'
                  onClick={logout}
                  onKeyPress={event => executeOnEnter(event, logout)}
                  tabIndex='0'
                >
                  Log Out
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default UserDropdown;
