import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import GoogleSignInButton from '../common/GoogleSignInButton';
import './SignIn.scss';

const SignIn = () => {
  return (
    <Container fluid id='signin-page-container' className='min-height-page-container'>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Row as='header'>
        <Col xs={12} sm={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }} className='text-center'>
          <div className='signin-page-title'>Sign in to get started</div>
        </Col>
      </Row>
      <Row className='primary-btn-container'>
        <Col>
          <GoogleSignInButton text='Sign in with Google' url='/login/google-oauth2/' />
        </Col>
      </Row>
      <Row className='text-center secondary-btn-container'>
        <Col>
          <Link to='/demo'>Using a demo account? Sign in here instead.</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
