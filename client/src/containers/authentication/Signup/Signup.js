import React from 'react';

import formErrorHandlerHOC from '../../../HOC/formErrorHandlerHOC';

import Navigation from '../../../components/navigation/Navigation';
import ProfileForm from '../../../components/ProfileForm/ProfileForm';
import axios from 'axios';

const Signup = (props) => {
  const submitForm = (data) => {
    axios
      .post('http://localhost:5000/hungrypandaAPI/users/signup', data)
      .then((response) => {
        if (response) {
          props.history.push('/myrecipes');
        }
      });
  };

  return (
    <React.Fragment>
      <Navigation />
      <ProfileForm submitForm={submitForm} />
    </React.Fragment>
  );
};

export default formErrorHandlerHOC(Signup);
