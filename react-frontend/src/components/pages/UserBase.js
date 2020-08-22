import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import UserNavbar from '../layout/UserNavbar';
import HelpCenter from './HelpCenter';
import './UserBase.scss';


const UserBase = () => {
  let { path } = useRouteMatch();

  return (
    <div id='user-page-container' className='container-fluid' >
      <div className='row'>
        <UserNavbar />
        <div className='col inner-page-container'>
          <div className='row'>
            <Switch>
              <Route exact path={`${path}/help`} component={HelpCenter} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBase;
