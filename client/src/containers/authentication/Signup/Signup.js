import React from 'react';

import Navigation from '../../../components/navigation/Navigation';
import ProfileForm from '../../../components/ProfileForm/ProfileForm';
import formErrorHandlerHOC from '../../../HOC/formErrorHandlerHOC';
import axios from '../../../axios-instance';

const Signup = () => {
  return (
    <React.Fragment>
      <Navigation />
      <ProfileForm />
    </React.Fragment>
  );
};

export default formErrorHandlerHOC(Signup, axios);
