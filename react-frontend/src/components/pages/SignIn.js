import React from 'react';
import { Helmet } from 'react-helmet';
import GoogleSignInButton from '../common/GoogleSignInButton';
import './SignIn.scss';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div id='signin-page-container' className='container-fluid min-height-page-container'>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <header className='row'>
        <div className='col-12 text-center col-sm-10 offset-sm-1 col-lg-8 offset-lg-2'>
          <div className='signin-page-title'>Sign in to get started</div>
        </div>
      </header>
      <div className='row primary-btn-container'>
        <div className='col-12'>
          <GoogleSignInButton text='Sign in with Google' url='/login/google-oauth2/' />
        </div>
      </div>
      <div className='row text-center secondary-btn-container'>
        <div className='col-12'>
          <Link to='/demo'>Using a demo account? Sign in here instead.</Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
