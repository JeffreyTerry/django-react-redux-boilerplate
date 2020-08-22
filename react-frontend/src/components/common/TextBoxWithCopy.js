import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import MyAppTippy from '../common/MyAppTippy';
import { executeOnEnter } from '../../assets/utils/utils';
import './TextBoxWithCopy.scss';

const TextBoxWithCopy = ({ text, label, className = '', ...props }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const copyTextToClipboard = event => {
    event.preventDefault();
    if (copy(text)) {
      setShowTooltip(true);
    }
  }

  return (
    <div className={'text-box-with-copy ' + className} {...props}>
      <span className='text'>
        {!!label &&
          <span className='mr-1'>
            {label}
          </span>
        }
        <span className=''>
          {text}
        </span>
      </span>
      <span className='control-panel ml-2 float-right'>
        <MyAppTippy
          content='Copied to clipboard!'
          visible={showTooltip}
          onClickOutside={() => setShowTooltip(false)}
          animation={false}>
          <span
            className='copy-text'
            onClick={copyTextToClipboard}
            onKeyPress={event => executeOnEnter(event, copyTextToClipboard)}
            aria-label='Copy'
            tabIndex='0'>
            <FontAwesomeIcon icon={faCopy} />
          </span>
        </MyAppTippy>
      </span>
    </div>
  )
}

export default TextBoxWithCopy;