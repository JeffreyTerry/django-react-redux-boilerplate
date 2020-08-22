import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './HelpCenter.scss';
import { printDurationPretty } from '../../assets/utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';

const overviewHelpVideos = [
  {
    id: 0,
    title: 'Student interface',
    duration: 713000
  },
  {
    id: 1,
    title: 'Instructor interface',
    duration: 838000
  }
]

const studentHelpVideos = [
  {
    id: 0,
    title: 'Student Help Video 1',
    duration: 289000
  },
  {
    id: 1,
    title: 'Student Help Video 2',
    duration: 349000
  },
  {
    id: 2,
    title: 'Student Help Video 3',
    duration: 192000
  },
  {
    id: 3,
    title: 'Student Help Video 4',
    duration: 219000
  },
];

const instructorHelpVideos = [
  {
    id: 0,
    title: 'Instructor Help Video 1',
    duration: 294000
  },
  {
    id: 1,
    title: 'Instructor Help Video 2',
    duration: 312000
  },
  {
    id: 2,
    title: 'Instructor Help Video 3',
    duration: 593000
  },
  {
    id: 3,
    title: 'Instructor Help Video 4',
    duration: 493000
  },
];

const frequentlyAskedQuestions = [
  {
    id: 0,
    question: 'What is the size of the universe?',
    answer: 'Hmm... let me think about that and get back to you'
  },
  {
    id: 1,
    question: 'Did MyApp really teach Jake from State Farm everything he knows?',
    answer: 'Hmm... let me think about that and get back to you'
  },
  {
    id: 2,
    question: 'How long will it take to save 15 percent or more on car insurance?',
    answer: 'Hmm... let me think about that and get back to you'
  }
];

const getVideoRow = video => {
  return <div className='row help-video-row mx-0'>
    <div className='col-9 col-md-10'>
      <FontAwesomeIcon icon={faPlayCircle} className='help-video-icon' />
      <span className='help-video-title'>
        {video.title}
      </span>
    </div>
    <div className='col-3 col-md-2'>
      {printDurationPretty(video.duration)}
    </div>
  </div>
}

const HelpCenter = () => {
  const [searchText, setSearchText] = useState('');
  const [openQuestionId, setOpenQuestionId] = useState();

  const getFAQRow = question => {
    return <>
      <div className='row help-faq-row mx-0' onClick={() => { openQuestionId === question.id ? setOpenQuestionId(undefined) : setOpenQuestionId(question.id) }} >
        <div className='col-12'>
          <span className='help-faq-question'>
            <span className='icon'>Q.</span>
            <span className='text'>{question.question}</span>
          </span>
        </div>
      </div>
      {question.id === openQuestionId &&
        <div className='row mt-1 mb-3 mx-0'>
          <div className='col-12 px-5'>
            <span className='help-faq-answer'>
              <span className='icon'>A.</span>
              <span className='text'>{question.answer}</span>
            </span>
          </div>
        </div>
      }
    </>
  }

  return <>
    <div id='help-page-container' className='container-fluid'>
      <Helmet>
        <title>Help Center</title>
      </Helmet>
      <div className='row mt-5'>
        <div className='col-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3'>
          <div className='row border-bottom-light'>
            <header className='col-12 col-sm-7 col-md-8 h2'>
              Help&nbsp;Center
            </header>
            <div className='col-12 col-sm-5 col-md-4 mb-3 mt-3 mt-sm-0'>
              <input
                value={searchText}
                type='text'
                onChange={event => setSearchText(event.target.value)}
                className='form-control myapp-input-primary thick help-center-search-input'
                placeholder='Search'
              />
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col-12'>
              <div className='row mr-0'>
                <div className='col-9 col-md-10 help-center-subheader'>
                  Overview
                </div>
                <div className='col-3 col-md-2 help-center-subheader'>
                  Duration
                </div>
              </div>
              {overviewHelpVideos.map(getVideoRow)}

              <div className='row'>
                <div className='col-12 help-center-subheader'>
                  Student Features
                </div>
              </div>
              {studentHelpVideos.map(getVideoRow)}

              <div className='row'>
                <div className='col-12 help-center-subheader'>
                  Instructor Features
                </div>
              </div>
              {instructorHelpVideos.map(getVideoRow)}

              <div className='row'>
                <div className='col-12 help-center-subheader'>
                  Frequently Asked Questions
                </div>
              </div>
              {frequentlyAskedQuestions.map(getFAQRow)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default HelpCenter;
