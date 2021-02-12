import React from 'react';

import './ErrorModal.css';
import Button from '../Button/Button';

const ErrorModal = ({ errorMessage, children, handelModal }) => {
  return (
    <React.Fragment>
      <div className='errorModalBackdrop'>
        <div className='errorModalContent'>
          <h1 className='errorModalMessage'>{errorMessage}</h1>
          <Button class='DangerBtn' clickAction={handelModal}>
            Close
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ErrorModal;
