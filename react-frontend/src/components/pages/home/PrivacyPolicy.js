import React from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.scss';

const PrivacyPolicy = () => {
  return <div id='privacy-container' className='row'>
    <div id='privacy' className='col-10 offset-1 col-md-10 offset-md-1'>
      <div className='row'>
        <div id='privacy-title' className='col-10 offset-1 text-center'>
          Privacy
        </div>
      </div>
      <div className='row mt-4'>
        <div id='privacy-description' className='col-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2 text-left'>
          <div>
            My App takes privacy seriously. To this end, it only stores information necessary for making the site functional, and your data is (obviously) never sold to third parties. The information My App does store falls into three categories: 1) account information, 2) information you create by using the site, and 3) anonymized general usage information.
            <ol className='mt-3'>
              <li className='mb-2'>
                Account information includes just two pieces of personal data: names and email addresses. My App stores names in order to facilitate communication between instructors and students (i.e. instructors need to know which students are which), and it stores email addresses in order to facilitate the login / logout procedure.
              </li>
              <li className='mb-2'>
                Information you create by using the site includes project data, course data, assignment data, and so on. My App will never store sensitive data such as audio and video of practice sessions without your explicit permission. In fact, this data is never sent to My App's servers unless you decide to submit it to your instructor for feedback, in which case it is encrypted and then stored for their use only.
              </li>
              <li>
                Anonymized general usage information consists of aggregated data regarding page views, load times, browser types, and so on, which is used solely to improve the usability of the site.
              </li>
            </ol>
          </div>
          <p>
            In addition to My App's strict data policies, the application was designed from the ground-up with security in mind. It uses end-to-end encryption for all communication between the website and the server, and it encrypts all user uploads, including attachments, slideshows, and practice sessions, using AES-256 encryption.
          </p>
          <p>
            Finally, to give users the utmost control over their data, My App allows users to delete their account at any time. Doing so purges all information and files associated with the deleted account from My App's servers. In addition to this privacy notice, which gives a specific picture of how My App handles user data, you can find My App's full legal policy <Link to='/legal'>here</Link> (if you're a lawyer, you'll love this page!).
          </p>
        </div>
      </div>
    </div>
  </div>
}

export default PrivacyPolicy;
