import React from 'react';

import './ErrorModal.css';
import Button from '../Button/Button';

const ErrorModal = ({ errorMessage, handleModal }) => {
  return (
    <React.Fragment>
      <div className='errorModalBackdrop'>
        <div className='errorModalContent'>
          <h1 className='errorModalMessage'>{errorMessage}</h1>
          <Button class='DangerBtn' clickAction={handleModal}>
            Close
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ErrorModal;
