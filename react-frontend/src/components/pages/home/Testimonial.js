import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';
import ModernImage from '../../common/ModernImage';
import './Testimonial.scss';

const Testimonial = ({ name, organization, quote, photo, photoAlt }) => {
  return (
    <Row className='testimonial-container shadow py-4'>
      <Col>
        <Row>
          <Col>
            <ModernImage className='testimonial-photo' src={photo} alt={photoAlt} />
          </Col>
        </Row>

        <Row>
          <Col className='testimonial-source my-3'>
            {name}{organization ? ', ' + organization : ''}
          </Col>
        </Row>

        <Row>
          <Col>
            <div className='divider'></div>
          </Col>
        </Row>

        <Row>
          <Col className='testimonial-quote my-3'>
            <div className='quote-icon begin' aria-label='Begin quote'>
              <FontAwesomeIcon icon={faQuoteLeft} />
            </div>
            {quote}
            <div className='quote-icon end' aria-label='End quote'>
              <FontAwesomeIcon icon={faQuoteRight} />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Testimonial;
