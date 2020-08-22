import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.scss';

function Footer() {
  return (
    <Container fluid as='footer' className='py-5'>
      <Row>
        <Col lg={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }}>
          <Row>
            <Col xs={{ span: 12, order: 2 }} lg={{ span: 7, order: 1 }} className='mt-4 mt-lg-0 text-center text-lg-left'>
              <FontAwesomeIcon icon={faCopyright} aria-label='copyright' /> David Askey, Isaac Yates, and Jeffrey Terry 2020.
            </Col>
            <Col xs={{ span: 12, order: 1 }} lg={{ span: 5, order: 2 }} className='text-center text-lg-right'>
              Made with <FontAwesomeIcon icon={faHeart} aria-label='heart' /> in Norman, Oklahoma.
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
