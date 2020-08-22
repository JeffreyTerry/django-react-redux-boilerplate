import React from 'react';
import Testimonial from './Testimonial';
import { getModernImageSrc } from '../../common/ModernImage';
import './Testimonials.scss';

const JakePhoto = getModernImageSrc('./home/testimonials/Jake');
const FloPhoto = getModernImageSrc('./home/testimonials/Flo');
const MayhemPhoto = getModernImageSrc('./home/testimonials/Mayhem');

const Testimonials = () => {
  return <div id='testimonials-container' className='row'>
    <div id='testimonials' className='col-10 offset-1 col-md-10 offset-md-1 text-center'>
      <div className='row'>
        <div id='testimonials-title' className='col-10 offset-1'>
          Testimonials
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-md-6 col-xl-4 px-md-4 px-lg-5 mt-4 mt-lg-5'>
          <Testimonial name='Jake' organization='State Farm' photo={JakePhoto} photoAlt='Jake from State Farm' quote="My App changed my life. I used to struggle to give good presentations, but now I'm a pro!" />
        </div>
        <div className='col-12 col-md-6 col-xl-4 px-md-4 px-lg-5 mt-4 mt-lg-5'>
          <Testimonial name='Flo' organization='Progressive' photo={FloPhoto} photoAlt='Flo from Progressive' quote="My App changed my life. I used to struggle to give good presentations, but now I'm a pro!" />
        </div>
        <div className='col-12 col-md-6 col-xl-4 px-md-4 px-lg-5 mt-4 mt-lg-5'>
          <Testimonial name='Mayhem' organization='All State' photo={MayhemPhoto} photoAlt='Mayhem from All State' quote="My App changed my life. I used to struggle to give good presentations, but now I'm a pro!" />
        </div>
      </div>
    </div>
  </div>
}

export default Testimonials;
