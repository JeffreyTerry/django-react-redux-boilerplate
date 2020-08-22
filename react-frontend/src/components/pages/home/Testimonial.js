import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import ModernImage from '../../common/ModernImage';
import './Testimonial.scss';

const Testimonial = ({ name, organization, quote, photo, photoAlt }) => {
  return (
    <div className='testimonial-container shadow row py-4'>
      <div className='col-12'>
        <div className='row'>
          <div className='col-12'>
            <ModernImage className='testimonial-photo' src={photo} alt={photoAlt} />
          </div>
        </div>

        <div className='row'>
          <div className='col-12 testimonial-source my-3'>
            {name}{organization ? ', ' + organization : ''}
          </div>
        </div>

        <div className='row'>
          <div className='col-12'>
            <div className='divider'></div>
          </div>
        </div>

        <div className='row'>
          <div className='col-12 testimonial-quote my-3'>
            <div className='quote-icon begin' aria-label='Begin quote'>
              <FontAwesomeIcon icon={faQuoteLeft} />
            </div>
            {quote}
            <div className='quote-icon end' aria-label='End quote'>
              <FontAwesomeIcon icon={faQuoteRight} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial;
