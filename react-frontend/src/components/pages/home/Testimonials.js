import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Testimonial from './Testimonial';
import { getModernImageSrc } from '../../common/ModernImage';
import './Testimonials.scss';

const JakePhoto = getModernImageSrc('./home/testimonials/Jake');
const FloPhoto = getModernImageSrc('./home/testimonials/Flo');
const MayhemPhoto = getModernImageSrc('./home/testimonials/Mayhem');

const Testimonials = () => {
  return <Row id='testimonials-container'>
    <Col id='testimonials' className='text-center' xs={{ span: 10, offset: 1 }}>
      <Row>
        <Col id='testimonials-title' xs={{ span: 10, offset: 1 }}>
          Testimonials
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} xl={4} className='px-md-4 px-lg-5 mt-4 mt-lg-5'>
          <Testimonial name='Jake' organization='State Farm' photo={JakePhoto} photoAlt='Jake from State Farm' quote="My App changed my life. I used to struggle to give good presentations, but now I'm a pro!" />
        </Col>
        <Col xs={12} md={6} xl={4} className='px-md-4 px-lg-5 mt-4 mt-lg-5'>
          <Testimonial name='Flo' organization='Progressive' photo={FloPhoto} photoAlt='Flo from Progressive' quote="My App changed my life. I used to struggle to give good presentations, but now I'm a pro!" />
        </Col>
        <Col xs={12} md={6} xl={4} className='px-md-4 px-lg-5 mt-4 mt-lg-5'>
          <Testimonial name='Mayhem' organization='All State' photo={MayhemPhoto} photoAlt='Mayhem from All State' quote="My App changed my life. I used to struggle to give good presentations, but now I'm a pro!" />
        </Col>
      </Row>
    </Col>
  </Row>
}

export default Testimonials;
