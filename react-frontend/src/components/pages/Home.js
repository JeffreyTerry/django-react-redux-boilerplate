import React from 'react';
import { Helmet } from 'react-helmet';
import { myappSummary } from '../../assets/constants/constants';
import HowItWorks from './home/HowItWorks';
import Testimonials from './home/Testimonials';
import PrivacyPolicy from './home/PrivacyPolicy';
import ModernImage, { getModernImageSrc } from '../common/ModernImage';
import './Home.scss';

const HomePagePhoto = getModernImageSrc('./home/HomePagePhoto');

const Home = () => {
  return <>
    <div id='home-page-container' className='container-fluid'>
      <Helmet>
        <title>MyApp</title>
      </Helmet>
      <div className='row'>
        <div className='col-11 offset-1 col-lg-9 offset-lg-2'>
          <span className='intro-text-large'>Catchy four-word phrase</span>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-md-10 offset-md-1 mt-5 text-center'>
          {/* ISAAC -- This is how you should incorporate images, as we can set ModernImage
              up to serve images in next-gen formats (jp2 & webp). You should put original photos in a folder
              called `originals` just below the path you want them to use, then you can call the
              `python manage.py compress_image_assets` command to create optimized versions for the web */}
          <ModernImage className='img-fluid shadow' src={HomePagePhoto} alt='Nice' />
        </div>
      </div>
      <div className='row summary-text-row'>
        <div className='col-10 offset-1 col-md-10 offset-md-1 text-center'>
          <span className='summary-text'>{myappSummary}</span>
        </div>
      </div>
      <HowItWorks />
      <Testimonials />
      <PrivacyPolicy />
    </div>
  </>
}

export default Home;
