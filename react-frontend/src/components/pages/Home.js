import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import { myappSummary } from '../../assets/constants/constants';
import HowItWorks from './home/HowItWorks';
import Testimonials from './home/Testimonials';
import PrivacyPolicy from './home/PrivacyPolicy';
import ModernImage, { getModernImageSrc } from '../common/ModernImage';
import './Home.scss';

const HomePagePhoto = getModernImageSrc('./home/HomePagePhoto');

const Home = () => {
  return <>
    <Container fluid id='home-page-container'>
      <Helmet>
        <title>MyApp</title>
      </Helmet>
      <Row>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 9, offset: 2 }}>
          <span className='intro-text-large'>Catchy four-word phrase</span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={{ span: 10, offset: 1 }} className='mt-5 text-center'>
          {/* ISAAC -- This is how you should incorporate images, as we can set ModernImage
              up to serve images in next-gen formats (jp2 & webp). You should put original photos in a folder
              called `originals` just below the path you want them to use, then you can call the
              `python manage.py compress_image_assets` command to create optimized versions for the web */}
          <ModernImage className='img-fluid shadow' src={HomePagePhoto} alt='Nice' />
        </Col>
      </Row>
      <Row className='summary-text-row'>
        <Col xs={{ span: 10, offset: 1 }} className='text-center'>
          <span className='summary-text'>{myappSummary}</span>
        </Col>
      </Row>
      <HowItWorks />
      <Testimonials />
      <PrivacyPolicy />
    </Container>
  </>
}

export default Home;
