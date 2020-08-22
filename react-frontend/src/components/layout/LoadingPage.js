import React from 'react';
import UserNavbar from './UserNavbar';
import { useLocation } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';

const LoadingPage = () => {
  const location = useLocation();

  return <Container fluid id='loading-page-container'>
    <Row>
      {location.pathname.startsWith('/user') &&
        <UserNavbar />
      }
      <Col className='inner-page-container min-height-page-container'></Col>
    </Row>
  </Container>
}

export default LoadingPage;
