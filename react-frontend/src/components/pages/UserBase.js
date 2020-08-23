import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';
import UserNavbar from '../layout/UserNavbar';
import HelpCenter from './HelpCenter';
import ErrorPage from './ErrorPage';
import './UserBase.scss';


const UserBase = () => {
  let { path } = useRouteMatch();

  return (
    <Container fluid id='user-page-container'>
      <Row>
        <UserNavbar />
        <Col className='inner-page-container'>
          <Row>
            <Switch>
              <Route exact path={`${path}/help`} component={HelpCenter} />
              <Route component={ErrorPage} />
            </Switch>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default UserBase;
