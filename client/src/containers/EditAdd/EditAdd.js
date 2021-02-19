import React from 'react';

import formErrorHandlerHOC from '../../HOC/formErrorHandlerHOC';

import Navigation from '../../components/navigation/Navigation';
import Form from '../../components/Form/Form';
import axios from 'axios';

const EditAdd = ({ history }) => {
  const submitForm = (dataValue) => {
    axios
      .post('http://localhost:5000/hungrypandaAPI/recipes/addrecipe', dataValue)
      .then((resp) => {
        if (resp) {
          history.push('/myrecipes');
        }
      });
  };

  return (
    <React.Fragment>
      <Navigation />
      <Form submitForm={submitForm} />
    </React.Fragment>
  );
};

export default formErrorHandlerHOC(EditAdd);
