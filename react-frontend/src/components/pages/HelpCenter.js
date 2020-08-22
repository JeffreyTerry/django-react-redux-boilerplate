import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { printDurationPretty } from '../../assets/utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';
import './HelpCenter.scss';

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
  return <Row className='help-video-row mx-0'>
    <Col xs={9} md={10}>
      <FontAwesomeIcon icon={faPlayCircle} className='help-video-icon' />
      <span className='help-video-title'>
        {video.title}
      </span>
    </Col>
    <Col xs={3} md={2}>
      {printDurationPretty(video.duration)}
    </Col>
  </Row>
}

const HelpCenter = () => {
  const [searchText, setSearchText] = useState('');
  const [openQuestionId, setOpenQuestionId] = useState();

  const getFAQRow = question => {
    return <>
      <Row className='help-faq-row mx-0' onClick={() => { openQuestionId === question.id ? setOpenQuestionId(undefined) : setOpenQuestionId(question.id) }} >
        <Col>
          <span className='help-faq-question'>
            <span className='icon'>Q.</span>
            <span className='text'>{question.question}</span>
          </span>
        </Col>
      </Row>
      {question.id === openQuestionId &&
        <Row className='mt-1 mb-3 mx-0'>
          <Col className='px-5'>
            <span className='help-faq-answer'>
              <span className='icon'>A.</span>
              <span className='text'>{question.answer}</span>
            </span>
          </Col>
        </Row>
      }
    </>
  }

  return <>
    <Container fluid id='help-page-container'>
      <Helmet>
        <title>Help Center</title>
      </Helmet>
      <Row className='mt-5'>
        <Col xs={12} sm={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }} xl={{ span: 6, offset: 3 }}>
          <Row className='border-bottom-light'>
            <Col as='header' xs={12} sm={7} md={8} className='h2'>
              Help&nbsp;Center
            </Col>
            <Col xs={12} sm={5} md={4} className='mb-3 mt-3 mt-sm-0'>
              <input
                value={searchText}
                type='text'
                onChange={event => setSearchText(event.target.value)}
                className='form-control myapp-input-primary thick help-center-search-input'
                placeholder='Search'
              />
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col>
              <Row className='mr-0'>
                <Col xs={9} md={10} className='help-center-subheader'>
                  Overview
                </Col>
                <Col xs={3} md={2} className='help-center-subheader'>
                  Duration
                </Col>
              </Row>
              {overviewHelpVideos.map(getVideoRow)}

              <Row>
                <Col className='help-center-subheader'>
                  Student Features
                </Col>
              </Row>
              {studentHelpVideos.map(getVideoRow)}

              <Row>
                <Col className='help-center-subheader'>
                  Instructor Features
                </Col>
              </Row>
              {instructorHelpVideos.map(getVideoRow)}

              <Row>
                <Col className='help-center-subheader'>
                  Frequently Asked Questions
                </Col>
              </Row>
              {frequentlyAskedQuestions.map(getFAQRow)}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </>
}

export default HelpCenter;
