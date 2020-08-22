import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './HowItWorks.scss';

const HowItWorks = () => {
  return <Row id='how-it-works-container'>
    <Col xs={{ span: 10, offset: 1 }} md={{ span: 12, offset: 0 }}>
      <Row>
        <Col id='how-it-works-title' className='text-center' xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} >
          How it works
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }}>
          It works like this...
        </Col>
      </Row>
    </Col>
  </Row>
}

export default HowItWorks;
