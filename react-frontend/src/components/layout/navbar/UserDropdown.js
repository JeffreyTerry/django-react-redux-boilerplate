import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearReduxStore } from '../../../redux/rootReducer';
import { trackNavbarEvent } from '../../../assets/utils/GoogleAnalytics';
import { executeOnEnter } from '../../../assets/utils/utils';
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
      <div className='container-fluid'>
        <div className='row justify-content-end'>
          <div ref={dropdownRef} className='user-dropdown col-12'>
            <div className='row'>
              <div className='col-12'>
                <div className='row'>
                  <div className='col-12'>
                    <Link className='unset-link-styling user-dropdown-btn user-dropdown-open-account-btn no-select' to='/user/account' onClick={trackAccountLinkClick}>
                      Account
                    </Link>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <div
                      className='user-dropdown-btn user-dropdown-logout-btn no-select'
                      onClick={logout}
                      onKeyPress={event => executeOnEnter(event, logout)}
                      tabIndex='0'
                    >
                      Log Out
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDropdown;
