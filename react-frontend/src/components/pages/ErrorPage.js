import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import './ErrorPage.scss';

function ErrorPage() {
  return (
    <Container fluid id='error-page-container' className='min-height-page-container'>
      <Helmet>
        <title>404 Error</title>
      </Helmet>
      <Row className='text-center mt-5'>
        <Col className='mt-5'>
          <div className='h1'>Page Not Found</div>
        </Col>
      </Row>
      <Row className='text-center'>
        <Col>
          <div className='huge-icon'>
            {/* <FontAwesomeIcon icon={faExclamationCircle} /> */}
            404
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ErrorPage;
